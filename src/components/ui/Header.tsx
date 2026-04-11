"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./LanguageToggle";

const SECTIONS = [
  { id: "about", key: "about" },
  { id: "career", key: "career" },
  { id: "philosophy", key: "philosophy" },
  { id: "services", key: "services" },
  { id: "contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "bg-warm-surface/80 backdrop-blur-md border-b border-warm-cream/60"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 md:py-6">
          <a
            href="#top"
            className={cn(
              "font-playfair text-sm tracking-[0.28em] transition-colors",
              scrolled ? "text-warm-dark" : "text-warm-surface",
            )}
          >
            PÅL GØRAN
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "text-[11px] tracking-[0.22em] uppercase font-sans transition-colors",
                  scrolled
                    ? "text-warm-muted hover:text-warm-cognac"
                    : "text-warm-surface/80 hover:text-warm-gold",
                )}
              >
                {t(s.key)}
              </a>
            ))}
            <span
              className={cn(
                "mx-1 h-4 w-px",
                scrolled ? "bg-warm-cream" : "bg-warm-surface/30",
              )}
            />
            <LanguageToggle
              className={scrolled ? "text-warm-muted" : "text-warm-surface"}
            />
          </nav>

          <button
            type="button"
            aria-label={t("menu")}
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className={cn(
              "md:hidden flex h-10 w-10 flex-col items-center justify-center gap-[5px]",
              scrolled ? "text-warm-dark" : "text-warm-surface",
            )}
          >
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-4 bg-current" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-warm-dark/60 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-warm-surface px-6 py-10 shadow-xl flex flex-col sm:px-8"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-playfair text-sm tracking-[0.28em] text-warm-dark">
                  PÅL GØRAN
                </span>
                <button
                  type="button"
                  aria-label={t("close")}
                  onClick={() => setOpen(false)}
                  className="text-warm-dark text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="font-playfair text-3xl text-warm-dark hover:text-warm-cognac transition-colors"
                  >
                    {t(s.key)}
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-10 border-t border-warm-cream">
                <LanguageToggle className="text-warm-dark" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
