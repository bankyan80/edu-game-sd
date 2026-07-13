"use client";
import GameShell from "@/components/game/GameShell";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { pakaianAdatData } from "@/lib/budaya/pakaianAdat";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Q {
  question: string;
  answer: string;
  shuffled: string[];
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(): Q[] {
  return shuffleArray(pakaianAdatData).map((p) => ({
    question: `${p.emoji} ${p.provinsi}`,
    answer: p.nama,
    shuffled: shuffleArray(p.nama.split("")),
  }));
}

export default function PuzzlePakaianAdat() {
  const game = getGameBySlug("puzzle-pakaian-adat")!;
  const allQuestions = useMemo(() => generateQuestions(), []);
  const [selected, setSelected] = useState<Record<number, string[]>>({});

  const getSelected = (qIndex: number) => selected[qIndex] || [];

  return (
    <GameShell game={game}>
      {(props) => {
        const { questionIndex, score, setScore, combo, setCombo, correctCount, setCorrectCount, isAnswered, setIsAnswered, setShowResult, setTotalQuestions } = props;
        const q = allQuestions[questionIndex];
        if (!q) {
          setTotalQuestions(allQuestions.length);
          return null;
        }
        const currentSelected = getSelected(questionIndex);
        const available = q.shuffled.filter((ch, i) => {
          const usedCount = currentSelected.filter((c) => c === ch).length;
          const totalCount = q.shuffled.filter((c) => c === ch).length;
          const usedFromIdx = q.shuffled.slice(0, i + 1).filter((c) => c === ch).length;
          return usedFromIdx - usedCount > 0;
        });
        const usedIndices: number[] = [];
        const tempAvailable = [...q.shuffled];
        for (const ch of currentSelected) {
          const idx = tempAvailable.indexOf(ch);
          if (idx !== -1) {
            usedIndices.push(idx);
            tempAvailable[idx] = "";
          }
        }
        const remainingChars = q.shuffled.map((ch, i) => ({ ch, i })).filter(({ i }) => !usedIndices.includes(i));

        const handleCharClick = (ch: string) => {
          if (isAnswered) return;
          setSelected((prev) => ({
            ...prev,
            [questionIndex]: [...(prev[questionIndex] || []), ch],
          }));
        };

        const handleRemove = () => {
          if (isAnswered) return;
          setSelected((prev) => {
            const curr = [...(prev[questionIndex] || [])];
            curr.pop();
            return { ...prev, [questionIndex]: curr };
          });
        };

        const handleSubmit = () => {
          if (isAnswered || currentSelected.length !== q.answer.length) return;
          setIsAnswered(true);
          const attempt = currentSelected.join("");
          if (attempt === q.answer) {
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
            setSelected((prev) => ({ ...prev, [questionIndex]: [] }));
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
              <div className="flex justify-center gap-2 flex-wrap min-h-[56px]">
                {currentSelected.length === 0 && (
                  <span className="text-sm text-gray-400 self-center">Klik huruf untuk menyusun nama pakaian adat</span>
                )}
                {currentSelected.map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.03, type: "spring" }}
                    onClick={handleRemove}
                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl font-black text-2xl shadow-lg border-b-4 border-orange-600 cursor-pointer active:scale-90 transition-transform"
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-0" />
            <div className="flex flex-wrap justify-center gap-2 shrink-0 mb-2">
              {remainingChars.map(({ ch, i }) => (
                <motion.button
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.02, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCharClick(ch)}
                  disabled={isAnswered}
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-2xl font-black text-2xl shadow-lg border-b-4 border-blue-600 active:translate-y-1 active:border-b-2 transition-all duration-100 disabled:opacity-50"
                >
                  {ch}
                </motion.button>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isAnswered || currentSelected.length !== q.answer.length}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl font-black text-lg disabled:opacity-50 hover:from-amber-500 hover:to-orange-600 transition border-b-4 border-orange-600 active:border-b-2 active:translate-y-1 shrink-0 mb-1"
            >
              Jawab
            </button>
            {isAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-1 shrink-0">
                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-xl font-black text-lg">
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
