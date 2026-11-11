import { motion, useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PageFallback } from "../shared/PageFallback";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileDock, WhatsAppFab } from "./MobileDock";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-[8px] bg-navy px-4 py-3 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageFallback />}>
          {reduceMotion ? (
            <Outlet />
          ) : (
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          )}
        </Suspense>
      </main>

      <Footer />

      <div
        aria-hidden="true"
        className="h-[calc(5.75rem+env(safe-area-inset-bottom))] lg:hidden"
      />
      <ScrollToTop />
      <MobileDock />
      <WhatsAppFab />
    </>
  );
}
