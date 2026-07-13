"use client";
import AppShell from "@/components/layout/AppShell";
import { useState } from "react";
import { motion } from "framer-motion";
import { Medal, Crown, Trophy, Star } from "lucide-react";

const mockLeaderboard = [
  { rank: 1, name: "Andi Saputra", school: "SDN 01 Jakarta", score: 12500, level: 25, avatar: "👦" },
  { rank: 2, name: "Siti Rahmawati", school: "SDN 02 Bandung", score: 11200, level: 22, avatar: "👧" },
  { rank: 3, name: "Budi Santoso", school: "SDN 03 Surabaya", score: 10800, level: 21, avatar: "👦" },
  { rank: 4, name: "Dewi Lestari", school: "SDN 04 Semarang", score: 9500, level: 19, avatar: "👧" },
  { rank: 5, name: "Rizki Pratama", school: "SDN 05 Medan", score: 8900, level: 18, avatar: "👦" },
  { rank: 6, name: "Putri Anggraeni", school: "SDN 06 Yogyakarta", score: 8200, level: 17, avatar: "👧" },
  { rank: 7, name: "Fajar Nugroho", school: "SDN 07 Malang", score: 7600, level: 16, avatar: "👦" },
  { rank: 8, name: "Maya Indah", school: "SDN 08 Bali", score: 7100, level: 15, avatar: "👧" },
  { rank: 9, name: "Arief Rahman", school: "SDN 09 Makassar", score: 6500, level: 14, avatar: "👦" },
  { rank: 10, name: "Nina Sari", school: "SDN 10 Palembang", score: 5900, level: 13, avatar: "👧" },
];

const timeFilters = ["Hari Ini", "Minggu Ini", "Bulan Ini", "Tahun Ini", "Semua Waktu"];

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("Semua Waktu");

  const rankIcon = (r: number) => {
    if (r === 1) return <Crown className="w-5 h-5 text-yellow-500"/>;
    if (r === 2) return <Medal className="w-5 h-5 text-gray-400"/>;
    if (r === 3) return <Medal className="w-5 h-5 text-amber-600"/>;
    return <span className="w-5 text-center text-sm font-bold text-gray-500">{r}</span>;
  };

  return (
    <AppShell>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-500"/> Leaderboard</h1>
        </div>
        <div className="flex gap-2 mb-6 flex-wrap">
          {timeFilters.map(f => (
            <button key={f} onClick={() => setTimeFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${timeFilter === f ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow" : "bg-white text-gray-600 hover:bg-purple-50"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {mockLeaderboard.map((entry, i) => (
            <motion.div key={entry.rank} initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:i*0.05}}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${i === 0 ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg" : i < 3 ? "bg-white border border-gray-200 shadow" : "bg-white border border-gray-100"}`}>
              <div className="w-8 flex justify-center">{rankIcon(entry.rank)}</div>
              <div className="text-3xl">{entry.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 truncate">{entry.name}</p>
                <p className="text-xs text-gray-500 truncate">{entry.school}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-purple-600">{entry.score.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Lv.{entry.level}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AppShell>
  );
}
