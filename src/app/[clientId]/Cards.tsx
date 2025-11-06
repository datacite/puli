"use client";

import ChartsCard from "@/components/ChartsCard";
import DistributionChart from "@/components/DistributionChart";
import LearnMore from "@/components/LearnMore";
import PresentBar from "@/components/PresentBar";
import PresentChart from "@/components/PresentChart";
import useCreators from "@/data/fetchCreators";
import useContributors from "@/data/fetchContributors";
import useRelatedIdentifiers from "@/data/fetchRelatedIdentifiers";
import useFundingReferences from "@/data/fetchFundingReferences";
import usePublisher from "@/data/fetchPublisher";
import useResourceType from "@/data/fetchResourceType";
import useSubjects from "@/data/fetchSubjects";
import useDescriptions from "@/data/fetchDescriptions";

interface Props {
  clientId: string;
}

// Creators
const CreatorsDescription = (
  <>
    The Creators property supports citation and connects resources to people and
    organizations. Add nameIdentifiers with ORCIDs and RORs and
    affiliationIdentifiers with RORs for the highest impact.{" "}
    <LearnMore href="" />
  </>
);

export function Creators({ clientId }: Props) {
  const { isPending, isError, data, error } = useCreators(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const properties = <PresentChart data={data.properties} key="properties" />
  const nameIdentifier = <CardColumn key="nameIdentifier">
    <PresentBar {...data.nameIdentifier} />
    <DistributionChart {...data.nameIdentifierScheme} />
  </CardColumn>
  const affiliation = <CardColumn key="affiliation">
    <PresentChart data={data.affiliation} />
    <DistributionChart {...data.affiliationIdentifierScheme} />
  </CardColumn>

  const columns = [properties, nameIdentifier, affiliation]

  return (
    <ChartsCard
      title={data.creators.property}
      description={CreatorsDescription}
      present={data.creators.present}
      columns={columns}
      isHighImpact={data.creators.isHighImpact}
      className="md:col-span-full"
    />
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

export function Contributors({ clientId }: Props) {
  const { isPending, isError, data, error } = useContributors(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const properties = <CardColumn key="properties">
    <PresentChart data={data.properties} key="present" />
    <DistributionChart {...data.contributorType} />
  </CardColumn>
  const nameIdentifier = <CardColumn key="nameIdentifier">
    <PresentBar {...data.nameIdentifier} />
    <DistributionChart {...data.nameIdentifierScheme} />
  </CardColumn>
  const affiliation = <CardColumn key="affiliation">
    <PresentChart data={data.affiliation} />
    <DistributionChart {...data.affiliationIdentifierScheme} />
  </CardColumn>

  const columns = [properties, nameIdentifier, affiliation]

  return (
    <ChartsCard
      title={data.contributors.property}
      description={ContributorsDescription}
      present={data.contributors.present}
      columns={columns}
      isHighImpact={data.contributors.isHighImpact}
      className="md:col-span-full"
    />
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

export function RelatedIdentifiers({ clientId }: Props) {
  const { isPending, isError, data, error } = useRelatedIdentifiers(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const relationType = <DistributionChart {...data.relationType} key="relationType" />
  const relatedIdentifierType = <DistributionChart {...data.relatedIdentifierType} key="relatedIdentifierType" />
  const resourceTypeGeneral = <DistributionChart {...data.resourceTypeGeneral} key="resourceTypeGeneral" />

  const columns = [relationType, relatedIdentifierType, resourceTypeGeneral]

  return (
    <ChartsCard
      title={data.relatedIdentifiers.property}
      description={RelatedIdentifiersDescription}
      present={data.relatedIdentifiers.present}
      columns={columns}
      isHighImpact={data.relatedIdentifiers.isHighImpact}
      className="md:col-span-full"
    />
  );
}

// Funding References
const FundingReferencesDescription = (
  <>
    The FundingReferences property connects resources to funding sources. Add
    ROR funderIdentifiers for the highest impact. <LearnMore href="" />
  </>
);

export function FundingReferences({ clientId }: Props) {
  const { isPending, isError, data, error } = useFundingReferences(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const funderProperties = <CardColumn key="funderProperties">
    <PresentChart data={data.funderProperties} />
    <DistributionChart {...data.funderIdentifierType} />
    <PresentChart data={data.awardProperties} />
  </CardColumn>

  const columns = [funderProperties]

  return (
    <ChartsCard
      title={data.fundingReferences.property}
      description={FundingReferencesDescription}
      present={data.fundingReferences.present}
      columns={columns}
      isHighImpact={data.fundingReferences.isHighImpact}
      className="md:col-span-[2]"
    />
  );
}

// Publisher
const PublisherDescription = (
  <>
    The FundingReferences property connects resources to funding sources. Add
    ROR funderIdentifiers for the highest impact. <LearnMore href="" />
  </>
);

export function Publisher({ clientId }: Props) {
  const { isPending, isError, data, error } = usePublisher(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const publisherProperties = <CardColumn key="publisherProperties">
    <PresentBar {...data.publisherIdentifier} />
    <DistributionChart {...data.publisherIdentifierScheme} />
  </CardColumn>

  const columns = [publisherProperties]

  return (
    <ChartsCard
      title={data.publisher.property}
      description={PublisherDescription}
      present={data.publisher.present}
      columns={columns}
      isHighImpact={data.publisher.isHighImpact}
      className="md:col-span-[2]"
    />
  );
}

// Resource Type
const ResourceTypeDescription = <>Lorum Ipsum. <LearnMore href="" /></>

export function ResourceType({ clientId }: Props) {
  const { isPending, isError, data, error } = useResourceType(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const resourceTypeProperties = <CardColumn key="resourceTypeProperties">
    <PresentChart data={data.properties} />
    <DistributionChart {...data.resourceTypeGeneral} />
  </CardColumn>

  const columns = [resourceTypeProperties]

  return (
    <ChartsCard
      title={data.resourceType.property}
      description={ResourceTypeDescription}
      present={data.resourceType.present}
      columns={columns}
      isHighImpact={data.resourceType.isHighImpact}
      className="md:col-span-[2]"
    />
  );
}

// Subjects
const SubjectsDescription = <>Lorum Ipsum. <LearnMore href="" /></>

export function Subjects({ clientId }: Props) {
  const { isPending, isError, data, error } = useSubjects(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const subjectsProperties = <CardColumn key="subjectsProperties">
    <PresentBar {...data.subjectScheme} />
    <DistributionChart {...data.subjectsSchemeDistribution} />
    <PresentBar {...data.valueURI} />
  </CardColumn>

  const columns = [subjectsProperties]

  return (
    <ChartsCard
      title={data.subjects.property}
      description={SubjectsDescription}
      present={data.subjects.present}
      columns={columns}
      isHighImpact={data.subjects.isHighImpact}
      className="md:col-span-[2]"
    />
  );
}

// Descriptions
const DescriptionsDescription = <>Lorum Ipsum. <LearnMore href="" /></>

export function Descriptions({ clientId }: Props) {
  const { isPending, isError, data, error } = useDescriptions(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const descriptionType = <DistributionChart {...data.descriptionType} key="descriptionType" />

  const columns = [descriptionType]

  return (
    <ChartsCard
      title={data.descriptions.property}
      description={DescriptionsDescription}
      present={data.descriptions.present}
      columns={columns}
      isHighImpact={data.descriptions.isHighImpact}
      className="md:col-span-[2]"
    />
  );
}

function CardColumn({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
