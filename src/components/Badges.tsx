import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Entity } from "@/types";

const DEFAULT_CLASS =
  "rounded-[40px] text-[0.8em] text-datacite-blue-dark bg-datacite-blue-light/20 p-y-0 p-x-1 border-none";

const MEMBER_TYPE_LABEL = {
  repository: "Repository",
  direct_member: "Institutional Member",
  consortium: "Consortium Member",
  consortium_organization: "Consortium Organization",
} as const;

export function EntityBadge(props: { entity: { type: Entity["type"] } }) {
  if (!props.entity.type) return null;

  const label = MEMBER_TYPE_LABEL[props.entity.type];
  if (!label) return null;

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
