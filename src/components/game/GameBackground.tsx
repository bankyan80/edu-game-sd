"use client";

const bgMap: Record<string, string> = {
  "tebak-huruf": "bg-game-classroom",
  "tebak-kata": "bg-game-playground",
  "puzzle-kata": "bg-game-library",
  "puzzle-kalimat": "bg-game-reading",
  "tebak-gambar": "bg-game-museum",
  "mencocokkan-gambar": "bg-game-desk",
  "matematika-cepat": "bg-game-futuristic",
  "balapan-hitung": "bg-game-race",
  "tangkap-angka": "bg-game-sky",
  "memory-card": "bg-game-wood",
  "maze-edukasi": "bg-game-magic-forest",
  "quiz-ipa": "bg-game-lab",
  "quiz-ips": "bg-game-world",
  "quiz-bahasa-indonesia": "bg-game-modern-lib",
  "quiz-bahasa-inggris": "bg-game-alphabet",
  "susun-cerita": "bg-game-fairytale",
  "cari-kata": "bg-game-word-search",
  "tebak-profesi": "bg-game-city",
  "tebak-hewan": "bg-game-zoo",
  "tebak-pahlawan": "bg-game-history",
  "tebak-provinsi": "bg-game-map",
  "puzzle-peta-indonesia": "bg-game-islands",
  "operasi-hitung-berantai": "bg-game-neon",
  "simon-memory-edukasi": "bg-game-digital",
  "roda-pintar": "bg-game-show",
};

const decorMap: Record<string, { elements: string[]; position: string[] }> = {
  "tebak-huruf": {
    elements: ["📚", "✏️", "🎨", "📏"],
    position: ["top-4 left-4", "top-8 right-8", "bottom-12 left-12", "bottom-4 right-4"],
  },
  "tebak-kata": {
    elements: ["🌸", "🦋", "🌈", "🌻"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "puzzle-kata": {
    elements: ["📚", "📖", "📕", "🔖"],
    position: ["top-4 left-8", "top-12 right-4", "bottom-10 left-4", "bottom-4 right-10"],
  },
  "puzzle-kalimat": {
    elements: ["☀️", "☁️", "🌤️", "🌈"],
    position: ["top-4 left-4", "top-8 right-8", "bottom-12 left-12", "bottom-4 right-4"],
  },
  "matematika-cepat": {
    elements: ["➕", "➖", "✖️", "➗"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "balapan-hitung": {
    elements: ["🏁", "🏎️", "🚩", "🎺"],
    position: ["top-4 left-4", "top-10 right-6", "bottom-10 left-6", "bottom-4 right-4"],
  },
  "tangkap-angka": {
    elements: ["🎈", "☁️", "🌤️", "🕊️"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "memory-card": {
    elements: ["🃏", "♠️", "♥️", "♦️"],
    position: ["top-4 left-4", "top-8 right-8", "bottom-12 left-12", "bottom-4 right-4"],
  },
  "maze-edukasi": {
    elements: ["🌲", "🌳", "🍄", "🌺"],
    position: ["top-4 left-4", "top-10 right-6", "bottom-10 left-6", "bottom-4 right-4"],
  },
  "quiz-ipa": {
    elements: ["🧪", "⚗️", "🧬", "🔬"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "quiz-ips": {
    elements: ["🗺️", "🏛️", "🌏", "📿"],
    position: ["top-4 left-4", "top-10 right-8", "bottom-10 left-8", "bottom-4 right-4"],
  },
  "quiz-bahasa-indonesia": {
    elements: ["📖", "💬", "📝", "🎓"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "quiz-bahasa-inggris": {
    elements: ["🅰️", "🅱️", "🔠", "🌐"],
    position: ["top-4 left-4", "top-8 right-8", "bottom-12 left-12", "bottom-4 right-4"],
  },
  "susun-cerita": {
    elements: ["🏰", "🌈", "☁️", "⭐"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "cari-kata": {
    elements: ["🔍", "🔤", "📝", "💡"],
    position: ["top-4 left-4", "top-10 right-6", "bottom-10 left-6", "bottom-4 right-4"],
  },
  "tebak-profesi": {
    elements: ["🏥", "🏫", "🚒", "🚑"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "tebak-hewan": {
    elements: ["🦁", "🐼", "🦜", "🌿"],
    position: ["top-4 left-4", "top-10 right-8", "bottom-10 left-8", "bottom-4 right-4"],
  },
  "tebak-pahlawan": {
    elements: ["🏛️", "📜", "🏺", "🎖️"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "tebak-provinsi": {
    elements: ["🇮🇩", "🗺️", "🏝️", "⛵"],
    position: ["top-4 left-4", "top-8 right-8", "bottom-12 left-12", "bottom-4 right-4"],
  },
  "puzzle-peta-indonesia": {
    elements: ["🏝️", "⛵", "🌊", "⚓"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "operasi-hitung-berantai": {
    elements: ["⚡", "🔢", "💡", "🔗"],
    position: ["top-4 left-4", "top-10 right-6", "bottom-10 left-6", "bottom-4 right-4"],
  },
  "simon-memory-edukasi": {
    elements: ["🔴", "🟢", "🔵", "🟡"],
    position: ["top-6 left-6", "top-10 right-10", "bottom-8 left-8", "bottom-6 right-6"],
  },
  "roda-pintar": {
    elements: ["🌟", "🎤", "🎪", "🎊"],
    position: ["top-4 left-4", "top-10 right-8", "bottom-10 left-8", "bottom-4 right-4"],
  },
};

export default function GameBackground({ slug, children }: { slug: string; children: React.ReactNode }) {
  const bgClass = bgMap[slug] || "bg-game-futuristic";
  const decor = decorMap[slug] || { elements: [], position: [] };

  return (
    <div className={`relative min-h-screen ${bgClass} overflow-hidden`}>
      {/* Floating decorative elements */}
      {decor.elements.map((el, i) => (
        <div
          key={i}
          className={`absolute ${decor.position[i]} text-2xl opacity-30 animate-float-slow pointer-events-none select-none`}
          style={{ animationDelay: `${i * 0.8}s` }}
        >
          {el}
        </div>
      ))}

      {/* Ambient light effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
