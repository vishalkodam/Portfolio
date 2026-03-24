function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "*";
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST,OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    "vary": "Origin",
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (request.method !== "POST" || url.pathname !== "/chat") {
      return json(
        { error: "Not found" },
        { status: 404, headers: corsHeaders(request) }
      );
    }

    if (!env.GROQ_API_KEY) {
      return json(
        { error: "Server not configured (missing GROQ_API_KEY)" },
        { status: 500, headers: corsHeaders(request) }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json(
        { error: "Invalid JSON" },
        { status: 400, headers: corsHeaders(request) }
      );
    }

    const question = typeof body?.question === "string" ? body.question.trim() : "";
    const context = typeof body?.context === "string" ? body.context.trim() : "";

    if (!question) {
      return json(
        { error: "Missing question" },
        { status: 400, headers: corsHeaders(request) }
      );
    }

    const maxTokens = clamp(Number(body?.maxTokens ?? 400), 64, 800);
    const temperature = clamp(Number(body?.temperature ?? 0.3), 0, 1.2);

    const system = [
      "You are a helpful portfolio assistant for Vishal Kodam.",
      "Answer ONLY using the provided CONTEXT. If the answer is not in the CONTEXT, say you don't have that information and suggest what to ask instead.",
      "Be concise, accurate, and professional. Do not fabricate details.",
    ].join("\n");

    const user = `CONTEXT:\n${context || "(no additional context provided)"}\n\nQUESTION:\n${question}`;

    const model = env.GROQ_MODEL || "llama-3.1-70b-versatile";

    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.GROQ_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      return json(
        { error: "Upstream LLM error", status: resp.status, details: text.slice(0, 500) },
        { status: 502, headers: corsHeaders(request) }
      );
    }

    const data = await resp.json();
    const answer =
      data?.choices?.[0]?.message?.content?.toString?.().trim?.() || "";

    return json(
      { answer },
      { status: 200, headers: corsHeaders(request) }
    );
  },
};

