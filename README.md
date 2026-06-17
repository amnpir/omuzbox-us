# Omuzbox US Landing

Monorepo for **us.omuzbox.com** (Railway staging URL until custom DNS).

| Path | Service |
|------|---------|
| `lovable-export/` | React landing (TanStack Start + Vite) |
| `api/` | Form API — email, Telegram, Meta CAPI |

## Local dev

```bash
# API
cd api && npm install && cp .env.example .env && npm run dev

# Frontend
cd lovable-export && bun install && bun run dev
```

Frontend env (`lovable-export/.env.local`):

```bash
VITE_SUBMIT_TRIAL_URL=http://localhost:3001/api/submit-trial
VITE_META_PIXEL_ID=
VITE_GA4_MEASUREMENT_ID=
```

## Deploy

See [docs/deploy-railway.md](docs/deploy-railway.md).
