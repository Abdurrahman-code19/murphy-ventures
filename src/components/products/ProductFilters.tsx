import { Search, X } from "lucide-react";
import { categories } from "../../data/categories";
import type { Condition } from "../../types";
import { cn } from "../../lib/utils";

export type ConditionFilter = "all" | Exclude<Condition, "unknown">;

const conditionOptions: Array<{ value: ConditionFilter; label: string }> = [
  { value: "all", label: "All conditions" },
  { value: "new", label: "New" },
  { value: "fairly-used", label: "Fairly used" },
];

export function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  condition,
  onConditionChange,
  counts,
  resultCount,
  total,
  onReset,
  hasActiveFilters,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  condition: ConditionFilter;
  onConditionChange: (value: ConditionFilter) => void;
  counts: Record<string, number>;
  resultCount: number;
  total: number;
  onReset: () => void;
  hasActiveFilters: boolean;
}) {
  return (
    <div className="rounded-[16px] border border-line bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search equipment, brand or model"
            aria-label="Search equipment"
            className="h-11 w-full rounded-[10px] border border-line bg-ivory/70 pl-10 pr-10 text-[13.5px] text-ink transition-colors placeholder:text-muted focus:border-royal focus:bg-white focus:ring-2 focus:ring-royal/10"
          />
          {search ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-line hover:text-navy"
            >
              <X aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <p aria-live="polite" className="text-[12px] text-muted">
            Showing <span className="font-semibold text-navy">{resultCount}</span> of {total}{" "}
            products
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-royal underline-offset-4 hover:underline"
            >
              Reset
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
        <FilterChip
          active={category === "all"}
          onClick={() => onCategoryChange("all")}
          label="All equipment"
          count={total}
        />
        {categories.map((item) => (
          <FilterChip
            key={item.slug}
            active={category === item.slug}
            onClick={() => onCategoryChange(item.slug)}
            label={item.shortName}
            count={counts[item.slug] ?? 0}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
          Condition
        </span>
        <div className="flex flex-wrap gap-2">
          {conditionOptions.map((option) => (
            <FilterChip
              key={option.value}
              active={condition === option.value}
              onClick={() => onConditionChange(option.value)}
              label={option.label}
              small
            />
          ))}
        </div>
        <p className="text-[11px] text-muted">
          Items with unconfirmed condition appear under “All conditions”.
        </p>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
  small = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-medium transition-colors",
        small ? "h-8 px-3 text-[11.5px]" : "h-9 px-3.5 text-[12px]",
        active
          ? "border-navy bg-navy text-ivory"
          : "border-line bg-white text-ink/75 hover:border-line-dark hover:text-navy",
      )}
    >
      {label}
      {count !== undefined ? (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold leading-none",
            active ? "bg-white/15 text-white/80" : "bg-ivory-deep text-muted",
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
