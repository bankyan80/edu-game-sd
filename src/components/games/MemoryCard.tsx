"use client";
import GameShell from "@/components/game/GameShell";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const PAIRS = [
  { emoji: "🍎", name: "Apel" }, { emoji: "🍌", name: "Pisang" }, { emoji: "🐱", name: "Kucing" },
  { emoji: "🐶", name: "Anjing" }, { emoji: "☀️", name: "Matahari" }, { emoji: "🌙", name: "Bulan" },
  { emoji: "📚", name: "Buku" }, { emoji: "✏️", name: "Pensil" }, { emoji: "🏠", name: "Rumah" },
  { emoji: "🚗", name: "Mobil" }, { emoji: "✈️", name: "Pesawat" }, { emoji: "🌸", name: "Bunga" },
  { emoji: "🐟", name: "Ikan" }, { emoji: "🦋", name: "Kupu-kupu" }, { emoji: "🌈", name: "Pelangi" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryCard() {
  const game = getGameBySlug("memory-card")!;
  const [level, setLevel] = useState(1);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [cards, setCards] = useState<{emoji: string; name: string; id: number}[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const count = Math.min(4 + level, 15);
    const selected = shuffleArray(PAIRS).slice(0, count);
    const pairs = shuffleArray([...selected, ...selected].map((p, i) => ({ ...p, id: i })));
    setCards(pairs);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }, [level]);

  const handleFlip = useCallback((idx: number) => {
    if (flipped.length >= 2 || flipped.includes(idx) || matched.includes(idx)) return;
    audioManager.playClick();
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        audioManager.playCorrect();
        const newMatched = [...matched, a, b];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) {
          if (level >= 5) {
            audioManager.playVictory();
          } else {
            audioManager.playLevelUp();
            setTimeout(() => setLevel(l => l + 1), 1500);
          }
        }
      } else {
        audioManager.playWrong();
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped, matched, cards, level]);

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">Level {level}</span>
        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{moves} langkah</span>
        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-sm font-bold">{matched.length / 2}/{cards.length / 2} pasang</span>
      </div>
      <div className={`grid gap-2 flex-1 auto-rows-fr ${cards.length <= 8 ? "grid-cols-4" : cards.length <= 18 ? "grid-cols-4 sm:grid-cols-6" : "grid-cols-5 sm:grid-cols-6"}`}>
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i);
          const isMatched = matched.includes(i);
          return (
            <motion.button
              key={i}
              whileHover={{ scale: isFlipped ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlip(i)}
              className={`aspect-square rounded-xl text-2xl font-bold transition-all duration-300 flex items-center justify-center ${
                isFlipped
                  ? isMatched
                    ? "bg-green-100 border-2 border-green-400 shadow-md"
                    : "bg-white border-2 border-purple-400 shadow-lg"
                  : "bg-gradient-to-br from-purple-400 to-pink-400 shadow hover:shadow-lg"
              }`}
            >
              {isFlipped ? card.emoji : "?"}
            </motion.button>
          );
        })}
      </div>
      {matched.length === cards.length && cards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center bg-white rounded-2xl p-4 shadow-lg"
        >
          <span className="text-3xl block mb-1">🎉</span>
          <h2 className="text-lg font-bold mb-1">Luar Biasa!</h2>
          <p className="text-gray-500">Selesai dalam {moves} langkah - Level {level}</p>
        </motion.div>
      )}
    </div>
  );
}
