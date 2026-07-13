"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useMemo } from "react";
import { motion } from "framer-motion";

export default function TebakPahlawan() {
  const game = getGameBySlug("tebak-pahlawan")!;
  const allQuestions = useMemo(() => getQuestions("tebak-pahlawan"), []);
  return (
    <GameShell game={game}>
      {(props) => {
        const { questionIndex, score, setScore, combo, setCombo, correctCount, setCorrectCount, isAnswered, setIsAnswered, setShowResult } = props;
        const q = allQuestions[questionIndex];
        if (!q) return null;
        const handleAnswer = (ans: string) => {
          if (isAnswered) return;
          setIsAnswered(true);
          if (ans === q.answer) { audioManager.playCorrect(); setScore(score + 10 + (combo > 0 ? combo * 5 : 0)); setCombo(combo + 1); setCorrectCount(correctCount + 1); }
          else { audioManager.playWrong(); setCombo(0); }
          setTimeout(() => { setIsAnswered(false); if (questionIndex + 1 >= allQuestions.length) setShowResult(true); else props.setQuestionIndex(questionIndex + 1); }, 1200);
        };
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-4"><span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span></div>
            <div className="bg-gradient-to-br from-orange-300 to-red-400 rounded-2xl p-6 shadow-lg mb-6 text-center">
              <span className="text-5xl block mb-3">🦸</span>
              <p className="text-xl font-bold text-white">{q.question}</p>
            </div>
            <div className="space-y-3">
              {q.options?.map((opt, i) => (
                <motion.button key={i} whileHover={{x:4}} whileTap={{scale:0.98}} onClick={() => handleAnswer(opt)} disabled={isAnswered}
                  className={`w-full p-4 rounded-xl font-bold text-left transition-all flex items-center gap-3 ${isAnswered && opt === q.answer ? "bg-green-500 text-white shadow-lg" : isAnswered && opt !== q.answer ? "bg-red-100 text-red-400" : "bg-white text-gray-700 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300"}`}>
                  <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold shrink-0">{String.fromCharCode(65+i)}</span>
                  <span>{opt}</span>
                </motion.button>
              ))}
            </div>
          </div>
        );
      }}
    </GameShell>
  );
}
