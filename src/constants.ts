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

export const FIELDS: {
  [field: string]: { label: string; isHighImpact?: boolean };
} = {
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
