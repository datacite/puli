"use client";

import { H2 } from "@/components/datacite/Headings";
import { useEntity } from "@/data/fetch";
import { useId } from "@/hooks";

export default function Header() {
  const id = useId();
  const { data: entity } = useEntity();

  return (
    <H2 className={`text-4xl w-full ${entity ? "" : "opacity-70"}`}>
      {entity?.name || id}
    </H2>
  );
}
