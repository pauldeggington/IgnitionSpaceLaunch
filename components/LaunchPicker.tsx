"use client";

import { useMemo, useState } from "react";
import type { Launch } from "@/lib/types";

const ALL_SITES = "All sites";
const ALL_PROVIDERS = "All providers";

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function LaunchPicker({
  launches,
  selectedId,
  onSelect,
}: {
  launches: Launch[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [site, setSite] = useState(ALL_SITES);
  const [provider, setProvider] = useState(ALL_PROVIDERS);

  const sites = useMemo(() => {
    const names = new Set(launches.map((l) => l.location).filter(Boolean));
    return [ALL_SITES, ...Array.from(names).sort()];
  }, [launches]);

  const providers = useMemo(() => {
    const names = new Set(launches.map((l) => l.provider).filter(Boolean));
    return [ALL_PROVIDERS, ...Array.from(names).sort()];
  }, [launches]);

  const filtered = useMemo(
    () =>
      launches
        .filter((l) => site === ALL_SITES || l.location === site)
        .filter((l) => provider === ALL_PROVIDERS || l.provider === provider),
    [launches, site, provider]
  );

  const selected = launches.find((l) => l.id === selectedId) ?? null;

  const selectClass =
    "w-full max-w-[90vw] rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:border-white/40 focus:border-white/60 focus:outline-none sm:w-auto sm:max-w-[40vw]";

  return (
    <div className="flex max-w-full flex-col items-center justify-center gap-3">
      <div className="flex max-w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
        <select value={site} onChange={(e) => setSite(e.target.value)} className={selectClass}>
          {sites.map((s) => (
            <option key={s} value={s} className="bg-black">
              {s}
            </option>
          ))}
        </select>

        <select value={provider} onChange={(e) => setProvider(e.target.value)} className={selectClass}>
          {providers.map((p) => (
            <option key={p} value={p} className="bg-black">
              {p}
            </option>
          ))}
        </select>
      </div>

      <select
        value={selected && filtered.includes(selected) ? selected.id : ""}
        onChange={(e) => onSelect(e.target.value)}
        className={selectClass + " sm:max-w-[80vw]"}
      >
        {filtered.length === 0 && <option value="">No launches match those filters</option>}
        {filtered.map((l) => (
          <option key={l.id} value={l.id} className="bg-black">
            {shortDate(l.net)} — {l.name} — {l.pad}
          </option>
        ))}
      </select>
    </div>
  );
}
