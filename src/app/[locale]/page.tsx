import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Quote } from "@/components/sections/Quote";
import { Skjolden } from "@/components/sections/Skjolden";
import { Tempo } from "@/components/sections/Tempo";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LenisProvider>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Philosophy />
        <Services />
        <Quote />
        <Skjolden />
        <Tempo />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  );
}
