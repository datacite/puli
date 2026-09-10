import { notFound } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getOrgRepoEntity } from "./orgRepoRecord";
import Header from "./Header";

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[id]">) {
  const { id } = await params;

  // Check if entity exists
  const entity = await getOrgRepoEntity(id);
  if (!entity) notFound();

  return (
    <>
      <Breadcrumbs entity={entity} />
      {children}
    </>
  );
}
