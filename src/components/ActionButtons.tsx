import { Button as Btn } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ActionButtons() {
  return (
    <ButtonsGrid>
      <Button>Filter by Registration Year</Button>
      <Button>Filter by Resource Type</Button>
      <Button className="max-md:col-span-2">Filter by Query</Button>

      <Button className="max-md:col-span-2">View Records in Commons</Button>
      <Button className="max-md:col-span-2">View Records in REST API</Button>
    </ButtonsGrid>
  );
}

function Button(props: React.ComponentProps<typeof Btn>) {
  return (
    <Btn
      {...props}
      variant="outline"
      className={cn("text-xs py-[0] px-6 py-2 md:w-min h-min", props.className)}
    />
  );
}

function ButtonsGrid(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className="w-full grid grid-cols-4 md:grid-cols-[repeat(2,min-content)_1fr_repeat(2,min-content)] gap-x-2 gap-y-4"
    />
  );
}
