import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo size={28} />
              <span className="text-gray-900 dark:text-white font-bold">SkillSwap</span>
            </div>
            <p className="text-gray-500 dark:text-gray-500 text-sm">Exchange skills, grow together.</p>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white text-sm font-semibold mb-3">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link href="/browse" className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors">Browse Skills</Link>
              <Link href="/post-skill" className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors">Post a Skill</Link>
              <Link href="/dashboard" className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors">Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white text-sm font-semibold mb-3">Account</h4>
            <div className="flex flex-col gap-2">
              <Link href="/auth/login" className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors">Sign in</Link>
              <Link href="/auth/register" className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors">Register</Link>
              <Link href="/profile" className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors">Profile</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/5 mt-8 pt-6 text-center">
          <p className="text-gray-400 dark:text-gray-600 text-xs">© 2026 SkillSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
