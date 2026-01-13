"use client";

import { H2 } from "@/components/datacite/Headings";
import useOverview from "@/data/fetchOverview";
import { useId } from "@/hooks";

export default function Header() {
  const { id } = useId();
  const { isPending, isError, data, error } = useOverview();

  if (isError) return `Error: ${error}`;

  const name = isPending ? id : data.name;

  return <H2 className="text-4xl w-full">{name}</H2>;
}
