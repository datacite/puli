import { Badge } from "@/components/ui/badge";

interface Props {
  show: boolean;
}

export default function HighImpactBadge(props: Props) {
  const { show = true } = props;

  if (!show) return null;
  return (
    <Badge
      variant="secondary"
      className="ml-2 rounded-sm text-[0.8em] p-y-0 p-x-1"
    >
      HIGH IMPACT
    </Badge>
  );
}
