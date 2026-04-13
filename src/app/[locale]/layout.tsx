import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://palstoltlarsen.no";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant-garamond",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a0e08" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const canonicalPath = `/${locale}`;
  const ogLocale = locale === "no" ? "nb_NO" : "en_US";
  const altLocale = locale === "no" ? "en_US" : "nb_NO";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s · Pål Gøran Stolt-Larsen Pettersen",
    },
    description: t("description"),
    keywords: [
      "sommelier",
      "vinkelner",
      "wine director",
      "Skjolden Hotell",
      "Skjolden Hotel",
      "Noma",
      "Sketch London",
      "Tango Stavanger",
      "Tempo Vinbar",
      "vinkurs",
      "wine course",
      "vinforedrag",
      "Sognefjorden",
      "Pål Gøran Stolt-Larsen Pettersen",
    ],
    authors: [{ name: "Pål Gøran Stolt-Larsen Pettersen" }],
    creator: "Pål Gøran Stolt-Larsen Pettersen",
    publisher: "Pål Gøran Stolt-Larsen Pettersen",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical: canonicalPath,
      languages: {
        no: "/no",
        en: "/en",
        "x-default": "/no",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalPath,
      siteName: "Pål Gøran Stolt-Larsen Pettersen",
      locale: ogLocale,
      alternateLocale: altLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "personal",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pål Gøran Stolt-Larsen Pettersen",
    givenName: "Pål Gøran",
    familyName: "Stolt-Larsen Pettersen",
    jobTitle:
      locale === "no"
        ? "F&B Manager, Sommelier & Vinkelner"
        : "F&B Manager, Sommelier & Wine Director",
    description:
      locale === "no"
        ? "F&B Manager ved Skjolden Hotell. Sommelier med internasjonal erfaring fra Noma, Sketch London og Tango Stavanger."
        : "F&B Manager at Skjolden Hotel. Sommelier with international experience from Noma, Sketch London and Tango Stavanger.",
    url: `${SITE_URL}/${locale}`,
    worksFor: {
      "@type": "Organization",
      name: "Skjolden Hotell",
      url: "https://www.skjoldenhotel.no",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Skjolden",
      addressRegion: "Vestland",
      addressCountry: "NO",
    },
    alumniOf: [
      { "@type": "Organization", name: "Noma", url: "https://noma.dk" },
      { "@type": "Organization", name: "Sketch", url: "https://sketch.london" },
      { "@type": "Organization", name: "Tango Bar & Kjøkken" },
      { "@type": "Organization", name: "Tempo Vinbar" },
    ],
    knowsAbout: [
      "Sommelier",
      "Wine",
      "Burgundy",
      "Champagne",
      "South African wine",
      "Portuguese wine",
      "Food and beverage management",
      "Wine education",
      "Hospitality",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "WSET — Wine & Spirit Education Trust",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Vinkelner, Kulinarisk Akademi",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Fagbrev Servitør",
      },
    ],
    nationality: "NO",
  };

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable}`}
    >
      <body className="grain bg-warm-bg text-warm-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
