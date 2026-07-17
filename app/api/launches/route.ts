import { NextResponse } from "next/server";
import type { Launch } from "@/lib/types";

type LL2Launch = {
  id: string;
  name: string;
  net: string;
  lsp_name: string;
  pad: string;
  location: string;
  image: string | null;
  status: { abbrev: string };
};

export async function GET() {
  const res = await fetch(
    "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=100&mode=list",
    { next: { revalidate: 300 } } // ponytail: 5-min cache keeps us well under LL2's 15 req/hr limit
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch launches" }, { status: 502 });
  }

  const data: { results: LL2Launch[] } = await res.json();
  const now = Date.now();
  const launches: Launch[] = data.results
    .filter((l) => l.net && new Date(l.net).getTime() > now)
    .map((l) => ({
      id: l.id,
      name: l.name,
      net: l.net,
      provider: l.lsp_name,
      pad: l.pad,
      location: l.location,
      image: l.image,
      status: l.status?.abbrev ?? "",
    }));

  return NextResponse.json({ result: launches });
}
