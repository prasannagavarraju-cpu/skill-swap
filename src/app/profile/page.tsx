"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  isOffering: boolean;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/skills")
      .then((r) => r.json())
      .then((data: Skill[]) => {
        setSkills(data);
        setLoading(false);
      });
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="h-32 glass rounded-2xl animate-pulse mb-6" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-40 glass rounded-2xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  const mySkills = skills.filter((s: any) => s.userId === session?.user.id || true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Profile header */}
      <div className="glass rounded-2xl p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
          {session?.user?.name?.[0]?.toUpperCase()}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{session?.user?.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{session?.user?.email}</p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs rounded-lg">Member</span>
          </div>
        </div>
      </div>

      {/* Skills section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Skills</h2>
        <a
          href="/post-skill"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors"
        >
          + Add Skill
        </a>
      </div>

      {mySkills.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">You haven&apos;t posted any skills yet.</p>
          <a
            href="/post-skill"
            className="inline-flex px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Post your first skill
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mySkills.map((skill) => (
            <div key={skill.id} className="glass rounded-2xl p-5 card-hover">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${skill.isOffering ? "text-indigo-600 dark:text-indigo-400 bg-indigo-400/10" : "text-pink-600 dark:text-pink-400 bg-pink-400/10"}`}>
                  {skill.isOffering ? "Offering" : "Requesting"}
                </span>
                <span className="text-gray-500 text-xs">{skill.category}</span>
              </div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-1">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{skill.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
