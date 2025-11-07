"use client";

import useOverview from "@/data/fetchOverview";

export default function Header({ clientId }: { clientId: string }) {
  const { isPending, isError, data, error } = useOverview(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return <h2 className="text-4xl w-full">{data.name}</h2>;
}
