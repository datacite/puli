"use client";

import { useParams } from "next/navigation";

export function useClientId() {
  const { clientId } = useParams<{ clientId: string }>();
  return clientId;
}
