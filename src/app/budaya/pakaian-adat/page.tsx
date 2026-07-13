"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
import { pakaianAdatData, type PakaianAdat } from "@/lib/budaya/pakaianAdat";
import { FloatingClouds } from "@/components/game/FloatingEffects";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Heart,
  Eye,
  Gamepad2,
  X,
  ChevronDown,
  MapPin,
  Star,
  Sparkles,
} from "lucide-react";

const pulauList = [
  "Semua",
  "Sumatera",
  "Jawa",
  "Bali & Nusa Tenggara",
  "Kalimantan",
  "Sulawesi",
  "Maluku",
  "Papua",
];

const pulauColors: Record<string, string> = {
  Sumatera: "bg-emerald-100 text-emerald-700",
  Jawa: "bg-blue-100 text-blue-700",
  Bali: "bg-orange-100 text-orange-700",
  "Nusa Tenggara": "bg-amber-100 text-amber-700",
  Kalimantan: "bg-green-100 text-green-700",
  Sulawesi: "bg-purple-100 text-purple-700",
  Maluku: "bg-cyan-100 text-cyan-700",
  Papua: "bg-red-100 text-red-700",
};

function getPulauColor(pulau: string) {
  for (const [key, val] of Object.entries(pulauColors)) {
    if (pulau.includes(key)) return val;
  }
  return "bg-gray-100 text-gray-700";
}

function matchPulauFilter(pulau: string, filter: string) {
  if (filter === "Semua") return true;
  if (filter === "Bali & Nusa Tenggara") {
    return pulau.includes("Bali") || pulau.includes("Nusa Tenggara");
  }
  return pulau.includes(filter);
}

const infoFields: { key: keyof PakaianAdat; label: string; icon: string }[] = [
  { key: "keterangan", label: "Keterangan", icon: "📖" },
  { key: "makna", label: "Makna", icon: "💫" },
  { key: "ciriKhas", label: "Ciri Khas", icon: "✨" },
  { key: "bahan", label: "Bahan", icon: "🧵" },
  { key: "aksesori", label: "Aksesori", icon: "💎" },
  { key: "digunakanPada", label: "Digunakan Pada", icon: "🎯" },
  { key: "faktaMenarik", label: "Fakta Menarik", icon: "🌟" },
];

export default function PakaianAdatPage() {
  const [search, setSearch] = useState("");
  const [pulauFilter, setPulauFilter] = useState("Semua");
  const [sortOrder, setSortOrder] = useState<"az" | "za">("az");
  const [selectedItem, setSelectedItem] = useState<PakaianAdat | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredData = useMemo(() => {
    let result = pakaianAdatData.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.provinsi.toLowerCase().includes(search.toLowerCase());
      const matchesPulau = matchPulauFilter(item.pulau, pulauFilter);
      return matchesSearch && matchesPulau;
    });
    result.sort((a, b) =>
      sortOrder === "az"
        ? a.nama.localeCompare(b.nama)
        : b.nama.localeCompare(a.nama)
    );
    return result;
  }, [search, pulauFilter, sortOrder]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <AppShell>
      <FloatingClouds intensity="low" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-6 mb-8 shadow-xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <div className="text-[120px]">👘</div>
          </div>
          <div className="absolute bottom-0 left-0 opacity-5">
            <div className="text-[80px]">✨</div>
          </div>

          <div className="flex items-center gap-6 relative z-10">
            <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg text-5xl">
              👘
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Ragam Pakaian Adat Indonesia 👘
              </h1>
              <p className="text-gray-500 text-sm mb-4">
                Jelajahi 38 pakaian adat dari seluruh provinsi
              </p>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari pakaian adat atau provinsi..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all placeholder-gray-400"
                />
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-1">
              <span className="text-4xl animate-bounce">👗</span>
              <span className="text-2xl">👑</span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama pakaian atau provinsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={pulauFilter}
              onChange={(e) => setPulauFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 appearance-none cursor-pointer transition-all"
            >
              {pulauList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "az" | "za")}
              className="pl-4 pr-8 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 appearance-none cursor-pointer transition-all"
            >
              <option value="az">Abjad A-Z</option>
              <option value="za">Abjad Z-A</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <span className="glass px-3 py-1.5 rounded-full text-sm font-semibold text-purple-700 self-center">
            {filteredData.length} pakaian
          </span>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group glass-strong rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer border border-white/40"
              onClick={() => setSelectedItem(item)}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-transparent rounded-3xl" />

              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}
                className="absolute top-3 right-3 p-1.5 glass-strong rounded-full hover:scale-110 transition-transform z-10"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    favorites.has(item.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {item.gambar ? (
                  <div className="w-full h-40 mb-3 rounded-2xl overflow-hidden bg-gray-100">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl">' + item.emoji + '</div>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-6xl mb-3 animate-float">{item.emoji}</div>
                )}
                <h3 className="font-bold text-lg text-gray-800 mb-1 leading-tight">
                  {item.nama}
                </h3>
                <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{item.provinsi}</span>
                </div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-3 ${getPulauColor(
                    item.pulau
                  )}`}
                >
                  {item.pulau}
                </span>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 glass rounded-xl text-xs font-semibold text-gray-700 hover:bg-white/60 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Lihat Detail
                  </button>
                  <Link
                    href="/games/tebak-pakaian-adat"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    Main Game
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🔍</span>
            <p className="text-gray-500">
              Tidak ditemukan pakaian adat yang sesuai.
            </p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-strong rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 glass rounded-full hover:scale-110 transition-transform z-20"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                {selectedItem.gambar ? (
                  <div className="w-full max-w-sm mx-auto h-64 mb-4 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                    <img
                      src={selectedItem.gambar}
                      alt={selectedItem.nama}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-8xl">' + selectedItem.emoji + '</div>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-8xl mb-3 animate-float">
                    {selectedItem.emoji}
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {selectedItem.nama}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedItem.provinsi}</span>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPulauColor(
                    selectedItem.pulau
                  )}`}
                >
                  {selectedItem.pulau}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {infoFields.map((field) => (
                  <div
                    key={field.key}
                    className="glass rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{field.icon}</span>
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                        {field.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedItem[field.key]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="text-center">
                <Link
                  href="/games/tebak-pakaian-adat"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                >
                  <Gamepad2 className="w-4 h-4" />
                  Main Game Tebak Pakaian Adat
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
