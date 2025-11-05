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
      title="Creators"
      description={CreatorsDescription}
      present={data.present}
      columns={columns}
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
      title="Contributors"
      description={ContributorsDescription}
      present={data.present}
      columns={columns}
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
      title="RelatedIdentifiers"
      description={RelatedIdentifiersDescription}
      present={data.present}
      columns={columns}
      className="md:col-span-full"
      isHighImpact
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
      title="FundingReferences"
      description={FundingReferencesDescription}
      present={data.present}
      columns={columns}
      className="md:col-span-[2]"
      isHighImpact
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

  const funderProperties = <CardColumn key="funderProperties">
    <PresentBar {...data.publisherIdentifier} />
    <DistributionChart {...data.publisherIdentifierScheme} />
  </CardColumn>

  const columns = [funderProperties]

  return (
    <ChartsCard
      title="Publisher"
      description={PublisherDescription}
      present={data.present}
      columns={columns}
      className="md:col-span-[2]"
      isHighImpact
    />
  );
}

function CardColumn({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
