import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div"> & { circular?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-secondary animate-pulse rounded-md",
        props.circular ? "rounded-full" : "",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
