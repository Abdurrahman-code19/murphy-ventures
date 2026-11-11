import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "../../lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

export function RadioCards({
  name,
  legend,
  options,
  registration,
  error,
  hint,
  required = false,
  className,
}: {
  name: string;
  legend: string;
  options: RadioOption[];
  registration: UseFormRegisterReturn;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <fieldset className={className} aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-2 flex items-baseline gap-1.5 text-[12px] font-semibold tracking-[0.01em] text-navy">
        {legend}
        {required ? (
          <span aria-hidden="true" className="text-gold-ink">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only">(required)</span> : null}
      </legend>
      {hint ? <p className="mb-2.5 text-[11.5px] leading-snug text-muted">{hint}</p> : null}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-[10px] border border-line bg-white p-3.5 transition-colors",
              "hover:border-line-dark has-[:checked]:border-navy has-[:checked]:bg-ivory",
            )}
          >
            <input
              type="radio"
              value={option.value}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#091B3B]"
              aria-invalid={error ? true : undefined}
              {...registration}
            />
            <span className="flex flex-col gap-0.5">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-navy">
                {option.icon}
                {option.label}
              </span>
              {option.description ? (
                <span className="text-[11.5px] leading-snug text-muted">
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-[11.5px] font-medium leading-snug text-[#B42318]"
        >
          <AlertCircle aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
