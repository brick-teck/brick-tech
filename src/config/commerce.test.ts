import { describe, it, expect, vi } from "vitest";
import { buildCheckoutUrl, safeExternalUrl } from "./commerce";

describe("Checkout oficial", () => {
  it("não cria checkout quando a configuração está ausente", () => {
    expect(buildCheckoutUrl("", "?utm_source=instagram")).toBeNull();
  });
  it("rejeita HTTP, scripts, host imitador e credenciais", () => {
    for (const url of [
      "http://pay.kiwify.com.br/id",
      "javascript:alert(1)",
      "https://kiwify.com.br.evil.test/id",
      "https://user:secret@pay.kiwify.com.br/id",
      "https://example.com/id",
    ])
      expect(buildCheckoutUrl(url)).toBeNull();
  });
  it("preserva configuração e adiciona somente parâmetros de campanha", () => {
    const url = new URL(
      buildCheckoutUrl(
        "https://pay.kiwify.com.br/produto?utm_source=oficial",
        "?utm_source=tiktok&utm_campaign=web&utm_medium=social&email=private&card=secret",
      )!,
    );
    expect(url.searchParams.get("utm_source")).toBe("oficial");
    expect(url.searchParams.get("utm_campaign")).toBe("web");
    expect(url.searchParams.has("email")).toBe(false);
    expect(url.searchParams.has("card")).toBe(false);
  });
  it("valida os links externos de suporte e dados legais", () => {
    expect(safeExternalUrl("")).toBeNull();
    expect(safeExternalUrl("javascript:alert(1)")).toBeNull();
    expect(safeExternalUrl("https://example.com/privacy")).toBe(
      "https://example.com/privacy",
    );
  });
  it("mantém o estado comercial indisponível quando a variável tem URL inválida", async () => {
    vi.stubEnv("VITE_KIWIFY_CHECKOUT_URL", "http://pay.kiwify.com.br/id");
    vi.resetModules();
    const { commerce } = await import("./commerce");
    expect(commerce.checkoutUrl).toBe("");
    vi.unstubAllEnvs();
  });
});
