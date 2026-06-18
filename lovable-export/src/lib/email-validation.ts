/** Format + domain checks; blocks common disposable / 10-minute inboxes. */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "10minutemail.net",
  "10minmail.com",
  "20minutemail.com",
  "33mail.com",
  "anonbox.net",
  "dispostable.com",
  "dropmail.me",
  "emailondeck.com",
  "fakeinbox.com",
  "getairmail.com",
  "getnada.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "harakirimail.com",
  "inboxkitten.com",
  "maildrop.cc",
  "mailinator.com",
  "mailnesia.com",
  "mintemail.com",
  "moakt.com",
  "mytemp.email",
  "sharklasers.com",
  "spamgourmet.com",
  "temp-mail.org",
  "tempail.com",
  "tempmail.com",
  "tempmail.net",
  "tempmailo.com",
  "tempinbox.com",
  "throwaway.email",
  "trashmail.com",
  "trashmail.net",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
]);

export type EmailValidationResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "disposable" };

export function validateTrialEmail(raw: string): EmailValidationResult {
  const email = raw.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return { ok: false, reason: "invalid" };

  const domain = email.split("@")[1];
  if (!domain || domain.length < 4 || !domain.includes(".")) {
    return { ok: false, reason: "invalid" };
  }

  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2 || !/^[a-z]{2,24}$/.test(tld)) {
    return { ok: false, reason: "invalid" };
  }

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { ok: false, reason: "disposable" };
  }

  const baseDomain = domain.replace(/^www\./, "");
  for (const blocked of DISPOSABLE_DOMAINS) {
    if (baseDomain === blocked || baseDomain.endsWith(`.${blocked}`)) {
      return { ok: false, reason: "disposable" };
    }
  }

  return { ok: true };
}
