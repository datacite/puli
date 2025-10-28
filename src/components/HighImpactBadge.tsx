interface Props {
  show: boolean;
}

export default function HighImpactBadge(props: Props) {
  const { show = true } = props;

  if (!show) return null;
  return " (High Impact)";
}
