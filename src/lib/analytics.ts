export type AnalyticsEvent =
  | "page_view"
  | "view_product"
  | "click_checkout"
  | "view_ebook_preview"
  | "faq_expand";
// No network requests or third-party tracking until a handler is explicitly configured.
export function track(
  event: AnalyticsEvent,
  detail: Record<string, string> = {},
) {
  window.dispatchEvent(
    new CustomEvent("bricktech:analytics", { detail: { event, ...detail } }),
  );
}
