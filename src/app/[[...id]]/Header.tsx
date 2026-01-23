"use client";

import { H2 } from "@/components/datacite/Headings";
import { useResource } from "@/data/fetch";

export default function Header() {
  const { data: resource } = useResource();
  return <H2 className="text-4xl w-full">{resource?.name}</H2>;
}
