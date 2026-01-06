import { notFound } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs, { type BreadcrumbData } from "@/components/Breadcrumbs";
import { fetchDatacite } from "@/util";
import Header from "./Header";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ clientId: string }>;
  children: React.ReactNode;
}) {
  // Check if client exists
  const { clientId } = await params;
  const res = await fetchDatacite(`clients/${clientId}`, {
    cache: "force-cache",
  });
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
