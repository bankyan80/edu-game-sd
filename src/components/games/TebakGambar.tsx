"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

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
              {q.options?.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(opt)}
                  disabled={isAnswered}
                  className={`flex items-center justify-center p-3 rounded-xl font-bold text-base transition-all ${
                    isAnswered && opt === q.answer
                      ? "bg-green-500 text-white shadow-lg"
                      : isAnswered && opt !== q.answer
                      ? "bg-red-100 text-red-400"
                      : "bg-white text-gray-700 hover:bg-orange-50 border-2 border-orange-200"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }}
    </GameShell>
  );
}
