import Breadcrumbs from "@/components/Breadcrumbs";
import ChartsCard from "@/components/ChartsCard";
import ActionButtons from "@/components/ActionButtons";
import OverviewCard from "@/components/OverviewCard";
import * as CardProps from "@/exampleCardProps";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <Breadcrumbs />

      <h1 className="text-4xl w-full">Example University Library</h1>
      <ActionButtons />

      <main className="grid md:grid-cols-4 gap-4">
        <p className="col-span-full">Overview</p>
        <OverviewCard {...CardProps.overview} className="md:col-span-full" />

        <p className="col-span-full">
          Connections to People, Organizations, and Related Resources
        </p>
        <ChartsCard {...CardProps.creators} className="md:col-span-full" />
        <ChartsCard {...CardProps.contributors} className="md:col-span-full" />
        <ChartsCard
          {...CardProps.relatedIdentifiers}
          className="md:col-span-full"
        />
        <ChartsCard
          {...CardProps.fundingReferences}
          className="md:col-span-[2]"
        />
        <ChartsCard {...CardProps.publisher} className="md:col-span-[2]" />

        <p className="col-span-full">Descriptive Metadata</p>
        <ChartsCard {...CardProps.resourceType} className="md:col-span-[2]" />
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
    </div>
  );
}
