"use client";

import PresentBar, { type Props as BarProps } from "@/components/PresentBar";

interface Props {
  data: BarProps[];
}

export default function PresentChart(props: Props) {
  const { data } = props;

  return (
    <div className="w-full flex flex-col h-min gap-2">
      {data.map((p) => (
        <PresentBar {...p} key={p.property} />
      ))}
    </div>
  );
}
