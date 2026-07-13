"use client";
import AppShell from "@/components/layout/AppShell";
import { motion } from "framer-motion";
import { Users, TrendingUp, Gamepad2, Clock, Download, FileText, BarChart3 } from "lucide-react";

const mockStudents = [
  { name: "Andi Saputra", kelas: "4A", score: 1250, games: 45, duration: "12 jam", level: 25 },
  { name: "Siti Rahmawati", kelas: "4A", score: 1120, games: 38, duration: "10 jam", level: 22 },
  { name: "Budi Santoso", kelas: "4A", score: 1080, games: 42, duration: "11 jam", level: 21 },
  { name: "Dewi Lestari", kelas: "4B", score: 950, games: 35, duration: "9 jam", level: 19 },
  { name: "Rizki Pratama", kelas: "4B", score: 890, games: 30, duration: "8 jam", level: 18 },
  { name: "Putri Anggraeni", kelas: "4B", score: 820, games: 28, duration: "7 jam", level: 17 },
  { name: "Fajar Nugroho", kelas: "4A", score: 760, games: 25, duration: "6 jam", level: 16 },
  { name: "Maya Indah", kelas: "4B", score: 710, games: 22, duration: "5 jam", level: 15 },
];

export default function TeacherPage() {
  const stats = [
    { label: "Total Siswa", value: mockStudents.length, icon: <Users className="w-5 h-5 text-blue-500"/>, bg: "bg-blue-50" },
    { label: "Rata-rata Skor", value: Math.round(mockStudents.reduce((a,b)=>a+b.score,0)/mockStudents.length), icon: <TrendingUp className="w-5 h-5 text-green-500"/>, bg: "bg-green-50" },
    { label: "Total Game Dimainkan", value: mockStudents.reduce((a,b)=>a+b.games,0), icon: <Gamepad2 className="w-5 h-5 text-purple-500"/>, bg: "bg-purple-50" },
    { label: "Rata-rata Level", value: Math.round(mockStudents.reduce((a,b)=>a+b.level,0)/mockStudents.length), icon: <BarChart3 className="w-5 h-5 text-orange-500"/>, bg: "bg-orange-50" },
  ];

  return (
    <AppShell>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Guru</h1>
          <p className="text-gray-500 text-sm">Monitoring dan laporan hasil belajar siswa</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:i*0.1}}
              className={`${s.bg} rounded-2xl p-4`}>
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-gray-600">{s.label}</span></div>
              <p className="text-2xl font-bold text-gray-800">{typeof s.value === "number" && s.value > 999 ? s.value.toLocaleString() : s.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800">Daftar Siswa</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-green-200 transition">
                <Download className="w-3.5 h-3.5"/>Export Excel
              </button>
              <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-blue-200 transition">
                <FileText className="w-3.5 h-3.5"/>Cetak PDF
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500">
                  <th className="px-4 py-3 text-left">Nama</th>
                  <th className="px-4 py-3 text-left">Kelas</th>
                  <th className="px-4 py-3 text-center">Skor</th>
                  <th className="px-4 py-3 text-center">Game</th>
                  <th className="px-4 py-3 text-center">Durasi</th>
                  <th className="px-4 py-3 text-center">Level</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((s, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-purple-50/50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">{s.name.charAt(0)}</div>
                        <span className="font-medium text-sm">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{s.kelas}</td>
                    <td className="px-4 py-3 text-center"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold">{s.score}</span></td>
                    <td className="px-4 py-3 text-center text-sm">{s.games}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-500">{s.duration}</td>
                    <td className="px-4 py-3 text-center"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">Lv.{s.level}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
}
