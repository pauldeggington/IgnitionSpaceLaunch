"use client";

import { useEffect, useState } from "react";
import { formatTTime } from "@/lib/countdown";

export default function Countdown({ t0 }: { t0: string }) {
  const [text, setText] = useState(() => formatTTime(t0, Date.now()));

  useEffect(() => {
    setText(formatTTime(t0, Date.now()));
    const id = setInterval(() => setText(formatTTime(t0, Date.now())), 1000);
    return () => clearInterval(id);
  }, [t0]);

  return (
    <div
      key={t0}
      className="animate-fade-in text-[9vw] leading-none whitespace-nowrap text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-[8vw]"
    >
      {text}
    </div>
  );
}
