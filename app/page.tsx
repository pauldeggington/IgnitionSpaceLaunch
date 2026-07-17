"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Countdown from "@/components/Countdown";
import LaunchPicker from "@/components/LaunchPicker";
import RecentLaunches from "@/components/RecentLaunches";
import BackgroundImage from "@/components/BackgroundImage";
import type { Launch } from "@/lib/types";

export default function Home() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/launches")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { result: Launch[] }) => {
        setLaunches(data.result);
        setSelectedId((current) => current ?? data.result[0]?.id ?? null);
      })
      .catch((err) => setError(err.message));
  }, []);

  const selected = launches.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundImage src={selected?.image ?? null} />

      <div className="relative flex min-h-screen flex-col">
        <Nav />

        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
          {error && <p className="text-red-300">Error loading launch data: {error}</p>}

          {!error && !selected && <p className="animate-pulse text-white/70">Loading launches…</p>}

          {selected && (
            <>
              <Countdown t0={selected.net} />
              <h2 className="animate-fade-in text-xl text-white/90 sm:text-3xl">
                {selected.name} — {selected.provider}
              </h2>
              <div className="animate-fade-in text-base text-white/70 sm:text-lg">
                {new Date(selected.net).toLocaleString()} · {selected.location}
              </div>
            </>
          )}

          {launches.length > 0 && (
            <div className="mt-4 flex w-full flex-col items-center gap-4 sm:w-auto">
              <LaunchPicker launches={launches} selectedId={selectedId} onSelect={setSelectedId} />
              <RecentLaunches />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
