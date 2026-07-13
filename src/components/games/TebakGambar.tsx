"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { getOptionColor } from "@/lib/gameStyles";

export default function TebakGambar() {
  const game = getGameBySlug("tebak-gambar")!;
  const allQuestions = useMemo(() => getQuestions("tebak-gambar"), []);

  return (
    <GameShell game={game}>
      {(props) => {
        const { questionIndex, score, setScore, combo, setCombo, correctCount, setCorrectCount, isAnswered, setIsAnswered, setShowResult } = props;
        const q = allQuestions[questionIndex];
        if (!q) return null;

        const emojis = ["🏠","📖","🍎","🚗","🐔","✂️","🌾","🏥","🌡️","🍉","🎸","🐆","📱","☀️","🧈"];
        const emoji = emojis[questionIndex % emojis.length];

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

        return (
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="text-center mb-1">
              <span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span>
            </div>
            <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl p-4 shadow-lg mb-3 text-center shrink-0">
              <span className="text-4xl block mb-1 animate-float">{emoji}</span>
              <p className="text-base font-bold text-white">{q.question}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1 auto-rows-fr">
              {q.options?.map((opt, i) => {
                const c = getOptionColor(questionIndex, i);
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96, y: 4 }}
                    onClick={() => handleAnswer(opt)}
                    disabled={isAnswered}
                    className={`flex items-center justify-center p-3 rounded-2xl font-black text-2xl sm:text-3xl text-white border-b-[5px] ${c.from} ${c.to} ${c.border} ${c.hover} active:translate-y-1 active:border-b-[2px] transition-all duration-100 drop-shadow-lg ${
                      isAnswered && opt === q.answer
                        ? "!bg-gradient-to-br !from-green-400 !to-emerald-500 !border-green-600 scale-110 ring-4 ring-white"
                        : isAnswered && opt !== q.answer
                        ? "!bg-gray-200 !text-gray-400 !border-gray-300 opacity-50"
                        : ""
                    }`}
                  >
                    {opt}
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
