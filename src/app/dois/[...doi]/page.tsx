import { redirect } from "next/navigation";
import * as Cards from "@/components/cards/Cards";
import OverviewCard from "@/components/cards/OverviewCard";
import { SectionHeader } from "@/components/datacite/Headings";
import {
  fetchDoiRecord,
  fetchEvents,
  fetchDoisRecords,
  fetchDois,
  fetchEntity,
} from "@/data/fetch";
import DoiRegistrationsChart from "@/components/DoiRegistrationsChart";
import ResourceTypesChart from "@/components/ResourceTypesChart";
import EventFeed from "@/components/EventFeed";
import { Filter } from "lucide-react";
import { DoiRecordList } from "@/components/DoiRecordList";
import { H2 } from "@/components/datacite/Headings";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageProps {
  params: { doi: string };
}

export default async function Page({ params }: PageProps) {
  const { doi } = await params;
  const doi_id = Array.isArray(doi) ? doi.join("/") : doi;
  
  // Fetch the DOI record and events
  const [record, eventsResult, doisRecords] = await Promise.all([
    fetchDoiRecord(doi_id),
    fetchEvents(doi_id),
    fetchDoisRecords("reference_ids:" + doi_id),
  ]);

  const clientId = record?.data?.relationships?.client?.data?.id;
  const entity = clientId ? await fetchEntity(clientId) : null;
  
  const citationsOverTime = record?.data?.attributes?.citationsOverTime || [];
  let chartData: { year: string; count: number }[] = [];
  if (citationsOverTime.length > 0) {
    const yearNums = citationsOverTime.map((item: { year: string }) =>
      parseInt(item.year, 10),
    );
    const minYear = Math.min(...yearNums);
    const maxYear = new Date().getFullYear();
    const yearToCount: Record<string, number> = {};
    citationsOverTime.forEach((item: { year: string; total: number }) => {
      yearToCount[item.year] = item.total;
    });
    for (let y = minYear; y <= maxYear; y++) {
      chartData.push({
        year: y.toString(),
        count: yearToCount[y.toString()] ?? 0,
      });
    }
  }
  const events = eventsResult?.data || [];

  return (
    <>
      <Breadcrumbs entity={entity} />
      <div className="mb-0">
        <H2 >
          {record.data.attributes.titles[0].title}
        </H2>
        <div className="text-gray-500 font-semibold">
          {record.data.attributes.doi}
        </div>
      </div>
      <main className="w-full mx-auto flex flex-row items-start gap-8">
        <div className="w-1/2">
          <div className="bg-card text-card-foreground border p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Citations Over Time</h3>
            {record.data.attributes.citationCount > 0 && (
              <div className="max-w-300">
                <DoiRegistrationsChart data={chartData} />
              </div>
            ) || (
              <p>No citation data available.</p>
            )}
          </div>
          <div className="bg-card text-card-foreground border p-8 shadow-sm  mt-8">
            <h3 className="text-xl font-bold">Event Feed</h3>
            <EventFeed events={events} doi={doi_id} />
          </div>
        </div>
        <div className="w-1/2">
          <div className="bg-card text-card-foreground border p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">
              Available Records Citing This Work
            </h3>
            {doisRecords.meta.resourceTypes && <ResourceTypesChart data={doisRecords.meta.resourceTypes} />}
            <DoiRecordList records={doisRecords.data} />
          </div>
        </div>
      </main>
    </>
  );
}
