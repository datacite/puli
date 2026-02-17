import { notFound, redirect } from "next/navigation";
import * as Cards from "@/components/cards/Cards";
import OverviewCard from "@/components/cards/OverviewCard";
import { H3 } from "@/components/datacite/Headings";
import { fetchEntity } from "@/data/fetch";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/[[...id]]">) {
  const { id: slug } = await params;
  if (slug && slug.length > 1) throw "Incorrect ID format";
  const id = slug?.[0] || "";

  console.log(await searchParams);

  // Redirect to lowercased id if it contains uppercase letters
  if (id !== id.toLowerCase()) {
    const urlSearchParams = new URLSearchParams();
    Object.entries(await searchParams).forEach(([key, value]) => {
      if (!value) return;

      if (Array.isArray(value))
        for (const v in value) urlSearchParams.append(key, v);
      else urlSearchParams.append(key, value);
    });

    redirect(`/${id.toLowerCase()}?${urlSearchParams.toString()}`);
  }

  // Check if entity exists
  const entity = await fetchEntity(id);
  if (!entity) notFound();

  return (
    <main className="grid md:grid-cols-4 gap-4">
      <OverviewCard />

      <SectionHeader title="Connections to People, Organizations, and Related Resources" />
      <Cards.Creators />
      <Cards.Contributors />
      <Cards.RelatedIdentifiers />
      <Cards.FundingReferences />
      <Cards.Publisher />

      <SectionHeader title="Descriptive Metadata" />
      <Cards.ResourceType />
      <Cards.Subjects />
      <Cards.Descriptions />
      <Cards.Titles />
      <Cards.Rights />
      <Cards.Dates />
      <Cards.PublicationYear />
      <Cards.AlternateIdentifiers />
      <Cards.Language />
      <Cards.Sizes />
      <Cards.Formats />
      <Cards.Version />
      <Cards.GeoLocation />
      <Cards.RelatedItem />
    </main>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <H3 className="mt-12 col-span-full font-light">{title}</H3>;
}
