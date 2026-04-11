"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] md:min-h-dvh w-full items-center justify-center overflow-hidden bg-warm-dark"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -top-8 -bottom-32 will-change-transform"
      >
        <Image
          src="/images/pal-hero.jpg"
          alt="Pål Gøran Stolt-Larsen Pettersen, sommelier ved Skjolden Hotell"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-warm-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-dark/40 via-transparent to-warm-dark" />
      </motion.div>

      <motion.div
        style={{ y: headingY, opacity: headingOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center text-warm-surface"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mb-8 text-[11px] uppercase tracking-[0.35em] text-warm-gold font-sans"
        >
          {t("eyebrow")}
        </motion.p>

        <h1 className="font-playfair text-[clamp(2.75rem,8vw,7.5rem)] leading-[1.05]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="block"
          >
            {t("heading_line1")}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="block italic text-warm-gold font-cormorant"
          >
            {t("heading_line2")}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mx-auto mt-10 max-w-2xl font-cormorant text-xl italic text-warm-surface/85 md:text-2xl"
        >
          {t("subheading")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14 text-[10px] uppercase tracking-[0.3em] text-warm-surface/60 font-sans"
        >
          {t("title")}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-warm-surface/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">
          {t("scroll")}
        </span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px bg-gradient-to-b from-warm-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
