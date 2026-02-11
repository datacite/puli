import { notFound } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchResource } from "@/data/fetch";
import Header from "./Header";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ id?: string[] }>;
  children: React.ReactNode;
}) {
  const { id: slug } = await params;
  if (slug && slug.length > 1) throw "Incorrect ID format";
  const id = slug?.[0] || "";

  // Check if resource exists
  const resource = await fetchResource(id);
  if (!resource) notFound();

  return (
    <>
      <Breadcrumbs />
      <Header />
      <ActionButtons />
      {children}
    </>
  );
}
