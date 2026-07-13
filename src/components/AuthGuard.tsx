"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const PUBLIC_PATHS = ["/login"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (loading) return;
    if (!user && !isPublic) {
      router.push("/login");
    }
  }, [user, loading, isPublic, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f0e6ff 0%, #fce7f3 25%, #e0f2fe 50%, #ecfdf5 75%, #fef3c7 100%)" }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user && !isPublic) {
    return null;
  }

  return <>{children}</>;
}
