"use client";

import ChartsCard from "@/components/ChartsCard";
import DistributionChart from "@/components/DistributionChart";
import LearnMore from "@/components/LearnMore";
import PresentBar from "@/components/PresentBar";
import PresentChart from "@/components/PresentChart";
import useCreators from "@/data/fetchCreators";

interface Props {
  clientId: string;
}

const CreatorsDescription = (
  <>
    The Creators property supports citation and connects resources to people and
    organizations. Add nameIdentifiers with ORCIDs and RORs and
    affiliationIdentifiers with RORs for the highest impact.{" "}
    <LearnMore href="" />
  </>
);

export function CreatorsCard({ clientId }: Props) {
  const { isPending, isError, data, error } = useCreators(clientId);

  if (isPending) return "Loading...";
  if (isError) return `Error: ${error}`;

  const properties = <PresentChart data={data.properties} key="present" />
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

function CardColumn({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
