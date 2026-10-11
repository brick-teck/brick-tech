import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
const images = [
  ["assets/Avatar BrickTech e Caixa WebPrompt Pro.png", "hero", [480, 900]],
  [
    "assets/Minifigura apresenta o WebPrompt Pro 2.0.png",
    "product",
    [400, 700],
  ],
  ["assets/Banner LEGO Tech em Neon.png", "social", [1200]],
];
for (const [source, name, widths] of images) {
  for (const width of widths) {
    const output = `public/images/${name}-${width}.webp`;
    const info = await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(output);
    console.log(
      `${output}: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB`,
    );
  }
}
