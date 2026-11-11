import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant =
  | "primary"
  | "gold"
  | "outline"
  | "outline-light"
  | "ghost"
  | "ghost-light";

export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-ivory border border-navy hover:bg-royal hover:border-royal shadow-btn hover:-translate-y-px",
  gold: "bg-gold text-navy border border-gold hover:bg-gold-soft hover:border-gold-soft hover:-translate-y-px shadow-[0_14px_30px_-16px_rgba(196,154,69,0.8)]",
  outline:
    "border border-line-dark bg-transparent text-navy hover:border-navy hover:bg-white",
  "outline-light":
    "border border-white/25 bg-transparent text-ivory hover:border-white/60 hover:bg-white/10",
  ghost: "border border-transparent bg-transparent text-navy hover:bg-navy/5",
  "ghost-light": "border border-transparent bg-transparent text-ivory hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-5 text-sm",
  lg: "h-[54px] px-7 text-[15px]",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold tracking-[-0.01em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={buttonStyles(variant, size, className)} {...props} />;
}
