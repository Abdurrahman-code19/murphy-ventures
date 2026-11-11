import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type BadgeTone = "neutral" | "gold" | "navy" | "success" | "outline";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-[#EEF0F3] text-slate-600 border-transparent",
  gold: "bg-gold/15 text-gold-ink border-gold/30",
  navy: "bg-navy text-ivory border-navy",
  success: "bg-[#E8F3EC] text-[#256B45] border-[#CBE3D5]",
  outline: "bg-white/60 text-ink border-line",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase leading-none tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
