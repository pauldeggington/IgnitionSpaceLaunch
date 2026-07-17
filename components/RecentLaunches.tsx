"use client";

import { useEffect, useState } from "react";
import type { Launch } from "@/lib/types";

type RecentLaunch = Launch & { statusName: string };

function statusColor(abbrev: string) {
  if (abbrev === "Success") return "bg-emerald-400";
  if (abbrev === "Failure") return "bg-red-400";
  return "bg-yellow-400";
}

export default function RecentLaunches() {
  const [launches, setLaunches] = useState<RecentLaunch[]>([]);

  useEffect(() => {
    fetch("/api/launches/recent")
      .then((res) => res.json())
      .then((data: { result: RecentLaunch[] }) => setLaunches(data.result ?? []))
      .catch(() => setLaunches([]));
  }, []);

  if (launches.length === 0) return null;

  return (
    <details className="animate-fade-in group w-full max-w-[90vw] text-left sm:max-w-lg">
      <summary className="cursor-pointer list-none rounded-md border border-white/20 bg-black/40 px-3 py-2 text-center text-sm text-white/80 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white">
        Recent launches ▾
      </summary>
      <ul className="mt-2 max-h-64 w-full overflow-y-auto overflow-x-hidden rounded-md border border-white/10 bg-black/40 backdrop-blur-sm">
        {launches.map((l) => (
          <li key={l.id} className="flex min-w-0 items-center gap-3 border-b border-white/10 px-3 py-2 text-sm last:border-none">
            <span className={`h-2 w-2 shrink-0 rounded-full ${statusColor(l.status)}`} title={l.statusName} />
            <span className="shrink-0 text-white/50">{new Date(l.net).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
            <span className="min-w-0 flex-1 truncate text-white/90">{l.name}</span>
            <span className="max-w-[35%] shrink-0 truncate text-right text-white/40">{l.provider}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
