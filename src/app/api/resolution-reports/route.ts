import { buildResolutionReportsDocument, resolutionReports } from "./mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix")?.trim();

  const reports = prefix
    ? resolutionReports.filter((report) => report.attributes.prefix === prefix)
    : resolutionReports;

  return Response.json(buildResolutionReportsDocument(reports, prefix));
}