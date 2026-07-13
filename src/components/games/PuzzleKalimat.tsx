"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function PuzzleKalimat() {
  const game = getGameBySlug("puzzle-kalimat")!;
  const allQuestions = useMemo(() => getQuestions("puzzle-kalimat"), []);

  return (
    <GameShell game={game}>
      {(props) => {
        const { questionIndex, score, setScore, combo, setCombo, correctCount, setCorrectCount, isAnswered, setIsAnswered, setShowResult } = props;
        const [selected, setSelected] = useState<string[]>([]);
        const q = allQuestions[questionIndex];
        if (!q) return null;
        const words = q.answer.split(" ");
        const shuffledWords = useMemo(() => {
          const arr = [...words];
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          return arr;
        }, [questionIndex]);

        const addWord = (word: string) => {
          if (isAnswered || selected.includes(word)) return;
          setSelected([...selected, word]);
          audioManager.playClick();
        };

        const removeWord = (idx: number) => {
          if (isAnswered) return;
          const newSel = [...selected];
          newSel.splice(idx, 1);
          setSelected(newSel);
        };

        const handleSubmit = () => {
          if (isAnswered || selected.length !== words.length) return;
          setIsAnswered(true);
          if (selected.join(" ") === q.answer) {
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
            setSelected([]);
            if (questionIndex + 1 >= allQuestions.length) setShowResult(true);
            else props.setQuestionIndex(questionIndex + 1);
          }, 1500);
        };

        return (
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="text-center mb-1">
              <span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-3 text-center shrink-0">
              <p className="text-sm font-bold text-gray-800 mb-1">{q.question}</p>
              <div className="min-h-[50px] bg-gray-50 rounded-xl p-2 mb-4 flex flex-wrap gap-2 justify-center">
                {selected.length === 0 ? (
                  <span className="text-gray-400 text-sm">Klik kata di bawah untuk menyusun</span>
                ) : selected.map((w, i) => (
                  <motion.button
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => removeWord(i)}
                    className="px-2 py-1 bg-purple-500 text-white rounded-lg font-bold text-sm"
                  >
                    {w} ×
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {shuffledWords.map((w, i) => (
                <motion.button
                  key={`${i}-${w}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addWord(w)}
                  disabled={isAnswered || selected.includes(w)}
                  className={`px-3 py-2 rounded-xl font-bold text-sm transition-all ${
                    selected.includes(w)
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {w}
                </motion.button>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isAnswered || selected.length !== words.length}
              className="w-full py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold disabled:opacity-50 transition"
            >
              Jawab
            </button>
            {isAnswered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center font-bold text-lg">
                Jawaban: <span className="text-green-600">{q.answer}</span>
              </motion.p>
            )}
          </div>
        );
      }}
    </GameShell>
  );
}
