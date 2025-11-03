import type { ApiResponse } from "@/types";
import { FIELDS, RELATED_IDENTIFIER_FIELDS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchApi, findBuilder, toDistributionProperty } from "@/util";

const PRESENT_FIELDS = RELATED_IDENTIFIER_FIELDS.present;
const DISTRIBUTION_FIELDS = RELATED_IDENTIFIER_FIELDS.distribution;

export async function fetchRelatedIdentifiers(clientId: string) {
  const searchParams = new URLSearchParams({
    client_id: clientId,
    present: PRESENT_FIELDS.join(","),
    distribution: DISTRIBUTION_FIELDS.join(","),
  }).toString();

  const res = await fetchApi(`?${searchParams}`);
  const json = (await res.json()) as ApiResponse;

  const findInPresent = findBuilder(
    json.present,
    (item, desired: string) => item.field === desired,
  );
  const findInDistribution = findBuilder(
    json.distribution,
    (item, desired: string) => item.field === desired,
  );
  const distribution = (fieldIndex: number) => ({
    property: FIELDS[DISTRIBUTION_FIELDS[fieldIndex]].label,
    data: findInDistribution(DISTRIBUTION_FIELDS[fieldIndex])!.values.map(
      toDistributionProperty,
    ),
  });

  const formatted = {
    present: findInPresent(PRESENT_FIELDS[0])!.percent,
    relationType: distribution(0),
    relatedIdentifierType: distribution(1),
    resourceTypeGeneral: distribution(2),
  };

  return formatted;
}

export default function useRelatedIdentifiers(clientId: string) {
  const query = useQuery({
    queryKey: [clientId, "relatedIdentifiers"],
    queryFn: () => fetchRelatedIdentifiers(clientId),
  });

  return query;
}
