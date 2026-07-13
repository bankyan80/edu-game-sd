"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MascotProps {
  message?: string;
  mood?: "happy" | "excited" | "thinking" | "cheering" | "encouraging";
  size?: "sm" | "md" | "lg";
}

const moodEmojis: Record<string, string> = {
  happy: "🦉",
  excited: "🎉",
  thinking: "🤔",
  cheering: "🥳",
  encouraging: "💪",
};

const mascotMessages: Record<string, string[]> = {
  happy: [
    "Hai! AkuOwl, panduanmu! 🦉",
    "Siap belajar hari ini?",
    "Kamu pasti bisa!",
    "Ayo mulai petualangan!",
  ],
  excited: [
    "Keren banget! 🌟",
    "Jawaban yang luar biasa!",
    "Kamu hebat sekali!",
    "Pasti benar tuh!",
  ],
  thinking: [
    "Hmm, coba pikirkan lagi... 🤔",
    "Kamu hampir dapat!",
    "Jangan menyerah ya!",
    "Percaya diri dong!",
  ],
  cheering: [
    "YEAY! SKOR TINGGI! 🏆",
    "Juara! Juara!",
    "Poin bertambah terus!",
    "Combo-nya mantap!",
  ],
  encouraging: [
    "Coba lagi ya, pasti bisa! 💪",
    "Gagal itu awal dari sukses!",
    "Kamu pasti bisa lebih baik!",
    "Semangat terus!",
  ],
};

export default function Mascot({ message, mood = "happy", size = "md" }: MascotProps) {
  const [currentMessage, setCurrentMessage] = useState(message || "");
  const [showBubble, setShowBubble] = useState(!!message);

  useEffect(() => {
    if (!message && mascotMessages[mood]) {
      const msgs = mascotMessages[mood];
      setCurrentMessage(msgs[Math.floor(Math.random() * msgs.length)]);
      setShowBubble(true);
    } else if (message) {
      setCurrentMessage(message);
      setShowBubble(true);
    }
  }, [message, mood]);

  useEffect(() => {
    if (!message) {
      const interval = setInterval(() => {
        const msgs = mascotMessages[mood];
        setCurrentMessage(msgs[Math.floor(Math.random() * msgs.length)]);
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 4000);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [message, mood]);

  const sizeMap = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-7xl",
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
          >
            <div className="glass-strong rounded-2xl px-4 py-2 shadow-lg text-sm font-medium text-gray-700 max-w-[200px] whitespace-normal text-center">
              {currentMessage}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/85 rotate-45 border-r border-b border-white/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Owl mascot */}
      <motion.div
        className={`${sizeMap[size]} select-none cursor-pointer`}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
        }}
      >
        {moodEmojis[mood]}
      </motion.div>

      {/* Name tag */}
      <div className="mt-1 text-xs font-bold text-purple-600 bg-purple-100/80 px-2 py-0.5 rounded-full">
        Owl
      </div>
    </div>
  );
}

export function MiniMascot({ mood = "happy" }: { mood?: string }) {
  return (
    <motion.span
      className="text-xl select-none inline-block"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {moodEmojis[mood] || "🦉"}
    </motion.span>
  );
}
