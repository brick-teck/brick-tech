export function safeExternalUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function buildCheckoutUrl(
  value: string,
  campaignQuery = "",
): string | null {
  const validated = safeExternalUrl(value);
  if (!validated) return null;
  const url = new URL(validated);
  if (!(
    url.hostname === "kiwify.com.br" || url.hostname.endsWith(".kiwify.com.br")
  ))
    return null;
  const campaign = new URLSearchParams(campaignQuery);
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
    const value = campaign.get(key);
    if (value && !url.searchParams.has(key))
      url.searchParams.set(key, value.slice(0, 256));
  }
  return url.href;
}

export const commerce = {
  checkoutUrl:
    buildCheckoutUrl(import.meta.env.VITE_KIWIFY_CHECKOUT_URL || "") || "",
  supportUrl: safeExternalUrl(import.meta.env.VITE_SUPPORT_URL || ""),
  privacyUrl: safeExternalUrl(import.meta.env.VITE_PRIVACY_URL || ""),
  termsUrl: safeExternalUrl(import.meta.env.VITE_TERMS_URL || ""),
  information: import.meta.env.VITE_COMMERCIAL_INFORMATION || "",
};
