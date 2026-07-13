import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "EduGame SD Indonesia - Belajar Sambil Bermain",
  description: "Platform edukasi interaktif premium untuk siswa SD kelas 1-6 dengan 25 game pendidikan",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen antialiased" style={{ fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif" }}>
        <AuthProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
