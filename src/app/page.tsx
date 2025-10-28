import ChartsCard from "@/components/ChartsCard";
import * as CardProps from "@/exampleCardProps";

export default function Home() {
  return (
    <main>
      <h1>DataCite Metadata Analytics Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <p className="col-span-full">
          Connections to People, Organizations, and Related Resources
        </p>
        <ChartsCard {...CardProps.creators} className="col-span-full" />
        <ChartsCard {...CardProps.contributors} className="col-span-full" />
        <ChartsCard
          {...CardProps.relatedIdentifiers}
          className="col-span-full"
        />
        <ChartsCard {...CardProps.fundingReferences} className="col-span-[2]" />
        <ChartsCard {...CardProps.publisher} className="col-span-[2]" />

        <p className="col-span-full">Descriptive Metadata</p>
        <ChartsCard {...CardProps.resourceType} className="col-span-[2]" />
        <ChartsCard {...CardProps.subjects} className="col-span-[2]" />
        <ChartsCard {...CardProps.descriptions} className="col-span-[2]" />
        <ChartsCard {...CardProps.titles} className="col-span-[2]" />
        <ChartsCard {...CardProps.rights} className="col-span-[2]" />
        <ChartsCard {...CardProps.dates} className="col-span-[2]" />
        <ChartsCard {...CardProps.publicationYear} />
        <ChartsCard {...CardProps.alternateIdentifiers} />
        <ChartsCard {...CardProps.language} />
        <ChartsCard {...CardProps.sizes} />
        <ChartsCard {...CardProps.formats} />
        <ChartsCard {...CardProps.version} />
        <ChartsCard {...CardProps.geoLocation} />
        <ChartsCard {...CardProps.relatedItem} />
      </div>
    </main>
  );
}
