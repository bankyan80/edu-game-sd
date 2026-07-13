"use client";
import AppShell from "@/components/layout/AppShell";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Settings, Volume2, VolumeX, Moon, Sun, Trash2, User } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const settings = useStore(s => s.settings);
  const updateSettings = useStore(s => s.updateSettings);
  const user = useStore(s => s.user);
  const setUser = useStore(s => s.setUser);
  const resetProgress = useStore(s => s.resetProgress);
  const [name, setName] = useState(user.name);
  const [school, setSchool] = useState(user.school);
  const [kelas, setKelas] = useState(user.kelas);
  const [showReset, setShowReset] = useState(false);

  return (
    <AppShell>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6"><Settings className="w-6 h-6 text-gray-500"/> Pengaturan</h1>
        <div className="bg-white rounded-2xl p-5 shadow-lg mb-4">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><User className="w-5 h-5 text-purple-500"/> Profil</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Nama</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:border-purple-400"/>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Sekolah</label>
              <input value={school} onChange={e => setSchool(e.target.value)} className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:border-purple-400"/>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Kelas</label>
              <select value={kelas} onChange={e => setKelas(e.target.value)} className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:border-purple-400">
                {[1,2,3,4,5,6].map(k => <option key={k} value={`${k}A`}>{k}A</option>)}
              </select>
            </div>
            <button onClick={() => { setUser({name, school, kelas}); alert("Profil disimpan!"); }}
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold">Simpan Profil</button>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-lg mb-4">
          <h2 className="font-bold text-gray-800 mb-4">Audio</h2>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">Suara</span>
            <button onClick={() => updateSettings({sound: !settings.sound})}
              className={`w-12 h-6 rounded-full transition-all ${settings.sound ? "bg-purple-500" : "bg-gray-300"}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-all ${settings.sound ? "translate-x-6" : "translate-x-0.5"}`}/>
            </button>
          </div>
          <div className="py-2">
            <label className="text-sm text-gray-600 block mb-1">Volume: {Math.round(settings.volume * 100)}%</label>
            <input type="range" min="0" max="1" step="0.1" value={settings.volume} onChange={e => updateSettings({volume: parseFloat(e.target.value)})}
              className="w-full accent-purple-500"/>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h2 className="font-bold text-red-600 mb-4 flex items-center gap-2"><Trash2 className="w-5 h-5"/> Reset</h2>
          <p className="text-sm text-gray-500 mb-3">Menghapus semua data progress, badge, dan riwayat.</p>
          {!showReset ? (
            <button onClick={() => setShowReset(true)} className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-bold text-sm">Reset Progress</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => { resetProgress(); setShowReset(false); alert("Progress direset!"); }}
                className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold text-sm">Ya, Reset</button>
              <button onClick={() => setShowReset(false)} className="px-4 py-2 bg-gray-200 rounded-xl font-bold text-sm">Batal</button>
            </div>
          )}
        </div>
      </motion.div>
    </AppShell>
  );
}
