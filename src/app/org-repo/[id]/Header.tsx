import { H2 } from "@/components/datacite/Headings";
import type { Entity, HeaderInfo } from "@/types";
import { BookCheck, Building2 } from "lucide-react";
import GenericHeader from "@/components/GenericHeader";

export default function Header(props: { entity: Entity }) {
  const headerInfo: HeaderInfo = {
    title: props.entity.name,
    id: props.entity.id,
    labels: [
    ],
  };
  return <GenericHeader headerInfo={headerInfo} />;
}
