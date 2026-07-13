"use client";
import { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/store";
import { audioManager } from "@/lib/audio";
import { games } from "@/lib/gameData";
import { useAuth } from "@/lib/auth-context";
import {
  Search, Bell, Settings, User, Menu, Volume2, VolumeX,
  ChevronDown, Gamepad2, X, Sparkles, LogOut
} from "lucide-react";
import Link from "next/link";

export default function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const user = useStore((s) => s.user);
  const { signOut, user: firebaseUser } = useAuth();
  const [muted, setMuted] = useState(false);

  const filtered = search
    ? [...games, 
        { id: 26, slug: "tebak-pakaian-adat", name: "Tebak Pakaian Adat", icon: "👘", category: "Budaya" as const, description: "Tebak nama pakaian adat dari deskripsi", difficulty: "Sedang" as const, gradient: "from-amber-300 to-orange-400", color: "#FFB74D", kelas: ["4","5","6"], duration: "5 min", mapel: "IPS" as const },
        { id: 27, slug: "cocokkan-pakaian", name: "Cocokkan Pakaian", icon: "🎯", category: "Budaya" as const, description: "Cocokkan pakaian adat dengan provinsi", difficulty: "Sedang" as const, gradient: "from-rose-300 to-pink-400", color: "#F48FB1", kelas: ["4","5","6"], duration: "5 min", mapel: "IPS" as const },
        { id: 28, slug: "puzzle-pakaian-adat", name: "Puzzle Pakaian Adat", icon: "🧩", category: "Budaya" as const, description: "Susun huruf menjadi nama pakaian adat", difficulty: "Sedang" as const, gradient: "from-amber-300 to-orange-400", color: "#FFD54F", kelas: ["4","5","6"], duration: "5 min", mapel: "IPS" as const },
        { id: 29, slug: "siapa-aku", name: "Siapa Aku", icon: "🤔", category: "Budaya" as const, description: "Tebak pakaian adat dari petunjuk", difficulty: "Sedang" as const, gradient: "from-teal-300 to-cyan-400", color: "#80CBC4", kelas: ["4","5","6"], duration: "5 min", mapel: "IPS" as const },
        { id: 30, slug: "roda-budaya", name: "Roda Budaya", icon: "🎡", category: "Budaya" as const, description: "Putar roda budaya dan jawab pertanyaan", difficulty: "Sedang" as const, gradient: "from-purple-300 to-violet-400", color: "#CE93D8", kelas: ["1","2","3","4","5","6"], duration: "5 min", mapel: "IPS" as const },
      ].filter(
        (g) =>
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          g.description.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass-strong border-b border-white/30 z-50 flex items-center px-4 gap-3">
      <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-2xl hover:bg-white/30 transition-all">
        <Menu className="w-5 h-5" />
      </button>
      <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-icon-float" style={{ animationDuration: "4s" }}>
          <Gamepad2 className="w-5 h-5 text-white" />
        </div>
        <span className="hidden sm:block font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          EduGame SD
        </span>
      </Link>
      <div ref={searchRef} className="relative flex-1 max-w-md mx-2">
        <div className="flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              placeholder="Cari game..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowSearch(true); }}
              onFocus={() => setShowSearch(true)}
              className="w-full pl-10 pr-4 py-2.5 glass rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all placeholder-gray-400"
            />
            {search && (
              <button onClick={() => { setSearch(""); setShowSearch(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2 px-3 py-2.5 glass rounded-2xl text-sm text-gray-600 hover:bg-white/40 transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Filter</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>
        {showFilters && (
          <div className="absolute top-full mt-2 left-0 right-0 glass-strong rounded-2xl shadow-xl p-3 flex gap-2 z-50">
            <select value="" onChange={() => {}} className="flex-1 px-3 py-2 glass rounded-xl text-sm focus:outline-none appearance-none cursor-pointer">
              <option value="">Semua Kelas</option>
              {[1,2,3,4,5,6].map((k) => <option key={k} value={String(k)}>Kelas {k}</option>)}
            </select>
            <select value="" onChange={() => {}} className="flex-1 px-3 py-2 glass rounded-xl text-sm focus:outline-none appearance-none cursor-pointer">
              <option value="">Semua Mapel</option>
              {["Bahasa Indonesia","Bahasa Inggris","Matematika","IPA","IPS","Umum"].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value="" onChange={() => {}} className="flex-1 px-3 py-2 glass rounded-xl text-sm focus:outline-none appearance-none cursor-pointer">
              <option value="">Semua Kategori</option>
              {["Bahasa","Matematika","Logika","Pengetahuan","Umum"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}
        {showSearch && filtered.length > 0 && (
          <div className="absolute top-full mt-2 left-0 right-0 glass-strong rounded-2xl shadow-xl max-h-80 overflow-y-auto z-50">
            {filtered.map((g) => (
              <Link
                key={g.id}
                href={`/games/${g.slug}`}
                onClick={() => { setSearch(""); setShowSearch(false); }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50/50 transition-all border-b border-white/20 last:border-0"
              >
                <span className="text-2xl">{g.icon}</span>
                <div>
                  <div className="font-medium text-sm">{g.name}</div>
                  <div className="text-xs text-gray-500">{g.category} · {g.difficulty}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => { const m = audioManager.toggleMute(); setMuted(m); }}
        className="p-2.5 glass rounded-2xl hover:bg-white/40 transition-all"
      >
        {muted ? <VolumeX className="w-5 h-5 text-gray-500" /> : <Volume2 className="w-5 h-5 text-purple-500" />}
      </button>
      <div className="relative">
        <button
          onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
          className="p-2.5 glass rounded-2xl hover:bg-white/40 transition-all relative"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>
        {showNotif && (
          <div className="absolute right-0 top-full mt-2 w-72 glass-strong rounded-2xl shadow-xl p-4 z-50">
            <p className="font-semibold text-sm mb-2 flex items-center gap-1">🔔 Notifikasi</p>
            <div className="glass rounded-xl p-3">
              <p className="text-sm text-gray-600">Selamat datang di EduGame SD! 🎮</p>
              <p className="text-xs text-gray-400 mt-1">Baru saja</p>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <button
          onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
          className="flex items-center gap-2 px-2 py-1.5 glass rounded-2xl hover:bg-white/40 transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm shadow-md overflow-hidden">
            {firebaseUser?.photoURL ? (
              <img src={firebaseUser.photoURL} alt="" className="w-full h-full object-cover" />
            ) : (
              (firebaseUser?.displayName || user.name).charAt(0)
            )}
          </div>
          <span className="hidden sm:block text-sm font-medium">{firebaseUser?.displayName || user.name}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfile ? "rotate-180" : ""}`} />
        </button>
        {showProfile && (
          <div className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-2xl shadow-xl py-2 z-50">
            <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-purple-50/50 transition-all">
              <User className="w-4 h-4 text-purple-500" /> Profil
            </Link>
            <Link href="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-purple-50/50 transition-all">
              <Settings className="w-4 h-4 text-gray-500" /> Pengaturan
            </Link>
            <hr className="my-1 border-white/30" />
            <button
              onClick={() => { signOut(); audioManager.playClick(); }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/50 transition-all w-full"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
