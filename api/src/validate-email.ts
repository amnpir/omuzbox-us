/** Keep in sync with lovable-export/src/lib/email-validation.ts */
import { resolveMx } from "node:dns/promises";

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const ALLOWED_TLDS = new Set([
  "com", "org", "net", "edu", "gov", "io", "co", "us", "uk", "ca", "au", "de", "fr", "es", "it",
  "nl", "be", "ch", "at", "pl", "cz", "se", "no", "dk", "fi", "ie", "nz", "sg", "hk", "in", "br",
  "mx", "me", "info", "biz", "pro", "dev", "app", "email", "live", "cloud", "tech", "online",
]);

const TRUSTED_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "outlook.com", "hotmail.com", "live.com",
  "msn.com", "icloud.com", "me.com", "mac.com", "aol.com", "protonmail.com", "proton.me", "pm.me",
  "mail.com", "gmx.com", "gmx.net", "zoho.com", "yandex.com", "yandex.ru", "mail.ru", "inbox.ru",
  "qq.com", "163.com", "fastmail.com", "hey.com",
]);

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com", "10minutemail.net", "10minmail.com", "20minutemail.com", "33mail.com",
  "anonbox.net", "dispostable.com", "dropmail.me", "emailondeck.com", "fakeinbox.com", "getairmail.com",
  "getnada.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org", "harakirimail.com",
  "inboxkitten.com", "maildrop.cc", "mailinator.com", "mailnesia.com", "mintemail.com", "moakt.com",
  "mytemp.email", "sharklasers.com", "spamgourmet.com", "temp-mail.org", "tempail.com", "tempmail.com",
  "tempmail.net", "tempmailo.com", "tempinbox.com", "throwaway.email", "trashmail.com", "trashmail.net",
  "yopmail.com", "yopmail.fr", "yopmail.net",
]);

function normalizeDomain(domain: string): string {
  return domain.replace(/^www\./, "").toLowerCase();
}

function isDisposableDomain(domain: string): boolean {
  const base = normalizeDomain(domain);
  if (DISPOSABLE_DOMAINS.has(base)) return true;
  for (const blocked of DISPOSABLE_DOMAINS) {
    if (base.endsWith(`.${blocked}`)) return true;
  }
  return false;
}

function domainHostLetters(domain: string): string {
  const base = normalizeDomain(domain);
  const parts = base.split(".");
  if (parts.length < 2) return base.replace(/[^a-z]/g, "");
  return parts.slice(0, -1).join("").replace(/[^a-z]/g, "");
}

function isTrustedDomain(domain: string): boolean {
  const base = normalizeDomain(domain);
  return TRUSTED_EMAIL_DOMAINS.has(base) || base.endsWith(".edu") || base.endsWith(".gov");
}

function looksLikeRealDomain(domain: string): boolean {
  const base = normalizeDomain(domain);
  if (isTrustedDomain(base)) return true;

  const primaryLabel = base.split(".")[0] ?? "";
  if (primaryLabel.length < 3 || primaryLabel.length > 20) return false;

  const letters = domainHostLetters(base);
  if (letters.length < 3) return false;

  const vowelCount = (letters.match(/[aeiouy]/g) ?? []).length;
  if (vowelCount === 0) return false;
  if (letters.length >= 7 && vowelCount / letters.length < 0.3) return false;
  if (letters.length >= 6 && vowelCount <= 1) return false;
  if (/[bcdfghjklmnpqrstvwxyz]{5,}/.test(letters)) return false;
  if (/(.)\1{4,}/.test(letters)) return false;

  return true;
}

async function domainHasMx(domain: string): Promise<boolean> {
  try {
    const records = await resolveMx(normalizeDomain(domain));
    return records.length > 0;
  } catch {
    return false;
  }
}

export async function validateTrialEmail(raw: string): Promise<string | null> {
  const email = raw.trim().toLowerCase();
  if (!email || email.includes("..") || !EMAIL_RE.test(email)) {
    return "Valid email is required";
  }

  const [local, domain] = email.split("@");
  if (!local || !domain || local.length < 2 || !domain.includes(".")) {
    return "Valid email is required";
  }

  const tld = domain.split(".").pop() ?? "";
  if (!ALLOWED_TLDS.has(tld)) {
    return "Valid email is required";
  }

  if (isDisposableDomain(domain)) {
    return "Please use a permanent email address";
  }

  if (!looksLikeRealDomain(domain)) {
    return "Valid email is required";
  }

  if (!isTrustedDomain(domain)) {
    const hasMx = await domainHasMx(domain);
    if (!hasMx) {
      return "Please use a real email address from an active mailbox provider";
    }
  }

  return null;
}
