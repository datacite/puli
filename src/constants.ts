export const API_URL_DATACITE =
  process.env.NEXT_PUBLIC_API_URL || "https://api.stage.datacite.org";

export const API_URL_COMPLETENESS = `${API_URL_DATACITE}/completeness`;

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
const RELATED_IDS = "related_identifiers";
const RELATED_IDS_RELATION_TYPE = "related_identifiers.relationType";
const RELATED_IDS_TYPE = "related_identifiers.relatedIdentifierType";
const RELATED_IDS_RESOURCE_TYPE_GENERAL =
  "related_identifiers.resourceTypeGeneral";

//// Funding References
const FUNDING_REFERENCES = "funding_references";
const FUNDING_REFERENCES_FUNDER_NAME = "funding_references.funderName";
const FUNDING_REFERENCES_FUNDER_ID = "funding_references.funderIdentifier";
const FUNDING_REFERENCES_FUNDER_ID_TYPE =
  "funding_references.funderIdentifierType";
const FUNDING_REFERENCES_AWARD_NUMBER = "funding_references.awardNumber";
const FUNDING_REFERENCES_AWARD_URI = "funding_references.awardUri";
const FUNDING_REFERENCES_AWARD_TITLE = "funding_references.awardTitle";

//// Publisher
const PUBLISHER = "publisher_obj";
const PUBLISHER_ID = "publisher_obj.publisherIdentifier";
const PUBLISHER_ID_SCHEME = "publisher_obj.publisherIdentifierScheme";

//// Resource Type
const TYPES = "types";
const TYPES_RESOURCE_TYPE = "types.resourceType";
const TYPES_RESOURCE_TYPE_GENERAL = "types.resourceTypeGeneral";

//// Subjects
const SUBJECTS = "subjects";
const SUBJECTS_SUBJECT_SCHEME = "subjects.subjectScheme";
const SUBJECTS_VALUE_URI = "subjects.valueUri";

//// Descriptions
const DESCRIPTIONS = "descriptions";
const DESCRIPTIONS_TYPE = "descriptions.descriptionType";

//// Titles
const TITLES = "titles";
const TITLES_TYPE = "titles.titleType";

//// Rights
const RIGHTS = "rights_list";
const RIGHTS_URI = "rights_list.rightsUri";
const RIGHTS_ID_SCHEME = "rights_list.rightsIdentifierScheme";
const RIGHTS_ID = "rights_list.rightsIdentifier";

//// Dates
const DATES = "dates";
const DATES_TYPE = "dates.dateType";
const DATES_INFORMATION = "dates.dateInformation";

//// Other
const PUBLICATION_YEAR = "publicationYear";
const ALTERNATE_IDS = "identifiers";
const LANGUAGE = "language";
const SIZES = "sizes";
const FORMATS = "formats";
const VERSION = "version";
const GEO_LOCATION = "geo_locations";
const RELATED_ITEM = "related_items";

export const FIELDS: {
  [field: string]: { label: string; isHighImpact?: boolean };
} = {
  // Creators
  [CREATORS]: { label: "Creators" },
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
  [CONTRIBUTORS]: { label: "Contributors" },
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
  [RELATED_IDS]: { label: "RelatedIdentifiers", isHighImpact: true },
  [RELATED_IDS_RELATION_TYPE]: { label: "relationType" },
  [RELATED_IDS_TYPE]: { label: "relatedIdentifierType" },
  [RELATED_IDS_RESOURCE_TYPE_GENERAL]: { label: "resourceTypeGeneral" },

  // Funding References
  [FUNDING_REFERENCES]: { label: "FundingReferences", isHighImpact: true },
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
  [PUBLISHER]: { label: "Publisher" },
  [PUBLISHER_ID]: { label: "publisherIdentifier", isHighImpact: true },
  [PUBLISHER_ID_SCHEME]: { label: "publisherIdentifierScheme" },

  // Resource Type
  [TYPES]: { label: "ResourceType" },
  [TYPES_RESOURCE_TYPE]: { label: "resourceType" },
  [TYPES_RESOURCE_TYPE_GENERAL]: { label: "resourceTypeGeneral" },

  // Subjects
  [SUBJECTS]: { label: "Subjects" },
  [SUBJECTS_SUBJECT_SCHEME]: { label: "subjectScheme" },
  [SUBJECTS_VALUE_URI]: { label: "valueURI" },

  // Descriptions
  [DESCRIPTIONS]: { label: "Descriptions", isHighImpact: true },
  [DESCRIPTIONS_TYPE]: { label: "descriptionType" },

  // Titles
  [TITLES]: { label: "Titles" },
  [TITLES_TYPE]: { label: "titleType" },

  // Rights
  [RIGHTS]: { label: "Rights", isHighImpact: true },
  [RIGHTS_URI]: { label: "rightsURI" },
  [RIGHTS_ID_SCHEME]: { label: "rightsIdentifierScheme" },
  [RIGHTS_ID]: { label: "rightsIdentifier" },

  // Dates
  [DATES]: { label: "Dates", isHighImpact: true },
  [DATES_TYPE]: { label: "dateType" },
  [DATES_INFORMATION]: { label: "dateInformation" },

  // Other
  [PUBLICATION_YEAR]: { label: "PublicationYear" },
  [ALTERNATE_IDS]: { label: "AlternateIdentifiers" },
  [LANGUAGE]: { label: "Language" },
  [SIZES]: { label: "Sizes" },
  [FORMATS]: { label: "Formats" },
  [VERSION]: { label: "Version" },
  [GEO_LOCATION]: { label: "GeoLocation" },
  [RELATED_ITEM]: { label: "RelatedItem" },
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

export const RESOURCE_TYPE_FIELDS = {
  present: [TYPES, TYPES_RESOURCE_TYPE, TYPES_RESOURCE_TYPE_GENERAL],
  distribution: [TYPES_RESOURCE_TYPE_GENERAL],
} as const;

export const SUBJECTS_FIELDS = {
  present: [SUBJECTS, SUBJECTS_SUBJECT_SCHEME, SUBJECTS_VALUE_URI],
  distribution: [SUBJECTS_SUBJECT_SCHEME],
} as const;

export const DESCRIPTIONS_FIELDS = {
  present: [DESCRIPTIONS],
  distribution: [DESCRIPTIONS_TYPE],
} as const;

export const TITLES_FIELDS = {
  present: [TITLES],
  distribution: [TITLES_TYPE],
} as const;

export const RIGHTS_FIELDS = {
  present: [RIGHTS, RIGHTS_URI, RIGHTS_ID_SCHEME, RIGHTS_ID],
  distribution: [RIGHTS_ID],
} as const;

export const DATES_FIELDS = {
  present: [DATES, DATES_INFORMATION],
  distribution: [DATES_TYPE],
} as const;

export const OTHER_FIELDS = {
  present: [
    PUBLICATION_YEAR,
    ALTERNATE_IDS,
    LANGUAGE,
    SIZES,
    FORMATS,
    VERSION,
    GEO_LOCATION,
    RELATED_ITEM,
  ],
} as const;
