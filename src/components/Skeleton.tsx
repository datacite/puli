import ChartsCard from "@/components/cards/ChartsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export function OverviewCardSkeleton() {
  return (
    <Card className={"md:col-span-full w-full h-40 p-2"}>
      <CardContent className="grid md:grid-cols-max-3 max-md:gap-8 md:gap-x-25 mx-auto items-center justify-items-center">
        <Skeleton className="w-20 h-30" />
        <Skeleton className="w-40 h-30" />
        <Skeleton className="size-30" circular />
      </CardContent>
    </Card>
  );
}

export function ChartsCardSkeleton(props: {
  columns?: number;
  className?: string;
}) {
  return (
    <ChartsCard
      title={<Skeleton className="w-[8rem] h-[1rem]" />}
      description={<Skeleton className="w-full h-[1rem]" />}
      present={<Skeleton className="w-40 h-20 rounded-t-full rounded-b-md" />}
      className={cn("w-full h-[20rem]", props.className)}
    >
      {Array.from({ length: props.columns || 0 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: index is sufficient here
        <Skeleton key={i} className="w-full h-full" />
      ))}
    </ChartsCard>
  );
}
