import ActionButtons from "@/components/ActionButtons";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs />

      <h2 className="text-4xl w-full">Example University Library</h2>
      <ActionButtons />

      {children}
    </>
  );
}
