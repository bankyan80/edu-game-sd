export interface Game {
  id: number;
  slug: string;
  name: string;
  category: GameCategory;
  kelas: string[];
  description: string;
  duration: string;
  difficulty: Difficulty;
  icon: string;
  color: string;
  gradient: string;
  mapel: Mapel;
}

export type GameCategory = "Bahasa" | "Matematika" | "Logika" | "Pengetahuan" | "Umum";
export type Difficulty = "Mudah" | "Sedang" | "Sulit" | "Master";
export type Mapel = "Bahasa Indonesia" | "Bahasa Inggris" | "Matematika" | "IPA" | "IPS" | "Umum";

export interface Question {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  hint?: string;
  explanation?: string;
  difficulty: Difficulty;
  category: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  totalPoints: number;
  badges: string[];
  highScores: Record<string, number>;
  gamesPlayed: Record<string, number>;
  favorites: number[];
  history: GameHistory[];
}

export interface GameHistory {
  gameId: number;
  gameName: string;
  score: number;
  points: number;
  date: string;
  duration: string;
  difficulty: Difficulty;
}

export interface GameResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  points: number;
  xp: number;
  combo: number;
  perfect: boolean;
  highScore: boolean;
}
