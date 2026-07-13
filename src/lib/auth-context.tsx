"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useStore } from "@/lib/store";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const storeSetUser = useStore((s) => s.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        storeSetUser({
          name: firebaseUser.displayName || "Siswa",
          avatar: firebaseUser.photoURL || "",
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [storeSetUser]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      storeSetUser({
        name: u.displayName || "Siswa",
        avatar: u.photoURL || "",
      });
      // Store in Turso
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: u.uid,
          name: u.displayName,
          email: u.email,
        }),
      });
    } catch (error: any) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    storeSetUser({ name: "Siswa SD", avatar: "" });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
