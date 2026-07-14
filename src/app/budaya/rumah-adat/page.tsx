"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
import { FloatingClouds } from "@/components/game/FloatingEffects";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  MapPin,
  Eye,
  Gamepad2,
} from "lucide-react";
import masterData from "@/lib/budaya/masterData";
import type { MasterRumahAdat } from "@/lib/budaya/masterData";

const provinsiList = [
  "Semua",
  ...Array.from(new Set(masterData.rumahAdat.map((item) => item.provinsi))),
];

const infoFields: { key: keyof MasterRumahAdat; label: string; icon: string }[] = [
  { key: "arsitektur", label: "Arsitektur", icon: "🏛️" },
  { key: "fungsi", label: "Fungsi", icon: "🎯" },
  { key: "keunikan", label: "Keunikan", icon: "✨" },
  { key: "bahan", label: "Bahan", icon: "🪵" },
];

export default function RumahAdatPage() {
  const [search, setSearch] = useState("");
  const [provinsiFilter, setProvinsiFilter] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<MasterRumahAdat | null>(null);

  const filteredData = useMemo(() => {
    return masterData.rumahAdat.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.provinsi.toLowerCase().includes(search.toLowerCase());
      const matchesProvinsi =
        provinsiFilter === "Semua" || item.provinsi === provinsiFilter;
      return matchesSearch && matchesProvinsi;
    });
  }, [search, provinsiFilter]);

  const verifiedCount = masterData.rumahAdat.filter((item) => item.verifikasi).length;
  const unverifiedCount = masterData.rumahAdat.filter((item) => !item.verifikasi).length;

  return (
    <AppShell>
      <FloatingClouds intensity="low" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-6 mb-8 shadow-xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <div className="text-[120px]">🏠</div>
          </div>
          <div className="absolute bottom-0 left-0 opacity-5">
            <div className="text-[80px]">✨</div>
          </div>

          <div className="flex items-center gap-6 relative z-10">
            <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg text-5xl">
              🏠
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Ragam Rumah Adat Indonesia 🏠
              </h1>
              <p className="text-gray-500 text-sm mb-4">
                Jelajahi 38 rumah adat dari seluruh provinsi
              </p>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari rumah adat atau provinsi..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama rumah adat atau provinsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={provinsiFilter}
              onChange={(e) => setProvinsiFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 appearance-none cursor-pointer transition-all"
            >
              {provinsiList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <span className="glass px-3 py-1.5 rounded-full text-sm font-semibold text-amber-700 self-center">
            {filteredData.length} rumah adat
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-amber-400/10 via-orange-400/10 to-transparent rounded-3xl" />

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
                        target.style.display = "none";
                        target.parentElement!.innerHTML =
                          '<div class="w-full h-full flex items-center justify-center text-6xl">🏠</div>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-6xl mb-3">🏠</div>
                )}
                <h3 className="font-bold text-lg text-gray-800 mb-1 leading-tight">
                  {item.nama}
                </h3>
                <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{item.provinsi}</span>
                </div>

                {item.verifikasi ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    ✓ Terverifikasi
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                    ⚠ Perlu Verifikasi
                  </span>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 glass rounded-xl text-xs font-semibold text-gray-700 hover:bg-white/60 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Lihat Detail
                  </button>
                  <Link
                    href="/games"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
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
              Tidak ditemukan rumah adat yang sesuai.
            </p>
          </div>
        )}

        {/* Verification Status */}
        <div className="mt-6 glass-strong rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-700">📋 Status Data</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
              ✓ {verifiedCount} data terverifikasi
            </span>
            {unverifiedCount > 0 && (
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                ⚠ {unverifiedCount} data perlu verifikasi
              </span>
            )}
          </div>
          {unverifiedCount > 0 && (
            <p className="text-xs text-yellow-600 mt-2">
              Data belum tersedia dan perlu diverifikasi dari sumber resmi
            </p>
          )}
        </div>
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

              {/* Header with Image */}
              <div className="text-center mb-6">
                {selectedItem.gambar ? (
                  <div className="w-full max-w-sm mx-auto h-64 mb-4 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                    <img
                      src={selectedItem.gambar}
                      alt={selectedItem.nama}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement!.innerHTML =
                          '<div class="w-full h-full flex items-center justify-center text-8xl">🏠</div>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-8xl mb-3">🏠</div>
                )}
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {selectedItem.nama}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedItem.provinsi}</span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {infoFields.map((field) => (
                  <div key={field.key} className="glass rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{field.icon}</span>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
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
                  href="/games"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                >
                  <Gamepad2 className="w-4 h-4" />
                  Main Game Budaya
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
