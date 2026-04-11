# Pål Gøran Stolt-Larsen Pettersen — Personal Site

Personal website for Pål Gøran Stolt-Larsen Pettersen — F&B Manager at Skjolden
Hotell, sommelier and wine director. Wine cellar meets editorial magazine.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **Tailwind CSS v4** (CSS-first config via `@theme inline` in `globals.css`)
- **Framer Motion 12** — scroll scrubbing, parallax, stagger reveals
- **Lenis** — buttery smooth scroll
- **next-intl 4** — tospråklig (NO / EN)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — automatic redirect to
`/no` (Norwegian is the default locale).

## Build

```bash
npm run build
npm run start
```

Both `/no` and `/en` are prerendered to static HTML via `generateStaticParams`.

## Deploy to Vercel

```bash
npx vercel           # preview
npx vercel --prod    # production
```

### Suggested domains
- `palstoltlarsen.no`
- `palvinkelner.no`

## Structure

```
src/
  app/
    [locale]/
      layout.tsx     # root layout with fonts + NextIntlClientProvider
      page.tsx       # single-page composition of all sections
    globals.css      # Tailwind v4 theme (warm palette, fonts)
  components/
    sections/        # Hero, About, Timeline, Philosophy, Services, …
    ui/              # Header, Footer, LanguageToggle, ParallaxText, …
  i18n/
    routing.ts       # defineRouting(['no','en'])
    request.ts       # getRequestConfig for server-side messages
  lib/
    animations.ts    # shared Framer Motion variants
    lenis.ts         # useLenis hook
    utils.ts         # cn() helper
  messages/
    no.json
    en.json
  proxy.ts           # next-intl routing proxy (Next.js 16 renamed middleware → proxy)
public/images/       # pal-hero.jpg, pal-portrait.webp, pal-action.webp, …
```

## Content

All copy lives in `src/messages/{no,en}.json`. To add content, edit both files
in parallel. Use `useTranslations('namespace')` in client components and
`getTranslations({ locale, namespace })` in server components.

## Contact form

The contact form currently POSTs to a placeholder Formspree endpoint in
`src/components/sections/Contact.tsx`. Replace `PLACEHOLDER` with a real
Formspree form ID before going live.

## Fonts

Loaded via `next/font/google` in `src/app/[locale]/layout.tsx`:
- **Playfair Display** — display/headings
- **DM Sans** — body / UI
- **Cormorant Garamond** — italic accents and pull-quotes

Exposed as CSS variables (`--font-playfair-display`, `--font-dm-sans`,
`--font-cormorant-garamond`) and wired into Tailwind utility classes
(`font-playfair`, `font-sans`, `font-cormorant`) via `@theme inline` in
`globals.css`.
