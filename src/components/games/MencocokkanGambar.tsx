"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { getOptionColor, btn3d } from "@/lib/gameStyles";

export default function MencocokkanGambar() {
  const game = getGameBySlug("mencocokkan-gambar")!;
  const allQuestions = useMemo(() => getQuestions("mencocokkan-gambar"), []);

  const itemEmojis: Record<string, string> = {
    "Matahari": "☀️", "Air": "💧", "Buah Apel": "🍎", "Hujan": "🌧️",
    "Pohon": "🌳", "Sekolah": "🏫", "Kucing": "🐱", "Mata": "👁️",
    "Pensil": "✏️", "Api": "🔥", "Pagi": "🌅", "Gajah": "🐘",
  };

  const answerEmojis: Record<string, string> = {
    "Cahaya": "💡", "Es": "🧊", "Merah": "🔴", "Awan": "☁️",
    "Daun": "🍃", "Guru": "👩‍🏫", "Ikan": "🐟", "Melihat": "👀",
    "Tulis": "📝", "Panas": "🌡️", "Siang": "🌞", "Belalai": "🐘",
    "Bulan": "🌙", "Bintang": "⭐", "Api": "🔥", "Tanah": "🌍",
    "Udara": "💨", "Hijau": "🟢", "Biru": "🔵", "Hitam": "⚫",
    "Petir": "⚡", "Pelangi": "🌈", "Gunting": "✂️", "Batu": "🪨",
    "Rumah": "🏠", "Kantor": "🏢", "Toko": "🏪", "Anjing": "🐕",
    "Meong": "🐱", "Mengeong": "🐱", "Telinga": "👂", "Hidung": "👃",
    "Mulut": "👄", "Pena": "🖊️", "Penghapus": "🧹", "Kertas": "📄",
    "Dingin": "❄️", "Malam": "🌙", "Sore": "🌅", "Tidur": "😴",
    "Kecil": "🤏", "Sayap": "🦋", "Ekor": "🐾",
  };

  const getItemEmoji = (question: string) => {
    const item = question.replace("Cocokkan pasangan yang benar: ", "").replace(" -", "").trim();
    return itemEmojis[item] || "❓";
  };

  return (
    <GameShell game={game}>
      {(props) => {
        const { questionIndex, score, setScore, combo, setCombo, correctCount, setCorrectCount, isAnswered, setIsAnswered, setShowResult } = props;
        const q = allQuestions[questionIndex];
        if (!q) return null;

        const handleAnswer = (ans: string) => {
          if (isAnswered) return;
          setIsAnswered(true);
          if (ans === q.answer) {
            audioManager.playCorrect();
            setScore(score + 10 + (combo > 0 ? combo * 5 : 0));
            setCombo(combo + 1);
            setCorrectCount(correctCount + 1);
          } else {
            audioManager.playWrong();
            setCombo(0);
          }
          setTimeout(() => {
            setIsAnswered(false);
            if (questionIndex + 1 >= allQuestions.length) setShowResult(true);
            else props.setQuestionIndex(questionIndex + 1);
          }, 1200);
        };

        const itemEmoji = getItemEmoji(q.question);

        return (
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="text-center mb-1">
              <span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span>
            </div>
            <div className="bg-gradient-to-br from-purple-300 to-pink-400 rounded-2xl p-4 shadow-lg mb-3 shrink-0">
              <div className="flex items-center gap-4">
                <span className="text-6xl animate-float">{itemEmoji}</span>
                <div className="flex-1">
                  <p className="text-sm text-white/80 mb-1">Cocokkan dengan yang sesuai:</p>
                  <p className="text-lg font-black text-white">{q.question.replace("Cocokkan pasangan yang benar: ", "")}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1 auto-rows-fr">
              {q.options?.map((opt, i) => {
                const c = getOptionColor(questionIndex, i);
                const optEmoji = answerEmojis[opt] || "";
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96, y: 4 }}
                    onClick={() => handleAnswer(opt)}
                    disabled={isAnswered}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl font-black text-lg text-white border-b-[5px] ${c.from} ${c.to} ${c.border} ${c.hover} active:translate-y-1 active:border-b-[2px] transition-all duration-100 drop-shadow-lg ${
                      isAnswered && opt === q.answer
                        ? "!bg-gradient-to-br !from-green-400 !to-emerald-500 !border-green-600 scale-110 ring-4 ring-white"
                        : isAnswered && opt !== q.answer
                        ? "!bg-gray-200 !text-gray-400 !border-gray-300 opacity-50"
                        : ""
                    }`}
                  >
                    <span className="text-5xl">{optEmoji}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      }}
    </GameShell>
  );
}
