import type { Props as OverviewProps } from "@/components/OverviewCard";
import type { Props } from "@/components/ChartsCard";
import PresentBar from "@/components/PresentBar";
import PresentChart from "@/components/PresentChart";
import DistributionChart from "@/components/DistributionChart";
import LearnMore from "@/components/LearnMore";

import * as data from "@/exampleData";

export const overview: OverviewProps = {
  totalDois: 20_000,
  doiRegistrationsData: [
    { year: 2023, count: 1495 },
    { year: 2024, count: 1103 },
    { year: 2025, count: 1126 },
  ],
  resourceTypeData: [
    { type: "dataset", count: 60 },
    { type: "journal article", count: 25 },
    { type: "software", count: 15 },
  ],
};

// Connections to People, Organizations, and Related Resources
export const creators: Props = {
  title: "Creators",
  description: (
    <>
      The Creators property supports citation and connects resources to people
      and organizations. Add nameIdentifiers with ORCIDs and RORs and
      affiliationIdentifiers with RORs for the highest impact.{" "}
      <LearnMore href="" />
    </>
  ),
  present: data.creators.present,
  columns: [
    <PresentChart data={data.creators.properties} key="present" />,
    <div className="flex flex-col gap-2" key="nameIdentifier">
      <PresentBar {...data.creators.nameIdentifier} />
      <DistributionChart {...data.creators.nameIdentifierSchemeDistribution} />
    </div>,
    <div className="flex flex-col gap-2" key="affiliation">
      <PresentChart data={data.creators.affiliationPresent} />
      <DistributionChart
        {...data.creators.affiliationIdentifierSchemeDistribution}
      />
    </div>,
  ],
  isHighImpact: data.creators.isHighImpact,
};

export const contributors: Props = {
  title: "Contributors",
  description: (
    <>
      The Contributors property connects resources to people and organizations.
      Add nameIdentifiers with ORCIDs and RORs and affiliationIdentifiers with
      RORs for the highest impact. <LearnMore href="" />
    </>
  ),
  present: data.contributors.present,
  columns: [
    <div className="flex flex-col gap-2" key="properties">
      <PresentChart data={data.contributors.properties} key="present" />
      <DistributionChart {...data.contributors.contributorTypeDistribution} />
    </div>,
    <div className="flex flex-col gap-2" key="nameIdentifier">
      <PresentBar {...data.contributors.nameIdentifier} />
      <DistributionChart
        {...data.contributors.nameIdentifierSchemeDistribution}
      />
    </div>,
    <div className="flex flex-col gap-2" key="affiliation">
      <PresentChart data={data.contributors.affiliationPresent} />
      <DistributionChart
        {...data.contributors.affiliationIdentifierSchemeDistribution}
      />
    </div>,
  ],
  isHighImpact: data.contributors.isHighImpact,
};

export const relatedIdentifiers: Props = {
  title: "Related Identifiers",
  description: (
    <>
      The RelatedIdentifiers property connects resources to other resources.
      RelatedIdentifiers with the DOI relatedIdentifierType have the highest
      impact. <LearnMore href="" />
    </>
  ),
  present: data.relatedIdentifiers.present,
  columns: [
    <DistributionChart
      {...data.relatedIdentifiers.relationTypeDistribution}
      key="relationType"
    />,
    <DistributionChart
      {...data.relatedIdentifiers.relatedIdentifierTypeDistribution}
      key="relatedIdentifierType"
    />,
    <DistributionChart
      {...data.relatedIdentifiers.resourceTypeDistribution}
      key="resourceType"
    />,
  ],
  isHighImpact: data.relatedIdentifiers.isHighImpact,
};

export const fundingReferences: Props = {
  title: "Funding References",
  description: (
    <>
      The FundingReferences property connects resources to funding sources. Add
      ROR funderIdentifiers for the highest impact. <LearnMore href="" />
    </>
  ),
  present: data.fundingReferences.present,
  columns: [
    <div className="flex flex-col gap-2" key="funderProperties">
      <PresentChart data={data.fundingReferences.funderProperties} />
      <DistributionChart
        {...data.fundingReferences.funderIdentifierTypeDistribution}
      />
      <PresentChart data={data.fundingReferences.awardProperties} />
    </div>,
  ],
  isHighImpact: data.fundingReferences.isHighImpact,
};

export const publisher: Props = {
  title: "Publisher",
  description: (
    <>
      The Publisher property connects resources to resource publishers. Add a
      ROR publisherIdentifier for the highest impact. <LearnMore href="" />
    </>
  ),
  present: data.publisher.present,
  columns: [
    <div className="flex flex-col gap-2" key="funderProperties">
      <PresentBar {...data.publisher.publisherIdentifier} />
      <DistributionChart
        {...data.publisher.publisherIdentifierSchemeDistribution}
      />
    </div>,
  ],
  isHighImpact: data.publisher.isHighImpact,
};

// Descriptive Metadata
export const resourceType: Props = {
  title: "ResourceType",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.resourceType.present,
  columns: [
    <div className="flex flex-col gap-2" key="funderProperties">
      <PresentChart data={data.resourceType.properties} />
      <DistributionChart
        {...data.resourceType.resourceTypeGeneralDistribution}
      />
    </div>,
  ],
  isHighImpact: data.resourceType.isHighImpact,
};

export const subjects: Props = {
  title: "Subjects",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.subjects.present,
  columns: [
    <div className="flex flex-col gap-2" key="funderProperties">
      <PresentBar {...data.subjects.subjectScheme} />
      <DistributionChart {...data.subjects.subjectSchemeDistribution} />
      <PresentBar {...data.subjects.valueURI} />
    </div>,
  ],
  isHighImpact: data.subjects.isHighImpact,
};

export const descriptions: Props = {
  title: "Descriptions",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.descriptions.present,
  columns: [
    <DistributionChart
      {...data.descriptions.descriptionTypeDistribution}
      key="descriptionType"
    />,
  ],
  isHighImpact: data.descriptions.isHighImpact,
};

export const titles: Props = {
  title: "Titles",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.titles.present,
  columns: [
    <DistributionChart
      {...data.titles.titleTypeDistribution}
      key="titleType"
    />,
  ],
  isHighImpact: data.titles.isHighImpact,
};

export const rights: Props = {
  title: "Rights",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.rights.present,
  columns: [
    <div className="flex flex-col gap-2" key="rightsProperties">
      <PresentChart data={data.rights.properties} />
      <DistributionChart {...data.rights.rightsIdentifierDistribution} />
    </div>,
  ],
  isHighImpact: data.rights.isHighImpact,
};

export const dates: Props = {
  title: "Dates",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.dates.present,
  columns: [
    <div className="flex flex-col gap-2" key="rightsProperties">
      <DistributionChart {...data.dates.dateTypeDistribution} />
      <PresentBar {...data.dates.dateInformation} />
    </div>,
  ],
  isHighImpact: data.dates.isHighImpact,
};

export const publicationYear: Props = {
  title: "PublicationYear",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.publicationYear.present,
};

export const alternateIdentifiers: Props = {
  title: "AlternateIdentifiers",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.alternateIdentifiers.present,
};

export const language: Props = {
  title: "Language",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.language.present,
};

export const sizes: Props = {
  title: "Sizes",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.sizes.present,
};

export const formats: Props = {
  title: "Formats",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.formats.present,
};

export const version: Props = {
  title: "Version",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.version.present,
};

export const geoLocation: Props = {
  title: "GeoLocation",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.geoLocation.present,
};

export const relatedItem: Props = {
  title: "RelatedItem",
  description: (
    <>
      Lorum Ipsum. <LearnMore href="" />
    </>
  ),
  present: data.relatedItem.present,
};
