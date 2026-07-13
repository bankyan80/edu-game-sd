"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { audioManager } from "@/lib/audio";
import {
  LayoutDashboard, Gamepad2, Heart, Clock, Trophy, Medal,
  User, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, Sparkles
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Semua Game", href: "/dashboard", icon: Gamepad2 },
  { label: "Favorit", href: "/favorites", icon: Heart },
  { label: "Riwayat", href: "/history", icon: Clock },
  { label: "Badge", href: "/badges", icon: Trophy },
  { label: "Leaderboard", href: "/leaderboard", icon: Medal },
  { label: "Profil", href: "/profile", icon: User },
  { label: "Pengaturan", href: "/settings", icon: Settings },
  { label: "Bantuan", href: "/help", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const collapsed = useStore((s) => s.settings.sidebarCollapsed);
  const toggle = useStore((s) => s.updateSettings);

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] glass-strong border-r border-white/30 z-40 transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-60"}`}>
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item, i) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => audioManager.playClick()}
              className={`flex items-center gap-3 mx-2 mb-1 rounded-2xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-gray-600 hover:bg-purple-50/50 hover:text-purple-600 hover:shadow-sm"
              } ${collapsed ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"}`}
              title={collapsed ? item.label : undefined}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/30 p-2">
        <button
          onClick={() => toggle({ sidebarCollapsed: !collapsed })}
          className="flex items-center justify-center w-full py-2.5 rounded-2xl text-gray-500 hover:bg-purple-50/50 hover:text-purple-600 transition-all"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        <Link
          href="/dashboard"
          onClick={() => audioManager.playClick()}
          className={`flex items-center gap-3 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-50/50 transition-all ${collapsed ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"}`}
          title={collapsed ? "Keluar" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </Link>
      </div>
    </aside>
  );
}
