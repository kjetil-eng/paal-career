"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Tempo() {
  const t = useTranslations("tempo");

  return (
    <section className="bg-warm-bg py-24 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-3xl px-6 text-center md:px-10"
      >
        <motion.p
          variants={fadeUp}
          className="mb-5 text-[11px] uppercase tracking-[0.3em] text-warm-cognac font-sans"
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-playfair text-3xl leading-[1.1] text-warm-dark md:text-5xl"
        >
          {t("heading")}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-2xl font-cormorant text-xl italic leading-snug text-warm-muted md:text-2xl"
        >
          {t("body")}
        </motion.p>
        <motion.span
          variants={fadeUp}
          className="mx-auto mt-10 block h-px w-16 bg-warm-cognac"
        />
      </motion.div>
    </section>
  );
}
