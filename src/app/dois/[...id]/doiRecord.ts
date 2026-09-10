import { cache } from "react";
import { fetchDoiRecord, fetchDoisRecords } from "@/data/fetch";
import type { DoiRecord } from "@/types";

type DoiRecordResponse = {
  data?: DoiRecord;
};

export const getDoiRecordWithFallback = cache(async (doi: string) => {
  const directRecord = await fetchDoiRecord(doi).catch(() => null) as DoiRecordResponse | null;
  if (directRecord?.data) return directRecord;

  const fallback = await fetchDoisRecords(`doi:${doi}`, {
    pageSize: 1,
  }).catch(() => null);

  const firstFallbackRecord = fallback?.data?.[0];
  return firstFallbackRecord ? { data: firstFallbackRecord } : null;
});
