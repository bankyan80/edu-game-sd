"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions, shuffle } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { getOptionColor, btn3d } from "@/lib/gameStyles";

export default function TangkapAngka() {
  const game = getGameBySlug("tangkap-angka")!;
  const allQuestions = useMemo(() => getQuestions("tangkap-angka"), []);

  return (
    <GameShell game={game}>
      {(props) => {
        const { questionIndex, score, setScore, combo, setCombo, correctCount, setCorrectCount, isAnswered, setIsAnswered, setShowResult } = props;
        const numbers = useMemo(() => shuffle(["1","2","3","4","5","6","7","8","9","10"]), [questionIndex]);
        const q = allQuestions[questionIndex];
        if (!q) return null;
        const target = q.answer;

        const handleTap = (num: string) => {
          if (isAnswered) return;
          setIsAnswered(true);
          if (num === target) {
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
          }, 1000);
        };

        return (
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="text-center mb-1">
              <span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-4 shadow-lg mb-3 text-center shrink-0">
              <p className="text-lg text-white/80 mb-1">Tangkap angka:</p>
              <p className="text-xl font-black text-white">{target}</p>
            </div>
            <div className="grid grid-cols-5 gap-2.5 flex-1 auto-rows-fr">
              {numbers.map((num, i) => {
                const c = getOptionColor(questionIndex, i);
                return (
                  <motion.button
                    key={`${questionIndex}-${i}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleTap(num)}
                    disabled={isAnswered}
                    className={`aspect-square rounded-2xl border-b-[5px] font-black text-base text-white transition-all duration-100 drop-shadow-lg flex items-center justify-center ${c.from} ${c.to} ${c.border} ${c.hover} active:translate-y-1 active:border-b-[2px] ${
                      isAnswered && num === target
                        ? "!bg-gradient-to-br !from-green-400 !to-emerald-500 !border-green-600 scale-110 ring-4 ring-white"
                        : isAnswered && num !== target
                        ? "!bg-gray-200 !text-gray-400 !border-gray-300 opacity-50"
                        : ""
                    }`}
                  >
                    {num}
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
