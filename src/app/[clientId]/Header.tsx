"use client";

import useOverview from "@/data/fetchOverview";

export default function Header() {
  const { isPending, isError, data, error } = useOverview();

  if (isError) return `Error: ${error}`;

  const name = isPending ? "Repository Name" : data.name;

  return (
    <h2 className="text-4xl w-full" style={isPending ? { opacity: 0.2 } : {}}>
      {name}
    </h2>
  );
}
