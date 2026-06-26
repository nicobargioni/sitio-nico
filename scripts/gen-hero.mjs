// Genera variantes optimizadas del retrato del hero (AVIF + WebP) a partir de
// public/nico-hero.png. El sitio es export estático (images.unoptimized:true),
// así que la optimización se hace acá, en build-time, una sola vez.
//
//   npm run gen:hero   (re-ejecutar si cambia la foto original)
//
// El retrato se muestra a ~340px (home) y ~260px (nico-bargioni); 680px cubre
// pantallas retina 2x sin sobre-servir los 760px originales.
import sharp from "sharp";

const SRC = "public/nico-hero.png";
const SIZE = 680;

const variants = [
  { out: "public/nico-hero.avif", fn: (img) => img.avif({ quality: 55 }) },
  { out: "public/nico-hero.webp", fn: (img) => img.webp({ quality: 74 }) },
];

for (const { out, fn } of variants) {
  const info = await fn(
    sharp(SRC).resize(SIZE, SIZE, { fit: "cover" })
  ).toFile(out);
  console.log(`✓ ${out} — ${(info.size / 1024).toFixed(0)} KB (${info.width}×${info.height})`);
}
