"use client";

import ChartsCard from "@/components/cards/ChartsCard";
import DistributionChart from "@/components/DistributionChart";
import LearnMore from "@/components/LearnMore";
import PresentBar from "@/components/PresentBar";
import PresentChart from "@/components/PresentChart";
import { ChartsCardSkeleton } from "@/components/Skeleton";
import {
  useContributors,
  useCreators,
  useDates,
  useDescriptions,
  useFundingReferences,
  useOther,
  usePublisher,
  useRelatedIdentifiers,
  useResourceType,
  useRights,
  useSubjects,
  useTitles,
} from "@/data/fetch";

// Creators
const CreatorsDescription = (
  <>
    The Creator property supports citation and connects resources to people and
    organizations. Add nameIdentifiers with ORCID iDs and ROR IDs and
    affiliationIdentifiers with ROR IDs for the highest impact.{" "}
    <LearnMore
      text="Creator documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/creator/"
    />
  </>
);

export function Creators() {
  const { isPending, isFetching, isError, data, error } = useCreators();

  if (isPending)
    return <ChartsCardSkeleton columns={3} className="md:col-span-full" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.creators.property}
      description={CreatorsDescription}
      present={data.creators.present}
      isHighImpact={data.creators.isHighImpact}
      className={`md:col-span-full ${isFetching ? "opacity-50" : ""}`}
    >
      <PresentChart data={data.properties} />
      <CardColumn>
        <PresentBar {...data.nameIdentifier} />
        <DistributionChart {...data.nameIdentifierScheme} className="mt-4" />
      </CardColumn>
      <CardColumn>
        <PresentChart data={data.affiliation} />
        <DistributionChart
          {...data.affiliationIdentifierScheme}
          className="mt-4"
        />
      </CardColumn>
    </ChartsCard>
  );
}

// Contributors
const ContributorsDescription = (
  <>
    The Contributor property connects resources to people and organizations. Add
    nameIdentifiers with ORCID iDs and ROR IDs and affiliationIdentifiers with
    ROR IDs for the highest impact.{" "}
    <LearnMore
      text="Contributor documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4.6/properties/contributor/"
    />
  </>
);

export function Contributors() {
  const { isPending, isFetching, isError, data, error } = useContributors();

  if (isPending)
    return <ChartsCardSkeleton columns={3} className="md:col-span-full" />;
  if (isError) return `Error: ${error}`;
  return (
    <ChartsCard
      title={data.contributors.property}
      description={ContributorsDescription}
      present={data.contributors.present}
      isHighImpact={data.contributors.isHighImpact}
      className={`md:col-span-full ${isFetching ? "opacity-50" : ""}`}
    >
      <CardColumn>
        <PresentChart data={data.properties} />
        <DistributionChart {...data.contributorType} className="mt-4" />
      </CardColumn>
      <CardColumn>
        <PresentBar {...data.nameIdentifier} />
        <DistributionChart {...data.nameIdentifierScheme} className="mt-4" />
      </CardColumn>
      <CardColumn>
        <PresentChart data={data.affiliation} />
        <DistributionChart
          {...data.affiliationIdentifierScheme}
          className="mt-4"
        />
      </CardColumn>
    </ChartsCard>
  );
}

// Related Identifiers
const RelatedIdentifiersDescription = (
  <>
    The RelatedIdentifier property connects resources to other resources.
    RelatedIdentifiers with the DOI relatedIdentifierType have the highest
    impact.{" "}
    <LearnMore
      text="RelatedIdentifier documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/relatedidentifier/"
    />
  </>
);

export function RelatedIdentifiers() {
  const { isPending, isFetching, isError, data, error } =
    useRelatedIdentifiers();

  if (isPending)
    return <ChartsCardSkeleton columns={3} className="md:col-span-full" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.relatedIdentifiers.property}
      description={RelatedIdentifiersDescription}
      present={data.relatedIdentifiers.present}
      isHighImpact={data.relatedIdentifiers.isHighImpact}
      className={`md:col-span-full ${isFetching ? "opacity-50" : ""}`}
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
    The FundingReference property connects resources to funding sources. Add
    funderIdentifiers with ROR IDs for the highest impact.{" "}
    <LearnMore
      text="FundingReference documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/fundingreference/"
    />
  </>
);

export function FundingReferences() {
  const { isPending, isFetching, isError, data, error } =
    useFundingReferences();

  if (isPending)
    return <ChartsCardSkeleton columns={1} className="md:col-span-[2]" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.fundingReferences.property}
      description={FundingReferencesDescription}
      present={data.fundingReferences.present}
      isHighImpact={data.fundingReferences.isHighImpact}
      className={`md:col-span-[2] ${isFetching ? "opacity-50" : ""}`}
    >
      <CardColumn>
        <PresentChart data={data.funderProperties} />
        <DistributionChart
          {...data.funderIdentifierType}
          className="mt-4 mb-6"
        />
        <PresentChart data={data.awardProperties} />
      </CardColumn>
    </ChartsCard>
  );
}

// Publisher
const PublisherDescription = (
  <>
    The Publisher property connects resources to funding sources. Add
    publisherIdentifiers with ROR IDs for the highest impact.{" "}
    <LearnMore
      text="Publisher documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/publisher/"
    />
  </>
);

export function Publisher() {
  const { isPending, isFetching, isError, data, error } = usePublisher();

  if (isPending)
    return <ChartsCardSkeleton columns={1} className="md:col-span-[2]" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.publisher.property}
      description={PublisherDescription}
      present={data.publisher.present}
      isHighImpact={data.publisher.isHighImpact}
      className={`md:col-span-[2] ${isFetching ? "opacity-50" : ""}`}
    >
      <CardColumn>
        <PresentBar {...data.publisherIdentifier} />
        <DistributionChart
          {...data.publisherIdentifierScheme}
          className="mt-4"
        />
      </CardColumn>
    </ChartsCard>
  );
}

// Resource Type
const ResourceTypeDescription = (
  <>
    The ResourceType property describes the type of resource. Select the most
    specific applicable resourceTypeGeneral value to improve discoverability.
    Avoid using “Text” and “Other” where possible.{" "}
    <LearnMore
      text="ResourceType documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/resourcetype/"
    />
  </>
);

export function ResourceType() {
  const { isPending, isFetching, isError, data, error } = useResourceType();

  if (isPending)
    return <ChartsCardSkeleton columns={1} className="md:col-span-[2]" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.resourceType.property}
      description={ResourceTypeDescription}
      present={data.resourceType.present}
      isHighImpact={data.resourceType.isHighImpact}
      className={`md:col-span-[2] ${isFetching ? "opacity-50" : ""}`}
    >
      <CardColumn>
        <PresentChart data={data.properties} />
        <DistributionChart {...data.resourceTypeGeneral} className="mt-4" />
      </CardColumn>
    </ChartsCard>
  );
}

// Subjects
const SubjectsDescription = (
  <>
    The Subject property contains subject terms or keywords describing the
    resource. Use controlled vocabulary terms to improve discoverability.{" "}
    <LearnMore
      text="Subject documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/subject/"
    />
  </>
);

export function Subjects() {
  const { isPending, isFetching, isError, data, error } = useSubjects();

  if (isPending)
    return <ChartsCardSkeleton columns={1} className="md:col-span-[2]" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.subjects.property}
      description={SubjectsDescription}
      present={data.subjects.present}
      isHighImpact={data.subjects.isHighImpact}
      className={`md:col-span-[2] ${isFetching ? "opacity-50" : ""}`}
    >
      <CardColumn>
        <PresentBar {...data.subjectScheme} />
        <DistributionChart
          {...data.subjectsSchemeDistribution}
          className="my-4"
        />
        <PresentBar {...data.valueURI} />
      </CardColumn>
    </ChartsCard>
  );
}

// Descriptions
const DescriptionsDescription = (
  <>
    The Description property is recommended for a general description of a
    resource. Include an abstract to improve discoverability.{" "}
    <LearnMore
      text="Description documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/description/"
    />
  </>
);

export function Descriptions() {
  const { isPending, isFetching, isError, data, error } = useDescriptions();

  if (isPending)
    return <ChartsCardSkeleton columns={1} className="md:col-span-[2]" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.descriptions.property}
      description={DescriptionsDescription}
      present={data.descriptions.present}
      isHighImpact={data.descriptions.isHighImpact}
      className={`md:col-span-[2] ${isFetching ? "opacity-50" : ""}`}
    >
      <DistributionChart {...data.descriptionType} />
    </ChartsCard>
  );
}

// Titles
const TitlesDescription = (
  <>
    The Title property contains the name of the resource and is used in the
    citation. Include additional titles where applicable to improve
    discoverability.{" "}
    <LearnMore
      text="Title documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/title/"
    />
  </>
);

export function Titles() {
  const { isPending, isFetching, isError, data, error } = useTitles();

  if (isPending)
    return <ChartsCardSkeleton columns={1} className="md:col-span-[2]" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.titles.property}
      description={TitlesDescription}
      present={data.titles.present}
      isHighImpact={data.titles.isHighImpact}
      className={`md:col-span-[2] ${isFetching ? "opacity-50" : ""}`}
    >
      <DistributionChart {...data.titleType} />
    </ChartsCard>
  );
}

// Rights
const RightsDescription = (
  <>
    The Rights property contains information about how the resource can be
    reused, such as a license. Use standardized rights identifiers to improve
    discoverability.{" "}
    <LearnMore
      text="Rights documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/rights/"
    />
  </>
);

export function Rights() {
  const { isPending, isFetching, isError, data, error } = useRights();

  if (isPending)
    return <ChartsCardSkeleton columns={1} className="md:col-span-[2]" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.rights.property}
      description={RightsDescription}
      present={data.rights.present}
      isHighImpact={data.rights.isHighImpact}
      className={`md:col-span-[2] ${isFetching ? "opacity-50" : ""}`}
    >
      <CardColumn>
        <PresentChart data={data.properties} />
        <DistributionChart {...data.rightsIdentifier} className="mt-4" />
      </CardColumn>
    </ChartsCard>
  );
}

// Dates
const DatesDescription = (
  <>
    The Date property contains dates relevant to the resource. Include all
    relevant dates with their corresponding dateTypes to improve
    discoverability.{" "}
    <LearnMore
      text="Date documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/date/"
    />
  </>
);

export function Dates() {
  const { isPending, isFetching, isError, data, error } = useDates();

  if (isPending)
    return <ChartsCardSkeleton columns={1} className="md:col-span-[2]" />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.dates.property}
      description={DatesDescription}
      present={data.dates.present}
      isHighImpact={data.dates.isHighImpact}
      className={`md:col-span-[2] ${isFetching ? "opacity-50" : ""}`}
    >
      <CardColumn>
        <DistributionChart {...data.dateType} className="mb-6" />
        <PresentBar {...data.dateInformation} />
      </CardColumn>
    </ChartsCard>
  );
}

// Publication Year
const PublicationYearDescription = (
  <>
    The PublicationYear property is for the year when the resource was or will
    be made publicly available.{" "}
    <LearnMore
      text="PublicationYear documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/publicationyear/"
    />
  </>
);

export function PublicationYear() {
  const { isPending, isFetching, isError, data, error } = useOther();

  if (isPending) return <ChartsCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.publicationYear.property}
      description={PublicationYearDescription}
      present={data.publicationYear.present}
      isHighImpact={data.publicationYear.isHighImpact}
      className={isFetching ? "opacity-50" : ""}
    />
  );
}

// Alternate Identifiers
const AlternateIdentifiersDescription = (
  <>
    The AlternateIdentifier property contains alternate identifiers for the
    resource, such as local identifiers.{" "}
    <LearnMore
      text="AlternateIdentifier documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/alternateidentifier/"
    />
  </>
);

export function AlternateIdentifiers() {
  const { isPending, isFetching, isError, data, error } = useOther();

  if (isPending) return <ChartsCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.alternateIdentifiers.property}
      description={AlternateIdentifiersDescription}
      present={data.alternateIdentifiers.present}
      isHighImpact={data.alternateIdentifiers.isHighImpact}
      className={isFetching ? "opacity-50" : ""}
    />
  );
}

// Language
const LanguageDescription = (
  <>
    The Language property is for the primary language of the resource.{" "}
    <LearnMore
      text="Language documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/language/"
    />
  </>
);

export function Language() {
  const { isPending, isFetching, isError, data, error } = useOther();

  if (isPending) return <ChartsCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.language.property}
      description={LanguageDescription}
      present={data.language.present}
      isHighImpact={data.language.isHighImpact}
      className={isFetching ? "opacity-50" : ""}
    />
  );
}

// Sizes
const SizesDescription = (
  <>
    The Size property indicates the size or duration of the resource.{" "}
    <LearnMore
      text="Size documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/size/"
    />
  </>
);

export function Sizes() {
  const { isPending, isFetching, isError, data, error } = useOther();

  if (isPending) return <ChartsCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.sizes.property}
      description={SizesDescription}
      present={data.sizes.present}
      isHighImpact={data.sizes.isHighImpact}
      className={isFetching ? "opacity-50" : ""}
    />
  );
}

// Formats
const FormatsDescription = (
  <>
    The Format property is for the technical format of the resource.{" "}
    <LearnMore
      text="Fomat documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/format/"
    />
  </>
);

export function Formats() {
  const { isPending, isFetching, isError, data, error } = useOther();

  if (isPending) return <ChartsCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.formats.property}
      description={FormatsDescription}
      present={data.formats.present}
      isHighImpact={data.formats.isHighImpact}
      className={isFetching ? "opacity-50" : ""}
    />
  );
}

// Version
const VersionDescription = (
  <>
    The Version property is for the version number of the resource.{" "}
    <LearnMore
      text="Version documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/version/"
    />
  </>
);

export function Version() {
  const { isPending, isFetching, isError, data, error } = useOther();

  if (isPending) return <ChartsCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.version.property}
      description={VersionDescription}
      present={data.version.present}
      isHighImpact={data.version.isHighImpact}
      className={isFetching ? "opacity-50" : ""}
    />
  );
}

// Geo Location
const GeoLocationDescription = (
  <>
    The GeoLocation property is for the spatial region or named place related to
    the resource.{" "}
    <LearnMore
      text="GeoLocation documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/geolocation/"
    />
  </>
);

export function GeoLocation() {
  const { isPending, isFetching, isError, data, error } = useOther();

  if (isPending) return <ChartsCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.geoLocation.property}
      description={GeoLocationDescription}
      present={data.geoLocation.present}
      isHighImpact={data.geoLocation.isHighImpact}
      className={isFetching ? "opacity-50" : ""}
    />
  );
}

// Related Item
const RelatedItemDescription = (
  <>
    The RelatedItem property connects resources to other resources, with or
    without identifiers.{" "}
    <LearnMore
      text="RelatedItem documentation"
      href="https://datacite-metadata-schema.readthedocs.io/en/4/properties/relateditem/"
    />
  </>
);

export function RelatedItem() {
  const { isPending, isFetching, isError, data, error } = useOther();

  if (isPending) return <ChartsCardSkeleton />;
  if (isError) return `Error: ${error}`;

  return (
    <ChartsCard
      title={data.relatedItem.property}
      description={RelatedItemDescription}
      present={data.relatedItem.present}
      isHighImpact={data.relatedItem.isHighImpact}
      className={isFetching ? "opacity-50" : ""}
    />
  );
}

function CardColumn({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
