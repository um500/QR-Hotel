import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  tint,
  label,
  value,
  caption,
}: {
  icon: LucideIcon;
  tint: string;
  label: string;
  value: string | number;
  caption: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl2 border border-line bg-white p-5 shadow-card">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tint}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-ink-dim">{label}</p>
        <p className="tnum font-display text-2xl font-semibold text-ink">{value}</p>
        <p className="text-xs text-ink-faint">{caption}</p>
      </div>
    </div>
  );
}
