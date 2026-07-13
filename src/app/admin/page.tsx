"use client";
import AppShell from "@/components/layout/AppShell";
import { motion } from "framer-motion";
import { School, Users, Gamepad2, FileText, Settings, Database, Shield, Activity, Download, Upload } from "lucide-react";
import { games } from "@/lib/gameData";
import { allBadges } from "@/lib/badges";

export default function AdminPage() {
  const stats = [
    { label: "Sekolah", value: 12, icon: <School className="w-5 h-5 text-blue-500"/>, bg: "bg-blue-50" },
    { label: "Guru", value: 45, icon: <Users className="w-5 h-5 text-green-500"/>, bg: "bg-green-50" },
    { label: "Siswa", value: 580, icon: <Users className="w-5 h-5 text-purple-500"/>, bg: "bg-purple-50" },
    { label: "Game", value: games.length, icon: <Gamepad2 className="w-5 h-5 text-orange-500"/>, bg: "bg-orange-50" },
  ];

  const adminMenus = [
    { label: "Kelola Sekolah", icon: <School className="w-5 h-5"/>, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Kelola Guru", icon: <Users className="w-5 h-5"/>, color: "text-green-500", bg: "bg-green-50" },
    { label: "Kelola Siswa", icon: <Users className="w-5 h-5"/>, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Kelola Game", icon: <Gamepad2 className="w-5 h-5"/>, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Kelola Soal", icon: <FileText className="w-5 h-5"/>, color: "text-cyan-500", bg: "bg-cyan-50" },
    { label: "Kelola Badge", icon: <Shield className="w-5 h-5"/>, color: "text-yellow-500", bg: "bg-yellow-50" },
    { label: "Log Aktivitas", icon: <Activity className="w-5 h-5"/>, color: "text-red-500", bg: "bg-red-50" },
    { label: "Backup & Restore", icon: <Database className="w-5 h-5"/>, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  const recentLogs = [
    { time: "10:32", user: "Andi Saputra", action: "Bermain Tebak Huruf", type: "game" },
    { time: "10:28", user: "Siti Rahmawati", action: "Mendapat badge Perfect Score", type: "badge" },
    { time: "10:15", user: "Pak Budi", action: "Login ke sistem", type: "auth" },
    { time: "10:10", user: "Admin", action: "Backup database", type: "system" },
    { time: "09:55", user: "Dewi Lestari", action: "Menyelesaikan Quiz IPA", type: "game" },
    { time: "09:42", user: "Rizki Pratama", action: "Naik level ke 18", type: "level" },
  ];

  return (
    <AppShell>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-500 text-sm">Kelola seluruh sistem EduGame SD</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:i*0.1}}
              className={`${s.bg} rounded-2xl p-4`}>
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-gray-600">{s.label}</span></div>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {adminMenus.map((m, i) => (
            <motion.button key={i} whileHover={{scale:1.02}} whileTap={{scale:0.98}}
              className={`${m.bg} rounded-2xl p-4 text-center transition-all hover:shadow-md`}>
              <div className={`${m.color} flex justify-center mb-2`}>{m.icon}</div>
              <span className="text-xs font-bold text-gray-700">{m.label}</span>
            </motion.button>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <h2 className="font-bold text-gray-800 mb-4">Log Aktivitas Terbaru</h2>
            <div className="space-y-3">
              {recentLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                  <span className="text-xs text-gray-400 w-12">{log.time}</span>
                  <div className={`w-2 h-2 rounded-full ${log.type==="game"?"bg-purple-400":log.type==="badge"?"bg-yellow-400":log.type==="auth"?"bg-blue-400":log.type==="level"?"bg-green-400":"bg-gray-400"}`}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{log.user}</p>
                    <p className="text-xs text-gray-500 truncate">{log.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <h2 className="font-bold text-gray-800 mb-4">Sistem</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition">
                <Download className="w-5 h-5 text-green-600"/>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">Backup Database</p>
                  <p className="text-xs text-gray-500">Export semua data ke file</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
                <Upload className="w-5 h-5 text-blue-600"/>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">Restore Database</p>
                  <p className="text-xs text-gray-500">Import data dari file backup</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition">
                <Settings className="w-5 h-5 text-purple-600"/>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">Pengaturan Sistem</p>
                  <p className="text-xs text-gray-500">Konfigurasi aplikasi</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-red-50 rounded-xl hover:bg-red-100 transition">
                <Shield className="w-5 h-5 text-red-600"/>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">Keamanan</p>
                  <p className="text-xs text-gray-500">Kelola akses dan izin</p>
                </div>
              </button>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">Statistik Game</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Total soal dalam bank:</span>
                <span className="font-bold text-purple-600">375+</span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-600">Total badge:</span>
                <span className="font-bold text-yellow-600">{allBadges.length}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
}
