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
  const [input, setInput] = useState("");
  const [shuffledMap, setShuffledMap] = useState<Record<number, string>>({});

  const getShuffled = (qIndex: number) => {
    if (shuffledMap[qIndex]) return shuffledMap[qIndex];
    const q = allQuestions[qIndex];
    if (!q) return "";
    const letters = q.answer.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    const result = letters.join("");
    setShuffledMap(prev => ({ ...prev, [qIndex]: result }));
    return result;
  };

  return (
    <GameShell game={game}>
      {(props) => {
        const { questionIndex, score, setScore, combo, setCombo, correctCount, setCorrectCount, isAnswered, setIsAnswered, setShowResult } = props;
        const q = allQuestions[questionIndex];
        if (!q) return null;
        const shuffled = getShuffled(questionIndex);

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
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="text-center mb-1 shrink-0">
              <span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-lg mb-3 text-center shrink-0">
              <p className="text-lg font-bold text-gray-800 mb-3">{q.question}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {shuffled.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.05, type: "spring" }}
                    className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-2xl font-black text-2xl shadow-lg border-b-4 border-blue-600"
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-0" />
            <div className="flex gap-3 shrink-0 mb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Ketik jawaban..."
                disabled={isAnswered}
                className="flex-1 px-5 py-3 border-3 rounded-2xl text-xl font-bold text-center uppercase focus:outline-none focus:border-purple-400 disabled:bg-gray-100 border-2"
              />
              <button
                onClick={handleSubmit}
                disabled={isAnswered || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-black text-lg disabled:opacity-50 hover:from-blue-600 hover:to-indigo-600 transition border-b-4 border-blue-600 active:border-b-2 active:translate-y-1"
              >
                Cek
              </button>
            </div>
            {isAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-2 shrink-0">
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-black text-lg">
                  Jawaban: {q.answer}
                </span>
              </motion.div>
            )}
          </div>
        );
      }}
    </GameShell>
  );
}
