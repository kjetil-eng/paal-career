"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Variants,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { ParallaxText } from "@/components/ui/ParallaxText";

type Region = {
  name: string;
  number: string;
  subtitle: string;
  tagline: string;
  body: string;
  highlights: string[];
};

const easeOutExpo = [0.2, 0.8, 0.2, 1] as const;

const contentReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.38, duration: 0.7, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const contentStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.42 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
  exit: { opacity: 0, y: 6, transition: { duration: 0.12 } },
};

function IconTerroir() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-warm-gold">
      <circle cx="24" cy="30" r="14" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M24 16 C 20 20, 28 24, 24 30"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
function IconPrecision() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-warm-gold">
      <path
        d="M16 6 H 32 L 30 22 C 30 28 26 30 24 30 C 22 30 18 28 18 22 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M24 30 V 42" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M18 42 H 30"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconAccess() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-warm-gold">
      <rect
        x="12"
        y="6"
        width="24"
        height="36"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M24 6 V 42" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="24" r="1.2" fill="currentColor" />
      <circle cx="28" cy="24" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function Philosophy() {
  const t = useTranslations("philosophy");
  const regions = t.raw("regions") as Region[];
  const [openRegion, setOpenRegion] = useState<Region | null>(null);

  useEffect(() => {
    if (!openRegion) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    html.classList.add("lenis-stopped");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenRegion(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      html.style.overflow = prev;
      html.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [openRegion]);

  const cards = [
    { title: t("terroir_title"), quote: t("terroir_quote"), Icon: IconTerroir },
    {
      title: t("precision_title"),
      quote: t("precision_quote"),
      Icon: IconPrecision,
    },
    { title: t("access_title"), quote: t("access_quote"), Icon: IconAccess },
  ];

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-warm-dark py-32 text-warm-surface"
    >
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-8 overflow-hidden opacity-[0.06]">
        <ParallaxText speed={300}>
          <span className="font-playfair text-[18vw] leading-none text-warm-gold whitespace-nowrap">
            TERROIR · PRÉCISION · ÉLÉGANCE ·
          </span>
        </ParallaxText>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-20 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-[11px] uppercase tracking-[0.3em] text-warm-gold font-sans"
          >
            — {t("eyebrow")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-playfair text-4xl leading-[1.1] md:text-6xl"
          >
            {t("heading")}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {cards.map((card, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className="group relative bg-warm-surface p-10 text-warm-dark border-t-2 border-warm-cognac transition-transform duration-500 hover:-translate-y-1"
            >
              <card.Icon />
              <h3 className="mt-7 font-playfair text-3xl">{card.title}</h3>
              <p className="mt-5 font-cormorant text-2xl italic text-warm-muted leading-snug">
                &ldquo;{card.quote}&rdquo;
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9 }}
          className="mt-24 flex flex-col items-center gap-8"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-warm-surface/60 font-sans">
            — {t("regions_label")}
          </p>

          <LayoutGroup id="regions">
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
            >
              {regions.map((r) => {
                const isOpen = openRegion?.name === r.name;
                return (
                  <motion.li
                    key={r.name}
                    variants={fadeUp}
                    className="relative min-h-[200px]"
                  >
                    {!isOpen && (
                      <motion.button
                        type="button"
                        layoutId={`region-card-${r.name}`}
                        onClick={() => setOpenRegion(r)}
                        className="group absolute inset-0 flex flex-col items-start gap-4 border border-warm-surface/15 bg-warm-surface/[0.02] px-6 py-7 text-left transition-colors duration-500 hover:border-warm-gold hover:bg-warm-surface/[0.06] focus-visible:border-warm-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold"
                        whileHover={{ y: -4 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 24,
                        }}
                      >
                        <motion.span
                          layoutId={`region-number-${r.name}`}
                          className="font-cormorant text-xs italic text-warm-gold/70"
                        >
                          {r.number}
                        </motion.span>
                        <motion.span
                          layoutId={`region-name-${r.name}`}
                          className="font-playfair text-2xl leading-tight text-warm-surface"
                        >
                          {r.name}
                        </motion.span>
                        <motion.span
                          layoutId={`region-subtitle-${r.name}`}
                          className="text-[10px] uppercase tracking-[0.22em] text-warm-surface/50 font-sans"
                        >
                          {r.subtitle}
                        </motion.span>
                        <span
                          aria-hidden
                          className="mt-auto flex items-center gap-3 pt-4 text-[10px] uppercase tracking-[0.22em] text-warm-surface/70 font-sans transition-colors duration-500 group-hover:text-warm-gold"
                        >
                          <span className="block h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
                          {t("regions_cta")}
                        </span>
                      </motion.button>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            <AnimatePresence>
              {openRegion && (
                <>
                  <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeOutExpo }}
                    onClick={() => setOpenRegion(null)}
                    className="fixed inset-0 z-[140] bg-warm-dark/85 backdrop-blur-md"
                  />

                  <motion.article
                    key="panel"
                    layoutId={`region-card-${openRegion.name}`}
                    transition={{ duration: 0.7, ease: easeOutExpo }}
                    className="fixed left-1/2 top-1/2 z-[150] flex w-[94vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col bg-warm-bg shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] md:w-full"
                  >
                    <div className="h-[3px] bg-warm-gold" />

                    <div className="relative max-h-[85vh] overflow-y-auto overflow-x-hidden px-8 py-14 md:px-16 md:py-20">
                      <motion.button
                        type="button"
                        onClick={() => setOpenRegion(null)}
                        aria-label={t("regions_close")}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: {
                            delay: 0.5,
                            duration: 0.5,
                            ease: easeOutExpo,
                          },
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center text-warm-dark transition-colors hover:text-warm-cognac focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-cognac md:right-7 md:top-7"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        >
                          <path d="M5 5L19 19M19 5L5 19" />
                        </svg>
                      </motion.button>

                      <div className="flex items-center gap-4 font-cormorant text-base italic text-warm-cognac">
                        <motion.span
                          layoutId={`region-number-${openRegion.name}`}
                          className="font-cormorant text-xl italic text-warm-gold"
                        >
                          {openRegion.number}
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{
                            opacity: 1,
                            scaleX: 1,
                            transition: {
                              delay: 0.38,
                              duration: 0.6,
                              ease: easeOutExpo,
                            },
                          }}
                          exit={{ opacity: 0, scaleX: 0, transition: { duration: 0.15 } }}
                          style={{ transformOrigin: "0% 50%" }}
                          className="block h-px w-10 bg-warm-cognac"
                        />
                        <motion.span
                          layoutId={`region-subtitle-${openRegion.name}`}
                          className="font-cormorant text-lg italic text-warm-cognac"
                        >
                          {openRegion.subtitle}
                        </motion.span>
                      </div>

                      <motion.h3
                        layoutId={`region-name-${openRegion.name}`}
                        className="mt-6 font-playfair text-5xl leading-[1.02] text-warm-dark md:text-7xl"
                      >
                        {openRegion.name}
                      </motion.h3>

                      <motion.div
                        variants={contentStagger}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                      >
                        <motion.p
                          variants={item}
                          className="mt-6 font-cormorant text-2xl italic leading-snug text-warm-muted md:text-3xl"
                        >
                          &ldquo;{openRegion.tagline}&rdquo;
                        </motion.p>

                        <motion.div
                          variants={item}
                          className="mt-10 h-px w-16 bg-warm-cognac"
                        />

                        <motion.p
                          variants={item}
                          className="mt-8 font-sans text-lg leading-[1.8] text-warm-text/85"
                        >
                          {openRegion.body}
                        </motion.p>

                        <motion.div variants={contentReveal} className="mt-12">
                          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-warm-muted font-sans">
                            — {t("regions_highlights_label")}
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {openRegion.highlights.map((h) => (
                              <li
                                key={h}
                                className="border border-warm-cream bg-warm-surface px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-warm-dark"
                              >
                                {h}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.article>
                </>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </motion.div>
      </div>
    </section>
  );
}
