"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Technology", "Design", "Music", "Languages", "Cooking", "Fitness", "Art", "Business", "Other"];
const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

export default function PostSkillPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Technology",
    level: "BEGINNER",
    isOffering: true,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (status === "loading") return null;
  if (!session) { router.push("/auth/login"); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/browse"), 1500);
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Post a Skill</h1>
        <p className="text-gray-400">Share what you can teach or what you want to learn</p>
      </div>

      <div className="glass rounded-2xl p-8">
        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-white font-semibold text-lg">Skill posted!</p>
            <p className="text-gray-400 text-sm mt-1">Redirecting to browse...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Offering / Requesting toggle */}
            <div>
              <label className="text-gray-300 text-sm font-medium block mb-3">Type</label>
              <div className="flex gap-3">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setForm({ ...form, isOffering: val })}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      form.isOffering === val
                        ? val ? "bg-indigo-600 text-white" : "bg-pink-600 text-white"
                        : "glass text-gray-400"
                    }`}
                  >
                    {val ? "I'm offering" : "I'm requesting"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium block mb-2">Skill title</label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Python Programming, Guitar Lessons"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium block mb-2">Description</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe what you'll teach or what you want to learn..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">Level</label>
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-gray-900">
                      {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              {loading ? "Posting..." : "Post skill"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
