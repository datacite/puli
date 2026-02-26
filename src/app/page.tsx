import Link from "next/link";
import { BookOpen, LayoutDashboard, Search } from "lucide-react";
import InfoCard from "@/components/InfoCard";
import { H1 } from "@/components/datacite/Headings";
import DisplayEntities from "./DisplayEntities";
import SearchEntities from "./SearchEntities";

export default async function Page({ searchParams }: PageProps<"/">) {
  const { query = undefined } = await searchParams;
  const queryString = Array.isArray(query) ? query[0] : query;

  return (
    <>
      <main className="flex flex-col gap-4 w-3xl mx-auto mt-8">
        <H1 className="text-center mb-0 text-datacite-blue-dark">Evaluate metadata quality across DataCite</H1>
        <p className="mb-4 text-center text-datacite-blue-dark">Search for a DataCite repository or organization to view a metadata quality snapshot.</p>

        <div className="relative">
          <SearchEntities query={queryString} />
          <div className="absolute top-full left-0 right-0 my-2 z-20">
            <DisplayEntities query={queryString} />
          </div>
        </div>
      </main>

      <section className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          icon={LayoutDashboard}
          title="What is the DataCite metadata dashboard?"
          body="The DataCite metadata dashboard is a tool for monitoring DataCite metadata quality and identifying opportunities to advance the discoverability and impact of scholarly resources."
        />
        <InfoCard
          icon={Search}
          title="What can I explore?"
          body="Search for a DataCite Member, Consortium Organization, or Repository to view a metadata quality snapshot and explore opportunities for improvement."
        />
        <InfoCard
          icon={BookOpen}
          title="Where can I learn more?"
          body={
            <>
              Documentation is available in{" "}
              <Link
                href="https://support.datacite.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-datacite-blue-light"
              >
                DataCite Support
              </Link>
              .
            </>
          }
        />
      </section>
    </>
  );
}
