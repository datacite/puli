import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props extends BadgeProps {
  show: boolean;
}

export function HighImpactBadge(props: Props) {
  const { show = true, className, ...badgeProps } = props;

  if (!show) return null;
  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 rounded-[40px] text-datacite-blue-dark bg-datacite-blue-light/20 text-[0.8em] p-y-0 p-x-1 border-none",
        className,
      )}
      {...badgeProps}
    >
      HIGH IMPACT
    </Badge>
  );
}
