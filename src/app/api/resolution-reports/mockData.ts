import type {
  JsonApiErrorDocument,
  ResolutionReport,
  ResolutionReportCollectionDocument,
  ResolutionReportDocument,
  ResolutionReportSummary,
} from "@/types";

type RawResolutionReport = {
  id: string | number;
  type: string;
  attributes: ResolutionReport["attributes"];
};

export function buildResolutionReportsDocument(
  reports: ResolutionReport[],
  prefix?: string,
): ResolutionReportCollectionDocument {
  return {
    data: reports.map(toResolutionReportSummary),
    meta: {
      total: reports.length,
    },
  };
}

export function buildResolutionReportDocument(
  report: ResolutionReport,
): ResolutionReportDocument {
  return { data: report };
}

function toResolutionReportSummary(
  report: ResolutionReport,
): ResolutionReportSummary {
  return {
    id: report.id,
    type: report.type,
    attributes: {
      prefix: report.attributes.prefix,
      period: report.attributes.period,
      summaryMetrics: report.attributes.summaryMetrics,
    },
  };
}

export function buildResolutionReportNotFoundError(
  id: string,
): JsonApiErrorDocument {
  return {
    errors: [
      {
        status: "404",
        title: "Resolution report not found",
        detail: `No resolution report exists for id \"${id}\".`,
      },
    ],
  };
}

const MOCK_DATA: RawResolutionReport[] = [
  {
    "id": 1,
    "type": "resolutionReport",
    "attributes": {
      "prefix": "10.11570",
      "period": "2026-07",
      "summaryMetrics": {
        "totalAttemptedResolutions": 1174,
        "successfulResolutions": 1055,
        "failedResolutions": 119,
        "totalUniqueDois": 192,
        "uniqueDoiSuccesses": 120,
        "uniqueDoiFailures": 77
      },
      "topSuccessfulDois": [
        {
          "doi": "10.11570/23.0029",
          "resolutionCount": 116
        },
        {
          "doi": "10.11570/25.0066",
          "resolutionCount": 80
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 77
        },
        {
          "doi": "10.11570/24.0091",
          "resolutionCount": 32
        },
        {
          "doi": "10.11570/20.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/26.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/18.0005",
          "resolutionCount": 23
        },
        {
          "doi": "10.11570/26.0001",
          "resolutionCount": 21
        },
        {
          "doi": "10.11570/21.0007",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/21.0024",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/24.0087",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/25.0004",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/20.0006",
          "resolutionCount": 18
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/26.0015",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/23.0013",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/26.0003",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/16.0001",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0020",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0003",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/25.0036",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/13.0002",
          "resolutionCount": 11
        },
        {
          "doi": "10.11570/22.0080",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/24.0098",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/22.0082",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/23.0006",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/16.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/16.0008",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/17.0007",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/19.0074",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/23.0033",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0092",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0076",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0104",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/15.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/15.0002",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/16.0006",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/17.0009",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/19.0028",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/20.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/22.0078",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/25.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/13.0001",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/17.0006",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/19.0004",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/20.0013",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/21.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/22.0083",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0088",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0103",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0106",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/16.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0007",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0003",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0011",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0010",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0030",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0091",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0105",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0006",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/17.0010",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/19.0008",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0006",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/23.0017",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0001",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0090",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0011",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0013",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/16.0005",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/16.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0002",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/19.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0001",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0072",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/24.0089",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/18.0006",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/19.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/20.0010",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/21.0001",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/22.0005",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/23.0008",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/24.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0003",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0048",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0098",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0099",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/17.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/19.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0004",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0009",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0016",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/22.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0003",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0018",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0028",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0031",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/24.0006",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0068",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0077",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0009",
          "resolutionCount": 1
        }
      ],
      "failedDois": [
        {
          "doi": "10.11570/",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/1",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/1234",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/13.0002.THE",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/13.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/14.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/15.0001.BINTLEY",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0001THIS",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002ORION%EF%82%A0A",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002Orion",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003.K16",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003KIRK",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003OPHIUCHUS",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003Ophiuchus",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0004.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0006ORION%EF%82%A0B",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0001.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.00044HTTPS:/DOI.ORG/10.11570/19.0028REFERENCESBALLY",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0007/",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0008.MORE",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.Key",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.00",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.000",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/18.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0021",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0029.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0040",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0049.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0073",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.1000/108",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.0006.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.00071.A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.0024A133",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.003",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0072MOLECULAR",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0078/",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0001",
          "resolutionCount": 4,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/23.02647",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/24.0003WITH",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0005",
          "resolutionCount": 6,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/25.0006",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0009",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0010",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0011",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0012",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0013",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0014",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0015",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0089",
          "resolutionCount": 9,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/26.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0014.10",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100101",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.4.1",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0015.%3Cbr",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0016",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0022",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/ABC",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/CISTI.CANFAR/21.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        }
      ]
    }
  },
  {
    "id": 2,
    "type": "resolutionReport",
    "attributes": {
      "prefix": "10.11570",
      "period": "2026-08",
      "summaryMetrics": {
        "totalAttemptedResolutions": 800,
        "successfulResolutions": 600,
        "failedResolutions": 200,
        "totalUniqueDois": 135,
        "uniqueDoiSuccesses": 130,
        "uniqueDoiFailures": 10
      },
      "topSuccessfulDois": [
        {
          "doi": "10.11570/23.0029",
          "resolutionCount": 116
        },
        {
          "doi": "10.11570/25.0066",
          "resolutionCount": 80
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 77
        },
        {
          "doi": "10.11570/24.0091",
          "resolutionCount": 32
        },
        {
          "doi": "10.11570/20.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/26.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/18.0005",
          "resolutionCount": 23
        },
        {
          "doi": "10.11570/26.0001",
          "resolutionCount": 21
        },
        {
          "doi": "10.11570/21.0007",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/21.0024",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/24.0087",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/25.0004",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/20.0006",
          "resolutionCount": 18
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/26.0015",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/23.0013",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/26.0003",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/16.0001",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0020",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0003",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/25.0036",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/13.0002",
          "resolutionCount": 11
        },
        {
          "doi": "10.11570/22.0080",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/24.0098",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/22.0082",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/23.0006",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/16.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/16.0008",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/17.0007",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/19.0074",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/23.0033",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0092",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0076",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0104",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/15.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/15.0002",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/16.0006",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/17.0009",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/19.0028",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/20.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/22.0078",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/25.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/13.0001",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/17.0006",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/19.0004",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/20.0013",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/21.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/22.0083",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0088",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0103",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0106",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/16.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0007",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0003",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0011",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0010",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0030",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0091",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0105",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0006",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/17.0010",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/19.0008",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0006",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/23.0017",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0001",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0090",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0011",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0013",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/16.0005",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/16.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0002",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/19.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0001",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0072",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/24.0089",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/18.0006",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/19.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/20.0010",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/21.0001",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/22.0005",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/23.0008",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/24.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0003",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0048",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0098",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0099",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/17.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/19.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0004",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0009",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0016",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/22.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0003",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0018",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0028",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0031",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/24.0006",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0068",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0077",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0009",
          "resolutionCount": 1
        }
      ],
      "failedDois": [
        {
          "doi": "10.11570/",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/1",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/1234",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/13.0002.THE",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/13.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/14.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/15.0001.BINTLEY",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0001THIS",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002ORION%EF%82%A0A",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002Orion",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003.K16",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003KIRK",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003OPHIUCHUS",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003Ophiuchus",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0004.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0006ORION%EF%82%A0B",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0001.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.00044HTTPS:/DOI.ORG/10.11570/19.0028REFERENCESBALLY",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0007/",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0008.MORE",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.Key",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.00",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.000",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/18.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0021",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0029.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0040",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0049.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0073",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.1000/108",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.0006.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.00071.A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.0024A133",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.003",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0072MOLECULAR",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0078/",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0001",
          "resolutionCount": 4,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/23.02647",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/24.0003WITH",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0005",
          "resolutionCount": 6,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/25.0006",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0009",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0010",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0011",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0012",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0013",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0014",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0015",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0089",
          "resolutionCount": 9,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/26.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0014.10",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100101",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.4.1",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0015.%3Cbr",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0016",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0022",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/ABC",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/CISTI.CANFAR/21.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        }
      ]
    }
  },
  {
    "id": 3,
    "type": "resolutionReport",
    "attributes": {
      "prefix": "10.11570",
      "period": "2026-09",
      "summaryMetrics": {
        "totalAttemptedResolutions": 2060,
        "successfulResolutions": 1910,
        "failedResolutions": 150,
        "totalUniqueDois": 301,
        "uniqueDoiSuccesses": 224,
        "uniqueDoiFailures": 57
      },
      "topSuccessfulDois": [
        {
          "doi": "10.11570/23.0029",
          "resolutionCount": 116
        },
        {
          "doi": "10.11570/25.0066",
          "resolutionCount": 80
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 77
        },
        {
          "doi": "10.11570/24.0091",
          "resolutionCount": 32
        },
        {
          "doi": "10.11570/20.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/26.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/18.0005",
          "resolutionCount": 23
        },
        {
          "doi": "10.11570/26.0001",
          "resolutionCount": 21
        },
        {
          "doi": "10.11570/21.0007",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/21.0024",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/24.0087",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/25.0004",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/20.0006",
          "resolutionCount": 18
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/26.0015",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/23.0013",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/26.0003",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/16.0001",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0020",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0003",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/25.0036",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/13.0002",
          "resolutionCount": 11
        },
        {
          "doi": "10.11570/22.0080",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/24.0098",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/22.0082",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/23.0006",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/16.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/16.0008",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/17.0007",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/19.0074",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/23.0033",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0092",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0076",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0104",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/15.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/15.0002",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/16.0006",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/17.0009",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/19.0028",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/20.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/22.0078",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/25.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/13.0001",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/17.0006",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/19.0004",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/20.0013",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/21.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/22.0083",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0088",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0103",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0106",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/16.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0007",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0003",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0011",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0010",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0030",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0091",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0105",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0006",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/17.0010",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/19.0008",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0006",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/23.0017",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0001",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0090",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0011",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0013",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/16.0005",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/16.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0002",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/19.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0001",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0072",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/24.0089",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/18.0006",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/19.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/20.0010",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/21.0001",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/22.0005",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/23.0008",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/24.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0003",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0048",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0098",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0099",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/17.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/19.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0004",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0009",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0016",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/22.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0003",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0018",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0028",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0031",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/24.0006",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0068",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0077",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0009",
          "resolutionCount": 1
        }
      ],
      "failedDois": [
        {
          "doi": "10.11570/",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/1",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/1234",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/13.0002.THE",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/13.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/14.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/15.0001.BINTLEY",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0001THIS",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002ORION%EF%82%A0A",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002Orion",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003.K16",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003KIRK",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003OPHIUCHUS",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003Ophiuchus",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0004.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0006ORION%EF%82%A0B",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0001.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.00044HTTPS:/DOI.ORG/10.11570/19.0028REFERENCESBALLY",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0007/",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0008.MORE",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.Key",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.00",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.000",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/18.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0021",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0029.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0040",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0049.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0073",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.1000/108",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.0006.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.00071.A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.0024A133",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.003",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0072MOLECULAR",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0078/",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0001",
          "resolutionCount": 4,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/23.02647",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/24.0003WITH",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0005",
          "resolutionCount": 6,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/25.0006",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0009",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0010",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0011",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0012",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0013",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0014",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0015",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0089",
          "resolutionCount": 9,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/26.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0014.10",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100101",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.4.1",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0015.%3Cbr",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0016",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0022",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/ABC",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/CISTI.CANFAR/21.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        }
      ]
    }
  },
    {
    "id": 4,
    "type": "resolutionReport",
    "attributes": {
      "prefix": "10.82206",
      "period": "2026-07",
      "summaryMetrics": {
        "totalAttemptedResolutions": 1174,
        "successfulResolutions": 1055,
        "failedResolutions": 119,
        "totalUniqueDois": 192,
        "uniqueDoiSuccesses": 120,
        "uniqueDoiFailures": 77
      },
      "topSuccessfulDois": [
        {
          "doi": "10.11570/23.0029",
          "resolutionCount": 116
        },
        {
          "doi": "10.11570/25.0066",
          "resolutionCount": 80
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 77
        },
        {
          "doi": "10.11570/24.0091",
          "resolutionCount": 32
        },
        {
          "doi": "10.11570/20.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/26.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/18.0005",
          "resolutionCount": 23
        },
        {
          "doi": "10.11570/26.0001",
          "resolutionCount": 21
        },
        {
          "doi": "10.11570/21.0007",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/21.0024",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/24.0087",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/25.0004",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/20.0006",
          "resolutionCount": 18
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/26.0015",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/23.0013",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/26.0003",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/16.0001",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0020",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0003",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/25.0036",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/13.0002",
          "resolutionCount": 11
        },
        {
          "doi": "10.11570/22.0080",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/24.0098",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/22.0082",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/23.0006",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/16.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/16.0008",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/17.0007",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/19.0074",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/23.0033",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0092",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0076",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0104",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/15.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/15.0002",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/16.0006",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/17.0009",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/19.0028",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/20.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/22.0078",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/25.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/13.0001",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/17.0006",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/19.0004",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/20.0013",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/21.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/22.0083",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0088",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0103",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0106",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/16.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0007",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0003",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0011",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0010",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0030",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0091",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0105",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0006",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/17.0010",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/19.0008",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0006",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/23.0017",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0001",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0090",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0011",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0013",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/16.0005",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/16.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0002",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/19.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0001",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0072",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/24.0089",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/18.0006",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/19.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/20.0010",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/21.0001",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/22.0005",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/23.0008",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/24.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0003",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0048",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0098",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0099",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/17.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/19.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0004",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0009",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0016",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/22.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0003",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0018",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0028",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0031",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/24.0006",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0068",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0077",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0009",
          "resolutionCount": 1
        }
      ],
      "failedDois": [
        {
          "doi": "10.11570/",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/1",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/1234",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/13.0002.THE",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/13.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/14.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/15.0001.BINTLEY",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0001THIS",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002ORION%EF%82%A0A",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002Orion",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003.K16",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003KIRK",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003OPHIUCHUS",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003Ophiuchus",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0004.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0006ORION%EF%82%A0B",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0001.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.00044HTTPS:/DOI.ORG/10.11570/19.0028REFERENCESBALLY",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0007/",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0008.MORE",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.Key",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.00",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.000",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/18.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0021",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0029.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0040",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0049.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0073",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.1000/108",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.0006.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.00071.A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.0024A133",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.003",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0072MOLECULAR",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0078/",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0001",
          "resolutionCount": 4,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/23.02647",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/24.0003WITH",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0005",
          "resolutionCount": 6,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/25.0006",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0009",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0010",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0011",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0012",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0013",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0014",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0015",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0089",
          "resolutionCount": 9,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/26.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0014.10",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100101",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.4.1",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0015.%3Cbr",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0016",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0022",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/ABC",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/CISTI.CANFAR/21.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        }
      ]
    }
  },
  {
    "id": 5,
    "type": "resolutionReport",
    "attributes": {
      "prefix": "10.82206",
      "period": "2026-08",
      "summaryMetrics": {
        "totalAttemptedResolutions": 1174,
        "successfulResolutions": 1055,
        "failedResolutions": 119,
        "totalUniqueDois": 192,
        "uniqueDoiSuccesses": 120,
        "uniqueDoiFailures": 77
      },
      "topSuccessfulDois": [
        {
          "doi": "10.11570/23.0029",
          "resolutionCount": 116
        },
        {
          "doi": "10.11570/25.0066",
          "resolutionCount": 80
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 77
        },
        {
          "doi": "10.11570/24.0091",
          "resolutionCount": 32
        },
        {
          "doi": "10.11570/20.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/26.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/18.0005",
          "resolutionCount": 23
        },
        {
          "doi": "10.11570/26.0001",
          "resolutionCount": 21
        },
        {
          "doi": "10.11570/21.0007",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/21.0024",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/24.0087",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/25.0004",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/20.0006",
          "resolutionCount": 18
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/26.0015",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/23.0013",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/26.0003",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/16.0001",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0020",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0003",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/25.0036",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/13.0002",
          "resolutionCount": 11
        },
        {
          "doi": "10.11570/22.0080",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/24.0098",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/22.0082",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/23.0006",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/16.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/16.0008",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/17.0007",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/19.0074",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/23.0033",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0092",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0076",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0104",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/15.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/15.0002",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/16.0006",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/17.0009",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/19.0028",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/20.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/22.0078",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/25.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/13.0001",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/17.0006",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/19.0004",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/20.0013",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/21.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/22.0083",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0088",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0103",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0106",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/16.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0007",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0003",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0011",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0010",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0030",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0091",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0105",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0006",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/17.0010",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/19.0008",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0006",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/23.0017",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0001",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0090",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0011",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0013",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/16.0005",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/16.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0002",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/19.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0001",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0072",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/24.0089",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/18.0006",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/19.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/20.0010",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/21.0001",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/22.0005",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/23.0008",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/24.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0003",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0048",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0098",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0099",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/17.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/19.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0004",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0009",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0016",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/22.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0003",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0018",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0028",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0031",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/24.0006",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0068",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0077",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0009",
          "resolutionCount": 1
        }
      ],
      "failedDois": [
        {
          "doi": "10.11570/",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/1",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/1234",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/13.0002.THE",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/13.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/14.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/15.0001.BINTLEY",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0001THIS",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002ORION%EF%82%A0A",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002Orion",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003.K16",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003KIRK",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003OPHIUCHUS",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003Ophiuchus",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0004.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0006ORION%EF%82%A0B",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0001.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.00044HTTPS:/DOI.ORG/10.11570/19.0028REFERENCESBALLY",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0007/",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0008.MORE",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.Key",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.00",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.000",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/18.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0021",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0029.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0040",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0049.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0073",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.1000/108",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.0006.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.00071.A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.0024A133",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.003",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0072MOLECULAR",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0078/",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0001",
          "resolutionCount": 4,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/23.02647",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/24.0003WITH",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0005",
          "resolutionCount": 6,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/25.0006",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0009",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0010",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0011",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0012",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0013",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0014",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0015",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0089",
          "resolutionCount": 9,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/26.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0014.10",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100101",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.4.1",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0015.%3Cbr",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0016",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0022",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/ABC",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/CISTI.CANFAR/21.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        }
      ]
    }
  },
  {
    "id": 6,
    "type": "resolutionReport",
    "attributes": {
      "prefix": "10.82206",
      "period": "2026-09",
      "summaryMetrics": {
        "totalAttemptedResolutions": 1174,
        "successfulResolutions": 1055,
        "failedResolutions": 119,
        "totalUniqueDois": 192,
        "uniqueDoiSuccesses": 120,
        "uniqueDoiFailures": 77
      },
      "topSuccessfulDois": [
        {
          "doi": "10.11570/23.0029",
          "resolutionCount": 116
        },
        {
          "doi": "10.11570/25.0066",
          "resolutionCount": 80
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 77
        },
        {
          "doi": "10.11570/24.0091",
          "resolutionCount": 32
        },
        {
          "doi": "10.11570/20.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/26.0002",
          "resolutionCount": 27
        },
        {
          "doi": "10.11570/18.0005",
          "resolutionCount": 23
        },
        {
          "doi": "10.11570/26.0001",
          "resolutionCount": 21
        },
        {
          "doi": "10.11570/21.0007",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/21.0024",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/24.0087",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/25.0004",
          "resolutionCount": 19
        },
        {
          "doi": "10.11570/20.0006",
          "resolutionCount": 18
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/26.0015",
          "resolutionCount": 16
        },
        {
          "doi": "10.11570/23.0013",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/26.0003",
          "resolutionCount": 15
        },
        {
          "doi": "10.11570/16.0001",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0020",
          "resolutionCount": 14
        },
        {
          "doi": "10.11570/22.0003",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/25.0036",
          "resolutionCount": 12
        },
        {
          "doi": "10.11570/13.0002",
          "resolutionCount": 11
        },
        {
          "doi": "10.11570/22.0080",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/24.0098",
          "resolutionCount": 10
        },
        {
          "doi": "10.11570/22.0082",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/23.0006",
          "resolutionCount": 9
        },
        {
          "doi": "10.11570/16.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/16.0008",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/17.0007",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/19.0074",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/23.0033",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0003",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/24.0092",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0076",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/25.0104",
          "resolutionCount": 8
        },
        {
          "doi": "10.11570/15.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/15.0002",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/16.0006",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/17.0009",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/18.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/19.0028",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/20.0007",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/22.0078",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/25.0001",
          "resolutionCount": 7
        },
        {
          "doi": "10.11570/13.0001",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/17.0006",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/19.0004",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/20.0013",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/21.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/22.0083",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0002",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/24.0088",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0103",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/25.0106",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 6
        },
        {
          "doi": "10.11570/16.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0007",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/17.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0002",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/18.0003",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0001",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/20.0011",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0004",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0010",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/23.0030",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0091",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/25.0105",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0006",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 5
        },
        {
          "doi": "10.11570/16.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/17.0010",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/19.0008",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0004",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/21.0006",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/23.0017",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0001",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/24.0090",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0011",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/26.0013",
          "resolutionCount": 4
        },
        {
          "doi": "10.11570/16.0005",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/16.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0002",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/17.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/19.0009",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0003",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/21.0008",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0001",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/22.0072",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/24.0089",
          "resolutionCount": 3
        },
        {
          "doi": "10.11570/18.0006",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/19.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/20.0010",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/21.0001",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/22.0005",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/23.0008",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/24.0007",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0003",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0048",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0098",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/25.0099",
          "resolutionCount": 2
        },
        {
          "doi": "10.11570/17.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/19.0005",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0004",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0009",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/20.0016",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/22.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0003",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0018",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0028",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/23.0031",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/24.0006",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0002",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0068",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/25.0077",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1
        },
        {
          "doi": "10.11570/26.0009",
          "resolutionCount": 1
        }
      ],
      "failedDois": [
        {
          "doi": "10.11570/",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/1",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/1234",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/13.0002.THE",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/13.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/14.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/15.0001.BINTLEY",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0003",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/15.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0001THIS",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002ORION%EF%82%A0A",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0002Orion",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003.K16",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003KIRK",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003OPHIUCHUS",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0003Ophiuchus",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0004.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0006ORION%EF%82%A0B",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/16.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0001.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.00044HTTPS:/DOI.ORG/10.11570/19.0028REFERENCESBALLY",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0007/",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0008.MORE",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.0009.Key",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/17.007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.00",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.000",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/18.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18.005",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/18007",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0021",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0029.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0040",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.0049.TEST",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/19.0073",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/19.1000/108",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.0006.",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/20.00071.A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.0024A133",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/21.003",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0072MOLECULAR",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/22.0078/",
          "resolutionCount": 1,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0001",
          "resolutionCount": 4,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/23.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/23.02647",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/24.0003WITH",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0005",
          "resolutionCount": 6,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/25.0006",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0009",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0010",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0011",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0012",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0013",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0014",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0015",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/25.0089",
          "resolutionCount": 9,
          "top5FailedReferrers": ["https://stats.datacite.org"]
        },
        {
          "doi": "10.11570/26.0004",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0005",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0008",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0014.10",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.101100101",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0014.4.1",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0015.%3Cbr",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0016",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0018",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/26.0019",
          "resolutionCount": 3,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0020",
          "resolutionCount": 2,
          "top5FailedReferrers": ["https://www.overleaf.com/"]
        },
        {
          "doi": "10.11570/26.0022",
          "resolutionCount": 2,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/A",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/ABC",
          "resolutionCount": 3,
          "top5FailedReferrers": []
        },
        {
          "doi": "10.11570/CISTI.CANFAR/21.0007",
          "resolutionCount": 1,
          "top5FailedReferrers": []
        }
      ]
    }
  }
];

export const resolutionReports: ResolutionReport[] = MOCK_DATA.map(
  ({ id, attributes }) => ({
    id: String(id),
    type: "resolution-reports",
    attributes,
  }),
);
