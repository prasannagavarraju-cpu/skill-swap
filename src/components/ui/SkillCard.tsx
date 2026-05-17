"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  isOffering: boolean;
  credentials: string | null;
  user: { id: string; name: string; avatar: string | null; location: string | null };
  createdAt: string;
}

const levelColors: Record<string, string> = {
  BEGINNER: "text-green-400 bg-green-400/10",
  INTERMEDIATE: "text-yellow-400 bg-yellow-400/10",
  ADVANCED: "text-orange-400 bg-orange-400/10",
  EXPERT: "text-red-400 bg-red-400/10",
};

export default function SkillCard({ skill }: { skill: Skill }) {
  const { data: session } = useSession();
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!session) { window.location.href = "/auth/login"; return; }
    setLoading(true);
    await fetch("/api/swap-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId: skill.user.id, skillId: skill.id, message: `I'd love to swap skills with you!` }),
    });
    setLoading(false);
    setRequested(true);
  };

  return (
    <div className="glass rounded-2xl p-6 card-hover flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${levelColors[skill.level] || "text-gray-400 bg-gray-400/10"}`}>
          {skill.level.charAt(0) + skill.level.slice(1).toLowerCase()}
        </span>
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${skill.isOffering ? "text-indigo-400 bg-indigo-400/10" : "text-pink-400 bg-pink-400/10"}`}>
          {skill.isOffering ? "Offering" : "Requesting"}
        </span>
      </div>

      <div>
        <h3 className="text-white font-semibold text-lg mb-1">{skill.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{skill.description}</p>
        {skill.credentials && (
          <p className="text-indigo-300/70 text-xs mt-2 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            {skill.credentials}
          </p>
        )}
      </div>

      <div className="text-xs text-indigo-400 bg-indigo-400/10 px-2.5 py-1 rounded-lg w-fit">
        {skill.category}
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
            {skill.user.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="text-white text-sm font-medium">{skill.user.name}</div>
            {skill.user.location && (
              <div className="text-gray-500 text-xs">{skill.user.location}</div>
            )}
          </div>
        </div>

        {session?.user.id !== skill.user.id && (
          <button
            onClick={handleRequest}
            disabled={loading || requested}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              requested
                ? "bg-green-500/10 text-green-400 cursor-default"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            {requested ? "Requested ✓" : loading ? "..." : "Request"}
          </button>
        )}
      </div>
    </div>
  );
}
