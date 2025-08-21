import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }

    const ELEVEN_KEY = process.env.ELEVENLABS_API_KEY;
    const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";

    if (!ELEVEN_KEY) {
      return NextResponse.json({ error: "ElevenLabs key not set" }, { status: 500 });
    }

    const elevenUrl = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`;
    const resp = await fetch(elevenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVEN_KEY,
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({ text }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return NextResponse.json(
        { error: `ElevenLabs ${resp.status}: ${txt}` },
        { status: 502 }
      );
    }

    const arrayBuffer = await resp.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:audio/mpeg;base64,${base64}`;

    // For demo we return data URL; for production upload to S3 and return signed URL instead.
    return NextResponse.json({ audioDataUrl: dataUrl });
  } catch (err) {
    console.error("tts error:", err);
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
