import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEFAULT_CLASS =
  "rounded-[40px] text-[0.8em] text-datacite-blue-dark bg-datacite-blue-light/20 p-y-0 p-x-1 border-none";

const MEMBER_TYPE_LABEL = {
  repository: "Repository",
  direct_member: "Institutional Member",
  consortium: "Consortium Member",
  consortium_organization: "Consortium Organization",
  member_only: "Institutional Member",
} as const;

export function EntityBadge(props: { entity: { type: string } }) {
  const entityType = props.entity.type;
  if (!entityType || !(entityType in MEMBER_TYPE_LABEL)) return null;

  const label = MEMBER_TYPE_LABEL[entityType as keyof typeof MEMBER_TYPE_LABEL];

  return (
    <Badge variant="outline" className={DEFAULT_CLASS}>
      {label}
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
