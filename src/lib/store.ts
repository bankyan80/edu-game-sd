"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProgress, GameHistory } from "@/types";

interface AppStore {
  user: { name: string; avatar: string; school: string; kelas: string };
  progress: UserProgress;
  settings: { sound: boolean; volume: number; sidebarCollapsed: boolean };
  setUser: (u: Partial<AppStore["user"]>) => void;
  addPoints: (p: number) => void;
  addXP: (xp: number) => void;
  addHistory: (e: GameHistory) => void;
  toggleFavorite: (id: number) => void;
  unlockBadge: (id: string) => void;
  setHighScore: (gameId: string, score: number) => void;
  incrementGamesPlayed: (gameId: string) => void;
  updateSettings: (s: Partial<AppStore["settings"]>) => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  level: 1, xp: 0, totalPoints: 0, badges: [], highScores: {},
  gamesPlayed: {}, favorites: [], history: [],
};

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      user: { name: "Siswa SD", avatar: "", school: "SDN 01 Jakarta", kelas: "4A" },
      progress: defaultProgress,
      settings: { sound: true, volume: 0.7, sidebarCollapsed: false },
      setUser: (u) => set((s) => ({ user: { ...s.user, ...u } })),
      addPoints: (p) => set((s) => ({ progress: { ...s.progress, totalPoints: s.progress.totalPoints + p } })),
      addXP: (xp) => set((s) => {
        let nxp = s.progress.xp + xp;
        let nl = s.progress.level;
        while (nxp >= nl * 100) { nxp -= nl * 100; nl++; }
        return { progress: { ...s.progress, xp: nxp, level: nl } };
      }),
      addHistory: (e) => set((s) => ({ progress: { ...s.progress, history: [e, ...s.progress.history].slice(0, 200) } })),
      toggleFavorite: (id) => set((s) => ({
        progress: { ...s.progress, favorites: s.progress.favorites.includes(id) ? s.progress.favorites.filter((i) => i !== id) : [...s.progress.favorites, id] },
      })),
      unlockBadge: (id) => set((s) => s.progress.badges.includes(id) ? s : ({
        progress: { ...s.progress, badges: [...s.progress.badges, id] },
      })),
      setHighScore: (gid, sc) => set((s) => ({
        progress: { ...s.progress, highScores: { ...s.progress.highScores, [gid]: Math.max(s.progress.highScores[gid] || 0, sc) } },
      })),
      incrementGamesPlayed: (gid) => set((s) => ({
        progress: { ...s.progress, gamesPlayed: { ...s.progress.gamesPlayed, [gid]: (s.progress.gamesPlayed[gid] || 0) + 1 } },
      })),
      updateSettings: (st) => set((s) => ({ settings: { ...s.settings, ...st } })),
      resetProgress: () => set({ progress: defaultProgress }),
    }),
    { name: "edugame-storage" }
  )
);
