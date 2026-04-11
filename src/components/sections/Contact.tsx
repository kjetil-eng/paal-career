"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/PLACEHOLDER", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-warm-bg py-24 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-10"
      >
        <div className="md:col-span-5">
          <motion.p
            variants={fadeUp}
            className="mb-5 text-[11px] uppercase tracking-[0.3em] text-warm-cognac font-sans"
          >
            — {t("eyebrow")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-playfair text-4xl leading-[1.1] text-warm-dark md:text-6xl"
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-8 font-cormorant text-xl italic leading-snug text-warm-muted md:text-2xl"
          >
            {t("subheading")}
          </motion.p>
        </div>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="md:col-span-7 flex flex-col gap-7"
        >
          <Field label={t("name")} name="name" required />
          <Field label={t("email")} name="email" type="email" required />
          <Field label={t("message")} name="message" multiline required />

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center gap-3 bg-warm-cognac px-8 py-4 text-sm uppercase tracking-[0.22em] text-warm-surface transition-colors hover:bg-warm-terracotta disabled:opacity-60"
            >
              {status === "sending" ? t("sending") : t("send")}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            {status === "success" && (
              <p className="text-sm text-warm-cognac">{t("success")}</p>
            )}
            {status === "error" && (
              <p className="text-sm text-warm-terracotta">{t("error")}</p>
            )}
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  multiline,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
}) {
  const id = `contact-${name}`;
  const base =
    "w-full border-b border-warm-cream bg-transparent py-4 text-base md:text-lg text-warm-dark placeholder:text-warm-muted/60 focus:border-warm-cognac focus:outline-none transition-colors font-sans";
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[11px] uppercase tracking-[0.22em] text-warm-cognac"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          required={required}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={
            name === "email" ? "email" : name === "name" ? "name" : undefined
          }
          className={base}
        />
      )}
    </div>
  );
}
