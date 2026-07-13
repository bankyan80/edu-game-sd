"use client";
import AppShell from "@/components/layout/AppShell";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Trophy, Star, Gamepad2, Clock, Medal, Target, Zap } from "lucide-react";

export default function ProfilePage() {
  const user = useStore(s => s.user);
  const p = useStore(s => s.progress);

  const statCards = [
    { label: "Level", value: p.level, icon: <Star className="w-5 h-5 text-yellow-500"/>, color: "bg-yellow-50" },
    { label: "Total Poin", value: p.totalPoints.toLocaleString(), icon: <Trophy className="w-5 h-5 text-purple-500"/>, color: "bg-purple-50" },
    { label: "Badge", value: p.badges.length, icon: <Medal className="w-5 h-5 text-pink-500"/>, color: "bg-pink-50" },
    { label: "Game Dimainkan", value: Object.values(p.gamesPlayed).reduce((a,b)=>a+b,0), icon: <Gamepad2 className="w-5 h-5 text-blue-500"/>, color: "bg-blue-50" },
  ];

  return (
    <AppShell>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
            {user.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.school} - Kelas {user.kelas}</p>
          <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400"/> Level {p.level}</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-orange-400"/> {p.xp} XP</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:i*0.1}}
              className={`${s.color} rounded-2xl p-4 text-center`}>
              <div className="flex justify-center mb-2">{s.icon}</div>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Target className="w-5 h-5 text-purple-500"/> Progress Level</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all" style={{width:`${(p.xp / (p.level * 100)) * 100}%`}}/>
          </div>
          <p className="text-sm text-gray-500">{p.xp} / {p.level * 100} XP ke Level {p.level + 1}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-500"/> Riwayat Terakhir</h2>
          {p.history.length === 0 ? <p className="text-gray-400 text-sm">Belum ada riwayat</p> :
            p.history.slice(0, 5).map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-sm">{h.gameName}</p>
                  <p className="text-xs text-gray-400">{new Date(h.date).toLocaleDateString("id-ID")}</p>
                </div>
                <span className="text-sm font-bold text-purple-600">{h.points} poin</span>
              </div>
            ))
          }
        </div>
      </motion.div>
    </AppShell>
  );
}
