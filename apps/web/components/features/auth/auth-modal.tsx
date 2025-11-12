"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-surface border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

          {mode === "signin" ? (
            <SignInForm onSuccess={onClose} />
          ) : (
            <SignUpForm onSuccess={onClose} />
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {mode === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <span className="text-primary font-medium">Sign Up</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="text-primary font-medium">Sign In</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      onSuccess();
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 bg-background border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 bg-background border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password);
      onSuccess();
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 bg-background border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 bg-background border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-2 bg-background border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
