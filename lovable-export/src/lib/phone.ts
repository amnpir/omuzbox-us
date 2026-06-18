import {
  AsYouType,
  type CountryCode,
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

export type PhoneCountry = CountryCode;

export type CountryOption = {
  iso: PhoneCountry;
  name: string;
  flag: string;
  code: string;
};

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

const displayNamesCache = new Map<string, Intl.DisplayNames>();

function displayNames(locale: string): Intl.DisplayNames {
  const key = locale.startsWith("ru") ? "ru" : "en";
  let names = displayNamesCache.get(key);
  if (!names) {
    names = new Intl.DisplayNames([key], { type: "region" });
    displayNamesCache.set(key, names);
  }
  return names;
}

export function countryFlag(iso: CountryCode): string {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export function callingCode(iso: CountryCode): string {
  return `+${getCountryCallingCode(iso)}`;
}

export function countryName(iso: CountryCode, locale = "en"): string {
  return displayNames(locale).of(iso) ?? iso;
}

export function countryCallingPrefix(iso: CountryCode): string {
  return `${callingCode(iso)} `;
}

export function phoneCountries(): PhoneCountry[] {
  const all = getCountries();
  const priority = PRIORITY_COUNTRIES.filter((c) => all.includes(c));
  const rest = all.filter((c) => !priority.includes(c)).sort();
  return [...priority, ...rest];
}

export function countryOptions(locale = "en"): CountryOption[] {
  return phoneCountries().map((iso) => ({
    iso,
    name: countryName(iso, locale),
    flag: countryFlag(iso),
    code: callingCode(iso),
  }));
}

export function detectCountryFromPhone(value: string): PhoneCountry | undefined {
  const trimmed = value.trim();
  if (!trimmed.startsWith("+")) return undefined;
  const parsed = parsePhoneNumberFromString(trimmed);
  return parsed?.country;
}

export function formatPhoneInput(raw: string, country: PhoneCountry): string {
  if (raw.trim().startsWith("+")) {
    return new AsYouType().input(raw);
  }
  return new AsYouType(country).input(raw);
}

export function ensurePhonePrefix(value: string, country: PhoneCountry): string {
  const trimmed = value.trim();
  if (!trimmed) return countryCallingPrefix(country);
  if (trimmed.startsWith("+")) return formatPhoneInput(trimmed, country);

  const prefix = countryCallingPrefix(country);
  const digits = trimmed.replace(/\D/g, "");
  return digits ? formatPhoneInput(`${prefix}${digits}`, country) : prefix;
}

export function applyCountryToPhone(value: string, from: PhoneCountry, to: PhoneCountry): string {
  const parsed =
    parsePhoneNumberFromString(value.trim()) ?? parsePhoneNumberFromString(value.trim(), from);
  const national = parsed?.nationalNumber ?? value.replace(/\D/g, "");
  if (!national) return countryCallingPrefix(to);
  return formatPhoneInput(`${countryCallingPrefix(to)}${national}`, to);
}

export function isValidPhone(value: string, country: PhoneCountry): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const parsed = trimmed.startsWith("+")
    ? parsePhoneNumberFromString(trimmed)
    : parsePhoneNumberFromString(trimmed, country);

  if (parsed?.isValid()) return true;
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
  return `${callingCode(country)} 234 567 8901`;
}
