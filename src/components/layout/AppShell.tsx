"use client";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useStore } from "@/lib/store";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const collapsed = useStore((s) => s.settings.sidebarCollapsed);
  const toggle = useStore((s) => s.updateSettings);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0e6ff 0%, #fce7f3 25%, #e0f2fe 50%, #ecfdf5 75%, #fef3c7 100%)" }}>
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-pink-200/30 rounded-full blur-[80px] translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-[80px] translate-y-1/2" />
      </div>

      <Header onToggleSidebar={() => setMobileOpen(!mobileOpen)} />
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}
      <main className={`pt-16 transition-all duration-300 relative z-10 ${collapsed ? "lg:ml-16" : "lg:ml-60"}`}>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
