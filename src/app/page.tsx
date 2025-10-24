import ChartsCard, { type Props } from "@/components/ChartsCard";
import RadialChart from "@/components/RadialChart";
import PresentChart from "@/components/PresentHorizontalBarChart";
import DistributionChart from "@/components/DistributionHorizontalBarChart";

const CardProps: Props = {
  title: "Creators",
  description: (
    <>
      The Creators property supports citation and connects resources to people
      and organizations. Add nameIdentifiers with ORCIDs and RORs and
      affiliationIdentifiers with RORs for the highest impact. <a>Learn more</a>
    </>
  ),
  columns: [
    <RadialChart key="radial" />,
    <PresentChart key="present" />,
    <DistributionChart key="distribution" />,
  ],
};

export default function Home() {
  return (
    <main>
      <h1>DataCite Metadata Analytics Dashboard</h1>
      <ChartsCard {...CardProps} />
    </main>
  );
}
