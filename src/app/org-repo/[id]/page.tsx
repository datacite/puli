import { redirect } from "next/navigation";
import OrgRepoPageClient from "./OrgRepoPageClient";
import { getOrgRepoEntity } from "./orgRepoRecord";
import type { Entity } from "@/types";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/[id]">) {
  const { id } = await params;

  // Redirect to lowercased id if it contains uppercase letters
  if (id !== id.toLowerCase()) {
    const urlSearchParams = new URLSearchParams();
    Object.entries(await searchParams).forEach(([key, value]) => {
      if (!value) return;

      if (Array.isArray(value))
        for (const v of value) urlSearchParams.append(key, v);
      else urlSearchParams.append(key, value);
    });

    redirect(`/org-repo/${id.toLowerCase()}?${urlSearchParams.toString()}`);
  }

  const entity = await getOrgRepoEntity(id);
  if (!entity) return null;

  const dashboardEntity = {
    id: entity.id,
    name: entity.name,
    role: entity.role,
    type: entity.type,
    parent: null,
    children: [],
  } as Entity;

  const entityQuery = dashboardEntity.type === "repository" ?
    `client.id:${dashboardEntity.id}` :
    dashboardEntity.type === "consortium" ?
    `consortium_id:${dashboardEntity.id}` :
    `provider.id:${dashboardEntity.id}`;
  
  const entityLabel = dashboardEntity.type === "repository" ?
    "Repository" :
    dashboardEntity.type === "consortium" ?
    "Consortium" : 
    dashboardEntity.type === "consortium_organization" ?
    "Consortium Organization" :
    dashboardEntity.type === "direct_member" ?
    "Institutional Member" :
    "Provider";

  return (
    <OrgRepoPageClient
      id={id}
      dashboardEntity={dashboardEntity}
      entityQuery={entityQuery}
      entityLabel={entityLabel}
    />
  );
}
