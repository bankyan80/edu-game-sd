"use client";
import AppShell from "@/components/layout/AppShell";
import GameGrid from "@/components/game/GameGrid";
import { useStore } from "@/lib/store";
import { games } from "@/lib/gameData";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const favs = useStore(s => s.progress.favorites);
  const favGames = games.filter(g => favs.includes(g.id));

  return (
    <AppShell>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Heart className="w-6 h-6 text-red-500 fill-red-500"/> Favorit</h1>
          <p className="text-gray-500 text-sm">{favGames.length} game favorit</p>
        </div>
        {favGames.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">💔</span>
            <p className="text-gray-500">Belum ada game favorit. Klik ❤️ pada card game untuk menambahkan.</p>
          </div>
        ) : <GameGrid games={favGames} />}
      </motion.div>
    </AppShell>
  );
}
