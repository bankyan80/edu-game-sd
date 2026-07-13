import { NextResponse } from "next/server";
import turso, { initDB } from "@/lib/db";

let initialized = false;

async function ensureDB() {
  if (!initialized) {
    await initDB();
    initialized = true;
  }
}

function getWeekKey(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

export async function GET(req: Request) {
  try {
    await ensureDB();
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "all";

    let sql: string;
    let args: any[] = [];

    if (period === "weekly") {
      const weekKey = getWeekKey();
      sql = "SELECT * FROM leaderboard WHERE week_key = ? ORDER BY total_score DESC LIMIT 50";
      args = [weekKey];
    } else {
      sql = "SELECT * FROM leaderboard ORDER BY total_score DESC LIMIT 50";
    }

    const result = await turso.execute({ sql, args });
    return NextResponse.json(result.rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureDB();
    const body = await req.json();
    const { userId, userName, score } = body;
    const weekKey = getWeekKey();

    // Upsert leaderboard entry
    const existing = await turso.execute({
      sql: "SELECT id FROM leaderboard WHERE user_id = ? AND week_key = ?",
      args: [userId, weekKey],
    });

    if (existing.rows.length > 0) {
      await turso.execute({
        sql: "UPDATE leaderboard SET total_score = total_score + ?, user_name = ? WHERE user_id = ? AND week_key = ?",
        args: [score, userName, userId, weekKey],
      });
    } else {
      await turso.execute({
        sql: "INSERT INTO leaderboard (user_id, user_name, total_score, week_key) VALUES (?, ?, ?, ?)",
        args: [userId, userName, score, weekKey],
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
