"use client";

import useOverview from "@/data/fetchOverview";
import { useClientId } from "@/hooks";

export default function Header() {
  const clientId = useClientId();
  const { isPending, isError, data, error } = useOverview();

  if (isError) return `Error: ${error}`;

  const name = isPending ? clientId : data.name;

  return <h2 className="text-4xl w-full">{name}</h2>;
}
