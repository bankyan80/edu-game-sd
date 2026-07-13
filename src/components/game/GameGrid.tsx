"use client";
import GameCard from "./GameCard";
import type { Game } from "@/types";
import { motion } from "framer-motion";

export default function GameGrid({ games }: { games: Game[] }) {
  if (games.length === 0) {
    return (
      <div className="text-center py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="text-7xl mb-4"
        >
          🎮
        </motion.div>
        <p className="text-gray-500 text-lg font-medium">Tidak ada game ditemukan</p>
        <p className="text-gray-400 text-sm mt-1">Coba filter yang berbeda!</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} index={index} />
      ))}
    </div>
  );
}
