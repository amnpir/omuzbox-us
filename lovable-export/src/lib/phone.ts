import {
  AsYouType,
  type CountryCode,
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

export type PhoneCountry = CountryCode;

export const DEFAULT_PHONE_COUNTRY: PhoneCountry = "US";

const PRIORITY_COUNTRIES: PhoneCountry[] = [
  "US",
  "CA",
  "GB",
  "AU",
  "DE",
  "FR",
  "ES",
  "IT",
  "NL",
  "PL",
  "UA",
  "RU",
  "KZ",
  "BR",
  "MX",
  "IN",
  "IL",
  "TR",
  "AE",
  "JP",
  "KR",
  "CN",
];

export function countryFlag(iso: CountryCode): string {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export function callingCode(iso: CountryCode): string {
  return `+${getCountryCallingCode(iso)}`;
}

export function phoneCountries(): PhoneCountry[] {
  const all = getCountries();
  const priority = PRIORITY_COUNTRIES.filter((c) => all.includes(c));
  const rest = all.filter((c) => !priority.includes(c)).sort();
  return [...priority, ...rest];
}

export function formatPhoneInput(raw: string, country: PhoneCountry): string {
  return new AsYouType(country).input(raw);
}

export function isValidPhone(value: string, country: PhoneCountry): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("+")) return isValidPhoneNumber(trimmed);
  return isValidPhoneNumber(trimmed, country);
}

export function phoneToE164(value: string, country: PhoneCountry): string {
  const trimmed = value.trim();
  const parsed = trimmed.startsWith("+")
    ? parsePhoneNumberFromString(trimmed)
    : parsePhoneNumberFromString(trimmed, country);
  return parsed?.format("E.164") ?? trimmed;
}

export function phonePlaceholder(country: PhoneCountry): string {
  const example = new AsYouType(country).input("5551234567");
  return example || "Phone number";
}
