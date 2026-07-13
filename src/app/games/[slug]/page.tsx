"use client";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getGameBySlug } from "@/lib/gameData";

const gameComponents: Record<string, React.ComponentType> = {
  "tebak-huruf": dynamic(() => import("@/components/games/TebakHuruf"), { ssr: false }),
  "tebak-kata": dynamic(() => import("@/components/games/TebakKata"), { ssr: false }),
  "puzzle-kata": dynamic(() => import("@/components/games/PuzzleKata"), { ssr: false }),
  "puzzle-kalimat": dynamic(() => import("@/components/games/PuzzleKalimat"), { ssr: false }),
  "tebak-gambar": dynamic(() => import("@/components/games/TebakGambar"), { ssr: false }),
  "mencocokkan-gambar": dynamic(() => import("@/components/games/MencocokkanGambar"), { ssr: false }),
  "matematika-cepat": dynamic(() => import("@/components/games/MatematikaCepat"), { ssr: false }),
  "balapan-hitung": dynamic(() => import("@/components/games/BalapanHitung"), { ssr: false }),
  "tangkap-angka": dynamic(() => import("@/components/games/TangkapAngka"), { ssr: false }),
  "memory-card": dynamic(() => import("@/components/games/MemoryCard"), { ssr: false }),
  "maze-edukasi": dynamic(() => import("@/components/games/MazeEdukasi"), { ssr: false }),
  "quiz-ipa": dynamic(() => import("@/components/games/QuizIPA"), { ssr: false }),
  "quiz-ips": dynamic(() => import("@/components/games/QuizIPS"), { ssr: false }),
  "quiz-bahasa-indonesia": dynamic(() => import("@/components/games/QuizBahasaIndonesia"), { ssr: false }),
  "quiz-bahasa-inggris": dynamic(() => import("@/components/games/QuizBahasaInggris"), { ssr: false }),
  "susun-cerita": dynamic(() => import("@/components/games/SusunCerita"), { ssr: false }),
  "cari-kata": dynamic(() => import("@/components/games/CariKata"), { ssr: false }),
  "tebak-profesi": dynamic(() => import("@/components/games/TebakProfesi"), { ssr: false }),
  "tebak-hewan": dynamic(() => import("@/components/games/TebakHewan"), { ssr: false }),
  "tebak-pahlawan": dynamic(() => import("@/components/games/TebakPahlawan"), { ssr: false }),
  "tebak-provinsi": dynamic(() => import("@/components/games/TebakProvinsi"), { ssr: false }),
  "puzzle-peta-indonesia": dynamic(() => import("@/components/games/PuzzlePetaIndonesia"), { ssr: false }),
  "operasi-hitung-berantai": dynamic(() => import("@/components/games/OperasiHitungBerantai"), { ssr: false }),
  "simon-memory-edukasi": dynamic(() => import("@/components/games/SimonMemory"), { ssr: false }),
  "roda-pintar": dynamic(() => import("@/components/games/RodaPintar"), { ssr: false }),
};

export default function GamePage() {
  const params = useParams();
  const slug = params.slug as string;
  const game = getGameBySlug(slug);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">❌</span>
          <h1 className="text-2xl font-bold mb-2">Game Tidak Ditemukan</h1>
          <a href="/dashboard" className="text-purple-500 hover:underline">Kembali ke Dashboard</a>
        </div>
      </div>
    );
  }

  const GameComponent = gameComponents[slug];
  if (!GameComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">🚧</span>
          <h1 className="text-2xl font-bold mb-2">Game Sedang Dikembangkan</h1>
          <a href="/dashboard" className="text-purple-500 hover:underline">Kembali ke Dashboard</a>
        </div>
      </div>
    );
  }

  return <GameComponent />;
}
