"use client";
import AppShell from "@/components/layout/AppShell";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { allBadges } from "@/lib/badges";
import { Trophy, Lock } from "lucide-react";

export default function BadgesPage() {
  const unlocked = useStore(s => s.progress.badges);

  return (
    <AppShell>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-500"/> Badge Saya</h1>
          <p className="text-gray-500 text-sm">{unlocked.length} / {allBadges.length} badge terbuka</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 rounded-full transition-all" style={{width:`${(unlocked.length/allBadges.length)*100}%`}}/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {allBadges.map((b, i) => {
            const isUnlocked = unlocked.includes(b.id);
            return (
              <motion.div key={b.id} initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:i*0.03}}
                className={`rounded-2xl p-4 text-center border-2 transition-all ${isUnlocked ? "bg-white border-yellow-300 shadow-lg" : "bg-gray-50 border-gray-200 opacity-60"}`}>
                <span className="text-4xl block mb-2">{isUnlocked ? b.icon : "🔒"}</span>
                <h3 className="font-bold text-sm text-gray-800 mb-1">{b.name}</h3>
                <p className="text-[10px] text-gray-500">{b.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AppShell>
  );
}
