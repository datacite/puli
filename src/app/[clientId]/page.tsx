import * as Cards from "@/components/cards/Cards";
import OverviewCard from "@/components/cards/OverviewCard";
import { H3 } from "@/components/datacite/Headings";

export default async function Home() {
  return (
    <main className="grid md:grid-cols-4 gap-4">
      <SectionHeader title="Overview" />
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
