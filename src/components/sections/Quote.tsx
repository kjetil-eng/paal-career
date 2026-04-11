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
            {t("author")}
          </motion.p>

          <motion.a
            variants={fadeUp}
            href={t("url")}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-4 inline-flex items-center gap-2 border-b border-warm-gold/40 pb-1 font-cormorant text-base italic text-warm-gold transition-colors hover:border-warm-gold hover:text-warm-surface"
          >
            {t("read_article")}
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              ↗
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
