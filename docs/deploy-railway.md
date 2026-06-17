# Deploy Omuzbox US landing (no Supabase)

Two pieces:

1. **Frontend** — `lovable-export/` (static React landing)
2. **API** — `api/` (form → email, Telegram, Meta CAPI)

---

## What Supabase was (and why we removed it)

Supabase was only a **host for a small backend function** (form handler). It was not required for the site design. We replaced it with **`api/`** — same job, runs on **Railway** (or any Node host).

---

## 1. Deploy API on Railway

1. Create project at [railway.app](https://railway.app)
2. **New service** → Deploy from repo → set **Root directory** to `api`
3. Variables (from `api/.env.example`):

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Email to info@omuzbox.com |
| `NOTIFY_EMAIL` | `info@omuzbox.com` |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | Optional instant alerts |
| `META_PIXEL_ID` | Same as Facebook Pixel ID |
| `META_ACCESS_TOKEN` | CAPI token from Meta Events Manager |
| `META_EVENT_SOURCE_URL` | `https://us.omuzbox.com` |
| `ALLOWED_ORIGINS` | `https://us.omuzbox.com,http://localhost:8080` |

4. Generate domain → e.g. `https://omuzbox-api.up.railway.app`
5. Test: `curl https://your-api.up.railway.app/health`

Form endpoint: `POST /api/submit-trial`

---

## 2. Meta Pixel + CAPI setup

### Browser pixel (frontend)

1. Meta Events Manager → **Data sources** → your Pixel → copy **Pixel ID**
2. In `lovable-export/.env.local`:

```bash
VITE_META_PIXEL_ID=your_pixel_id
VITE_SUBMIT_TRIAL_URL=https://your-api.up.railway.app/api/submit-trial
```

3. Build & deploy frontend. Pixel fires **PageView** on load, **Lead** on form success, **InitiateCheckout** on CTA clicks.

### Server CAPI (API on Railway)

1. Events Manager → Pixel → **Settings** → **Conversions API** → Generate **access token**
2. Set on Railway:

```bash
META_PIXEL_ID=same_pixel_id
META_ACCESS_TOKEN=your_capi_token
META_EVENT_SOURCE_URL=https://us.omuzbox.com
```

3. On form submit, API sends **Lead** with hashed email/phone + same `eventId` as browser (deduplication).

### Test

- Events Manager → **Test events** → enter browser test code, submit form
- You should see **Lead** from browser + server (may show as one deduped event)

---

## 3. Deploy frontend

### Option A — Railway (static)

```bash
cd lovable-export
bun install
# set VITE_* in Railway build env or .env.production.local
bun run build
# Serve dist/client — add a static service or use `npx serve dist/client -s`
```

### Option B — Vercel / Netlify (free, common)

- Root: `lovable-export`
- Build: `bun run build`
- Output: `dist/client`
- Env: `VITE_SUBMIT_TRIAL_URL`, `VITE_META_PIXEL_ID`

### DNS

Point `us.omuzbox.com` CNAME to your host.

---

## 4. Two pricing landings (A/B)

Same codebase, different `landing` tag in form:

- `us.omuzbox.com` → `landing: "us-55"` (default)
- Second URL/route later → `landing: "us-40"`

Meta reports can filter by URL or custom `landing` in CAPI `custom_data`.

---

## Local dev

```bash
# API
cd api && npm install && cp .env.example .env
npm run dev   # :3001

# Frontend
cd lovable-export && bun run dev   # :8080
# .env.local:
# VITE_SUBMIT_TRIAL_URL=http://localhost:3001/api/submit-trial
# VITE_META_PIXEL_ID=...
```
