import OverviewCard from "@/components/OverviewCard";
import * as Cards from "./Cards";

export default async function Home() {
  return (
    <main className="grid md:grid-cols-4 gap-4">
      <h3 className="col-span-full">Overview</h3>
      <OverviewCard />

      <h3 className="col-span-full">
        Connections to People, Organizations, and Related Resources
      </h3>
      <Cards.Creators />
      <Cards.Contributors />
      <Cards.RelatedIdentifiers />
      <Cards.FundingReferences />
      <Cards.Publisher />

      <h3 className="col-span-full">Descriptive Metadata</h3>
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
