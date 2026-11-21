# PromptDoc

Highlight what your prompt says. See what it forgets.

A prompt checker for AI assistants, WhatsApp bots, voice agents and chatbots. Pick a prompt type, paste a prompt, and PromptDoc scores each section, highlights the prompt by section, and writes a fill-in template for what is missing.

Everything runs in the visitor's browser: no server, no API keys, no cost. The whole app is `index.html`.

## Deploy on Cloudflare Pages (free)

1. https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Continue to Pages** → **Import an existing Git repository** → pick **SpagAI/promptdoc**.
2. Settings: production branch `main`, framework preset **None**, build command empty, build output directory `.`.
3. **Save and Deploy**. You get a free `*.pages.dev` link. Every push to `main` redeploys it.
