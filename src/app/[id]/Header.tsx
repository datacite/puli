import { H2 } from "@/components/datacite/Headings";
import type { Entity } from "@/types";

export default function Header(props: { entity: Entity }) {
  return <H2 className={`text-4xl w-full`}>{props.entity.name}</H2>;
}
