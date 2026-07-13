"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { audioManager } from "@/lib/audio";
import type { Game, GameResult, Difficulty } from "@/types";
import {
  Play, Pause, RotateCcw, Home, Volume2, VolumeX,
  Clock, Star, Trophy, Zap, SkipForward, ChevronRight
} from "lucide-react";
import Game3DIcon from "./Game3DIcon";
import Mascot from "./Mascot";
import GameBackground from "./GameBackground";
import { ConfettiExplosion } from "./FloatingEffects";

interface GameShellProps {
  game: Game;
  children: (props: {
    questionIndex: number;
    setQuestionIndex: (i: number) => void;
    score: number;
    setScore: (s: number) => void;
    combo: number;
    setCombo: (c: number) => void;
    totalQuestions: number;
    setTotalQuestions: (t: number) => void;
    correctCount: number;
    setCorrectCount: (c: number) => void;
    timeLeft: number;
    setTimeLeft: (t: number) => void;
    difficulty: Difficulty;
    isAnswered: boolean;
    setIsAnswered: (a: boolean) => void;
    showResult: boolean;
    setShowResult: (r: boolean) => void;
  }) => React.ReactNode;
}

export default function GameShell({ game, children }: GameShellProps) {
  const router = useRouter();
  const addPoints = useStore((s) => s.addPoints);
  const addXP = useStore((s) => s.addXP);
  const addHistory = useStore((s) => s.addHistory);
  const setHighScore = useStore((s) => s.setHighScore);
  const incrementGamesPlayed = useStore((s) => s.incrementGamesPlayed);
  const settings = useStore((s) => s.settings);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [countdown, setCountdown] = useState(3);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [difficulty, setDifficulty] = useState<Difficulty>("Mudah");
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mascotMsg, setMascotMsg] = useState("");
  const [mascotMood, setMascotMood] = useState<"happy" | "excited" | "thinking" | "cheering" | "encouraging">("happy");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (started && !paused && !showResult && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, paused, showResult]);

  useEffect(() => {
    if (timeLeft === 0 && started && !showResult) {
      setShowResult(true);
      setMascotMsg("Waktu habis! Coba lagi ya!");
      setMascotMood("encouraging");
      audioManager.playGameOver();
    }
  }, [timeLeft, started, showResult]);

  useEffect(() => {
    if (showResult) {
      const points = score;
      const xp = Math.floor(score / 10);
      const perfect = correctCount === totalQuestions && totalQuestions > 0;
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);

      if (perfect) {
        audioManager.playPerfect();
        setShowConfetti(true);
        setMascotMsg("PERFECT! Kamu luar biasa!");
        setMascotMood("cheering");
      } else if (score > 50) {
        audioManager.playVictory();
        setMascotMsg("Hebat! Skor yang bagus!");
        setMascotMood("excited");
      } else {
        audioManager.playVictory();
        setMascotMsg("Terus berlatih ya, pasti bisa!");
        setMascotMood("encouraging");
      }

      if (points > 0) addPoints(points);
      if (xp > 0) addXP(xp);
      setHighScore(game.slug, score);
      incrementGamesPlayed(String(game.id));
      addHistory({
        gameId: game.id,
        gameName: game.name,
        score,
        points,
        date: new Date().toISOString(),
        duration: `${timeSpent}s`,
        difficulty,
      });
    }
  }, [showResult]);

  const handleStart = () => {
    audioManager.playClick();
    setMascotMsg("Ayo mulai! Semangat!");
    setMascotMood("excited");
    setShowTutorial(false);
    setCountdown(3);
    let c = 3;
    const iv = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(iv);
        setStarted(true);
        startTime.current = Date.now();
        audioManager.playVictory();
      }
    }, 1000);
  };

  const handlePause = () => { setPaused(!paused); audioManager.playClick(); };
  const handleRestart = () => {
    audioManager.playClick();
    setStarted(false);
    setPaused(false);
    setShowResult(false);
    setQuestionIndex(0);
    setScore(0);
    setCombo(0);
    setCorrectCount(0);
    setTimeLeft(180);
    setIsAnswered(false);
    setShowTutorial(true);
    setShowConfetti(false);
    setMascotMsg("");
    setMascotMood("happy");
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (showTutorial) {
    return (
      <GameBackground slug={game.slug}>
        <div className="h-dvh flex items-center justify-center p-4 overflow-y-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-4xl w-full">
            {/* Mascot */}
            <div className="hidden lg:block">
              <Mascot mood="happy" size="lg" message="Ayo bermain! Aku akan menemanimu!" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              {/* Game icon */}
              <div className="flex justify-center mb-6">
                <Game3DIcon slug={game.slug} size="xl" />
              </div>

              <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">{game.name}</h1>
              <p className="text-gray-500 text-center mb-6 text-sm">{game.description}</p>

              {/* Info cards */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 glass rounded-2xl p-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Durasi</p>
                    <p className="text-sm font-bold text-gray-800">{game.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 glass rounded-2xl p-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Kesulitan</p>
                    <p className="text-sm font-bold text-gray-800">{game.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 glass rounded-2xl p-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Poin</p>
                    <p className="text-sm font-bold text-gray-800">+10 per jawaban benar</p>
                  </div>
                </div>
              </div>

              {/* Difficulty select */}
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full px-4 py-3 glass rounded-2xl text-sm font-medium focus:border-purple-400 focus:outline-none mb-6 appearance-none cursor-pointer"
              >
                <option value="Mudah">🟢 Mudah</option>
                <option value="Sedang">🟡 Sedang</option>
                <option value="Sulit">🟠 Sulit</option>
                <option value="Master">🔴 Master</option>
              </select>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 glass rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />Kembali
                </button>
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl ripple-container"
                >
                  <Play className="w-5 h-5 fill-white" />Mulai Bermain
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </GameBackground>
    );
  }

  if (countdown > 0) {
    return (
      <GameBackground slug={game.slug}>
        <div className="h-dvh flex items-center justify-center">
          <div className="text-center">
            <Mascot mood="excited" size="md" message="Hampir mulai!" />
            <motion.div
              key={countdown}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="text-[120px] font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mt-8"
              style={{ textShadow: "none", filter: "drop-shadow(0 8px 16px rgba(168, 85, 247, 0.3))" }}
            >
              {countdown}
            </motion.div>
          </div>
        </div>
      </GameBackground>
    );
  }

  if (showResult) {
    const perfect = correctCount === totalQuestions && totalQuestions > 0;
    return (
      <GameBackground slug={game.slug}>
        <ConfettiExplosion active={showConfetti} />
        <div className="h-dvh flex items-center justify-center p-4 overflow-y-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-4xl w-full">
            <div className="hidden lg:block">
              <Mascot mood={perfect ? "cheering" : score > 50 ? "excited" : "encouraging"} size="lg" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong rounded-3xl p-8 max-w-lg w-full shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-7xl mb-4"
              >
                {perfect ? "🏆" : score > 50 ? "⭐" : "💪"}
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {perfect ? "PERFECT!" : score > 50 ? "Hebat!" : "Semangat!"}
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                {perfect ? "Semua jawaban benar! Kamu juara!" : "Terus berlatih ya, pasti bisa lebih baik!"}
              </p>

              {/* Score cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass rounded-2xl p-4">
                  <p className="text-[10px] text-purple-600 uppercase tracking-wide">Skor</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.4 }}
                    className="text-3xl font-black text-purple-700"
                  >
                    {score}
                  </motion.p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <p className="text-[10px] text-green-600 uppercase tracking-wide">Benar</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.5 }}
                    className="text-3xl font-black text-green-700"
                  >
                    {correctCount}/{totalQuestions}
                  </motion.p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <p className="text-[10px] text-blue-600 uppercase tracking-wide">Combo</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.6 }}
                    className="text-3xl font-black text-blue-700"
                  >
                    {combo}x
                  </motion.p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <p className="text-[10px] text-orange-600 uppercase tracking-wide">Poin</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.7 }}
                    className="text-3xl font-black text-orange-700"
                  >
                    {score}
                  </motion.p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 glass rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                </button>
                <button
                  onClick={handleRestart}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 shadow-xl ripple-container"
                >
                  <RotateCcw className="w-5 h-5" />Main Lagi
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </GameBackground>
    );
  }

  return (
    <GameBackground slug={game.slug}>
      <div className="h-dvh flex flex-col p-4 lg:p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={handlePause} className="p-2.5 glass-strong rounded-2xl hover:scale-105 transition-all shadow-md">
              {paused ? <Play className="w-5 h-5 text-green-500" /> : <Pause className="w-5 h-5 text-orange-500" />}
            </button>
            <button onClick={handleRestart} className="p-2.5 glass-strong rounded-2xl hover:scale-105 transition-all shadow-md">
              <RotateCcw className="w-5 h-5 text-blue-500" />
            </button>
            <button onClick={() => router.back()} className="p-2.5 glass-strong rounded-2xl hover:scale-105 transition-all shadow-md">
              <Home className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-4 py-2 glass-strong rounded-2xl font-bold text-sm shadow-md ${timeLeft <= 30 ? "text-red-500 animate-pulse" : "text-gray-700"}`}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 glass-strong rounded-2xl font-bold text-sm shadow-md">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-600">{score}</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 glass-strong rounded-2xl font-bold text-sm shadow-md">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-orange-600">{combo}x</span>
            </div>
            <button
              onClick={() => { setMuted(!muted); audioManager.toggleMute(); }}
              className="p-2.5 glass-strong rounded-2xl hover:scale-105 transition-all shadow-md"
            >
              {muted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-gray-500" />}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="glass-strong rounded-full h-2 mb-4 shadow-inner overflow-hidden shrink-0">
          <motion.div
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Game content - fills remaining space */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={questionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
            >
              {children({
                questionIndex, setQuestionIndex, score, setScore,
                combo, setCombo, totalQuestions, setTotalQuestions,
                correctCount, setCorrectCount, timeLeft, setTimeLeft,
                difficulty, isAnswered, setIsAnswered,
                showResult, setShowResult,
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mini mascot in corner */}
        <div className="fixed bottom-4 right-4 z-40">
          <Mascot mood={mascotMood || "happy"} size="sm" message={mascotMsg} />
        </div>

        {/* Pause overlay */}
        {paused && (
          <div className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm flex items-center justify-center" onClick={handlePause}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-strong rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Mascot mood="thinking" size="md" message="Istirahat dulu ya!" />
              <Pause className="w-12 h-12 text-orange-500 mx-auto mt-4 mb-2" />
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Jeda</h2>
              <button
                onClick={handlePause}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all ripple-container"
              >
                Lanjutkan
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </GameBackground>
  );
}
