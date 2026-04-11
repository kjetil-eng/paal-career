"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const KEYS = [
  { t: "courses_title", d: "courses_desc", num: "01" },
  { t: "talks_title", d: "talks_desc", num: "02" },
  { t: "events_title", d: "events_desc", num: "03" },
  { t: "consulting_title", d: "consulting_desc", num: "04" },
  { t: "sommelier_title", d: "sommelier_desc", num: "05" },
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="bg-warm-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-16 max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-[11px] uppercase tracking-[0.3em] text-warm-cognac font-sans"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-playfair text-4xl leading-[1.1] text-warm-dark md:text-6xl"
          >
            {t("heading")}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {KEYS.map(({ t: titleKey, d: descKey, num }) => (
            <motion.article
              key={titleKey}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative flex flex-col border border-warm-cream bg-warm-surface p-7 md:p-10 transition-colors duration-300 hover:border-warm-gold hover:shadow-[0_20px_60px_-30px_rgba(26,14,8,0.35)]"
            >
              <span className="font-cormorant text-sm italic text-warm-muted">
                {num}
              </span>
              <h3 className="mt-6 font-playfair text-2xl text-warm-dark">
                {t(titleKey)}
              </h3>
              <p className="mt-4 text-warm-text/75 leading-relaxed">
                {t(descKey)}
              </p>
              <span
                aria-hidden
                className="mt-8 block h-px w-10 bg-warm-cognac transition-all duration-500 group-hover:w-24 group-hover:bg-warm-gold"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
