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

//// Related Identifiers
const RELATED_IDS = "relatedIdentifiers";
const RELATED_IDS_RELATION_TYPE = "relatedIdentifiers.relationType";
const RELATED_IDS_TYPE = "relatedIdentifiers.relatedIdentifierType";
const RELATED_IDS_RESOURCE_TYPE_GENERAL =
  "relatedIdentifiers.resourceTypeGeneral";

//// Funding References
const FUNDING_REFERENCES = "fundingReferences";
const FUNDING_REFERENCES_FUNDER_NAME = "fundingReferences.funderName";
const FUNDING_REFERENCES_FUNDER_ID = "fundingReferences.funderIdentifier";
const FUNDING_REFERENCES_FUNDER_ID_TYPE =
  "fundingReferences.funderIdentifierType";
const FUNDING_REFERENCES_AWARD_NUMBER = "fundingReferences.awardNumber";
const FUNDING_REFERENCES_AWARD_URI = "fundingReferences.awardUri";
const FUNDING_REFERENCES_AWARD_TITLE = "fundingReferences.awardTitle";

//// Publisher
const PUBLISHER = "publisher_obj";
const PUBLISHER_ID = "publisher_obj.publisherIdentifier";
const PUBLISHER_ID_SCHEME = "publisher_obj.publisherIdentifierScheme";

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

  // Related Identifiers
  [RELATED_IDS_RELATION_TYPE]: { label: "relationType" },
  [RELATED_IDS_TYPE]: { label: "relatedIdentifierType" },
  [RELATED_IDS_RESOURCE_TYPE_GENERAL]: { label: "resourceTypeGeneral" },

  // Funding References
  [FUNDING_REFERENCES_FUNDER_NAME]: { label: "funderName" },
  [FUNDING_REFERENCES_FUNDER_ID]: {
    label: "funderIdentifier",
    isHighImpact: true,
  },
  [FUNDING_REFERENCES_FUNDER_ID_TYPE]: {
    label: "funderIdentifierType",
  },
  [FUNDING_REFERENCES_AWARD_NUMBER]: { label: "awardNumber" },
  [FUNDING_REFERENCES_AWARD_URI]: { label: "awardUri" },
  [FUNDING_REFERENCES_AWARD_TITLE]: { label: "awardTitle" },

  // Publisher
  [PUBLISHER_ID]: { label: "publisherIdentifier", isHighImpact: true },
  [PUBLISHER_ID_SCHEME]: { label: "publisherIdentifierScheme" },
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

export const RELATED_IDENTIFIER_FIELDS = {
  present: [RELATED_IDS],
  distribution: [
    RELATED_IDS_RELATION_TYPE,
    RELATED_IDS_TYPE,
    RELATED_IDS_RESOURCE_TYPE_GENERAL,
  ],
} as const;

export const FUNDING_REFERENCES_FIELDS = {
  present: [
    FUNDING_REFERENCES,
    FUNDING_REFERENCES_FUNDER_NAME,
    FUNDING_REFERENCES_FUNDER_ID,
    FUNDING_REFERENCES_AWARD_NUMBER,
    FUNDING_REFERENCES_AWARD_URI,
    FUNDING_REFERENCES_AWARD_TITLE,
  ],
  distribution: [FUNDING_REFERENCES_FUNDER_ID_TYPE],
} as const;

export const PUBLISHER_FIELDS = {
  present: [PUBLISHER, PUBLISHER_ID],
  distribution: [PUBLISHER_ID_SCHEME],
} as const;
