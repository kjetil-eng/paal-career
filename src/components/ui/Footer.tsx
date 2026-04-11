"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-warm-dark/10 bg-warm-dark text-warm-surface">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-end">
          <div>
            <p className="font-playfair text-2xl tracking-wide">
              Pål Gøran Stolt-Larsen Pettersen
            </p>
            <p className="mt-2 font-cormorant text-lg italic text-warm-surface/70">
              {t("tagline")}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-5 md:justify-center">
            <a
              href="https://www.skjoldenhotell.no"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[11px] uppercase tracking-[0.22em] text-warm-surface/75 hover:text-warm-gold transition-colors"
            >
              {t("skjolden_link")} →
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="text-warm-surface/75 hover:text-warm-gold transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="text-warm-surface/75 hover:text-warm-gold transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H18.4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.86V21H10V9Z" />
              </svg>
            </a>
          </nav>

          <div className="md:text-right">
            <a
              href="#top"
              className="text-[11px] uppercase tracking-[0.22em] text-warm-surface/60 hover:text-warm-gold transition-colors"
            >
              ↑ {t("back_to_top")}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-warm-surface/10 pt-6 text-[10px] uppercase tracking-[0.22em] text-warm-surface/45 font-sans">
          © {new Date().getFullYear()} Pål Gøran Stolt-Larsen Pettersen · {t("rights")}
        </div>
      </div>
    </footer>
  );
}
