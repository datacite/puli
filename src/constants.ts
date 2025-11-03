const apiStageUrl = "https://api.stage.datacite.org/completeness";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || apiStageUrl;

export const CHART = {
  bar: {
    gap: 20,
    size: 12,
    radius: 3,
  },
};

// Field Names
//// Creators
const CREATORS = "creators";
const CREATORS_NAME = "creators.name";
const CREATORS_GIVEN_NAME = "creators.givenName";
const CREATORS_FAMILY_NAME = "creators.familyName";
const CREATORS_NAME_TYPE = "creators.nameType";
const CREATORS_NAME_ID = "creators.nameIdentifiers";
const CREATORS_NAME_ID_SCHEME = "creators.nameIdentifiers.nameIdentifierScheme";
const CREATORS_AFFILIATION = "creators.affiliation";
const CREATORS_AFFILIATION_ID = "creators.affiliation.affiliationIdentifier";
const CREATORS_AFFILIATION_ID_SCHEME =
  "creators.affiliation.affiliationIdentifierScheme";

//// Contributors
const CONTRIBUTORS = "contributors";
const CONTRIBUTORS_NAME = "contributors.name";
const CONTRIBUTORS_GIVEN_NAME = "contributors.givenName";
const CONTRIBUTORS_FAMILY_NAME = "contributors.familyName";
const CONTRIBUTORS_NAME_TYPE = "contributors.nameType";
const CONTRIBUTORS_TYPE = "contributors.contributorType";
const CONTRIBUTORS_NAME_ID = "contributors.nameIdentifiers";
const CONTRIBUTORS_NAME_ID_SCHEME =
  "contributors.nameIdentifiers.nameIdentifierScheme";
const CONTRIBUTORS_AFFILIATION = "contributors.affiliation";
const CONTRIBUTORS_AFFILIATION_ID =
  "contributors.affiliation.affiliationIdentifier";
const CONTRIBUTORS_AFFILIATION_ID_SCHEME =
  "contributors.affiliation.affiliationIdentifierScheme";

export const FIELDS: {
  [field: string]: { label: string; isHighImpact?: boolean };
} = {
  // Creators
  [CREATORS_NAME]: { label: "creatorName" },
  [CREATORS_GIVEN_NAME]: { label: "givenName" },
  [CREATORS_FAMILY_NAME]: { label: "familyName" },
  [CREATORS_NAME_TYPE]: { label: "nameType" },
  [CREATORS_NAME_ID]: { label: "nameIdentifier", isHighImpact: true },
  [CREATORS_NAME_ID_SCHEME]: { label: "nameIdentifierScheme" },
  [CREATORS_AFFILIATION]: { label: "affiliation" },
  [CREATORS_AFFILIATION_ID]: {
    label: "affiliationIdentifier",
    isHighImpact: true,
  },
  [CREATORS_AFFILIATION_ID_SCHEME]: { label: "affiliationIdentifierScheme" },

  // Contributors
  [CONTRIBUTORS_NAME]: { label: "contributorName" },
  [CONTRIBUTORS_GIVEN_NAME]: { label: "givenName" },
  [CONTRIBUTORS_FAMILY_NAME]: { label: "familyName" },
  [CONTRIBUTORS_NAME_TYPE]: { label: "nameType" },
  [CONTRIBUTORS_TYPE]: { label: "contributorType" },
  [CONTRIBUTORS_NAME_ID]: { label: "nameIdentifier", isHighImpact: true },
  [CONTRIBUTORS_NAME_ID_SCHEME]: { label: "nameIdentifierScheme" },
  [CONTRIBUTORS_AFFILIATION]: { label: "affiliation" },
  [CONTRIBUTORS_AFFILIATION_ID]: {
    label: "affiliationIdentifier",
    isHighImpact: true,
  },
  [CONTRIBUTORS_AFFILIATION_ID_SCHEME]: {
    label: "affiliationIdentifierScheme",
  },
} as const;

export const CREATOR_FIELDS = {
  present: [
    CREATORS,
    CREATORS_NAME,
    CREATORS_GIVEN_NAME,
    CREATORS_FAMILY_NAME,
    CREATORS_NAME_TYPE,
    CREATORS_NAME_ID,
    CREATORS_AFFILIATION,
    CREATORS_AFFILIATION_ID,
  ],
  distribution: [CREATORS_NAME_ID_SCHEME, CREATORS_AFFILIATION_ID_SCHEME],
} as const;

export const CONTRIBUTOR_FIELDS = {
  present: [
    CONTRIBUTORS,
    CONTRIBUTORS_NAME,
    CONTRIBUTORS_GIVEN_NAME,
    CONTRIBUTORS_FAMILY_NAME,
    CONTRIBUTORS_NAME_TYPE,
    CONTRIBUTORS_NAME_ID,
    CONTRIBUTORS_AFFILIATION,
    CONTRIBUTORS_AFFILIATION_ID,
  ],
  distribution: [
    CONTRIBUTORS_TYPE,
    CONTRIBUTORS_NAME_ID_SCHEME,
    CONTRIBUTORS_AFFILIATION_ID_SCHEME,
  ],
} as const;
