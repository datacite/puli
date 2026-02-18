import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "./Header";

export default async function Layout({ children }: LayoutProps<"/[id]">) {
  return (
    <>
      <Breadcrumbs />
      <Header />
      <ActionButtons />
      {children}
    </>
  );
}
