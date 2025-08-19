import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

export const runtime = "nodejs";
const schema = z.object({ question: z.string().min(1).max(2000) });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = schema.parse(body);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI brand assistant answering viewer questions about a product video. Be concise and helpful." },
        { role: "user", content: question }
      ]
    });

    const answer = completion.choices?.[0]?.message?.content || "Sorry, I couldn't answer that.";
    return NextResponse.json({ answer });
  } catch (err: any) {
    console.error("ask error:", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 400 });
  }
}
