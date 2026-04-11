"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { ParallaxText } from "@/components/ui/ParallaxText";
import { cn } from "@/lib/utils";

type Region = {
  name: string;
  number: string;
  subtitle: string;
  tagline: string;
  body: string;
  highlights: string[];
};

export function Philosophy() {
  const t = useTranslations("philosophy");
  const regions = t.raw("regions") as Region[];
  // Default: first region always selected so info is visible from start
  const [activeRegion, setActiveRegion] = useState<Region>(regions[0]);

  const cards = [
    { num: "I", title: t("terroir_title"), quote: t("terroir_quote") },
    { num: "II", title: t("precision_title"), quote: t("precision_quote") },
    { num: "III", title: t("access_title"), quote: t("access_quote") },
  ];

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-warm-dark py-32 text-warm-surface"
    >
      {/* Parallax words backdrop */}
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
            {t("eyebrow")}
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
              className="group relative bg-warm-surface p-10 text-warm-dark border-t border-warm-cognac transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="font-cormorant text-sm italic tracking-widest text-warm-cognac">
                {card.num}
              </span>
              <h3 className="mt-8 font-playfair text-3xl">{card.title}</h3>
              <p className="mt-5 font-cormorant text-2xl italic text-warm-muted leading-snug">
                &ldquo;{card.quote}&rdquo;
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Regions — split layout: menu left, info panel right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9 }}
          className="mt-24"
        >
          <p className="mb-10 text-center text-[11px] uppercase tracking-[0.3em] text-warm-surface/60 font-sans">
            {t("regions_label")}
          </p>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
            {/* Left: region menu */}
            <ul className="md:col-span-4 flex flex-col gap-0 border-t border-warm-surface/15">
              {regions.map((r) => {
                const isActive = activeRegion.name === r.name;
                return (
                  <li
                    key={r.name}
                    className="border-b border-warm-surface/15"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveRegion(r)}
                      className={cn(
                        "group flex w-full items-center justify-between py-5 text-left transition-colors duration-500",
                        isActive
                          ? "text-warm-gold"
                          : "text-warm-surface/75 hover:text-warm-gold",
                      )}
                      aria-pressed={isActive}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-cormorant text-xs italic text-warm-surface/40">
                          {r.number}
                        </span>
                        <span className="font-playfair text-2xl md:text-3xl">
                          {r.name}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "text-xs transition-all duration-500",
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
                        )}
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Right: info panel (always visible, fades between regions) */}
            <div className="md:col-span-8 relative md:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegion.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="border-l border-warm-surface/15 pl-0 md:pl-10 text-warm-surface"
                >
                  <div className="flex items-baseline gap-4 font-cormorant italic text-warm-gold/80">
                    <span>{activeRegion.number}</span>
                    <span className="block h-px w-10 bg-warm-cognac" />
                    <span className="text-[11px] uppercase tracking-[0.22em] text-warm-surface/60 font-sans not-italic">
                      {activeRegion.subtitle}
                    </span>
                  </div>

                  <h3 className="mt-5 font-playfair text-4xl leading-[1.05] md:text-5xl">
                    {activeRegion.name}
                  </h3>

                  <p className="mt-5 font-cormorant text-2xl italic leading-snug text-warm-surface/80 md:text-3xl">
                    &ldquo;{activeRegion.tagline}&rdquo;
                  </p>

                  <p className="mt-8 max-w-2xl text-base leading-[1.8] text-warm-surface/75 md:text-lg">
                    {activeRegion.body}
                  </p>

                  <div className="mt-10">
                    <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-warm-surface/55 font-sans">
                      {t("regions_highlights_label")}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {activeRegion.highlights.map((h) => (
                        <li
                          key={h}
                          className="border border-warm-surface/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-warm-surface/80"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
