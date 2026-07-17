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
  status: { abbrev: string; name: string };
};

export async function GET() {
  const res = await fetch(
    "https://ll.thespacedevs.com/2.2.0/launch/previous/?limit=10&mode=list&ordering=-net",
    { next: { revalidate: 300 } } // ponytail: 5-min cache, same rate-limit budget as /api/launches
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch recent launches" }, { status: 502 });
  }

  const data: { results: LL2Launch[] } = await res.json();
  const launches: (Launch & { statusName: string })[] = data.results.map((l) => ({
    id: l.id,
    name: l.name,
    net: l.net,
    provider: l.lsp_name,
    pad: l.pad,
    location: l.location,
    image: l.image,
    status: l.status?.abbrev ?? "",
    statusName: l.status?.name ?? "",
  }));

  return NextResponse.json({ result: launches });
}
