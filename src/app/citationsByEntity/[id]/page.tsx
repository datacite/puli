import { redirect } from "next/navigation";
import * as Cards from "@/components/cards/Cards";
import OverviewCard from "@/components/cards/OverviewCard";
import { SectionHeader } from "@/components/datacite/Headings";
import { fetchDoisRecords, fetchEntity } from "@/data/fetch";
import { fetchEntityCitations } from "@/data/fetch";
import DoiRegistrationsChart from "@/components/DoiRegistrationsChart";
import { DoiRecordList } from "@/components/DoiRecordList";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/[id]">) {
  const { id } = await params;

    const [doisRecords] = await Promise.all([
    fetchEntityCitations("provider.id:" + id + " OR client_id:" + id),
    ]);

const citationsOverTime = doisRecords?.meta?.citations || [];
let chartData: { year: string; count: number }[] = [];
if (citationsOverTime.length > 0) {
  // Map citations to { year, count }
  const mapped = citationsOverTime.map((item: { id: string; count: number }) => ({
    year: item.id,
    count: item.count,
  }));
  const yearNums = mapped.map((item: { year: string; count: number }) => parseInt(item.year, 10));
  const minYear = Math.min(...yearNums);
  const maxYear = new Date().getFullYear();
  const yearToCount: Record<string, number> = {};
  mapped.forEach((item: { year: string; count: number }) => {
    yearToCount[item.year] = item.count;
  });
  for (let y = minYear; y <= maxYear; y++) {
    chartData.push({
      year: y.toString(),
      count: yearToCount[y.toString()] ?? 0,
    });
  }
}

  // Redirect to lowercased id if it contains uppercase letters
  if (id !== id.toLowerCase()) {
    const urlSearchParams = new URLSearchParams();
    Object.entries(await searchParams).forEach(([key, value]) => {
      if (!value) return;

      if (Array.isArray(value))
        for (const v of value) urlSearchParams.append(key, v);
      else urlSearchParams.append(key, value);
    });

    redirect(`/${id.toLowerCase()}?${urlSearchParams.toString()}`);
  }

  const entity = await fetchEntity(id);
  if (!entity) return null;

  return (
    <main className="">
      <main className="w-full mx-auto flex flex-row items-start gap-8">
        <div className="w-1/2">
          <div className="bg-card text-card-foreground border p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Citations By Record Publication Year</h3>
            <div className="max-w-300">
              { chartData.length > 0 ?
              <DoiRegistrationsChart data={chartData} /> :
              <p>No citations found.</p>
              }
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="bg-card text-card-foreground border p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Most Cited Records</h3>
            <div className="max-w-300">
              { doisRecords.data.length > 0 ?
              <DoiRecordList records={doisRecords.data} /> :
              <p>No citations found.</p>
              }
             </div>
          </div>
        </div>
      </main>
    </main>
  );
}