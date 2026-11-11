import { ArrowUpRight, MapPin } from "lucide-react";
import { maps, site } from "../../config/site";

export function MapPanel({ className }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_1px_2px_rgba(9,27,59,0.04)] ${className ?? ""}`}
    >
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
            <MapPin aria-hidden="true" className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-navy">Murphy Ventures</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-muted">
              {site.address.street}, {site.address.locality}
            </p>
          </div>
        </div>
        <a
          href={maps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-royal transition-colors hover:text-navy"
        >
          Get directions
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>
      <iframe
        src={maps.embedUrl}
        title="Map showing the location of Murphy Ventures, 208 Abaranje Road, Ikotun, Lagos"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[300px] w-full border-0 sm:h-[340px]"
      />
    </div>
  );
}
