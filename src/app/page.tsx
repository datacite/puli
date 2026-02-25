import { H2 } from "@/components/datacite/Headings";
import DisplayEntities from "./DisplayEntities";
import SearchEntities from "./SearchEntities";

export default async function Page({ searchParams }: PageProps<"/">) {
  const { query = undefined } = await searchParams;
  const queryString = Array.isArray(query) ? query[0] : query;

  return (
    <main className="flex flex-col gap-4 w-3xl mx-auto mb-50">
      <H2 className="text-center my-4">Search repositories and organizations</H2>
      <SearchEntities query={queryString} />
      <DisplayEntities query={queryString} />
    </main>
  );
}
