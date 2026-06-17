export const COMPANY = {
  name: "Omuzbox",
  email: "info@omuzbox.com",
  whatsapp: "+48 576 541 989",
  telegram: "@omuzboxss",
  address: {
    line1: "8 The Green STE B",
    city: "Dover",
    county: "Kent County",
    state: "DE",
    zip: "19901",
    country: "United States",
  },
} as const;

export function companyAddressOneLine(lang: "EN" | "RU") {
  const a = COMPANY.address;
  if (lang === "RU") {
    return `${a.line1}, ${a.city}, ${a.county}, ${a.state} ${a.zip}, ${a.country}`;
  }
  return `${a.line1}, ${a.city}, ${a.county}, ${a.state} ${a.zip}, ${a.country}`;
}

export function companyAddressBlock(lang: "EN" | "RU") {
  const a = COMPANY.address;
  if (lang === "RU") {
    return [a.line1, `${a.city}, ${a.county}`, `${a.state} ${a.zip}`, a.country];
  }
  return [a.line1, `${a.city}, ${a.county}`, `${a.state} ${a.zip}`, a.country];
}
