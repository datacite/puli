import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs, { BreadcrumbData } from "@/components/Breadcrumbs";
import Header from "./Header";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ clientId: string }>;
  children: React.ReactNode;
}) {
  const { clientId } = await params;

  const pages: BreadcrumbData[] = [
    { title: "Home", href: "/" },
    { title: "Example", href: "/" },
  ];

  return (
    <>
      <Breadcrumbs clientId={clientId} pages={pages} />

      <Header clientId={clientId} />
      <ActionButtons />

      {children}
    </>
  );
}
