import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Desktop: página, tabs, checkout pendente, FAQ e acessibilidade", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Você tem a ideia.",
  );
  await page.getByRole("button", { name: "Quero meu ebook por R$ 10" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "As compras ainda não estão disponíveis.",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Quero meu ebook por R$ 10" }),
  ).toBeFocused();
  const tab = page.getByRole("tab", { name: "Pedido genérico" });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "Crie um site moderno para minha empresa.",
  );
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Pedido estruturado" }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "landing page responsiva",
  );
  await page.getByText("O que é o WEBPROMPT PRO 2.0?", { exact: true }).click();
  await expect(page.locator("details[open]")).toContainText(
    "biblioteca de prompts",
  );
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  expect(errors).toEqual([]);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-visual")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: "qa/desktop.png", fullPage: true });
  await page.screenshot({ path: "qa/desktop-hero.png" });
});

test("Mobile: menu, Escape, navegação e compra fixa", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".mobile-purchase")).not.toBeVisible();
  const toggle = page.getByRole("button", { name: "Abrir menu" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Navegação mobile" }),
  ).toBeVisible();
  await expect(page.locator(".mobile-purchase")).not.toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Navegação mobile" })
    .getByRole("link", { name: "Conteúdo", exact: true })
    .click();
  await expect(page).toHaveURL(/#conteudo$/);
  await expect(
    page.getByRole("navigation", { name: "Navegação mobile" }),
  ).not.toBeVisible();
  await page.locator(".mobile-purchase").getByRole("button").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-visual")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: "qa/mobile.png", fullPage: true });
  await page.locator(".hero").screenshot({ path: "qa/mobile-hero.png" });
});

test("Sem overflow e imagens carregadas em diferentes larguras", async ({
  page,
}) => {
  for (const width of [320, 375, 390, 700, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(dimensions.document, `overflow em ${width}px`).toBeLessThanOrEqual(
      dimensions.viewport,
    );
    await expect(page.locator(".hero .brand-product-image")).toBeVisible();
    expect(
      await page
        .locator(".hero .brand-product-image")
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    ).toBe(true);
  }
});

test("Menu em landscape e foco fora da barra inferior", async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const menu = page.getByRole("navigation", { name: "Navegação mobile" });
  const bounds = await menu.boundingBox();
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(375);
  await menu.getByRole("button", { name: "Comprar por R$ 10" }).focus();
  await expect(
    menu.getByRole("button", { name: "Comprar por R$ 10" }),
  ).toBeInViewport();
  await page.keyboard.press("Escape");
  await page.getByRole("tab", { name: "Pedido estruturado" }).focus();
  await expect(page.locator(".mobile-purchase")).toBeVisible();
  const tabBounds = await page
    .getByRole("tab", { name: "Pedido estruturado" })
    .boundingBox();
  const barBounds = await page.locator(".mobile-purchase").boundingBox();
  expect(tabBounds!.y + tabBounds!.height).toBeLessThanOrEqual(barBounds!.y);
});

test("Galeria com fixtures autorizadas apenas no ambiente de teste", async ({
  page,
}) => {
  await page.route("**/src/data/product.ts", async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      "previews: []",
      `previews: [
      {src:'/images/hero-480.webp',title:'Fixture 1',alt:'Imagem de teste 1',width:480,height:600},
      {src:'/images/product-400.webp',title:'Fixture 2',alt:'Imagem de teste 2',width:400,height:500}
    ]`,
    );
    await route.fulfill({ response, body });
  });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Imagem de teste 1 Fixture 1" })
    .click();
  const dialog = page.getByRole("dialog", { name: "Prévia do ebook" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Próxima" }).click();
  await expect(dialog).toContainText("Fixture 2");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("Fixture 1");
  await dialog.getByRole("button", { name: "Ampliar página" }).click();
  await expect(dialog.locator(".preview-image")).toHaveClass(/zoomed/);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Imagem de teste 1 Fixture 1" }),
  ).toBeFocused();
});
