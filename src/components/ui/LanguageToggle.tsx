"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  const stripped = (() => {
    for (const loc of routing.locales) {
      if (pathname === `/${loc}`) return "/";
      if (pathname.startsWith(`/${loc}/`)) return pathname.slice(`/${loc}`.length);
    }
    return pathname;
  })();

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-[11px] tracking-[0.2em] font-sans",
        className,
      )}
    >
      {routing.locales.map((loc, i) => {
        const active = loc === locale;
        const href = `/${loc}${stripped === "/" ? "" : stripped}`;
        return (
          <span key={loc} className="flex items-center">
            {i > 0 && <span className="mx-1 opacity-40">·</span>}
            <Link
              href={href}
              className={cn(
                "uppercase transition-colors",
                active
                  ? "text-warm-gold"
                  : "hover:text-warm-gold opacity-70",
              )}
              aria-current={active ? "true" : undefined}
            >
              {loc}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
