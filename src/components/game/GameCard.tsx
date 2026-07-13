"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { audioManager } from "@/lib/audio";
import { motion } from "framer-motion";
import { Star, Play, Heart, Eye, Users } from "lucide-react";
import type { Game } from "@/types";
import { useState, useRef } from "react";
import Game3DIcon from "./Game3DIcon";

export default function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const favs = useStore((s) => s.progress.favorites);
  const toggleFav = useStore((s) => s.toggleFavorite);
  const played = useStore((s) => s.progress.gamesPlayed[game.id] || 0);
  const highScore = useStore((s) => s.progress.highScores[game.id] || 0);
  const isFav = favs.includes(game.id);
  const [showPreview, setShowPreview] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }
  };

  const popular = played > 5;
  const isNew = game.id <= 3;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="group relative glass rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-400 overflow-hidden cursor-pointer border border-white/40"
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s ease" }}
      >
        {/* Top gradient area with 3D icon */}
        <div className={`h-36 bg-gradient-to-br ${game.gradient} flex items-center justify-center relative overflow-hidden`}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-2 text-4xl opacity-30 animate-float-slow">✦</div>
            <div className="absolute bottom-3 right-3 text-3xl opacity-20 animate-float" style={{ animationDelay: "1s" }}>✦</div>
            <div className="absolute top-1/2 left-1/3 text-2xl opacity-15 animate-float-slow" style={{ animationDelay: "0.5s" }}>✦</div>
          </div>

          {/* Glossy overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)",
            }}
          />

          {/* 3D Icon */}
          <div className="relative z-10 group-hover:scale-110 transition-transform duration-400">
            <Game3DIcon slug={game.slug} size="lg" />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(game.id); audioManager.playClick(); }}
              className="p-2 glass-strong rounded-full hover:scale-110 transition-transform"
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
            </button>
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            <span className="glass-strong px-2.5 py-1 rounded-full text-xs font-bold text-gray-700">
              #{game.id}
            </span>
            {popular && (
              <span className="bg-orange-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg animate-pulse">
                🔥 Populer
              </span>
            )}
            {isNew && (
              <span className="bg-green-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg">
                ✨ Baru
              </span>
            )}
          </div>
        </div>

        {/* Card content */}
        <div className="p-4">
          <h3 className="font-bold text-sm text-gray-800 mb-1.5 truncate leading-tight">{game.name}</h3>
          <p className="text-[11px] text-gray-500 mb-2 line-clamp-1">{game.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            <span className="px-2 py-0.5 bg-purple-100/80 text-purple-700 rounded-full text-[10px] font-semibold">{game.category}</span>
            <span className="px-2 py-0.5 bg-blue-100/80 text-blue-700 rounded-full text-[10px] font-semibold">{game.difficulty}</span>
            <span className="px-2 py-0.5 bg-green-100/80 text-green-700 rounded-full text-[10px] font-semibold">{game.duration}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
            <span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{played}x</span>
            <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{highScore}</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Link
              href={`/games/${game.slug}`}
              onClick={() => audioManager.playClick()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl text-xs font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg ripple-container"
            >
              <Play className="w-3.5 h-3.5 fill-white" />Mainkan
            </Link>
            <button
              onClick={(e) => { e.preventDefault(); setShowPreview(true); audioManager.playClick(); }}
              className="px-3 py-2.5 glass rounded-2xl text-gray-600 hover:bg-gray-100 transition-all hover:scale-105"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowPreview(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-strong rounded-3xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-44 bg-gradient-to-br ${game.gradient} rounded-2xl flex items-center justify-center mb-5 relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-3 left-3 text-5xl opacity-40 animate-float-slow">✦</div>
                <div className="absolute bottom-4 right-4 text-4xl opacity-30 animate-float">✦</div>
              </div>
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
              <Game3DIcon slug={game.slug} size="xl" />
            </div>
            <h2 className="text-xl font-bold mb-1 text-gray-800">{game.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{game.description}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 bg-purple-100/80 text-purple-700 rounded-full text-sm font-semibold">{game.category}</span>
              <span className="px-3 py-1 bg-blue-100/80 text-blue-700 rounded-full text-sm font-semibold">{game.mapel}</span>
              <span className="px-3 py-1 bg-green-100/80 text-green-700 rounded-full text-sm font-semibold">{game.difficulty}</span>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/games/${game.slug}`}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-center hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg ripple-container"
              >
                Mainkan Sekarang 🚀
              </Link>
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-3 glass rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition-all"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
