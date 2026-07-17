export function formatTTime(t0: string, now: number): string {
  const diff = new Date(t0).getTime() - now;
  if (diff <= 0) return "T-0";

  const pad = (n: number) => String(n).padStart(2, "0");
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  return days > 0
    ? `T-${pad(days)}D:${pad(hours)}H:${pad(minutes)}M:${pad(seconds)}S`
    : `T-${pad(hours)}H:${pad(minutes)}M:${pad(seconds)}S`;
}
