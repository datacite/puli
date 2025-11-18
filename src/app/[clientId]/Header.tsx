"use client";

import useOverview from "@/data/fetchOverview";

export default function Header() {
  const { isPending, isError, data, error } = useOverview();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return <h2 className="text-4xl w-full">{data.name}</h2>;
}
