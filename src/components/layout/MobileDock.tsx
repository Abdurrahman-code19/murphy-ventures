import { motion, useReducedMotion } from "framer-motion";
import { Home, Info, MessageCircle, Package, Wrench } from "lucide-react";
import { NavLink } from "react-router-dom";
import { generalEnquiryMessage, whatsappLink } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";
import { WhatsAppIcon } from "../shared/WhatsAppIcon";

const dockItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "About", to: "/about", icon: Info },
  { label: "Products", to: "/products", icon: Package },
  { label: "Services", to: "/services", icon: Wrench },
  { label: "Contact", to: "/contact", icon: MessageCircle },
] as const;

/**
 * Floating glass dock for small screens. Sits above the home indicator and
 * mirrors the five primary destinations without touching desktop navigation.
 */
export function MobileDock() {
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Quick navigation"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 lg:hidden",
        "pb-[calc(env(safe-area-inset-bottom)+0.625rem)]",
      )}
    >
      <div className="mx-auto flex max-w-[430px] items-center justify-between gap-0.5 rounded-full border border-white/70 bg-white/80 p-1.5 shadow-[0_18px_45px_-18px_rgba(9,27,59,0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        {dockItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className="group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-2"
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  reduceMotion ? (
                    <span aria-hidden="true" className="absolute inset-0 rounded-full bg-navy" />
                  ) : (
                    <motion.span
                      aria-hidden="true"
                      layoutId="mobile-dock-active"
                      className="absolute inset-0 rounded-full bg-navy shadow-[0_10px_20px_-12px_rgba(9,27,59,0.9)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )
                ) : null}

                <Icon
                  aria-hidden="true"
                  strokeWidth={isActive ? 2.1 : 1.8}
                  className={cn(
                    "relative h-[18px] w-[18px] transition-colors duration-200",
                    isActive ? "text-gold-soft" : "text-muted group-hover:text-navy",
                  )}
                />
                <span
                  className={cn(
                    "relative text-[9.5px] font-semibold leading-none tracking-[0.01em] transition-colors duration-200",
                    isActive ? "text-ivory" : "text-muted group-hover:text-navy",
                  )}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

/** Floating WhatsApp shortcut, parked above the dock so it never covers it. */
export function WhatsAppFab() {
  return (
    <aside aria-label="WhatsApp contact">
      <a
        href={whatsappLink(generalEnquiryMessage())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Murphy Ventures on WhatsApp"
        className={cn(
          "fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full",
          "bg-[#25d366] text-white shadow-[0_16px_32px_-14px_rgba(37,211,102,0.9)]",
          "ring-4 ring-white/70 transition-transform duration-200 active:scale-95 lg:hidden",
        )}
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 5.75rem)" }}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </aside>
  );
}
