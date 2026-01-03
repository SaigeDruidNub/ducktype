import { NextResponse } from "next/server";

const endpoint =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const body = {
      systemInstruction: {
        parts: [
          {
            text:
              "You are Rubber Duck AI. Provide a concise, descriptive title (3-8 words) that summarizes the user's conversation or the provided text. Return ONLY valid JSON that matches the schema. No preamble, no markdown.",
          },
        ],
      },
      contents: [{ role: "user", parts: [{ text }] }],
      generationConfig: {
        max_output_tokens: 64,
        temperature: 0.2,
        response_mime_type: "application/json",
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string", minLength: 1, maxLength: 80 },
          },
          required: ["title"],
        },
      },
    };

    const res = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return NextResponse.json({ error: `Gemini API error: ${res.status}`, details: errText }, { status: res.status });
    }

    const data = await res.json();
    const textOut = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Try to extract JSON defensively
    let parsed: any = null;
    try {
      const start = textOut.indexOf("{");
      const end = textOut.lastIndexOf("}");
      if (start !== -1 && end !== -1 && end > start) {
        parsed = JSON.parse(textOut.slice(start, end + 1));
      }
    } catch (e) {
      // ignore
    }

    const title = (parsed && parsed.title) || null;
    if (title && typeof title === "string" && title.trim()) {
      // sanitize whitespace
      return NextResponse.json({ title: title.trim() });
    }

    // fallback: take the first 6-8 words from input as title
    const fallback = text.split(/\s+/).slice(0, 8).join(" ").slice(0, 80);
    return NextResponse.json({ title: fallback });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
