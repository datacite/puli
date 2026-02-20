import { redirect } from "next/navigation";
import * as Cards from "@/components/cards/Cards";
import OverviewCard from "@/components/cards/OverviewCard";
import { SectionHeader } from "@/components/datacite/Headings";
import { fetchEntity } from "@/data/fetch";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/[id]">) {
  const { id } = await params;

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
    <main className="grid md:grid-cols-4 gap-4">
      <OverviewCard entity={entity} />

      <SectionHeader>
        Connections to People, Organizations, and Related Resources
      </SectionHeader>
      <Cards.Creators entity={entity} />
      <Cards.Contributors entity={entity} />
      <Cards.RelatedIdentifiers entity={entity} />
      <Cards.FundingReferences entity={entity} />
      <Cards.Publisher entity={entity} />

      <SectionHeader>Descriptive Metadata</SectionHeader>
      <Cards.ResourceType entity={entity} />
      <Cards.Subjects entity={entity} />
      <Cards.Descriptions entity={entity} />
      <Cards.Titles entity={entity} />
      <Cards.Rights entity={entity} />
      <Cards.Dates entity={entity} />
      <Cards.PublicationYear entity={entity} />
      <Cards.AlternateIdentifiers entity={entity} />
      <Cards.Language entity={entity} />
      <Cards.Sizes entity={entity} />
      <Cards.Formats entity={entity} />
      <Cards.Version entity={entity} />
      <Cards.GeoLocation entity={entity} />
      <Cards.RelatedItem entity={entity} />
    </main>
  );
}
