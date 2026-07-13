"use client";
import AppShell from "@/components/layout/AppShell";
import { motion } from "framer-motion";
import { HelpCircle, Gamepad2, Trophy, Star, Clock, Medal } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara bermain game?", a: "Pilih game dari dashboard, baca petunjuk, lalu tekan 'Mulai Bermain'. Jawab soal dengan memilih opsi yang benar." },
  { q: "Bagaimana cara mendapatkan poin?", a: "Jawab benar +10 poin, jawaban cepat +5, combo +20, perfect +50, naik level +100." },
  { q: "Bagaimana cara naik level?", a: "Setiap jawaban benar memberikan XP. Kumpulkan XP untuk naik level otomatis." },
  { q: "Bagaimana cara mendapatkan badge?", a: "Selesaikan pencapaian tertentu seperti bermain X game, mendapatkan perfect score, atau mencapai level tertentu." },
  { q: "Bisakah bermain offline?", a: "Ya! Semua game tersedia offline setelah pertama kali dimuat." },
  { q: "Bagaimana cara melihat leaderboard?", a: "Klik menu 'Leaderboard' di sidebar untuk melihat peringkat pemain." },
];

export default function HelpPage() {
  return (
    <AppShell>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6"><HelpCircle className="w-6 h-6 text-blue-500"/> Bantuan</h1>
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="font-bold text-lg mb-4">Tentang EduGame SD</h2>
          <p className="text-gray-600 text-sm mb-4">EduGame SD Indonesia adalah platform edukasi interaktif dengan 25 game pembelajaran untuk siswa SD kelas 1-6. Belajar jadi lebih menyenangkan!</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-purple-50 rounded-xl"><Gamepad2 className="w-6 h-6 text-purple-500 mx-auto mb-1"/><p className="text-xs font-bold">25 Game</p></div>
            <div className="text-center p-3 bg-yellow-50 rounded-xl"><Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1"/><p className="text-xs font-bold">52 Badge</p></div>
            <div className="text-center p-3 bg-blue-50 rounded-xl"><Star className="w-6 h-6 text-blue-500 mx-auto mb-1"/><p className="text-xs font-bold">Level System</p></div>
            <div className="text-center p-3 bg-green-50 rounded-xl"><Medal className="w-6 h-6 text-green-500 mx-auto mb-1"/><p className="text-xs font-bold">Leaderboard</p></div>
          </div>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:i*0.1}}
              className="bg-white rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AppShell>
  );
}
