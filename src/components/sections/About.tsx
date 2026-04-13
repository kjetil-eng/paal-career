"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative bg-warm-bg py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
        <div className="md:col-span-5 lg:col-span-5">
          <div className="md:sticky md:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
            >
              <Image
                src="/images/pal-portrait.webp"
                alt="Portrett av Pål Gøran Stolt-Larsen Pettersen"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/30 to-transparent" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 font-cormorant text-lg italic text-warm-muted"
            >
              Skjolden, Sognefjorden.
            </motion.p>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-7 md:pl-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 text-[11px] uppercase tracking-[0.3em] text-warm-cognac font-sans"
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mb-12 font-playfair text-4xl leading-[1.1] text-warm-dark md:text-6xl"
            >
              {t("heading")}
            </motion.h2>

            <div className="space-y-7 text-lg leading-[1.75] text-warm-text/85 md:text-xl">
              <motion.p variants={fadeUp}>{t("p1")}</motion.p>
              <motion.p variants={fadeUp}>{t("p2")}</motion.p>
            </div>

            {/* Pull-quote — editorial rhythm break */}
            <motion.blockquote
              variants={fadeUp}
              className="my-14 border-l-2 border-warm-cognac pl-5 font-cormorant text-[1.6rem] italic leading-[1.25] text-warm-dark md:pl-8 md:text-4xl md:leading-[1.2]"
            >
              &ldquo;{t("pull_quote")}&rdquo;
            </motion.blockquote>

            <div className="space-y-7 text-lg leading-[1.75] text-warm-text/85 md:text-xl">
              <motion.p variants={fadeUp}>{t("p3")}</motion.p>
              <motion.p variants={fadeUp}>{t("p4")}</motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-14 border-t border-warm-cream pt-8"
            >
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-warm-muted">
                {t("certifications_label")}
              </p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3 font-cormorant text-lg italic text-warm-dark">
                <li>{t("cert_1")}</li>
                <li>{t("cert_2")}</li>
                <li>{t("cert_3")}</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
