import { dmSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 className={cn("", className)} {...props} />;
}

export function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-4xl font-normal", dmSans.className, className)}
      {...props}
    />
  );
}

export function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold text-muted-foreground",
        dmSans.className,
        className,
      )}
      {...props}
    />
  );
}

export function H4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn("text-card-title text-xl", dmSans.className, className)}
      {...props}
    />
  );
}

export function H5({ className, ...props }: React.ComponentProps<"h5">) {
  return <h5 className={cn("", className)} {...props} />;
}

export function H6({ className, ...props }: React.ComponentProps<"h6">) {
  return <h6 className={cn("", className)} {...props} />;
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return <H3 className="mt-12 col-span-full font-light">{children}</H3>;
}
