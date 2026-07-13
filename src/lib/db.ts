import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default turso;

export async function initDB() {
  await turso.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL DEFAULT 'Siswa',
      email TEXT,
      avatar TEXT,
      level INTEGER DEFAULT 1,
      xp INTEGER DEFAULT 0,
      total_points INTEGER DEFAULT 0,
      badges TEXT DEFAULT '[]',
      favorites TEXT DEFAULT '[]',
      high_scores TEXT DEFAULT '{}',
      games_played TEXT DEFAULT '{}',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS game_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      game_id INTEGER NOT NULL,
      game_name TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      points INTEGER DEFAULT 0,
      difficulty TEXT DEFAULT 'Mudah',
      duration TEXT DEFAULT '0s',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      total_score INTEGER DEFAULT 0,
      games_played INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      week_key TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_history_user ON game_history(user_id);
    CREATE INDEX IF NOT EXISTS idx_history_game ON game_history(game_id);
    CREATE INDEX IF NOT EXISTS idx_leaderboard_week ON leaderboard(week_key);
    CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(total_score DESC);
  `);
}
