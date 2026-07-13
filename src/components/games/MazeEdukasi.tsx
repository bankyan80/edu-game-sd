"use client";
import GameShell from "@/components/game/GameShell";
import { getQuestions } from "@/lib/questions";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

export default function MazeEdukasi() {
  const game = getGameBySlug("maze-edukasi")!;
  const allQuestions = useMemo(() => getQuestions("maze-edukasi"), []);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const end = { x: 4, y: 4 };

  return (
    <GameShell game={game}>
      {(props) => {
        const q = allQuestions[props.questionIndex];
        if (!q) return null;

        const movePlayer = (dx: number, dy: number) => {
          const nx = Math.max(0, Math.min(4, pos.x + dx));
          const ny = Math.max(0, Math.min(4, pos.y + dy));
          setPos({ x: nx, y: ny });
          audioManager.playClick();
          if (nx === end.x && ny === end.y) {
            audioManager.playVictory();
            props.setScore(props.score + 50);
            if (props.questionIndex + 1 >= allQuestions.length) props.setShowResult(true);
            else {
              props.setQuestionIndex(props.questionIndex + 1);
              setPos({ x: 0, y: 0 });
            }
          }
        };

        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500">Soal {props.questionIndex + 1}/{allQuestions.length}</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
              <div className="grid grid-cols-5 gap-1 mb-4 aspect-square max-w-xs mx-auto">
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
              <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
                <div />
                <button onClick={() => movePlayer(0, -1)} className="p-3 bg-purple-100 rounded-xl hover:bg-purple-200 transition"><ArrowUp className="w-6 h-6 mx-auto text-purple-600" /></button>
                <div />
                <button onClick={() => movePlayer(-1, 0)} className="p-3 bg-purple-100 rounded-xl hover:bg-purple-200 transition"><ArrowLeft className="w-6 h-6 mx-auto text-purple-600" /></button>
                <div className="p-3 bg-gray-100 rounded-xl text-center text-2xl">📍</div>
                <button onClick={() => movePlayer(1, 0)} className="p-3 bg-purple-100 rounded-xl hover:bg-purple-200 transition"><ArrowRight className="w-6 h-6 mx-auto text-purple-600" /></button>
                <div />
                <button onClick={() => movePlayer(0, 1)} className="p-3 bg-purple-100 rounded-xl hover:bg-purple-200 transition"><ArrowDown className="w-6 h-6 mx-auto text-purple-600" /></button>
                <div />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
              <p className="font-bold text-gray-800">{q.question}</p>
              {q.options && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (opt === q.answer) {
                          audioManager.playCorrect();
                          props.setScore(props.score + 10);
                        } else {
                          audioManager.playWrong();
                        }
                      }}
                      className="p-2 bg-white rounded-xl text-sm font-medium hover:bg-blue-50 transition border"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      }}
    </GameShell>
  );
}
