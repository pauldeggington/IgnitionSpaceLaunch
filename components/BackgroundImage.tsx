"use client";

import { useEffect, useState } from "react";

const FALLBACK = "/p-1-falcon-heavy.jpg";

export default function BackgroundImage({ src }: { src: string | null }) {
  const [current, setCurrent] = useState(FALLBACK);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    const target = src ?? FALLBACK;
    if (target === current) return;
    // preload so the crossfade starts only once the image is ready
    const img = new Image();
    img.onload = () => {
      setPrevious(current);
      setCurrent(target);
    };
    img.onerror = () => {
      setPrevious(current);
      setCurrent(FALLBACK);
    };
    img.src = target;
  }, [src, current]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {previous && (
        <div
          key={`prev-${previous}`}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${previous})` }}
        />
      )}
      <div
        key={current}
        className="animate-bg-fade absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${current})` }}
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
    </div>
  );
}
