"use client";

import { H2 } from "@/components/datacite/Headings";
import useOverview from "@/data/fetchOverview";
import { useClientId } from "@/hooks";

export default function Header() {
  const clientId = useClientId();
  const { isPending, isError, data, error } = useOverview();

  if (isError) return `Error: ${error}`;

  const name = isPending ? clientId : data.name;

  return <H2 className="text-4xl w-full">{name}</H2>;
}
