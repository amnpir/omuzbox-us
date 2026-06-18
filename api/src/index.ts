import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Context } from "hono";
import { randomUUID } from "node:crypto";

import { sendMetaLead, type TrialPayload } from "./meta.js";
import { sendEmail, sendTelegram } from "./notify.js";
import { validateTrialEmail } from "./validate-email.js";

function validate(body: TrialPayload): string | null {
  if (!body.name?.trim() || body.name.trim().length < 2) return "Name is required";
  const emailErr = validateTrialEmail(body.email ?? "");
  if (emailErr) return emailErr;
  if (!body.phone?.trim() || body.phone.replace(/\D/g, "").length < 6) return "Valid phone is required";
  if (!["adult", "child"].includes(body.audience)) return "Invalid audience type";
  return null;
}

function allowedOrigins(): string[] {
  const raw = process.env.ALLOWED_ORIGINS;
  if (!raw) {
    return ["http://localhost:8080", "http://localhost:5173", "https://us.omuzbox.com"];
  }
  return raw.split(",").map((o) => o.trim()).filter(Boolean);
}

const app = new Hono();

app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowed = allowedOrigins();
      if (!origin) return allowed[0];
      if (allowed.includes(origin)) return origin;
      if (origin.endsWith(".up.railway.app")) return origin;
      return null;
    },
    allowMethods: ["POST", "GET", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

app.get("/health", (c) =>
  c.json({
    ok: true,
    service: "omuzbox-api",
    metaCapi: Boolean(process.env.META_PIXEL_ID && process.env.META_ACCESS_TOKEN),
    email: Boolean(process.env.RESEND_API_KEY),
    telegram: Boolean(
      process.env.TELEGRAM_BOT_TOKEN &&
        (process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_IDS),
    ),
  }),
);

app.post("/api/submit-trial", submitTrial);
app.post("/submit-trial", submitTrial);

const port = Number(process.env.PORT ?? 3001);

serve({ fetch: app.fetch, port }, () => {
  console.log(`Omuzbox API listening on :${port}`);
});

async function submitTrial(c: Context) {
  try {
    const body = (await c.req.json()) as TrialPayload;
    const err = validate(body);
    if (err) return c.json({ error: err }, 400);

    const eventId = body.eventId ?? randomUUID();

    await Promise.all([
      sendEmail(body),
      sendTelegram(body),
      sendMetaLead(body, eventId),
    ]);

    return c.json({ ok: true, eventId });
  } catch (e) {
    console.error(e);
    return c.json(
      { error: "Submission failed. Please try again or contact us on WhatsApp." },
      500,
    );
  }
}
