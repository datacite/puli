import ChartsCard from "@/components/ChartsCard";
import OverviewCard from "@/components/OverviewCard";
import * as CardProps from "@/exampleCardProps";

export default function Home() {
  return (
    <main className="grid md:grid-cols-4 gap-4">
      <h3 className="col-span-full">Overview</h3>
      <OverviewCard {...CardProps.overview} className="md:col-span-full" />

      <h3 className="col-span-full">
        Connections to People, Organizations, and Related Resources
      </h3>
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

      <h3 className="col-span-full">Descriptive Metadata</h3>
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
  );
}
