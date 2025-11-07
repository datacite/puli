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
      <OverviewCard clientId={clientId} />

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
      <Cards.Subjects clientId={clientId} />
      <Cards.Descriptions clientId={clientId} />
      <Cards.Titles clientId={clientId} />
      <Cards.Rights clientId={clientId} />
      <Cards.Dates clientId={clientId} />
      <Cards.PublicationYear clientId={clientId} />
      <Cards.AlternateIdentifiers clientId={clientId} />
      <Cards.Language clientId={clientId} />
      <Cards.Sizes clientId={clientId} />
      <Cards.Formats clientId={clientId} />
      <Cards.Version clientId={clientId} />
      <Cards.GeoLocation clientId={clientId} />
      <Cards.RelatedItem clientId={clientId} />
    </main>
  );
}
