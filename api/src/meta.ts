import { createHash } from "node:crypto";

export type TrialPayload = {
  name: string;
  email: string;
  phone: string;
  promo?: string;
  audience: "adult" | "child";
  landing?: string;
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  clientUserAgent?: string;
};

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendMetaLead(payload: TrialPayload, eventId: string): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    console.warn("Meta CAPI skipped: META_PIXEL_ID or META_ACCESS_TOKEN not set");
    return;
  }

  const userData: Record<string, string> = {};
  if (payload.email) userData.em = sha256(payload.email);
  const phoneDigits = payload.phone?.replace(/\D/g, "");
  if (phoneDigits) userData.ph = sha256(phoneDigits);
  if (payload.fbp) userData.fbp = payload.fbp;
  if (payload.fbc) userData.fbc = payload.fbc;
  if (payload.clientUserAgent) userData.client_user_agent = payload.clientUserAgent;

  const eventSourceUrl =
    payload.eventSourceUrl ??
    process.env.META_EVENT_SOURCE_URL ??
    "https://us.omuzbox.com";

  const body = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: {
          landing: payload.landing ?? "us-55",
          audience: payload.audience,
        },
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Meta CAPI error:", err);
  }
}
