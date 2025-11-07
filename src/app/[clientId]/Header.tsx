"use client";

import useOverview from "@/data/fetchOverview";
import { useClientId } from "@/hooks";

export default function Header() {
  const clientId = useClientId();
  const { isPending, isError, data, error } = useOverview(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return <h2 className="text-4xl w-full">{data.name}</h2>;
}
