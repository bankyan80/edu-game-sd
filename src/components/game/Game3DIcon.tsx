"use client";

const iconMap: Record<string, { emoji: string; bg: string; animation: string; glow: string }> = {
  "tebak-huruf": { emoji: "🔤", bg: "from-amber-400 to-orange-500", animation: "animate-icon-wiggle", glow: "glow-orange" },
  "tebak-kata": { emoji: "🐱", bg: "from-pink-400 to-rose-500", animation: "animate-icon-float", glow: "glow-pink" },
  "puzzle-kata": { emoji: "🧩", bg: "from-violet-400 to-purple-500", animation: "animate-icon-pulse", glow: "glow-purple" },
  "puzzle-kalimat": { emoji: "📖", bg: "from-blue-400 to-indigo-500", animation: "animate-icon-float", glow: "glow-blue" },
  "tebak-gambar": { emoji: "🍎", bg: "from-red-400 to-rose-500", animation: "animate-icon-float", glow: "glow-pink" },
  "mencocokkan-gambar": { emoji: "🃏", bg: "from-emerald-400 to-teal-500", animation: "animate-icon-wiggle", glow: "glow-green" },
  "matematika-cepat": { emoji: "🔢", bg: "from-cyan-400 to-blue-500", animation: "animate-icon-pulse", glow: "glow-blue" },
  "balapan-hitung": { emoji: "🏎️", bg: "from-red-400 to-orange-500", animation: "animate-icon-float", glow: "glow-orange" },
  "tangkap-angka": { emoji: "🎈", bg: "from-sky-400 to-blue-500", animation: "animate-icon-float", glow: "glow-blue" },
  "memory-card": { emoji: "🃏", bg: "from-amber-400 to-yellow-500", animation: "animate-icon-wiggle", glow: "glow-orange" },
  "maze-edukasi": { emoji: "🏰", bg: "from-green-400 to-emerald-500", animation: "animate-icon-float", glow: "glow-green" },
  "quiz-ipa": { emoji: "🔬", bg: "from-blue-400 to-cyan-500", animation: "animate-icon-pulse", glow: "glow-blue" },
  "quiz-ips": { emoji: "🌍", bg: "from-purple-400 to-violet-500", animation: "animate-icon-float", glow: "glow-purple" },
  "quiz-bahasa-indonesia": { emoji: "💬", bg: "from-rose-400 to-pink-500", animation: "animate-icon-float", glow: "glow-pink" },
  "quiz-bahasa-inggris": { emoji: "🔤", bg: "from-amber-400 to-yellow-500", animation: "animate-icon-wiggle", glow: "glow-orange" },
  "susun-cerita": { emoji: "🏰", bg: "from-fuchsia-400 to-purple-500", animation: "animate-icon-float", glow: "glow-purple" },
  "cari-kata": { emoji: "🔍", bg: "from-lime-400 to-green-500", animation: "animate-icon-wiggle", glow: "glow-green" },
  "tebak-profesi": { emoji: "👨‍⚕️", bg: "from-teal-400 to-cyan-500", animation: "animate-icon-float", glow: "glow-blue" },
  "tebak-hewan": { emoji: "🐘", bg: "from-green-400 to-lime-500", animation: "animate-icon-float", glow: "glow-green" },
  "tebak-pahlawan": { emoji: "🦸", bg: "from-red-400 to-amber-500", animation: "animate-icon-float", glow: "glow-orange" },
  "tebak-provinsi": { emoji: "🗺️", bg: "from-sky-400 to-blue-500", animation: "animate-icon-float", glow: "glow-blue" },
  "puzzle-peta-indonesia": { emoji: "🏝️", bg: "from-cyan-400 to-blue-500", animation: "animate-icon-pulse", glow: "glow-blue" },
  "operasi-hitung-berantai": { emoji: "⚡", bg: "from-violet-400 to-indigo-500", animation: "animate-icon-wiggle", glow: "glow-purple" },
  "simon-memory-edukasi": { emoji: "🎮", bg: "from-fuchsia-400 to-pink-500", animation: "animate-icon-pulse", glow: "glow-pink" },
  "roda-pintar": { emoji: "🎡", bg: "from-yellow-400 to-amber-500", animation: "animate-icon-wiggle", glow: "glow-orange" },
  "tebak-pakaian-adat": { emoji: "👘", bg: "from-amber-400 to-orange-500", animation: "animate-icon-float", glow: "glow-orange" },
  "cocokkan-pakaian": { emoji: "🎯", bg: "from-rose-400 to-pink-500", animation: "animate-icon-wiggle", glow: "glow-pink" },
  "puzzle-pakaian-adat": { emoji: "🧩", bg: "from-amber-400 to-yellow-500", animation: "animate-icon-pulse", glow: "glow-orange" },
  "siapa-aku": { emoji: "🤔", bg: "from-teal-400 to-cyan-500", animation: "animate-icon-float", glow: "glow-blue" },
  "roda-budaya": { emoji: "🎡", bg: "from-purple-400 to-violet-500", animation: "animate-icon-wiggle", glow: "glow-purple" },
};

export default function Game3DIcon({ slug, size = "md" }: { slug: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const icon = iconMap[slug] || { emoji: "🎮", bg: "from-purple-400 to-pink-500", animation: "animate-icon-float", glow: "glow-purple" };

  const sizes = {
    sm: "w-12 h-12 text-2xl",
    md: "w-16 h-16 text-3xl",
    lg: "w-24 h-24 text-5xl",
    xl: "w-32 h-32 text-6xl",
  };

  const shadowSizes = {
    sm: "shadow-md",
    md: "shadow-lg",
    lg: "shadow-xl",
    xl: "shadow-2xl",
  };

  return (
    <div className={`${sizes[size]} ${shadowSizes[size]} relative`}>
      <div
        className={`
          w-full h-full rounded-2xl
          bg-gradient-to-br ${icon.bg}
          flex items-center justify-center
          ${icon.animation}
          relative overflow-hidden
        `}
        style={{
          boxShadow: `
            inset 0 2px 4px rgba(255,255,255,0.4),
            inset 0 -2px 4px rgba(0,0,0,0.1),
            0 4px 12px rgba(0,0,0,0.15),
            0 8px 24px rgba(0,0,0,0.1)
          `,
          transform: "perspective(200px) rotateX(2deg)",
        }}
      >
        {/* Glossy highlight */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 40%, transparent 60%)",
          }}
        />
        {/* Bottom shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-2xl"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)",
          }}
        />
        <span className="icon-3d relative z-10">{icon.emoji}</span>
      </div>
    </div>
  );
}
