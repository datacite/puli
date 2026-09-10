import { Suspense } from "react";
import SearchPageClient from "@/app/search/SearchPageClient";
import { Spinner } from "@/components/ui/spinner";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; tab?: string; advancedSearch?: string }>;
}

export const metadata = {
  title: "Search",
  description: "Search across DOIs, organizations, repositories, and more.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const tab = params.tab || "dois";
  const initialAdvancedSearch =
    params.advancedSearch === "true" || params.advancedSearch === "1";

  return (
    <Suspense fallback={<Spinner className="mx-auto my-8" />}>
      <SearchPageClient
        initialQuery={query}
        initialTab={tab}
        initialAdvancedSearch={initialAdvancedSearch}
      />
    </Suspense>
  );
}
