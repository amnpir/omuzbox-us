import { COMPANY } from "@/lib/company";
import type { Translations } from "@/lib/translations";

const SITE_URL = "https://us.omuzbox.com";

export function buildJsonLd(t: Translations) {
  const address = COMPANY.address;
  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: address.line1,
    addressLocality: address.city,
    addressRegion: address.state,
    postalCode: address.zip,
    addressCountry: "US",
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: COMPANY.name,
    url: SITE_URL,
    email: COMPANY.email,
    address: postalAddress,
    sameAs: ["https://t.me/omuzboxss"],
  };

  const course = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "English 1-on-1 Live Lessons",
    description: t.meta.description,
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      priceCurrency: "USD",
      price: "42",
      url: `${SITE_URL}/#pricing`,
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return [organization, course, faqPage];
}

export function JsonLd({ data }: { data: ReturnType<typeof buildJsonLd> }) {
  return (
    <>
      {data.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
