import { NextResponse } from "next/server";
import turso, { initDB } from "@/lib/db";

let initialized = false;

async function ensureDB() {
  if (!initialized) {
    await initDB();
    initialized = true;
  }
}

export async function GET(req: Request) {
  try {
    await ensureDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const result = await turso.execute({
        sql: "SELECT * FROM game_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 100",
        args: [userId],
      });
      return NextResponse.json(result.rows);
    }

    const result = await turso.execute("SELECT * FROM game_history ORDER BY created_at DESC LIMIT 100");
    return NextResponse.json(result.rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureDB();
    const body = await req.json();
    const { userId, gameId, gameName, score, points, difficulty, duration } = body;

    await turso.execute({
      sql: `INSERT INTO game_history (user_id, game_id, game_name, score, points, difficulty, duration) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [userId, gameId, gameName, score || 0, points || 0, difficulty || "Mudah", duration || "0s"],
    });

    // Update user stats
    await turso.execute({
      sql: `UPDATE users SET total_points = total_points + ?, xp = xp + ?, updated_at = datetime('now') WHERE id = ?`,
      args: [points || 0, Math.floor((score || 0) / 10), userId],
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
