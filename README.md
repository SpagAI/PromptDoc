# PromptDoc

Highlight what your prompt says. See what it forgets.

A prompt checker for AI assistants, WhatsApp bots, voice agents and chatbots. Pick a prompt type, paste a prompt, and PromptDoc scores each section, highlights the prompt by section, and writes a fill-in template for what is missing.

The app is `index.html`. Scoring, highlighting, templates, the Markdown editor, autosave and version history all run in the visitor's browser.

`functions/api/groq.js` is a small Cloudflare Pages Function behind **Improve with AI** and **Test it**. Visitors never need a key or choose a provider. Your Groq key stays in Cloudflare and never reaches the page.

## Templates

Click **Templates** to start from a strong prompt for each type: voice agents (outbound lead follow-up and appointment reminders, inbound receptionist and customer support, with an Inbound / Outbound filter), WhatsApp bots (orders, appointment booking, order tracking, real estate leads), chatbots (app support, shopping assistant, school admissions, staff HR helpdesk) and everyday prompts (social post, complaint reply, meeting summary, product description, explainer).

## Deploy on Cloudflare Pages (free)

1. https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Continue to Pages** → **Import an existing Git repository** → pick **SpagAI/promptdoc**.
2. Settings: production branch `main`, framework preset **None**, build command empty, build output directory `.`.
3. **Save and Deploy**. You get a free `*.pages.dev` link. Every push to `main` redeploys it.

### Turn on Improve with AI (Groq key)

1. Get a free key at https://console.groq.com/keys.
2. Pages project → **Settings** → **Variables and Secrets** → **Add** → type **Secret**, name `GROQ_API_KEY`, paste the key. Optional plain variable `GROQ_MODEL` (default `openai/gpt-oss-120b`).
3. **Deployments** → latest deployment → **⋯** → **Retry deployment**.

All visitors share the Groq free tier's limits. When they run out, visitors see "The AI is busy right now" and can try again a minute later. Until the secret is set, the AI button and the Test tab stay hidden.

## Never lose a prompt

- The prompt is saved in the browser as you type and restored on the next visit.
- **History** keeps up to 40 earlier versions: a copy is saved before a template, the weak example, the improved version or Clear replaces your prompt, before any large deletion, and every couple of minutes while you write.
- Replacing or clearing the prompt shows an **Undo** button. **Clear** needs two clicks. Ctrl+Z / Cmd+Z works as usual.
