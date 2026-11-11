import { AlertCircle, ChevronDown } from "lucide-react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "../../lib/utils";

const controlBase =
  "w-full rounded-[10px] border bg-white px-3.5 text-[13.5px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-royal focus:ring-2 focus:ring-royal/10 disabled:cursor-not-allowed disabled:bg-ivory-deep";

function FieldShell({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-1.5 text-[12px] font-semibold tracking-[0.01em] text-navy"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-gold-ink">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only">(required)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[11.5px] leading-snug text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={descriptionId}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-[11.5px] font-medium leading-snug text-[#B42318]"
        >
          <AlertCircle aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface BaseFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

export function TextInput({
  id,
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlBase, "h-11", error ? "border-[#D92D20]" : "border-line")}
        {...props}
      />
    </FieldShell>
  );
}

export function TextArea({
  id,
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          controlBase,
          "min-h-[112px] resize-y py-3 leading-relaxed",
          error ? "border-[#D92D20]" : "border-line",
        )}
        {...props}
      />
    </FieldShell>
  );
}

export function Select({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
  ...props
}: BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            controlBase,
            "h-11 appearance-none pr-9",
            error ? "border-[#D92D20]" : "border-line",
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
      </div>
    </FieldShell>
  );
}
