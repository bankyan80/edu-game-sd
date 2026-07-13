import { NextResponse } from "next/server";
import turso, { initDB } from "@/lib/db";

let initialized = false;

async function ensureDB() {
  if (!initialized) {
    await initDB();
    initialized = true;
  }
}

export async function GET() {
  try {
    await ensureDB();
    const result = await turso.execute("SELECT * FROM users ORDER BY total_points DESC LIMIT 50");
    return NextResponse.json(result.rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureDB();
    const body = await req.json();
    const { id, name, email } = body;

    await turso.execute({
      sql: `INSERT OR REPLACE INTO users (id, name, email, updated_at) VALUES (?, ?, ?, datetime('now'))`,
      args: [id, name || "Siswa", email || null],
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
