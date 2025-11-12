"use client";

import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { AuthModal } from "../features/auth/auth-modal";
import { Logo } from "../ui/logo";

export function Header() {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-16 md:h-20 border-b border-gray-800 bg-background">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-4">
          <Logo />

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Home
            </a>
            <a
              href="/matches"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Matches
            </a>
            <a
              href="/predict"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Predict
            </a>
            <a
              href="/teams"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Teams
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-gray-400 text-sm hidden md:inline">
                  {user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal("signin")}
                  className="px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}
