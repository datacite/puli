import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEFAULT_CLASS =
  "ml-2 rounded-[40px] text-datacite-blue-dark bg-datacite-blue-light/20 p-y-0 p-x-1 border-none";

export function ResourceBadge(props: { resource: { subtype: string } }) {
  return (
    <Badge variant="outline" className={DEFAULT_CLASS}>
      {props.resource.subtype.replaceAll("_", " ")}
    </Badge>
  );
}

export function HighImpactBadge(props: { show: boolean } & BadgeProps) {
  const { show = true, className, ...badgeProps } = props;

  if (!show) return null;
  return (
    <Badge
      variant="outline"
      className={cn(DEFAULT_CLASS, "text-[0.8em]", className)}
      {...badgeProps}
    >
      HIGH IMPACT
    </Badge>
  );
}
