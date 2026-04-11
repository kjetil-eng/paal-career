"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type StopKey =
  | "skjolden_now"
  | "tempo"
  | "tango"
  | "sketch"
  | "noma"
  | "skjolden_start";

const STOPS: { key: StopKey; current?: boolean; hero?: boolean }[] = [
  { key: "skjolden_now", current: true },
  { key: "tempo" },
  { key: "tango" },
  { key: "sketch", hero: true },
  { key: "noma", hero: true },
  { key: "skjolden_start" },
];

export function Timeline() {
  const t = useTranslations("timeline");
  const sectionT = useTranslations("timeline.stops");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      id="career"
      className="relative overflow-hidden bg-warm-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-5 text-[11px] uppercase tracking-[0.3em] text-warm-cognac font-sans"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mx-auto max-w-3xl font-playfair text-4xl leading-[1.1] text-warm-dark md:text-6xl"
          >
            {t("heading")}
          </motion.h2>
        </div>

        <div ref={ref} className="relative mx-auto max-w-5xl">
          <div className="absolute left-6 top-0 h-full w-px bg-warm-cream md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-px bg-warm-cognac md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-16 md:space-y-24">
            {STOPS.map((stop, i) => {
              const sideLeft = i % 2 === 0;
              return (
                <motion.li
                  key={stop.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={cn(
                    "relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-3 left-6 z-10 -translate-x-1/2 md:left-1/2",
                      "flex h-5 w-5 items-center justify-center rounded-full",
                      stop.current
                        ? "bg-warm-gold ring-4 ring-warm-gold/25"
                        : "bg-warm-cognac ring-4 ring-warm-cognac/15",
                    )}
                  >
                    <span className="block h-1.5 w-1.5 rounded-full bg-warm-surface" />
                  </span>

                  <div
                    className={cn(
                      "pl-14 md:pl-0",
                      sideLeft
                        ? "md:pr-10 md:text-right"
                        : "md:col-start-2 md:pl-10 md:text-left",
                    )}
                  >
                    {stop.current && (
                      <span className="mb-3 inline-block rounded-full bg-warm-gold px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-warm-dark">
                        {t("now_badge")}
                      </span>
                    )}
                    {stop.hero && (
                      <span
                        className={cn(
                          "mb-3 inline-block border border-warm-cognac px-3 py-1 font-cormorant text-[11px] italic tracking-[0.1em] text-warm-cognac",
                        )}
                      >
                        Prestisje
                      </span>
                    )}
                    <h3
                      className={cn(
                        "font-playfair text-warm-dark",
                        stop.hero
                          ? "text-4xl md:text-5xl"
                          : "text-2xl md:text-3xl",
                      )}
                    >
                      {sectionT(`${stop.key}.place`)}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 font-cormorant italic text-warm-cognac",
                        stop.hero ? "text-2xl md:text-3xl" : "text-xl",
                      )}
                    >
                      {sectionT(`${stop.key}.role`)}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-warm-muted font-sans">
                      {sectionT(`${stop.key}.location`)}
                      {sectionT(`${stop.key}.period`)
                        ? ` · ${sectionT(`${stop.key}.period`)}`
                        : ""}
                    </p>
                    <p
                      className={cn(
                        "mt-5 max-w-md text-warm-text/80 leading-relaxed md:ml-auto md:max-w-sm",
                        stop.hero && "md:text-lg",
                      )}
                    >
                      {sectionT(`${stop.key}.description`)}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
