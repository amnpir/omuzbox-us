import { useMemo, useState } from "react";
import { ChevronsUpDown, Phone } from "lucide-react";

import {
  applyCountryToPhone,
  countryCallingPrefix,
  countryOptions,
  detectCountryFromPhone,
  ensurePhonePrefix,
  formatPhoneInput,
  phonePlaceholder,
  type PhoneCountry,
} from "@/lib/phone";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type PhoneFieldProps = {
  id: string;
  label: string;
  value: string;
  country: PhoneCountry;
  locale?: string;
  onCountryChange: (country: PhoneCountry) => void;
  onChange: (value: string) => void;
  error?: string;
};

export function PhoneField({
  id,
  label,
  value,
  country,
  locale = "en",
  onCountryChange,
  onChange,
  error,
}: PhoneFieldProps) {
  const [open, setOpen] = useState(false);
  const isRu = locale.startsWith("ru");

  const options = useMemo(() => countryOptions(locale), [locale]);
  const selected = options.find((o) => o.iso === country) ?? options[0];

  function handleInputChange(raw: string) {
    let next = raw;
    if (!raw.trim().startsWith("+") && raw.replace(/\D/g, "").length > 0) {
      next = ensurePhonePrefix(raw, country);
    } else {
      next = formatPhoneInput(raw, country);
    }

    const detected = detectCountryFromPhone(next);
    if (detected && detected !== country) onCountryChange(detected);
    onChange(next);
  }

  function handleCountrySelect(iso: PhoneCountry) {
    onCountryChange(iso);
    onChange(applyCountryToPhone(value, country, iso));
    setOpen(false);
  }

  function handleFocus() {
    if (!value.trim()) onChange(countryCallingPrefix(country));
  }

  return (
    <div>
      <div
        className={cn(
          "group flex items-center gap-2 rounded-2xl bg-white border px-3 py-3.5 transition-all",
          error
            ? "border-red-300 ring-4 ring-red-100"
            : "border-[#EAF0F6] focus-within:border-[#20AAFD] focus-within:ring-4 focus-within:ring-[#20AAFD]/15",
        )}
      >
        <span
          className="shrink-0 text-[var(--ink)]/40 group-focus-within:text-[#20AAFD] transition-colors pl-1"
          aria-hidden
        >
          <Phone className="h-4 w-4" />
        </span>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={isRu ? "Выбрать страну" : "Select country"}
              className="flex max-w-[7.5rem] shrink-0 items-center gap-1 rounded-lg px-1 py-0.5 text-left text-sm font-semibold text-[var(--ink)] hover:bg-[#F4F8FC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#20AAFD]/30"
            >
              <span aria-hidden>{selected.flag}</span>
              <span className="truncate">{selected.code}</span>
              <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-[var(--ink)]/35" aria-hidden />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[min(20rem,calc(100vw-2rem))] p-0" align="start">
            <Command>
              <CommandInput placeholder={isRu ? "Поиск страны…" : "Search country…"} />
              <CommandList>
                <CommandEmpty>{isRu ? "Страна не найдена" : "No country found"}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.iso}
                      value={`${option.name} ${option.iso} ${option.code}`}
                      onSelect={() => handleCountrySelect(option.iso)}
                      className="gap-2"
                    >
                      <span aria-hidden>{option.flag}</span>
                      <span className="flex-1 truncate">{option.name}</span>
                      <span className="text-xs text-[var(--ink)]/50">{option.code}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <span className="h-5 w-px shrink-0 bg-[#EAF0F6]" aria-hidden />

        <span className="sr-only">{label}</span>
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
          onFocus={handleFocus}
          onChange={(e) => handleInputChange(e.target.value)}
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
