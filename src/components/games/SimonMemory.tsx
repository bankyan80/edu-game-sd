"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { audioManager } from "@/lib/audio";
import { getGameBySlug } from "@/lib/gameData";
import { RotateCcw, Home, Play, Pause, Trophy, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

const COLORS = ["red", "blue", "green", "yellow"] as const;
const COLOR_MAP = { red: "bg-red-500", blue: "bg-blue-500", green: "bg-green-500", yellow: "bg-yellow-400" };
const AUDIO_MAP = { red: 261.63, blue: 329.63, green: 392, yellow: 523.25 };

export default function SimonMemory() {
  const game = getGameBySlug("simon-memory-edukasi")!;
  const router = useRouter();
  const addPoints = useStore(s => s.addPoints);
  const addXP = useStore(s => s.addXP);
  const [started, setStarted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (showTutorial || gameOver) return;
    if (!started) {
      let c = 3;
      setCountdown(3);
      const iv = setInterval(() => {
        c--;
        setCountdown(c);
        if (c <= 0) { clearInterval(iv); setStarted(true); }
      }, 1000);
      return () => clearInterval(iv);
    }
  }, [showTutorial, gameOver]);

  const playSequence = useCallback((seq: number[]) => {
    setShowingSequence(true);
    seq.forEach((colorIdx, i) => {
      setTimeout(() => {
        setActiveColor(colorIdx);
        audioManager.playClick();
        setTimeout(() => setActiveColor(null), 400);
      }, i * 600);
    });
    setTimeout(() => setShowingSequence(false), seq.length * 600 + 200);
  }, []);

  const startGame = () => {
    setShowTutorial(false);
    setStarted(false);
    setPlayerInput([]);
    setLevel(1);
    setScore(0);
    setCombo(0);
    setGameOver(false);
    const first = Math.floor(Math.random() * 4);
    setSequence([first]);
    setTimeout(() => playSequence([first]), 1000);
  };

  const handleColorClick = (idx: number) => {
    if (showingSequence || gameOver) return;
    audioManager.playClick();
    setActiveColor(idx);
    setTimeout(() => setActiveColor(null), 200);

    const newInput = [...playerInput, idx];
    setPlayerInput(newInput);

    if (idx !== sequence[newInput.length - 1]) {
      audioManager.playWrong();
      setGameOver(true);
      addPoints(score);
      addXP(Math.floor(score / 10));
      return;
    }

    if (newInput.length === sequence.length) {
      const pts = level * 10 + combo * 5;
      setScore(s => s + pts);
      setCombo(c => c + 1);
      audioManager.playCorrect();
      setPlayerInput([]);
      setLevel(l => l + 1);
      const next = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(next);
      setTimeout(() => playSequence(next), 800);
    }
  };

  if (showTutorial) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl text-center">
          <div className="h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mb-3">
            <span className="text-4xl">🎮</span>
          </div>
          <h1 className="text-lg font-bold mb-1">Simon Memory Edukasi</h1>
          <p className="text-gray-500 mb-3">Ingat dan ulangi urutan warna! Semakin tinggi level, semakin panjang urutannya.</p>
          <div className="flex gap-2">
            <button onClick={() => router.back()} className="px-4 py-2 bg-gray-100 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition flex items-center gap-2"><Home className="w-5 h-5"/>Kembali</button>
            <button onClick={startGame} className="flex-1 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition flex items-center justify-center gap-2 shadow-lg"><Play className="w-5 h-5"/>Mulai</button>
          </div>
        </div>
      </div>
    );
  }

  if (countdown > 0 && started === false) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div key={countdown} initial={{scale:0}} animate={{scale:1}} className="text-7xl font-black bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">{countdown}</motion.div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl text-center">
          <span className="text-4xl block mb-2">💪</span>
          <h2 className="text-lg font-bold mb-1">Game Over!</h2>
          <p className="text-gray-500 mb-3">Level: {level} | Skor: {score}</p>
          <div className="flex gap-2">
            <button onClick={() => router.back()} className="px-4 py-2 bg-gray-100 rounded-xl font-bold flex items-center gap-2"><Home className="w-5 h-5"/></button>
            <button onClick={startGame} className="flex-1 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"><RotateCcw className="w-5 h-5"/>Main Lagi</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1.5 bg-white rounded-xl shadow text-sm font-bold">Level {level}</span>
        <span className="px-3 py-1.5 bg-white rounded-xl shadow text-sm font-bold flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-400"/>{combo}x</span>
        <span className="px-3 py-1.5 bg-white rounded-xl shadow text-sm font-bold flex items-center gap-1"><Trophy className="w-4 h-4 text-purple-500"/>{score}</span>
      </div>
      <p className="text-center text-sm text-gray-500 mb-4">{showingSequence ? "Perhatikan urutan..." : "Giliran kamu!"}</p>
      <div className="grid grid-cols-2 gap-2 max-w-[320px] mx-auto">
        {COLORS.map((color, i) => (
          <motion.button
            key={color}
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            onClick={() => handleColorClick(i)}
            className={`aspect-square rounded-3xl border-b-[6px] border-black/20 transition-all duration-150 ${COLOR_MAP[color]} ${
              activeColor === i ? "ring-4 ring-white shadow-2xl scale-110 brightness-150 translate-y-1 border-b-[2px]" : "opacity-90 hover:opacity-100 shadow-lg"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 text-center">
        <button onClick={() => { setGameOver(true); addPoints(score); addXP(Math.floor(score/10)); }} className="text-sm text-gray-400 hover:text-gray-600 transition flex items-center gap-1 mx-auto"><Pause className="w-4 h-4"/>Selesai</button>
      </div>
    </div>
  );
}
