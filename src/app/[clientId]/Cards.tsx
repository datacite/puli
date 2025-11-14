"use client";

import ChartsCard from "@/components/ChartsCard";
import DistributionChart from "@/components/DistributionChart";
import LearnMore from "@/components/LearnMore";
import PresentBar from "@/components/PresentBar";
import PresentChart from "@/components/PresentChart";
import useContributors from "@/data/fetchContributors";
import useCreators from "@/data/fetchCreators";
import useDates from "@/data/fetchDates";
import useDescriptions from "@/data/fetchDescriptions";
import useFundingReferences from "@/data/fetchFundingReferences";
import useOther from "@/data/fetchOther";
import usePublisher from "@/data/fetchPublisher";
import useRelatedIdentifiers from "@/data/fetchRelatedIdentifiers";
import useResourceType from "@/data/fetchResourceType";
import useRights from "@/data/fetchRights";
import useSubjects from "@/data/fetchSubjects";
import useTitles from "@/data/fetchTitles";

// Creators
const CreatorsDescription = (
  <>
    The Creators property supports citation and connects resources to people and
    organizations. Add nameIdentifiers with ORCIDs and RORs and
    affiliationIdentifiers with RORs for the highest impact.{" "}
    <LearnMore href="" />
  </>
);

export function Creators() {
  const { isPending, isError, data, error } = useCreators();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.creators.property}
      description={CreatorsDescription}
      present={data.creators.present}
      isHighImpact={data.creators.isHighImpact}
      className="md:col-span-full"
    >
      <PresentChart data={data.properties} />
      <CardColumn>
        <PresentBar {...data.nameIdentifier} />
        <DistributionChart {...data.nameIdentifierScheme} />
      </CardColumn>
      <CardColumn>
        <PresentChart data={data.affiliation} />
        <DistributionChart {...data.affiliationIdentifierScheme} />
      </CardColumn>
    </ChartsCard>
  );
}

// Contributors
const ContributorsDescription = (
  <>
    The Contributors property connects resources to people and organizations.
    Add nameIdentifiers with ORCIDs and RORs and affiliationIdentifiers with
    RORs for the highest impact. <LearnMore href="" />
  </>
);

export function Contributors() {
  const { isPending, isError, data, error } = useContributors();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;
  return (
    <ChartsCard
      title={data.contributors.property}
      description={ContributorsDescription}
      present={data.contributors.present}
      isHighImpact={data.contributors.isHighImpact}
      className="md:col-span-full"
    >
      <CardColumn>
        <PresentChart data={data.properties} />
        <DistributionChart {...data.contributorType} />
      </CardColumn>
      <CardColumn>
        <PresentBar {...data.nameIdentifier} />
        <DistributionChart {...data.nameIdentifierScheme} />
      </CardColumn>
      <CardColumn>
        <PresentChart data={data.affiliation} />
        <DistributionChart {...data.affiliationIdentifierScheme} />
      </CardColumn>
    </ChartsCard>
  );
}

// Related Identifiers
const RelatedIdentifiersDescription = (
  <>
    The RelatedIdentifiers property connects resources to other resources.
    RelatedIdentifiers with the DOI relatedIdentifierType have the highest
    impact. <LearnMore href="" />
  </>
);

export function RelatedIdentifiers() {
  const { isPending, isError, data, error } = useRelatedIdentifiers();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.relatedIdentifiers.property}
      description={RelatedIdentifiersDescription}
      present={data.relatedIdentifiers.present}
      isHighImpact={data.relatedIdentifiers.isHighImpact}
      className="md:col-span-full"
    >
      <DistributionChart {...data.relationType} />
      <DistributionChart {...data.relatedIdentifierType} />
      <DistributionChart {...data.resourceTypeGeneral} />
    </ChartsCard>
  );
}

// Funding References
const FundingReferencesDescription = (
  <>
    The FundingReferences property connects resources to funding sources. Add
    ROR funderIdentifiers for the highest impact. <LearnMore href="" />
  </>
);

export function FundingReferences() {
  const { isPending, isError, data, error } = useFundingReferences();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.fundingReferences.property}
      description={FundingReferencesDescription}
      present={data.fundingReferences.present}
      isHighImpact={data.fundingReferences.isHighImpact}
      className="md:col-span-[2]"
    >
      <CardColumn>
        <PresentChart data={data.funderProperties} />
        <DistributionChart {...data.funderIdentifierType} />
        <PresentChart data={data.awardProperties} />
      </CardColumn>
    </ChartsCard>
  );
}

// Publisher
const PublisherDescription = (
  <>
    The FundingReferences property connects resources to funding sources. Add
    ROR funderIdentifiers for the highest impact. <LearnMore href="" />
  </>
);

export function Publisher() {
  const { isPending, isError, data, error } = usePublisher();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.publisher.property}
      description={PublisherDescription}
      present={data.publisher.present}
      isHighImpact={data.publisher.isHighImpact}
      className="md:col-span-[2]"
    >
      <CardColumn>
        <PresentBar {...data.publisherIdentifier} />
        <DistributionChart {...data.publisherIdentifierScheme} />
      </CardColumn>
    </ChartsCard>
  );
}

// Resource Type
const ResourceTypeDescription = (
  <>
    Lorum Ipsum. <LearnMore href="" />
  </>
);

export function ResourceType() {
  const { isPending, isError, data, error } = useResourceType();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.resourceType.property}
      description={ResourceTypeDescription}
      present={data.resourceType.present}
      isHighImpact={data.resourceType.isHighImpact}
      className="md:col-span-[2]"
    >
      <CardColumn>
        <PresentChart data={data.properties} />
        <DistributionChart {...data.resourceTypeGeneral} />
      </CardColumn>
    </ChartsCard>
  );
}

// Subjects
const SubjectsDescription = (
  <>
    Lorum Ipsum. <LearnMore href="" />
  </>
);

export function Subjects() {
  const { isPending, isError, data, error } = useSubjects();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.subjects.property}
      description={SubjectsDescription}
      present={data.subjects.present}
      isHighImpact={data.subjects.isHighImpact}
      className="md:col-span-[2]"
    >
      <CardColumn>
        <PresentBar {...data.subjectScheme} />
        <DistributionChart {...data.subjectsSchemeDistribution} />
        <PresentBar {...data.valueURI} />
      </CardColumn>
    </ChartsCard>
  );
}

// Descriptions
const DescriptionsDescription = (
  <>
    Lorum Ipsum. <LearnMore href="" />
  </>
);

export function Descriptions() {
  const { isPending, isError, data, error } = useDescriptions();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.descriptions.property}
      description={DescriptionsDescription}
      present={data.descriptions.present}
      isHighImpact={data.descriptions.isHighImpact}
      className="md:col-span-[2]"
    >
      <DistributionChart {...data.descriptionType} />
    </ChartsCard>
  );
}

// Titles
const TitlesDescription = (
  <>
    Lorum Ipsum. <LearnMore href="" />
  </>
);

export function Titles() {
  const { isPending, isError, data, error } = useTitles();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.titles.property}
      description={TitlesDescription}
      present={data.titles.present}
      isHighImpact={data.titles.isHighImpact}
      className="md:col-span-[2]"
    >
      <DistributionChart {...data.titleType} />
    </ChartsCard>
  );
}

// Rights
const RightsDescription = (
  <>
    Lorum Ipsum. <LearnMore href="" />
  </>
);

export function Rights() {
  const { isPending, isError, data, error } = useRights();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.rights.property}
      description={RightsDescription}
      present={data.rights.present}
      isHighImpact={data.rights.isHighImpact}
      className="md:col-span-[2]"
    >
      <CardColumn>
        <PresentChart data={data.properties} />
        <DistributionChart {...data.rightsIdentifier} />
      </CardColumn>
    </ChartsCard>
  );
}

// Dates
const DatesDescription = (
  <>
    Lorum Ipsum. <LearnMore href="" />
  </>
);

export function Dates() {
  const { isPending, isError, data, error } = useDates();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.dates.property}
      description={DatesDescription}
      present={data.dates.present}
      isHighImpact={data.dates.isHighImpact}
      className="md:col-span-[2]"
    >
      <CardColumn>
        <DistributionChart {...data.dateType} />
        <PresentBar {...data.dateInformation} />
      </CardColumn>
    </ChartsCard>
  );
}

// Publication Year
const PublicationYearDescription = <>Lorum Ipsum.</>;

export function PublicationYear() {
  const { isPending, isError, data, error } = useOther();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.publicationYear.property}
      description={PublicationYearDescription}
      present={data.publicationYear.present}
      isHighImpact={data.publicationYear.isHighImpact}
    />
  );
}

// Alternate Identifiers
const AlternateIdentifiersDescription = <>Lorum Ipsum.</>;

export function AlternateIdentifiers() {
  const { isPending, isError, data, error } = useOther();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.alternateIdentifiers.property}
      description={AlternateIdentifiersDescription}
      present={data.alternateIdentifiers.present}
      isHighImpact={data.alternateIdentifiers.isHighImpact}
    />
  );
}

// Language
const LanguageDescription = <>Lorum Ipsum.</>;

export function Language() {
  const { isPending, isError, data, error } = useOther();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.language.property}
      description={LanguageDescription}
      present={data.language.present}
      isHighImpact={data.language.isHighImpact}
    />
  );
}

// Sizes
const SizesDescription = <>Lorum Ipsum.</>;

export function Sizes() {
  const { isPending, isError, data, error } = useOther();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.sizes.property}
      description={SizesDescription}
      present={data.sizes.present}
      isHighImpact={data.sizes.isHighImpact}
    />
  );
}

// Formats
const FormatsDescription = <>Lorum Ipsum.</>;

export function Formats() {
  const { isPending, isError, data, error } = useOther();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.formats.property}
      description={FormatsDescription}
      present={data.formats.present}
      isHighImpact={data.formats.isHighImpact}
    />
  );
}

// Version
const VersionDescription = <>Lorum Ipsum.</>;

export function Version() {
  const { isPending, isError, data, error } = useOther();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.version.property}
      description={VersionDescription}
      present={data.version.present}
      isHighImpact={data.version.isHighImpact}
    />
  );
}

// Geo Location
const GeoLocationDescription = <>Lorum Ipsum.</>;

export function GeoLocation() {
  const { isPending, isError, data, error } = useOther();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.geoLocation.property}
      description={GeoLocationDescription}
      present={data.geoLocation.present}
      isHighImpact={data.geoLocation.isHighImpact}
    />
  );
}

// Related Item
const RelatedItemDescription = <>Lorum Ipsum.</>;

export function RelatedItem() {
  const { isPending, isError, data, error } = useOther();

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.relatedItem.property}
      description={RelatedItemDescription}
      present={data.relatedItem.present}
      isHighImpact={data.relatedItem.isHighImpact}
    />
  );
}

function CardColumn({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
