"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SwapRequest {
  id: string;
  message: string;
  status: string;
  createdAt: string;
  sender: { id: string; name: string; avatar: string | null };
  receiver: { id: string; name: string; avatar: string | null };
  skill: { id: string; title: string; category: string };
}

const statusColors: Record<string, string> = {
  PENDING: "text-yellow-600 dark:text-yellow-400 bg-yellow-400/10",
  ACCEPTED: "text-green-600 dark:text-green-400 bg-green-400/10",
  REJECTED: "text-red-600 dark:text-red-400 bg-red-400/10",
  COMPLETED: "text-indigo-600 dark:text-indigo-400 bg-indigo-400/10",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"received" | "sent">("received");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/swap-requests")
      .then((r) => r.json())
      .then((data) => { setRequests(data); setLoading(false); });
  }, [session]);

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch("/api/swap-requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const received = requests.filter((r) => r.receiver.id === session?.user.id);
  const sent = requests.filter((r) => r.sender.id === session?.user.id);
  const displayed = tab === "received" ? received : sent;

  if (status === "loading" || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-gray-200 dark:bg-white/5 rounded-xl animate-pulse mb-8" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-24 glass rounded-2xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your swap requests</p>
        </div>
        <Link
          href="/post-skill"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors"
        >
          + Post Skill
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Requests", value: requests.length },
          { label: "Received", value: received.length },
          { label: "Sent", value: sent.length },
          { label: "Completed", value: requests.filter((r) => r.status === "COMPLETED").length },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["received", "sent"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t ? "bg-indigo-600 text-white" : "glass text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)} ({t === "received" ? received.length : sent.length})
          </button>
        ))}
      </div>

      {/* Requests list */}
      {displayed.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-600 dark:text-gray-400">No {tab} requests yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {displayed.map((req) => {
            const other = tab === "received" ? req.sender : req.receiver;
            return (
              <div key={req.id} className="glass rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {other.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">{other.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tab === "received" ? "wants" : "you requested"} · <span className="text-indigo-600 dark:text-indigo-400">{req.skill.title}</span>
                    </p>
                    {req.message && <p className="text-gray-500 text-xs mt-1">"{req.message}"</p>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${statusColors[req.status]}`}>
                    {req.status}
                  </span>

                  {tab === "received" && req.status === "PENDING" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(req.id, "ACCEPTED")}
                        className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-600 dark:text-green-400 text-xs rounded-lg transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(req.id, "REJECTED")}
                        className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400 text-xs rounded-lg transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  {req.status === "ACCEPTED" && (
                    <button
                      onClick={() => updateStatus(req.id, "COMPLETED")}
                      className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs rounded-lg transition-colors"
                    >
                      Mark done
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
