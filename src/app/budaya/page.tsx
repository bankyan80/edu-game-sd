"use client";
import AppShell from "@/components/layout/AppShell";
import { budayaCategories } from "@/lib/budaya/categories";
import { FloatingClouds, FloatingParticles } from "@/components/game/FloatingEffects";
import Mascot from "@/components/game/Mascot";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function BudayaPage() {
  return (
    <AppShell>
      <FloatingClouds intensity="low" />
      <FloatingParticles type="sparkle" count={10} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-6 mb-8 shadow-xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <div className="text-[120px]">🇮🇩</div>
          </div>
          <div className="absolute bottom-0 left-0 opacity-5">
            <div className="text-[80px]">🗺️</div>
          </div>
          <div className="absolute top-4 right-32 opacity-5">
            <div className="text-[60px]">🏛️</div>
          </div>

          <div className="flex items-center gap-6 relative z-10">
            <div className="hidden md:block">
              <Mascot mood="excited" size="md" message="Selamat datang di Budaya Indonesia! 🇮🇩 Ayo jelajahi kekayaan Nusantara!" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
                Budaya Indonesia 🇮🇩
              </h1>
              <p className="text-gray-500 text-sm mb-4">Jelajahi kekayaan budaya Nusantara melalui permainan interaktif!</p>
              <div className="flex flex-wrap gap-3">
                <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-md">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Kategori</p>
                    <p className="text-sm font-bold text-red-700">{budayaCategories.length}</p>
                  </div>
                </div>
                <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">🎮</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Total Game</p>
                    <p className="text-sm font-bold text-orange-700">
                      {budayaCategories.reduce((sum, c) => sum + c.gameCount, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏛️</span>
            <h2 className="text-xl font-bold text-gray-800">Kategori Budaya</h2>
          </div>
          <span className="glass px-3 py-1.5 rounded-full text-sm font-semibold text-red-700">
            {budayaCategories.length} kategori
          </span>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {budayaCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={cat.href}>
                <div className="glass-strong rounded-3xl p-6 shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group">
                  {/* Gradient accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 rounded-3xl`} />

                  {/* Background emoji */}
                  <div className="absolute -bottom-2 -right-2 opacity-5 text-[80px] pointer-events-none">
                    {cat.bgEmoji}
                  </div>

                  {/* Floating emoji */}
                  <motion.div
                    className="text-5xl mb-3 inline-block"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  >
                    {cat.emoji}
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-bold text-gray-800 mb-1 relative z-10">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mb-3 relative z-10">{cat.description}</p>

                  {/* Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${cat.gradient} text-white text-xs font-semibold shadow-md relative z-10`}>
                    🎮 {cat.gameCount} game
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AppShell>
  );
}
