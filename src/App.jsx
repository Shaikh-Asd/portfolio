import { Suspense } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui";
import { Hero } from "@/components/sections/Hero";
import {
  About,
  Services,
  Skills,
  Projects,
  WhyWorkWithMe,
  Process,
  Testimonials,
  FAQ,
  Contact,
} from "@/lazySections";

function SectionLoader() {
  return <div className="section-padding" aria-hidden />;
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <Navbar />
        <main className="flex min-h-screen flex-col overflow-x-hidden">
          <Hero />
          <Suspense fallback={<SectionLoader />}>
            <About />
            <Services />
            <Skills />
            <Projects />
            <WhyWorkWithMe />
            <Process />
            <Testimonials />
            <FAQ />
            <Contact />
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </MotionProvider>
    </ThemeProvider>
  );
}
