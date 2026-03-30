import { notFound } from "next/navigation";
import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fetchEntity } from "@/data/fetch";

export default async function Layout({
  children,
}: LayoutProps<"/dois/[...doi]">) {

  return (
    <>
      {children}
    </>
  );
}
