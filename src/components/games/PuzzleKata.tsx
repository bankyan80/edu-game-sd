"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function PuzzleKata() {
  const game = getGameBySlug("puzzle-kata")!;
  const allQuestions = useMemo(() => getQuestions("puzzle-kata"), []);

  return (
    <GameShell game={game}>
      {(props) => {
        const { questionIndex, score, setScore, combo, setCombo, correctCount, setCorrectCount, isAnswered, setIsAnswered, setShowResult } = props;
        const [input, setInput] = useState("");
        const shuffled = useMemo(() => {
          const q = allQuestions[questionIndex];
          if (!q) return "";
          const letters = q.answer.split("");
          for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
          }
          return letters.join("");
        }, [questionIndex]);
        const q = allQuestions[questionIndex];
        if (!q) return null;

        const handleSubmit = () => {
          if (isAnswered || !input.trim()) return;
          setIsAnswered(true);
          if (input.toUpperCase() === q.answer.toUpperCase()) {
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
            setInput("");
            if (questionIndex + 1 >= allQuestions.length) setShowResult(true);
            else props.setQuestionIndex(questionIndex + 1);
          }, 1500);
        };

        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-4 text-center">
              <p className="text-xl font-bold text-gray-800 mb-3">{q.question}</p>
              <div className="flex justify-center gap-1.5 flex-wrap mb-4">
                {shuffled.split("").map((ch, i) => (
                  <span key={i} className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-lg font-bold text-lg">{ch}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Ketik jawaban..."
                disabled={isAnswered}
                className="flex-1 px-4 py-3 border-2 rounded-xl text-lg font-bold text-center uppercase focus:outline-none focus:border-purple-400 disabled:bg-gray-100"
              />
              <button
                onClick={handleSubmit}
                disabled={isAnswered || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold disabled:opacity-50 hover:from-blue-600 hover:to-indigo-600 transition"
              >
                Cek
              </button>
            </div>
            {isAnswered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center font-bold text-lg">
                Jawaban: <span className="text-purple-600">{q.answer}</span>
              </motion.p>
            )}
          </div>
        );
      }}
    </GameShell>
  );
}
