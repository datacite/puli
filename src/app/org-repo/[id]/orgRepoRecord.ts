import { cache } from "react";
import { fetchEntity } from "@/data/fetch";

export const getOrgRepoEntity = cache(async (id: string) => {
  return fetchEntity(id);
});
