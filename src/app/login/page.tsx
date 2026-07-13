"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import Game3DIcon from "@/components/game/Game3DIcon";
import { FloatingClouds, SunRays } from "@/components/game/FloatingEffects";
import Mascot from "@/components/game/Mascot";
import { Gamepad2, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f0e6ff 0%, #fce7f3 25%, #e0f2fe 50%, #ecfdf5 75%, #fef3c7 100%)" }}>
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (user) {
    router.push("/dashboard");
    return null;
  }

  const handleSignIn = async () => {
    setSigningIn(true);
    setError("");
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (e: any) {
      setError("Gagal masuk. Coba lagi ya!");
      setSigningIn(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0e6ff 0%, #fce7f3 25%, #e0f2fe 50%, #ecfdf5 75%, #fef3c7 100%)" }}
    >
      <FloatingClouds intensity="medium" />
      <SunRays />

      {/* Ambient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200/30 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Main card */}
        <div className="glass-strong rounded-[2rem] p-8 shadow-2xl text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl animate-icon-float" style={{ animationDuration: "4s" }}>
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2"
          >
            EduGame SD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-sm mb-8"
          >
            Belajar sambil bermain! 🎮
          </motion.p>

          {/* Mascot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Mascot mood="happy" size="lg" message="Hai! Masuk yuk!" />
          </motion.div>

          {/* Game preview icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-3 mb-8"
          >
            {["tebak-huruf", "matematika-cepat", "quiz-ipa", "memory-card", "tebak-hewan"].map((slug, i) => (
              <div key={slug} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                <Game3DIcon slug={slug} size="sm" />
              </div>
            ))}
          </motion.div>

          {/* Google Sign In */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={handleSignIn}
            disabled={signingIn}
            className="w-full py-4 bg-white rounded-2xl font-bold text-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signingIn ? (
              <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {signingIn ? "Masuk..." : "Masuk dengan Google"}
          </motion.button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-xs text-gray-400 text-center"
          >
            Platform edukasi untuk siswa SD kelas 1-6
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
