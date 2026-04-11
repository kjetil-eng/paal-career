"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Skjolden() {
  const t = useTranslations("skjolden");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative bg-warm-surface">
      <div className="mx-auto grid max-w-none grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[5/4] overflow-hidden lg:aspect-auto lg:min-h-[80vh]">
          <motion.div
            style={{ y: imgY }}
            className="absolute inset-0 -top-12 -bottom-12 will-change-transform"
          >
            <Image
              src="/images/pal-action.webp"
              alt="Skjolden, Sognefjorden"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/20 to-transparent" />
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex items-center bg-warm-bg px-6 py-20 md:px-16 md:py-32"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className="mb-5 text-[11px] uppercase tracking-[0.3em] text-warm-cognac font-sans"
            >
              {t("eyebrow")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl leading-[1.1] text-warm-dark md:text-5xl"
            >
              {t("heading")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-8 font-cormorant text-2xl italic text-warm-muted"
            >
              {t("ingress")}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg leading-[1.7] text-warm-text/80"
            >
              {t("body")}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10">
              <a
                href="https://www.skjoldenhotell.no"
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-3 bg-warm-cognac px-7 py-4 text-sm uppercase tracking-[0.22em] text-warm-surface transition-colors hover:bg-warm-terracotta"
              >
                {t("cta")}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
