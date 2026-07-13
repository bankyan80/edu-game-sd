"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useMemo } from "react";
import { motion } from "framer-motion";

export default function TebakProfesi() {
  const game = getGameBySlug("tebak-profesi")!;
  const allQuestions = useMemo(() => getQuestions("tebak-profesi"), []);

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
        const profIcons: Record<string, string> = {"Dokter":"👨‍⚕️","Guru":"👩‍🏫","Polisi":"👮","Petani":"👨‍🌾","Koki":"👨‍🍳"};
        return (
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="text-center mb-1"><span className="text-sm text-gray-500">Soal {questionIndex + 1}/{allQuestions.length}</span></div>
            <div className="bg-gradient-to-br from-teal-300 to-cyan-400 rounded-2xl p-3 shadow-lg mb-2 text-center">
              <span className="text-3xl block mb-1">{profIcons[q.answer] || "🧑"}</span>
              <p className="text-base font-bold text-white">{q.question}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {q.options?.map((opt, i) => (
                <motion.button key={i} whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={() => handleAnswer(opt)} disabled={isAnswered}
                  className={`p-2.5 rounded-xl font-bold text-sm transition-all ${isAnswered && opt === q.answer ? "bg-green-500 text-white shadow-lg" : isAnswered && opt !== q.answer ? "bg-red-100 text-red-400" : "bg-white text-teal-700 hover:bg-teal-50 border-2 border-teal-200"}`}>
                  {profIcons[opt] || ""} {opt}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }}
    </GameShell>
  );
}
