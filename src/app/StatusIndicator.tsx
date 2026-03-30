"use client";

import { useQuery } from "@tanstack/react-query";
import { STATUS_URLS } from "@/constants";

const INCIDENT = {
  loading: "#34495e",
  none: "#2ECC71",
  minor: "#E67E22",
  major: "#E88832",
  critical: "#E74C3C",
} as const;

export default function StatusIndicator() {
  const { data, error } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await fetch(STATUS_URLS.status);
      if (!res.ok) throw new Error("Failed to load status");
      return res.json();
    },
    staleTime: 60 * 1000,
  });

  if (error) return <Status severity="critical" description={error.message} />;
  if (!data) return <Status description="Loading..." />;

  return (
    <Status
      severity={data.status.indicator}
      description={data.status.description}
    />
  );
}

function Status(props: {
  severity?: keyof typeof INCIDENT;
  description: string;
}) {
  const status = props.severity ?? "loading";

  return (
    <a href={STATUS_URLS.datacite} target="_blank" rel="noreferrer">
      <span
        className="size-3 rounded-full bg-(--indicator-color) inline-block"
        // @ts-expect-error
        style={{ "--indicator-color": INCIDENT[status] }}
      />{" "}
      {props.description}
    </a>
  );
}
