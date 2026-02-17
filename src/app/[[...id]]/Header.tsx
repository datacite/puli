"use client";

import { H2 } from "@/components/datacite/Headings";
import { useResource } from "@/data/fetch";
import { useId } from "@/hooks";

export default function Header() {
  const id = useId();
  const { data: resource } = useResource();

  return (
    <H2 className={`text-4xl w-full ${resource ? "" : "opacity-70"}`}>
      {resource?.name || id}
    </H2>
  );
}
