import { asNumber } from "@/util";

type Stat = {
  label: string;
  value: number;
};

type SummaryStatsBoxProps = {
  title: string;
  mainValue: number;
  stats: Stat[];
};

export function SummaryStatsBox({ title, mainValue, stats }: SummaryStatsBoxProps) {
  return (
    <div className="rounded-none bg-muted p-6">
      <div className="mb-2 text-sm font-bold text-muted-foreground uppercase">{title}</div>
      <div className="mb-4 text-3xl font-semibold text-foreground">
        {asNumber(mainValue)}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-xs text-muted-foreground uppercase font-bold">{stat.label}</div>
            <div className="mt-1 text-xl font-semibold">
              {asNumber(stat.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
