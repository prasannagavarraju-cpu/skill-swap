import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="text-white font-bold">SkillSwap</span>
            </div>
            <p className="text-gray-500 text-sm">Exchange skills, grow together.</p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link href="/browse" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Browse Skills</Link>
              <Link href="/post-skill" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Post a Skill</Link>
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Account</h4>
            <div className="flex flex-col gap-2">
              <Link href="/auth/login" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Sign in</Link>
              <Link href="/auth/register" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Register</Link>
              <Link href="/profile" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Profile</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-xs">© 2026 SkillSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
