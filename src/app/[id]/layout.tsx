import { notFound } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchEntity } from "@/data/fetch";
import Header from "./Header";

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[id]">) {
  const { id } = await params;

  // Check if entity exists
  const entity = await fetchEntity(id);
  if (!entity) notFound();

  return (
    <>
      <Breadcrumbs entity={entity} />
      <Header entity={entity} />
      <ActionButtons entity={entity} />
      {children}
    </>
  );
}
