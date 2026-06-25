# Sitio personal — guía rápida

Sitio estático hecho con **Next.js 16** (export estático) + **Tailwind v4**, hosteado gratis en **Firebase Hosting**.

## Desarrollo local

```bash
npm run dev      # http://localhost:3000 (recarga en vivo)
npm run build    # genera la carpeta out/ (HTML estático)
npx serve out    # previsualiza el sitio ya buildeado
```

## Editar contenido

| Qué | Dónde |
|-----|-------|
| Tu nombre, tagline, redes, email, color de acento | `lib/site.ts` |
| Color de acento (verde #00BC6F) | `app/globals.css` → `--accent` |
| Secciones de la home (sobre mí, servicios, stats, apariciones) | `app/page.tsx` (constantes arriba) |
| Posts del blog | crear `.md` en `content/blog/` (ver formato abajo) |
| Newsletter (conectar proveedor) | `app/components/NewsletterForm.tsx` → `ENDPOINT` |

### Formato de un post (`content/blog/mi-post.md`)

```markdown
---
title: "Título del post"
date: "2026-06-24"
excerpt: "Resumen de una línea para las cards y el SEO."
tags: ["seo", "ia"]
---

Acá va el contenido en **Markdown** normal (títulos ##, listas, código, etc.).
```

El nombre del archivo es la URL: `mi-post.md` → `/blog/mi-post/`.

## Deploy a Firebase Hosting (gratis)

Una sola vez:

```bash
npm i -g firebase-tools
firebase login            # ⬅ corré esto vos (abre el navegador para autenticarte)
firebase projects:create  # o usá uno existente; copiá el Project ID
```

Pegá tu **Project ID** en `.firebaserc` (reemplazá `TU-PROJECT-ID`).

Cada vez que quieras publicar:

```bash
npm run build
firebase deploy --only hosting
```

Queda online en `https://TU-PROJECT-ID.web.app`.

## Dominio propio

1. Comprá el dominio donde quieras (Namecheap, Cloudflare, etc.).
2. En la **consola de Firebase → Hosting → Add custom domain**, pegá tu dominio.
3. Firebase te da unos registros (`A` y/o `TXT`). Pegalos en el panel DNS de tu proveedor.
4. El SSL (HTTPS) se activa solo en unos minutos/horas.

## Costo

Plan **Spark (gratis)**: 10 GB de almacenamiento y 360 MB/día de transferencia. Un sitio personal
no se acerca a ese límite. $0/mes.
