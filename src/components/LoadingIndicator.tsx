"use client";

import { useIsFetching } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export default function LoadingIndicator() {
  const isLoading = useIsFetching();

  if (!isLoading) return null;
  return (
    <Spinner className="fixed top-4 right-4 size-8 stroke-datacite-blue-dark" />
  );
}
