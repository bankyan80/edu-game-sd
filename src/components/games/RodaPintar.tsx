"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { getQuestions, shuffle } from "@/lib/questions";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Home, Play, RotateCcw, Trophy, Zap, Clock } from "lucide-react";
import { getOptionColor } from "@/lib/gameStyles";

export default function RodaPintar() {
  const game = getGameBySlug("roda-pintar")!;
  const router = useRouter();
  const addPoints = useStore(s => s.addPoints);
  const addXP = useStore(s => s.addXP);
  const allQuestions = useMemo(() => shuffle(getQuestions("roda-pintar")), []);
  const [showTutorial, setShowTutorial] = useState(true);
  const [started, setStarted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [gameOver, setGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ["Matematika", "IPA", "IPS", "Bahasa", "Umum"];
  const categoryColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
  const sectorAngle = 360 / categories.length;

  const spinWheel = () => {
    if (spinning || isAnswered || gameOver) return;
    setSpinning(true);
    audioManager.playClick();
    const extraRotations = 3 + Math.random() * 3;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + extraRotations * 360 + randomAngle;
    setRotation(totalRotation);
    setTimeout(() => {
      setSpinning(false);
      if (currentQ >= allQuestions.length || timeLeft <= 0) {
        setGameOver(true);
        addPoints(score);
        addXP(Math.floor(score / 10));
        audioManager.playVictory();
      }
    }, 2000);
  };

  const handleAnswer = (ans: string) => {
    if (isAnswered || gameOver) return;
    setIsAnswered(true);
    const q = allQuestions[currentQ];
    if (ans === q.answer) {
      audioManager.playCorrect();
      const pts = 10 + combo * 5;
      setScore(s => s + pts);
      setCombo(c => c + 1);
      setCorrectCount(c => c + 1);
    } else {
      audioManager.playWrong();
      setCombo(0);
    }
    setTimeout(() => {
      setIsAnswered(false);
      setCurrentQ(c => c + 1);
    }, 1200);
  };

  useEffect(() => {
    if (!showTutorial && started && !gameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setGameOver(true);
            addPoints(score);
            addXP(Math.floor(score / 10));
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [showTutorial, started, gameOver]);

  const fmt = (s: number) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  if (showTutorial) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl text-center">
          <span className="text-4xl block mb-2">🎡</span>
          <h1 className="text-lg font-bold mb-1">Roda Pintar</h1>
          <p className="text-gray-500 mb-3">Putar roda dan jawab pertanyaan dari berbagai kategori!</p>
          <div className="flex gap-2">
            <button onClick={() => router.back()} className="px-4 py-2 bg-gray-100 rounded-xl font-bold flex items-center gap-2"><Home className="w-5 h-5"/>Kembali</button>
            <button onClick={() => { setShowTutorial(false); }} className="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"><Play className="w-5 h-5"/>Mulai</button>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver || currentQ >= allQuestions.length || timeLeft <= 0) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl text-center">
          <span className="text-4xl block mb-2">{correctCount === allQuestions.length ? "🏆" : "⭐"}</span>
          <h2 className="text-lg font-bold mb-1">Selesai!</h2>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-purple-50 rounded-xl p-2"><p className="text-xs text-purple-600">Skor</p><p className="text-lg font-bold text-purple-700">{score}</p></div>
            <div className="bg-green-50 rounded-xl p-2"><p className="text-xs text-green-600">Benar</p><p className="text-lg font-bold text-green-700">{correctCount}/{allQuestions.length}</p></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => router.back()} className="px-4 py-2 bg-gray-100 rounded-xl font-bold flex items-center gap-2"><Home className="w-5 h-5"/></button>
            <button onClick={() => { setShowTutorial(true); setGameOver(false); setScore(0); setCombo(0); setCurrentQ(0); setTimeLeft(180); setCorrectCount(0); setRotation(0); setStarted(false); setSpinning(false); setIsAnswered(false); }} className="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"><RotateCcw className="w-5 h-5"/>Main Lagi</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1.5 bg-white rounded-xl shadow text-sm font-bold flex items-center gap-1"><Clock className="w-4 h-4 text-orange-500"/>{fmt(timeLeft)}</span>
        <span className="px-3 py-1.5 bg-white rounded-xl shadow text-sm font-bold flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-400"/>{combo}x</span>
        <span className="px-3 py-1.5 bg-white rounded-xl shadow text-sm font-bold flex items-center gap-1"><Trophy className="w-4 h-4 text-purple-500"/>{score}</span>
      </div>
      <div className="flex justify-center mb-2">
        <div className="relative">
          <div className="w-44 h-44 rounded-full border-4 border-white shadow-xl overflow-hidden" style={{transform: `rotate(${rotation}deg)`, transition: "transform 2s cubic-bezier(0.17, 0.67, 0.12, 0.99)"}}>
            {categories.map((cat, i) => (
              <div key={cat} className="absolute w-full h-full" style={{clipPath: `polygon(50% 50%, ${50 + 50*Math.cos((i*sectorAngle-90)*Math.PI/180)}% ${50 + 50*Math.sin((i*sectorAngle-90)*Math.PI/180)}%, ${50 + 50*Math.cos(((i+1)*sectorAngle-90)*Math.PI/180)}% ${50 + 50*Math.sin(((i+1)*sectorAngle-90)*Math.PI/180)}%)`, backgroundColor: categoryColors[i]}}>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold text-gray-800 -rotate-45">{cat}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-red-600 z-10" />
        </div>
      </div>
      <div className="text-center mb-4">
        <button onClick={spinWheel} disabled={spinning || isAnswered}
          className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-xl font-bold disabled:opacity-50 hover:from-yellow-500 hover:to-amber-600 transition shadow-lg">
          {spinning ? "Berputar..." : "Putar Roda! 🎡"}
        </button>
      </div>
      {currentQ < allQuestions.length && !spinning && !isAnswered && (
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <p className="font-bold text-gray-800 mb-1 text-center text-lg">{allQuestions[currentQ].question}</p>
          <div className="grid grid-cols-2 gap-3">
            {allQuestions[currentQ].options?.map((opt, i) => {
              const c = getOptionColor(currentQ, i);
              return (
                <motion.button key={i} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96, y: 4 }} onClick={() => handleAnswer(opt)} disabled={isAnswered}
                  className={`flex items-center justify-center p-3 rounded-2xl font-black text-2xl sm:text-3xl text-white border-b-[5px] ${c.from} ${c.to} ${c.border} ${c.hover} active:translate-y-1 active:border-b-[2px] transition-all duration-100 drop-shadow-lg ${
                    isAnswered && opt === allQuestions[currentQ].answer
                      ? "!bg-gradient-to-br !from-green-400 !to-emerald-500 !border-green-600 scale-110 ring-4 ring-white"
                      : isAnswered && opt !== allQuestions[currentQ].answer
                      ? "!bg-gray-200 !text-gray-400 !border-gray-300 opacity-50"
                      : ""
                  }`}>
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
