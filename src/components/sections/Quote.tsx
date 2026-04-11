"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeIn, fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Quote() {
  const t = useTranslations("quote");

  return (
    <section className="relative overflow-hidden bg-warm-dark py-32 text-warm-surface">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.span
            variants={fadeIn}
            className="mx-auto block h-px w-24 bg-warm-gold"
          />

          <motion.blockquote
            variants={fadeUp}
            className="mt-12 font-cormorant text-2xl italic leading-[1.5] text-warm-surface md:text-4xl"
          >
            &ldquo;{t("text")}&rdquo;
          </motion.blockquote>

          <motion.span
            variants={fadeIn}
            className="mx-auto mt-12 block h-px w-24 bg-warm-gold"
          />

          <motion.p
            variants={fadeUp}
            className="mt-10 text-[11px] uppercase tracking-[0.3em] text-warm-surface/70 font-sans"
          >
            — {t("author")}
          </motion.p>

          <motion.span
            variants={fadeUp}
            className="mt-5 inline-block rounded-full bg-warm-cognac px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-warm-surface"
          >
            {t("eyebrow")} · {t("source")}
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
