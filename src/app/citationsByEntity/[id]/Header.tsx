import { H2 } from "@/components/datacite/Headings";
import type { Entity } from "@/types";

export default function Header(props: { entity: Entity }) {
  return (
    <div className="gap-0 mt-8">
      <H2 className={`text-4xl w-full`}>{props.entity.name}</H2>
        <div className="text-gray-500 font-semibold">
          {props.entity.id}
        </div>
    </div>
  );
}
