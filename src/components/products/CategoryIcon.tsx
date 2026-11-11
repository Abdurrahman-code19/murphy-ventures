import { Banknote, Calculator, Clock, ScanLine, ShieldCheck } from "lucide-react";
import type { Category } from "../../types";

const icons = {
  banknote: Banknote,
  clock: Clock,
  shield: ShieldCheck,
  scan: ScanLine,
  calculator: Calculator,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: Category["icon"];
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" className={className} />;
}
