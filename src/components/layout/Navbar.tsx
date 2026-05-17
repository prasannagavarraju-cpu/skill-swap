"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={34} />
            <span className="text-gray-900 dark:text-white font-bold text-lg tracking-tight">SkillSwap</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
              Browse Skills
            </Link>
            {session && (
              <>
                <Link href="/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
                  Dashboard
                </Link>
                <Link href="/post-skill" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
                  Post Skill
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                    {session.user?.name?.[0]?.toUpperCase()}
                  </div>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-white/5 flex flex-col gap-3">
            <Link href="/browse" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Browse Skills</Link>
            {session && (
              <>
                <Link href="/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link href="/post-skill" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Post Skill</Link>
                <Link href="/profile" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="text-red-500 dark:text-red-400 text-sm text-left">Sign out</button>
              </>
            )}
            {!session && (
              <>
                <Link href="/auth/login" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Sign in</Link>
                <Link href="/auth/register" className="text-indigo-600 dark:text-indigo-400 text-sm" onClick={() => setMenuOpen(false)}>Get started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
