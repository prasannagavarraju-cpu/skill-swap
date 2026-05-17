import Link from "next/link";
import Logo from "@/components/ui/Logo";

const categories = [
  { name: "Technology", icon: "💻", count: "1.2k+" },
  { name: "Design", icon: "🎨", count: "800+" },
  { name: "Music", icon: "🎵", count: "600+" },
  { name: "Languages", icon: "🌍", count: "900+" },
  { name: "Cooking", icon: "🍳", count: "400+" },
  { name: "Fitness", icon: "💪", count: "500+" },
];

const stats = [
  { label: "Active Users", value: "12,000+" },
  { label: "Skills Listed", value: "45,000+" },
  { label: "Swaps Completed", value: "8,500+" },
  { label: "Categories", value: "50+" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20 pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          <div className="flex justify-center mb-6">
            <Logo size={56} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-indigo-400 text-xs font-medium mb-8">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            Join 12,000+ skill swappers worldwide
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Trade skills.
            <br />
            <span className="gradient-text">Grow together.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            SkillSwap connects people who want to exchange what they know. Teach what you love, learn what you need — no money required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Start swapping free
            </Link>
            <Link
              href="/browse"
              className="px-8 py-3.5 glass hover:bg-white/5 text-white font-medium rounded-xl transition-all"
            >
              Browse skills
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">How it works</h2>
          <p className="text-gray-400">Three simple steps to start swapping</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Post your skill", desc: "Share what you can teach — coding, cooking, languages, music, and more.", href: "/post-skill", cta: "Post a skill" },
            { step: "02", title: "Find a match", desc: "Browse skills others are offering and send a swap request.", href: "/browse", cta: "Browse skills" },
            { step: "03", title: "Start learning", desc: "Accept requests, connect, and grow together. No payment needed.", href: "/dashboard", cta: "Open dashboard" },
          ].map((item) => (
            <Link
              key={item.step}
              href={item.href}
              className="glass rounded-2xl p-8 card-hover group flex flex-col"
            >
              <div className="text-5xl font-black text-indigo-600/30 mb-4">{item.step}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium group-hover:gap-3 transition-all">
                {item.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Explore categories</h2>
          <p className="text-gray-400">Thousands of skills across every domain</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/browse?category=${cat.name}`}
              className="glass rounded-2xl p-6 text-center card-hover group"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <div className="text-white text-sm font-medium group-hover:text-indigo-400 transition-colors">{cat.name}</div>
              <div className="text-gray-500 text-xs mt-1">{cat.count} skills</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 pointer-events-none" />
          <h2 className="text-4xl font-bold text-white mb-4 relative">Ready to swap?</h2>
          <p className="text-gray-400 mb-8 relative">Join thousands of people already exchanging skills.</p>
          <Link
            href="/auth/register"
            className="inline-flex px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all relative"
          >
            Create free account
          </Link>
        </div>
      </section>
    </div>
  );
}
