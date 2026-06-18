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

export function validateTrialEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return "Valid email is required";

  const domain = email.split("@")[1];
  if (!domain || domain.length < 4 || !domain.includes(".")) {
    return "Valid email is required";
  }

  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2 || !/^[a-z]{2,24}$/.test(tld)) {
    return "Valid email is required";
  }

  const baseDomain = domain.replace(/^www\./, "");
  if (DISPOSABLE_DOMAINS.has(baseDomain)) {
    return "Please use a permanent email address";
  }
  for (const blocked of DISPOSABLE_DOMAINS) {
    if (baseDomain.endsWith(`.${blocked}`)) {
      return "Please use a permanent email address";
    }
  }

  return null;
}
