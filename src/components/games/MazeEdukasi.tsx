"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { getOptionColor } from "@/lib/gameStyles";

export default function MazeEdukasi() {
  const game = getGameBySlug("maze-edukasi")!;
  const allQuestions = useMemo(() => getQuestions("maze-edukasi"), []);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const end = { x: 4, y: 4 };

  return (
    <GameShell game={game}>
      {(props) => {
        const q = allQuestions[props.questionIndex];
        if (!q) { props.setTotalQuestions(allQuestions.length); return null; }

        const movePlayer = (dx: number, dy: number) => {
          if (props.isAnswered) return;
          const nx = Math.max(0, Math.min(4, pos.x + dx));
          const ny = Math.max(0, Math.min(4, pos.y + dy));
          setPos({ x: nx, y: ny });
          audioManager.playClick();
          if (nx === end.x && ny === end.y) {
            props.setIsAnswered(true);
            audioManager.playCorrect();
            props.setScore(props.score + 50 + (props.combo > 0 ? props.combo * 5 : 0));
            props.setCombo(props.combo + 1);
            props.setCorrectCount(props.correctCount + 1);
            setTimeout(() => {
              props.setIsAnswered(false);
              if (props.questionIndex + 1 >= allQuestions.length) props.setShowResult(true);
              else {
                props.setQuestionIndex(props.questionIndex + 1);
                setPos({ x: 0, y: 0 });
              }
            }, 1000);
          }
        };

        return (
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="text-center mb-1 shrink-0">
              <span className="text-sm text-gray-500">Soal {props.questionIndex + 1}/{allQuestions.length}</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-3 shrink-0">
              <div className="grid grid-cols-5 gap-1 mb-3 aspect-square max-w-[200px] mx-auto">
                {Array.from({ length: 25 }, (_, i) => {
                  const x = i % 5;
                  const y = Math.floor(i / 5);
                  const isPlayer = x === pos.x && y === pos.y;
                  const isEnd = x === end.x && y === end.y;
                  return (
                    <div
                      key={i}
                      className={`rounded flex items-center justify-center text-lg aspect-square ${
                        isPlayer ? "bg-purple-500 text-white" : isEnd ? "bg-green-400 text-white" : "bg-gray-100"
                      }`}
                    >
                      {isPlayer ? "🧑" : isEnd ? "🏁" : ""}
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-2 max-w-[160px] mx-auto">
                <div />
                <button onClick={() => movePlayer(0, -1)} className="p-2.5 bg-purple-100 rounded-xl hover:bg-purple-200 transition"><ArrowUp className="w-5 h-5 mx-auto text-purple-600" /></button>
                <div />
                <button onClick={() => movePlayer(-1, 0)} className="p-2.5 bg-purple-100 rounded-xl hover:bg-purple-200 transition"><ArrowLeft className="w-5 h-5 mx-auto text-purple-600" /></button>
                <div className="p-2.5 bg-gray-100 rounded-xl text-center text-xl">📍</div>
                <button onClick={() => movePlayer(1, 0)} className="p-2.5 bg-purple-100 rounded-xl hover:bg-purple-200 transition"><ArrowRight className="w-5 h-5 mx-auto text-purple-600" /></button>
                <div />
                <button onClick={() => movePlayer(0, 1)} className="p-2.5 bg-purple-100 rounded-xl hover:bg-purple-200 transition"><ArrowDown className="w-5 h-5 mx-auto text-purple-600" /></button>
                <div />
              </div>
            </div>
            <div className="flex-1 min-h-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 flex flex-col">
              <p className="font-bold text-gray-800 text-lg text-center mb-2">{q.question}</p>
              {q.options && (
                <div className="grid grid-cols-2 gap-3 flex-1 auto-rows-fr">
                  {q.options.map((opt, i) => {
                    const c = getOptionColor(props.questionIndex, i);
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96, y: 4 }}
                        onClick={() => {
                          if (props.isAnswered) return;
                          props.setIsAnswered(true);
                          if (opt === q.answer) {
                            audioManager.playCorrect();
                            props.setScore(props.score + 10 + (props.combo > 0 ? props.combo * 5 : 0));
                            props.setCombo(props.combo + 1);
                            props.setCorrectCount(props.correctCount + 1);
                          } else {
                            audioManager.playWrong();
                            props.setCombo(0);
                          }
                          setTimeout(() => {
                            props.setIsAnswered(false);
                            if (props.questionIndex + 1 >= allQuestions.length) props.setShowResult(true);
                            else props.setQuestionIndex(props.questionIndex + 1);
                          }, 1200);
                        }}
                        disabled={props.isAnswered}
                        className={`flex items-center justify-center p-3 rounded-2xl font-black text-xl text-white border-b-[5px] ${c.from} ${c.to} ${c.border} ${c.hover} active:translate-y-1 active:border-b-[2px] transition-all duration-100 drop-shadow-lg ${
                          props.isAnswered && opt === q.answer
                            ? "!bg-gradient-to-br !from-green-400 !to-emerald-500 !border-green-600 scale-110 ring-4 ring-white"
                            : props.isAnswered && opt !== q.answer
                            ? "!bg-gray-200 !text-gray-400 !border-gray-300 opacity-50"
                            : ""
                        }`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      }}
    </GameShell>
  );
}
