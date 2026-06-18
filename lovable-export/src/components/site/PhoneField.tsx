import { Phone } from "lucide-react";

import {
  callingCode,
  countryFlag,
  formatPhoneInput,
  phoneCountries,
  phonePlaceholder,
  type PhoneCountry,
} from "@/lib/phone";

type PhoneFieldProps = {
  id: string;
  label: string;
  value: string;
  country: PhoneCountry;
  onCountryChange: (country: PhoneCountry) => void;
  onChange: (value: string) => void;
  error?: string;
};

export function PhoneField({
  id,
  label,
  value,
  country,
  onCountryChange,
  onChange,
  error,
}: PhoneFieldProps) {
  return (
    <div>
      <div
        className={`group flex items-center gap-2 rounded-2xl bg-white border px-3 py-3.5 transition-all ${
          error
            ? "border-red-300 ring-4 ring-red-100"
            : "border-[#EAF0F6] focus-within:border-[#20AAFD] focus-within:ring-4 focus-within:ring-[#20AAFD]/15"
        }`}
      >
        <span
          className="shrink-0 text-[var(--ink)]/40 group-focus-within:text-[#20AAFD] transition-colors pl-1"
          aria-hidden
        >
          <Phone className="h-4 w-4" />
        </span>
        <span className="sr-only">{label}</span>
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value as PhoneCountry)}
          aria-label="Country code"
          className="max-w-[5.5rem] shrink-0 appearance-none bg-transparent text-sm font-semibold text-[var(--ink)] focus:outline-none cursor-pointer"
        >
          {phoneCountries().map((iso) => (
            <option key={iso} value={iso}>
              {countryFlag(iso)} {callingCode(iso)}
            </option>
          ))}
        </select>
        <span className="h-5 w-px shrink-0 bg-[#EAF0F6]" aria-hidden />
        <input
          id={id}
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          aria-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          value={value}
          onChange={(e) => onChange(formatPhoneInput(e.target.value, country))}
          placeholder={phonePlaceholder(country)}
          className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-[var(--ink)]/40 focus:outline-none"
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 px-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
