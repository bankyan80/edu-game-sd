"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function BalapanHitung() {
  const game = getGameBySlug("balapan-hitung")!;
  const allQuestions = useMemo(() => getQuestions("balapan-hitung"), []);
  const [progress, setProgress] = useState(0);

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
            setProgress(Math.min(100, progress + 10));
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
            <div className="bg-white rounded-xl p-2 mb-1 shadow shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏎️</span>
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-sm font-bold text-blue-600">{progress}%</span>
              </div>
            </div>
            <div className="text-center mb-1">
              <span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span>
            </div>
            <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl p-4 shadow-lg mb-3 text-center shrink-0">
              <p className="text-lg font-black text-white">{q.question}</p>
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
                      : "bg-white text-blue-700 hover:bg-blue-50 border-2 border-blue-200"
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
