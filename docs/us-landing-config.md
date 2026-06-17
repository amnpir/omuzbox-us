# Omuzbox US Landing — Business Config

## Two landing variants (pricing)

| Landing | Starting price | Lovable project |
|---------|----------------|-------------------|
| **Premium US** | **$55 / lesson** | Omuzbox English Journey (`f554ea18-025d-440a-84a2-bdd90eead593`) |
| **Standard US** | **$40 / lesson** | Second landing (to be created) |

### Premium ($55) — suggested tiers

| Plan | Lessons | $/lesson | Total |
|------|---------|--------|-------|
| Start | 8 | $55 | $440 |
| Progress (Popular) | 16 | $48 | $768 |
| Maximum (Best value) | 32 | $42 | $1,344 |

### Standard ($40) — suggested tiers

| Plan | Lessons | $/lesson | Total |
|------|---------|--------|-------|
| Start | 8 | $40 | $320 |
| Progress (Popular) | 16 | $35 | $560 |
| Maximum (Best value) | 32 | $30 | $960 |

## Contacts

- **Email:** info@omuzbox.com
- **WhatsApp:** +48 576 541 989 → https://wa.me/48576541989
- **Telegram:** @omuzboxss → https://t.me/omuzboxss
- **Facebook:** coming later

## Trial form flow

1. User fills: Name, Email, Phone, Promo (optional), Adult/Child tab
2. **Email** sent to info@omuzbox.com with all fields
3. **Telegram** notification to admin with same data (first automated alert)
4. WhatsApp: icon link for users; automated WhatsApp optional later (Business API)

## Required secrets (`.env`)

```
RESEND_API_KEY=          # https://resend.com — sends email to info@omuzbox.com
TELEGRAM_BOT_TOKEN=      # @BotFather on Telegram
TELEGRAM_CHAT_ID=        # your admin chat / group ID
SUPABASE_URL=            # if using Supabase Edge Function
SUPABASE_ANON_KEY=       # public anon key for form POST
```

### Telegram bot setup (5 min)

1. Open Telegram → search **@BotFather** → `/newbot` → copy token
2. Send any message to your new bot
3. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` → find `"chat":{"id":...}`
4. Put token + chat id in env vars
