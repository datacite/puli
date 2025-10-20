import HorizontalBarChart from "@/components/PresentHorizontalBarChart";
import RadialChart from "@/components/RadialChart";

export default function Home() {
  return (
    <main>
      <h1>DataCite Metadata Analytics Dashboard</h1>
      <RadialChart />
      <HorizontalBarChart />
    </main>
  );
}
