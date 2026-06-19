import type { Lang } from "./translations";
import { trackGaEvent } from "./ga4";
import { trackMetaCustomEvent } from "./meta-pixel";
import { analyticsLanguage } from "./analytics-context";

export { landingCode, analyticsLanguage, currentLanguage, withAnalyticsContext, LANDING_BASE } from "./analytics-context";

export function trackLanguageChange(from: Lang, to: Lang) {
  trackGaEvent("language_change", {
    from_language: analyticsLanguage(from),
    to_language: analyticsLanguage(to),
    language: analyticsLanguage(to),
  });
  trackMetaCustomEvent("LanguageChange", {
    from_language: from,
    to_language: to,
    language: to,
  });
}
