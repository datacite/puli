import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/[id]">) {
  const { id } = await params;

  // Redirect to lowercased id if it contains uppercase letters
  const urlSearchParams = new URLSearchParams();
  Object.entries(await searchParams).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value))
      for (const v of value) urlSearchParams.append(key, v);
    else urlSearchParams.append(key, value);
  });

  urlSearchParams.append('tab', 'metadata-dashboard')

  redirect(`/org-repo/${id.toLowerCase()}?${urlSearchParams.toString()}`);
}
