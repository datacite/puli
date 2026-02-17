import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEFAULT_CLASS =
  "rounded-[40px] text-[0.8em] text-datacite-blue-dark bg-datacite-blue-light/20 p-y-0 p-x-1 border-none";

export function EntityBadge(props: { entity: { subtype: string } }) {
  if (!props.entity.subtype) return null;

  return (
    <Badge variant="outline" className={DEFAULT_CLASS}>
      {props.entity.subtype
        .replaceAll("_", " ")
        .replace(/\b\w/g, (s) => s.toUpperCase())}
    </Badge>
  );
}

export function HighImpactBadge(props: { show: boolean } & BadgeProps) {
  const { show = true, className, ...badgeProps } = props;

  if (!show) return null;
  return (
    <Badge
      variant="outline"
      className={cn(DEFAULT_CLASS, className)}
      {...badgeProps}
    >
      High Impact
    </Badge>
  );
}
