import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { categories } from "../../data/categories";
import { mainNav, site } from "../../config/site";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useScrolled } from "../../hooks/useScrolled";
import { cn } from "../../lib/utils";
import { Button, buttonStyles } from "../shared/Button";
import { Logo } from "../shared/Logo";
import { WhatsAppIcon } from "../shared/WhatsAppIcon";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative py-2 text-[13.5px] font-medium transition-colors",
    isActive ? "text-navy" : "text-ink/75 hover:text-navy",
    isActive &&
      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-gold",
  );

export function Header() {
  const scrolled = useScrolled(6);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(mobileOpen);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (productsOpen) {
        setProductsOpen(false);
        return;
      }
      if (mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, productsOpen]);

  const primaryPhone = site.phones[0];

  return (
    <>
      <div className="bg-navy text-white/70 on-dark">
        <div className="mx-auto flex h-9 w-full max-w-[1280px] items-center justify-between gap-4 px-5 text-[10.5px] tracking-[0.08em] sm:px-8 lg:px-10">
          <p className="flex min-w-0 items-center gap-2">
            <MapPin aria-hidden="true" className="h-3 w-3 shrink-0 text-gold" />
            <span className="truncate">Abaranje–Ikotun, Lagos State, Nigeria</span>
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-gold-soft sm:flex"
            >
              <Phone aria-hidden="true" className="h-3 w-3" />
              {primaryPhone.label}
            </a>
            <a
              href={`tel:${site.phones[1].tel}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-gold-soft md:flex"
            >
              {site.phones[1].label}
            </a>
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
            <p className="hidden uppercase tracking-[0.18em] text-gold-soft/90 sm:block">
              Sales · Repairs · Maintenance
            </p>
            <a
              href={`tel:${primaryPhone.tel}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold-soft sm:hidden"
            >
              <Phone aria-hidden="true" className="h-3 w-3" />
              Call
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-line shadow-[0_12px_30px_-24px_rgba(9,27,59,0.5)]" : "border-line/80",
        )}
      >
        <div className="mx-auto flex h-[74px] w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:gap-6 sm:px-8 lg:px-10">
          <Link
            to="/"
            aria-label="Murphy Ventures home"
            className="shrink-0 rounded-sm transition-opacity hover:opacity-90"
          >
            <Logo />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {mainNav.map((item) =>
              item.label === "Products" ? (
                <div
                  key={item.to}
                  ref={productsRef}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setProductsOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    <NavLink to={item.to} className={navLinkClass}>
                      {item.label}
                    </NavLink>
                    <button
                      type="button"
                      aria-label="Show equipment categories"
                      aria-expanded={productsOpen}
                      aria-controls="products-menu"
                      onClick={() => setProductsOpen((open) => !open)}
                      className="rounded-sm p-1 text-ink/60 transition-colors hover:text-navy"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          productsOpen && "rotate-180",
                        )}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {productsOpen ? (
                      <motion.div
                        id="products-menu"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[430px] -translate-x-1/2 pt-4"
                      >
                        <div className="overflow-hidden rounded-[14px] border border-line bg-white p-2 shadow-float">
                          {categories.map((category) => (
                            <Link
                              key={category.slug}
                              to={`/products?category=${category.slug}`}
                              onClick={() => setProductsOpen(false)}
                              className="group flex items-start justify-between gap-4 rounded-[10px] px-3.5 py-3 transition-colors hover:bg-ivory"
                            >
                              <span>
                                <span className="block text-[13.5px] font-semibold text-navy">
                                  {category.name}
                                </span>
                                <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">
                                  {category.description}
                                </span>
                              </span>
                              <ArrowUpRight
                                aria-hidden="true"
                                className="mt-1 h-4 w-4 shrink-0 text-line-dark transition-colors group-hover:text-gold"
                              />
                            </Link>
                          ))}
                          <div className="mt-1 border-t border-line px-3.5 py-3">
                            <Link
                              to="/products"
                              onClick={() => setProductsOpen(false)}
                              className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-royal hover:text-navy"
                            >
                              View all equipment
                              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} end={item.to === "/"} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/request-repair"
              className={cn(buttonStyles("outline", "sm"), "max-xl:hidden")}
            >
              Request Repair
            </Link>
            <a
              href={`tel:${primaryPhone.tel}`}
              className={cn(buttonStyles("primary", "sm"), "max-sm:hidden")}
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{primaryPhone.label}</span>
              <span className="md:hidden">Call</span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open site menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line-dark text-navy transition-colors hover:border-navy lg:hidden"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    onClose();
    // Close only when the route actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-navy text-ivory on-dark lg:hidden"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" />
          <div className="relative mx-auto flex min-h-full w-full max-w-[1280px] flex-col px-5 pb-8 pt-5 sm:px-8">
            <div className="flex items-center justify-between">
              <Logo tone="dark" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close site menu"
                className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/20 text-ivory transition-colors hover:bg-white/10"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="mt-8">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {mainNav.map((item, index) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex items-baseline gap-4 py-3.5 font-display text-[22px] font-semibold tracking-[-0.02em] transition-colors",
                          isActive ? "text-gold-soft" : "text-ivory hover:text-gold-soft",
                        )
                      }
                    >
                      <span className="text-[10px] font-medium tracking-[0.2em] text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 rounded-[16px] border border-white/12 bg-white/[0.04] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-soft">
                Murphy Ventures
              </p>
              <address className="mt-3 not-italic text-[13px] leading-relaxed text-white/65">
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.region}
              </address>
              <div className="mt-4 flex flex-col gap-2">
                {site.phones.map((phone) => (
                  <a
                    key={phone.tel}
                    href={`tel:${phone.tel}`}
                    className="flex items-center gap-2 text-[14px] font-medium text-ivory transition-colors hover:text-gold-soft"
                  >
                    <Phone aria-hidden="true" className="h-3.5 w-3.5 text-gold" />
                    {phone.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              <Link to="/request-repair" className={buttonStyles("gold", "md", "w-full")}>
                Request a Repair
              </Link>
              <Link to="/products" className={buttonStyles("outline-light", "md", "w-full")}>
                Explore Equipment
              </Link>
            </div>

            <a
              href={`https://wa.me/${site.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-[13px] font-medium text-white/60 transition-colors hover:text-gold-soft"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat with us on WhatsApp
            </a>

            <Button
              variant="ghost-light"
              onClick={onClose}
              className="mt-4 self-center text-xs text-white/45"
            >
              Close menu
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
