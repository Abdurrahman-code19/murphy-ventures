import { motion, useReducedMotion } from "framer-motion";
import { Phone, Wrench } from "lucide-react";
import { Suspense, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { site } from "../../config/site";
import { generalEnquiryMessage, whatsappLink } from "../../lib/whatsapp";
import { PageFallback } from "../shared/PageFallback";
import { WhatsAppIcon } from "../shared/WhatsAppIcon";
import { Footer } from "./Footer";
import { Header } from "./Header";
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

      <div aria-hidden="true" className="h-16 lg:hidden" />
      <ScrollToTop />
      <MobileActionBar />
    </>
  );
}

function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-line">
        <a
          href={`tel:${site.phones[0].tel}`}
          className="flex h-14 flex-col items-center justify-center gap-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-navy"
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          Call
        </a>
        <a
          href={whatsappLink(generalEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 flex-col items-center justify-center gap-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-navy"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          to="/request-repair"
          className="flex h-14 flex-col items-center justify-center gap-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-gold-ink"
        >
          <Wrench aria-hidden="true" className="h-4 w-4" />
          Repair
        </Link>
      </div>
    </div>
  );
}
