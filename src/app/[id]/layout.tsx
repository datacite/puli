import { notFound } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs, { type BreadcrumbData } from "@/components/Breadcrumbs";
import { fetchDatacite, isClient } from "@/util";
import Header from "./Header";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  // Check if resource exists
  const { id } = await params;
  const res = await fetchDatacite(
    `${isClient(id) ? "clients" : "providers"}/${id}`,
    { cache: "force-cache" },
  );
  const json = await res.json();
  if (!json.data) notFound();

  const pages: BreadcrumbData[] = [
    { title: "Home", href: "/" },
    { title: "Example", href: "/" },
  ];

  return (
    <>
      <Breadcrumbs pages={pages} />
      <Header />
      <ActionButtons />
      {children}
    </>
  );
}
