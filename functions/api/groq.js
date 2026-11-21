// PromptDoc free AI (Cloudflare Pages Function).
// The Groq key lives in the GROQ_API_KEY secret on Cloudflare, never in the page,
// so visitors can use the AI features without a key and nobody can copy yours.
// GET  /api/groq          -> { ready, model }
// POST /api/groq {prompt} -> { text } or { error }

const MAX_PROMPT_CHARS = 40000;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export async function onRequestGet({ env }) {
  return json({ ready: Boolean(env.GROQ_API_KEY), model: env.GROQ_MODEL || "openai/gpt-oss-120b" });
}

export async function onRequestPost({ request, env }) {
  if (!env.GROQ_API_KEY) return json({ error: "not_granted" }, 503);

  // Only answer the PromptDoc page itself, not other websites.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: "not_granted" }, 403);

  let body;
  try { body = await request.json(); } catch { return json({ error: "invalid_request" }, 400); }
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return json({ error: "invalid_request" }, 400);
  if (prompt.length > MAX_PROMPT_CHARS) return json({ error: "prompt_too_large" }, 413);

  let res;
  try {
    res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: env.GROQ_MODEL || "openai/gpt-oss-120b",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 8000,
      }),
    });
  } catch {
    return json({ error: "upstream_error" }, 502);
  }
  const data = await res.json().catch(() => null);
  if (res.status === 429) return json({ error: "rate_limited" }, 429);
  if (!res.ok || !data) return json({ error: "upstream_error" }, 502);
  const text = data.choices?.[0]?.message?.content || "";
  if (!text.trim()) return json({ error: "empty_completion" }, 502);
  return json({ text });
}
