import RadialChart from "@/components/RadialChart";
import PresentChart from "@/components/PresentHorizontalBarChart";
import DistributionChart from "@/components/DistributionHorizontalBarChart";

export default function Home() {
  return (
    <main>
      <h1>DataCite Metadata Analytics Dashboard</h1>
      <DistributionChart />
      <RadialChart />
      <PresentChart />
    </main>
  );
}
