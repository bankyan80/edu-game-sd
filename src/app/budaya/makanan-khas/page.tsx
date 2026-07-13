"use client";
import AppShell from "@/components/layout/AppShell";
import { FloatingClouds } from "@/components/game/FloatingEffects";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import masterData from "@/lib/budaya/masterData";

const subTopics = masterData.makananKhas.map((item) => ({
  name: item.nama,
  detail: `${item.daerah} - ${item.ciriKhas}`,
  emoji: "🍜",
}));

const verifiedCount = masterData.makananKhas.filter((item) => item.verifikasi).length;
const unverifiedCount = masterData.makananKhas.filter((item) => !item.verifikasi).length;

export default function MakananKhasPage() {
  return (
    <AppShell>
      <FloatingClouds intensity="low" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
        <Link href="/budaya" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Budaya Indonesia
        </Link>
        <div className="glass-strong rounded-3xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🍜</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Makanan Khas Daerah 🍜</h1>
              <p className="text-gray-500 text-sm">Kuliner tradisional dari berbagai daerah di Indonesia</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subTopics.map((topic, i) => (
            <motion.div key={topic.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="glass-strong rounded-3xl p-5 shadow-xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <span className="text-4xl block mb-2">{topic.emoji}</span>
                <h3 className="font-bold text-gray-800 mb-1">{topic.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{topic.detail}</p>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">🔒 Segera Hadir</span>
              </div>
            </motion.div>
          ))}
        </div>
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
            <p className="text-xs text-yellow-600 mt-2">Data belum tersedia dan perlu diverifikasi dari sumber resmi</p>
          )}
        </div>
      </motion.div>
    </AppShell>
  );
}
