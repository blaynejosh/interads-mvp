import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

export  async function POST(req: NextRequest) {
    try { 
        const form = await req.formData();
        const file = form.get("file") as File | null;
        if (!file) return NextResponse.json({ error: "file required" }, { status: 400});

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        // The OpenAI SDK may require a Node readable stream for files; but for many enivronments this works:
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const transcription = await openai.audio.transcriptions.create({
            file: buffer as any,
            model1:"whisper-1"
        } as any);

        return NextResponse.json({ text: (transcription as any). text || "" });
    }   catch (err: any) {
        console.error("transcribe error:", err);
        return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
    }
}