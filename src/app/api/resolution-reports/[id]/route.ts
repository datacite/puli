import {
  buildResolutionReportDocument,
  buildResolutionReportNotFoundError,
  resolutionReports,
} from "../mockData";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const report = resolutionReports.find((item) => item.id === id);

  if (!report) {
    return Response.json(buildResolutionReportNotFoundError(id), {
      status: 404,
    });
  }

  return Response.json(buildResolutionReportDocument(report));
}