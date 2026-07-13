"use client";
import AppShell from "@/components/layout/AppShell";
import { FloatingClouds } from "@/components/game/FloatingEffects";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const subTopics = [
  { name: "Candi Borobudur", detail: "Provinsi: Jawa Tengah", emoji: "🛕" },
  { name: "Danau Toba", detail: "Provinsi: Sumatera Utara", emoji: "🌊" },
  { name: "Raja Ampat", detail: "Provinsi: Papua Barat", emoji: "🏝️" },
  { name: "Gunung Bromo", detail: "Provinsi: Jawa Timur", emoji: "🌋" },
  { name: "Tanjung Puting", detail: "Provinsi: Kalimantan", emoji: "🌳" },
  { name: "Wakatobi", detail: "Provinsi: Sulawesi Tenggara", emoji: "🐠" },
];

export default function KeajaibanAlamPage() {
  return (
    <AppShell>
      <FloatingClouds intensity="low" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
        <Link href="/budaya" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Budaya Indonesia
        </Link>
        <div className="glass-strong rounded-3xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🗺️</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Keajaiban Alam Indonesia 🗺️</h1>
              <p className="text-gray-500 text-sm">Destinasi alam dan wisata paling menakjubkan di Indonesia</p>
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
      </motion.div>
    </AppShell>
  );
}
