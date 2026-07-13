"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
import GameGrid from "@/components/game/GameGrid";
import { games, getGamesByFilter } from "@/lib/gameData";
import { motion } from "framer-motion";
import Mascot from "@/components/game/Mascot";
import { FloatingClouds, SunRays, FloatingParticles } from "@/components/game/FloatingEffects";
import { useStore } from "@/lib/store";
import { Sparkles, TrendingUp, Trophy, Star, Zap } from "lucide-react";
import Game3DIcon from "@/components/game/Game3DIcon";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [kelas, setKelas] = useState("");
  const [mapel, setMapel] = useState("");
  const [category, setCategory] = useState("");
  const user = useStore((s) => s.user);
  const progress = useStore((s) => s.progress);

  const filtered = useMemo(() => getGamesByFilter({ search, kelas, mapel, category }), [search, kelas, mapel, category]);

  return (
    <AppShell>
      <FloatingClouds intensity="low" />
      <SunRays />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
        {/* Hero welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-6 mb-8 shadow-xl overflow-hidden relative"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 opacity-10">
            <div className="text-[120px]">🎮</div>
          </div>
          <div className="absolute bottom-0 left-0 opacity-5">
            <div className="text-[80px]">⭐</div>
          </div>

          <div className="flex items-center gap-6 relative z-10">
            <div className="hidden md:block">
              <Mascot mood="happy" size="md" message={`Hai ${user.name}! Ayo bermain!`} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Halo, {user.name}! 👋
              </h1>
              <p className="text-gray-500 text-sm mb-4">Mau belajar apa hari ini? Pilih game favoritmu!</p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-3">
                <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Level</p>
                    <p className="text-sm font-bold text-purple-700">{progress.level}</p>
                  </div>
                </div>
                <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Poin</p>
                    <p className="text-sm font-bold text-green-700">{progress.totalPoints}</p>
                  </div>
                </div>
                <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Badge</p>
                    <p className="text-sm font-bold text-orange-700">{progress.badges.length}</p>
                  </div>
                </div>
                <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">XP</p>
                    <p className="text-sm font-bold text-blue-700">{progress.xp}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-800">Semua Game</h2>
          </div>
          <span className="glass px-3 py-1.5 rounded-full text-sm font-semibold text-purple-700">
            {filtered.length} game
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <select value={kelas} onChange={(e) => setKelas(e.target.value)} className="px-4 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 appearance-none cursor-pointer transition-all">
            <option value="">Semua Kelas</option>
            {[1,2,3,4,5,6].map((k) => <option key={k} value={String(k)}>Kelas {k}</option>)}
          </select>
          <select value={mapel} onChange={(e) => setMapel(e.target.value)} className="px-4 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 appearance-none cursor-pointer transition-all">
            <option value="">Semua Mapel</option>
            {["Bahasa Indonesia","Bahasa Inggris","Matematika","IPA","IPS","Umum"].map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 appearance-none cursor-pointer transition-all">
            <option value="">Semua Kategori</option>
            {["Bahasa","Matematika","Logika","Pengetahuan","Umum"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Game grid */}
        <GameGrid games={filtered} />
      </motion.div>
    </AppShell>
  );
}
