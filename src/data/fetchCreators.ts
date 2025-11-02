import type { ApiResponse } from "@/types";
import { FIELDS, CREATOR_FIELDS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchApi, findBuilder, toDistributionProperty, toPresentProperty } from "@/util";

const PRESENT_FIELDS = CREATOR_FIELDS.present;
const DISTRIBUTION_FIELDS = CREATOR_FIELDS.distribution;

export async function fetchCreators(clientId: string) {
  const searchParams = new URLSearchParams({
    client_id: clientId,
    present: PRESENT_FIELDS.join(","),
    distribution: DISTRIBUTION_FIELDS.join(","),
  }).toString();

  const res = await fetchApi(`?${searchParams}`);
  const json = (await res.json()) as ApiResponse;

  const findInPresent = findBuilder(json.present, (item, desired: string) => item.field === desired);
  const findInDistribution = findBuilder(json.distribution, (item, desired: string) => item.field === desired);
  const presentSlice = (start?: number, end?: number) => PRESENT_FIELDS.slice(start, end).map(findInPresent).filter(item => !!item).map(toPresentProperty)
  const distribution = (fieldIndex: number) => ({
    property: FIELDS[DISTRIBUTION_FIELDS[fieldIndex]].label,
    data: findInDistribution(DISTRIBUTION_FIELDS[fieldIndex])!.values.map(toDistributionProperty)
  })

  const formatted = {
    present: findInPresent(PRESENT_FIELDS[0])!.percent,
    properties: presentSlice(1, 5),
    nameIdentifier: toPresentProperty(findInPresent(PRESENT_FIELDS[5])!),
    nameIdentifierScheme: distribution(0),
    affiliation: presentSlice(-2),
    affiliationIdentifierScheme: distribution(1),
  }

  return formatted
}


export default function useCreators(clientId: string) {
  const query = useQuery({
    queryKey: [clientId, "creators"],
    queryFn: () => fetchCreators(clientId),
  });

  return query;
}
