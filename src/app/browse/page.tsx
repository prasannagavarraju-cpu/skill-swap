"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SkillCard from "@/components/ui/SkillCard";
import { Suspense } from "react";

const CATEGORIES = ["All", "Technology", "Design", "Music", "Languages", "Cooking", "Fitness", "Art", "Business"];
const LEVELS = ["All", "BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  isOffering: boolean;
  user: { id: string; name: string; avatar: string | null; location: string | null };
  createdAt: string;
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [level, setLevel] = useState("All");

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (category !== "All") params.set("category", category);
      if (level !== "All") params.set("level", level);
      if (search) params.set("search", search);

      const res = await fetch(`/api/skills?${params.toString()}`);
      const data = await res.json();
      setSkills(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    const timeout = setTimeout(fetchSkills, 300);
    return () => clearTimeout(timeout);
  }, [search, category, level]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Browse Skills</h1>
        <p className="text-gray-400">Discover skills people are offering and requesting</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat
                  ? "bg-indigo-600 text-white"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              level === lvl
                ? "bg-purple-600 text-white"
                : "glass text-gray-400 hover:text-white"
            }`}
          >
            {lvl === "All" ? "All Levels" : lvl.charAt(0) + lvl.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-2xl h-52 animate-pulse" />
          ))}
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-400">No skills found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowseContent />
    </Suspense>
  );
}
