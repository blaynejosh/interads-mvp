import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body?.text;
    if (!text || typeof text !== "string") return NextResponse.json({ error: "text required" }, { status: 400 });

    const DID_KEY = process.env.DID_API_KEY;
    const IMAGE_URL = body?.imageUrl || process.env.AVATAR_SOURCE_IMAGE_URL;
    const VOICE = body?.voice || "alloy";
    if (!DID_KEY) return NextResponse.json({ error: "D-ID key not set" }, { status: 500 });
    if (!IMAGE_URL) return NextResponse.json({ error: "imageUrl or AVATAR_SOURCE_IMAGE_URL required" }, { status: 400 });

    const payload = { source_url: IMAGE_URL, script: { type: "text", text }, voice: VOICE };

    const didResp = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${DID_KEY}` },
      body: JSON.stringify(payload)
    });

    const data = await didResp.json();
    if (!didResp.ok) {
      return NextResponse.json({ error: data ?? `D-ID ${didResp.status}` }, { status: 502 });
    }

    // data likely contains job id; return it. Implement webhook/polling to get final output_url.
    return NextResponse.json({ data });
  } catch (err: any) {
    console.error("avatar error:", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
