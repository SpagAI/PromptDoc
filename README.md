# PromptDoc

Highlight what your prompt says. See what it forgets.

A prompt checker for AI assistants, WhatsApp bots, voice agents and chatbots. Pick a prompt type, paste a prompt, and PromptDoc scores each section, highlights the prompt by section, writes a fill-in template for what is missing, and (with an API key) rewrites it and tests both versions side by side.

- `index.html`: the whole app in one file. Scoring, highlighting, templates and the guide run in the browser with no server.
- `functions/api/ai.js`: Cloudflare Pages Function behind **Check with AI** and **Run both**.

## Deploy on Cloudflare Pages

1. https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick **SpagAI/promptdoc**.
2. Settings: production branch `main`, framework preset **None**, build command empty, build output directory `.`, root directory empty.
3. **Save and Deploy**. You get a free `*.pages.dev` link.

### Turn on the AI buttons

1. Pages project → **Settings** → **Variables and Secrets** → add a **Secret** named `ANTHROPIC_API_KEY`.
2. Optional plain variable `CLAUDE_MODEL` (default `claude-opus-5-5`).
3. **Deployments** → **Retry deployment**.

Anyone with the link can use the AI buttons on your key, so set a monthly spend limit in the Anthropic Console before sharing.

Without the key, the AI buttons say they are not set up and everything else keeps working.
