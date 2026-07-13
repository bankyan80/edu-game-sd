"use client";
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const elementSets: Record<string, string[]> = {
  clouds: ["☁️", "⛅", "🌤️"],
  balloons: ["🎈", "🎈", "🎈", "🪁"],
  nature: ["🍃", "🌸", "🌺", "🦋"],
  space: ["⭐", "✨", "🌟", "💫"],
  underwater: ["🫧", "🐠", "🐡", "🪸"],
  party: ["🎉", "🎊", "🎆", "🎇"],
  education: ["📚", "✏️", "📐", "🎯"],
};

export function FloatingClouds({ intensity = "low" }: { intensity?: "low" | "medium" | "high" }) {
  const count = intensity === "high" ? 6 : intensity === "medium" ? 4 : 2;
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-20 animate-cloud"
          style={{
            top: `${10 + i * 15}%`,
            animationDuration: `${20 + i * 8}s`,
            animationDelay: `${i * 5}s`,
          }}
        >
          ☁️
        </div>
      ))}
    </div>
  );
}

export function FloatingParticles({ type = "sparkle", count = 8 }: { type?: string; count?: number }) {
  const [particles, setParticles] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const emojis = elementSets[type] || elementSets.sparkle;
    const newParticles: FloatingElement[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 12 + Math.random() * 16,
    }));
    setParticles(newParticles);
  }, [type, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-sparkle"
          style={{
            left: `${p.left}%`,
            top: `${20 + Math.random() * 60}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}

export function SunRays() {
  return (
    <div className="fixed top-0 right-0 pointer-events-none z-0">
      <div
        className="w-64 h-64 opacity-20"
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(251, 191, 36, 0.5), transparent 60%)",
        }}
      />
    </div>
  );
}

export function ConfettiExplosion({ active }: { active: boolean }) {
  if (!active) return null;

  const colors = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#c084fc", "#f472b6"];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            backgroundColor: colors[i % colors.length],
            animation: `confetti-fall ${2 + Math.random() * 3}s ease-in forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function Rainbow() {
  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-0 h-32 opacity-10">
      <div
        className="w-full h-full"
        style={{
          background: "linear-gradient(180deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, transparent)",
          borderRadius: "0 0 50% 50%",
        }}
      />
    </div>
  );
}

export function BirdFly() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute text-xl opacity-30"
        style={{
          top: "8%",
          animation: "bird-fly 20s linear infinite",
        }}
      >
        🐦
      </div>
      <div
        className="absolute text-lg opacity-20"
        style={{
          top: "12%",
          animation: "bird-fly 25s linear infinite",
          animationDelay: "5s",
        }}
      >
        🐦
      </div>
    </div>
  );
}
