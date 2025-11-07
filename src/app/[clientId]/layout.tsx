import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs, { type BreadcrumbData } from "@/components/Breadcrumbs";
import Header from "./Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
