"use client";

import { useAuth } from "@/context/auth-context";
import { useState, useEffect, useRef } from "react";
import { AuthModal } from "../features/auth/auth-modal";
import { Logo } from "../ui/logo";

export function Header() {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setShowUserMenu(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 h-16 md:h-20 border-b border-gray-800 bg-background">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-4">
          <Logo />

          {/* Desktop Navigation */}
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

          {/* Right side - Icons and Auth */}
          <div className="flex items-center gap-1">
            {/* Hamburger Menu - Mobile Only */}
            <div className="relative md:hidden" ref={mobileMenuRef}>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Mobile Navigation Dropdown */}
              {showMobileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Home
                  </a>
                  <a
                    href="/matches"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Matches
                  </a>
                  <a
                    href="/predict"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Predict
                  </a>
                  <a
                    href="/teams"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Teams
                  </a>
                </div>
              )}
            </div>

            {/* User Avatar Icon - All Screen Sizes */}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
              aria-label="User menu"
            >
              {user ? (
                // User avatar with first letter of email
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                  {user.email?.[0]?.toUpperCase() || "U"}
                </div>
              ) : (
                // Default user icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* User Menu Modal */}
      {showUserMenu && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowUserMenu(false)}
          />

          {/* Modal Content */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm">
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Account</h3>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {user ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-semibold">
                        {user.email?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{user.email}</p>
                        <p className="text-gray-400 text-sm">Signed in</p>
                      </div>
                    </div>

                    {/* Sign Out Button */}
                    <button
                      onClick={() => {
                        signOut();
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Avatar Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    <p className="text-center text-gray-400 text-sm mb-4">
                      Sign in to access your account and personalized features
                    </p>

                    {/* Sign In Button */}
                    <button
                      onClick={() => openAuthModal("signin")}
                      className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                    >
                      Sign In
                    </button>

                    {/* Sign Up Button */}
                    <button
                      onClick={() => openAuthModal("signup")}
                      className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-medium"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}
