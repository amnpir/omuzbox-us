import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";

export function validatePhone(raw: string): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return "Valid phone is required";

  const parsed = parsePhoneNumberFromString(trimmed);
  if (!parsed?.isValid() && !isValidPhoneNumber(trimmed)) {
    return "Enter a valid phone number";
  }

  return null;
}

export function normalizePhoneE164(raw: string): string {
  const trimmed = raw.trim();
  const parsed = parsePhoneNumberFromString(trimmed);
  return parsed?.format("E.164") ?? trimmed;
}
