import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; to?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[12px] text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="transition-colors hover:text-navy">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              <ChevronRight aria-hidden="true" className="h-3 w-3 text-line-dark" />
              {item.to && !isLast ? (
                <Link to={item.to} className="transition-colors hover:text-navy">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-ink">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
