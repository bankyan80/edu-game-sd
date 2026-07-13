"use client";
import AppShell from "@/components/layout/AppShell";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Clock, Trash2 } from "lucide-react";

export default function HistoryPage() {
  const history = useStore(s => s.progress.history);

  return (
    <AppShell>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Clock className="w-6 h-6 text-blue-500"/> Riwayat Bermain</h1>
          <p className="text-gray-500 text-sm">{history.length} game dimainkan</p>
        </div>
        {history.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">📋</span>
            <p className="text-gray-500">Belum ada riwayat bermain.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((h, i) => (
              <motion.div key={i} initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:i*0.03}}
                className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl font-bold text-purple-600">
                  #{h.gameId}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-800 truncate">{h.gameName}</p>
                  <p className="text-xs text-gray-500">{new Date(h.date).toLocaleDateString("id-ID", {day:"numeric", month:"long", year:"numeric"})} - {h.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">+{h.points}</p>
                  <p className="text-xs text-gray-400">Skor {h.score}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AppShell>
  );
}
