"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function SusunCerita() {
  const game = getGameBySlug("susun-cerita")!;
  const allQuestions = useMemo(() => getQuestions("susun-cerita"), []);
  const [selected, setSelected] = useState<number[]>([]);
  const [prevQIndex, setPrevQIndex] = useState(-1);

  return (
    <GameShell game={game}>
      {(props) => {
        const { questionIndex, score, setScore, combo, setCombo, correctCount, setCorrectCount, isAnswered, setIsAnswered, setShowResult } = props;
        const q = allQuestions[questionIndex];
        if (!q) return null;

        if (prevQIndex !== questionIndex) {
          setPrevQIndex(questionIndex);
          setSelected([]);
        }

        const items = q.question.replace("Susun urutan: ", "").split(/\d+\./).filter(Boolean).map(s => s.trim());
        const answerNums = q.answer.split(",").map(s => parseInt(s.trim()));

        const addItem = (idx: number) => {
          if (isAnswered || selected.includes(idx)) return;
          audioManager.playClick();
          setSelected([...selected, idx]);
        };
        const removeItem = (pos: number) => {
          if (isAnswered) return;
          const ns = [...selected];
          ns.splice(pos, 1);
          setSelected(ns);
        };
        const handleSubmit = () => {
          if (isAnswered || selected.length !== items.length) return;
          setIsAnswered(true);
          const correct = selected.every((v, i) => v === answerNums[i] - 1);
          if (correct) { audioManager.playCorrect(); setScore(score + 10 + (combo > 0 ? combo * 5 : 0)); setCombo(combo + 1); setCorrectCount(correctCount + 1); }
          else { audioManager.playWrong(); setCombo(0); }
          setTimeout(() => { setIsAnswered(false); setSelected([]); if (questionIndex + 1 >= allQuestions.length) setShowResult(true); else props.setQuestionIndex(questionIndex + 1); }, 1500);
        };
        return (
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="text-center mb-1"><span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span></div>
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-3 shrink-0">
              <p className="font-bold text-gray-800 mb-2">Susun urutan cerita yang benar:</p>
              <div className="min-h-[60px] bg-gray-50 rounded-xl p-2 mb-2">
                {selected.length === 0 ? <span className="text-gray-400 text-sm">Klik langkah di bawah</span> :
                  selected.map((idx, pos) => (
                    <motion.button key={pos} initial={{scale:0}} animate={{scale:1}} onClick={() => removeItem(pos)}
                      className="inline-block px-2 py-1 bg-amber-500 text-white rounded-lg font-bold text-sm m-1">
                      {pos + 1}. {items[idx]} ×
                    </motion.button>
                  ))
                }
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {items.map((item, i) => (
                <motion.button key={i} whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={() => addItem(i)}
                  disabled={isAnswered || selected.includes(i)}
                  className={`px-3 py-2 rounded-xl font-medium text-sm transition-all ${selected.includes(i) ? "bg-gray-200 text-gray-400" : "bg-amber-100 text-amber-700 hover:bg-amber-200"}`}>
                  {item}
                </motion.button>
              ))}
            </div>
            <button onClick={handleSubmit} disabled={isAnswered || selected.length !== items.length}
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold disabled:opacity-50 transition">
              Jawab
            </button>
            {isAnswered && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="mt-3 text-center font-bold">Urutan benar: <span className="text-green-600">{q.answer}</span></motion.p>}
          </div>
        );
      }}
    </GameShell>
  );
}
