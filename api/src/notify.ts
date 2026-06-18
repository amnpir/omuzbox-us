import type { TrialPayload } from "./meta.js";

export async function sendEmail(payload: TrialPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL ?? "info@omuzbox.com";
  if (!apiKey) {
    console.warn("Email skipped: RESEND_API_KEY not set");
    return;
  }

  const audienceLabel = payload.audience === "adult" ? "Adult" : "Child";
  const landing = payload.landing ?? "us-55";
  const subject = `New Omuzbox trial request — ${audienceLabel} (${landing})`;
  const html = `
    <h2>New trial lesson request</h2>
    <p><strong>Audience:</strong> ${audienceLabel}</p>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone}</p>
    <p><strong>Promo:</strong> ${payload.promo || "—"}</p>
    <p><strong>Landing:</strong> ${landing}</p>
    <p><strong>Source URL:</strong> ${payload.eventSourceUrl ?? "—"}</p>
    <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Omuzbox <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

function telegramChatIds(): string[] {
  const multi = process.env.TELEGRAM_CHAT_IDS;
  if (multi) {
    return multi.split(",").map((id) => id.trim()).filter(Boolean);
  }
  const single = process.env.TELEGRAM_CHAT_ID;
  return single ? [single.trim()] : [];
}

export async function sendTelegram(payload: TrialPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = telegramChatIds();
  if (!token || chatIds.length === 0) {
    console.warn("Telegram skipped: TELEGRAM_BOT_TOKEN or chat id(s) not set");
    return;
  }

  const audienceLabel = payload.audience === "adult" ? "Adult" : "Child";
  const landing = payload.landing ?? "us-55";
  const text = [
    "🎓 *New Omuzbox trial lesson request*",
    "",
    `*Type:* ${audienceLabel}`,
    `*Name:* ${escapeMarkdown(payload.name)}`,
    `*Email:* ${escapeMarkdown(payload.email)}`,
    `*Phone:* ${escapeMarkdown(payload.phone)}`,
    `*Promo:* ${payload.promo ? escapeMarkdown(payload.promo) : "—"}`,
    `*Landing:* ${landing}`,
    `*Time:* ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET`,
  ].join("\n");

  const results = await Promise.allSettled(
    chatIds.map(async (chatId) => {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Telegram error for chat ${chatId}: ${err}`);
      }
    }),
  );

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length > 0) {
    console.error(failed);
    if (failed.length === results.length) {
      throw failed[0].reason;
    }
  }
}

function escapeMarkdown(value: string): string {
  return value.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}
