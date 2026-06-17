/** Strip to digits; keep leading country code if present. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Format as US phone: (555) 555-5555 */
export function formatUSPhoneInput(raw: string): string {
  let d = digitsOnly(raw);
  if (d.startsWith("1") && d.length > 10) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function isValidUSPhone(value: string): boolean {
  let d = digitsOnly(value);
  if (d.startsWith("1") && d.length === 11) d = d.slice(1);
  return d.length === 10;
}

export function usPhoneToE164(value: string): string {
  let d = digitsOnly(value);
  if (d.startsWith("1") && d.length === 11) return `+${d}`;
  if (d.length === 10) return `+1${d}`;
  return value;
}
