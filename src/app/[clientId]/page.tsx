import ChartsCard from "@/components/ChartsCard";
import OverviewCard from "@/components/OverviewCard";
import * as CardProps from "@/exampleCardProps";
import * as Cards from "./Cards";

export default async function Home({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;

  return (
    <main className="grid md:grid-cols-4 gap-4">
      <h3 className="col-span-full">Overview</h3>
      <OverviewCard {...CardProps.overview} className="md:col-span-full" />

      <h3 className="col-span-full">
        Connections to People, Organizations, and Related Resources
      </h3>
      <Cards.Creators clientId={clientId} />
      <Cards.Contributors clientId={clientId} />
      <Cards.RelatedIdentifiers clientId={clientId} />
      <Cards.FundingReferences clientId={clientId} />
      <Cards.Publisher clientId={clientId} />

      <h3 className="col-span-full">Descriptive Metadata</h3>
      <Cards.ResourceType clientId={clientId} />

      <ChartsCard {...CardProps.subjects} className="md:col-span-[2]" />
      <ChartsCard {...CardProps.descriptions} className="md:col-span-[2]" />
      <ChartsCard {...CardProps.titles} className="md:col-span-[2]" />
      <ChartsCard {...CardProps.rights} className="md:col-span-[2]" />
      <ChartsCard {...CardProps.dates} className="md:col-span-[2]" />
      <ChartsCard {...CardProps.publicationYear} />
      <ChartsCard {...CardProps.alternateIdentifiers} />
      <ChartsCard {...CardProps.language} />
      <ChartsCard {...CardProps.sizes} />
      <ChartsCard {...CardProps.formats} />
      <ChartsCard {...CardProps.version} />
      <ChartsCard {...CardProps.geoLocation} />
      <ChartsCard {...CardProps.relatedItem} />
    </main>
  );
}
