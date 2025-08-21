import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { question } = await req.json();
    if (!question) return NextResponse.json({ error: "question required" }, { status: 400 });

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI brand assistant answering viewer questions about a product video. Be concise, honest, and helpful." },
        { role: "user", content: question }
      ],
    });

    const answer = completion.choices?.[0]?.message?.content || "Sorry, I couldn't find that.";
    return NextResponse.json({ answer });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
