import { trackMetaEvent } from "@/lib/meta-pixel";
import { trackGaEvent } from "@/lib/ga4";

export function trackCtaClick() {
  trackMetaEvent("InitiateCheckout", { content_name: "trial_lesson" });
  trackGaEvent("select_promotion", { promotion_name: "trial_lesson" });
}
