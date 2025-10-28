const distributionExample = [
  { value: "ORCID", present: 70 },
  { value: "ROR", present: 60 },
  { value: "ISNI", present: 98 },
  { value: "4", present: 10 },
  { value: "5", present: 20 },
];

// Connections to People, Organizations, and Related Resources
export const creators = {
  present: 30,
  isHighImpact: false,
  properties: [
    { property: "creatorName", present: 70 },
    { property: "givenName", present: 60 },
    { property: "familyName", present: 98 },
    { property: "nameType", present: 100 },
  ],
  nameIdentifier: {
    property: "nameIdentifier",
    present: 75.4,
    isHighImpact: true,
  },
  nameIdentifierSchemeDistribution: {
    property: "nameIdentifierScheme",
    data: distributionExample,
  },
  affiliationPresent: [
    { property: "affiliation", present: 70 },
    { property: "affiliationIdentifier", present: 60, isHighImpact: true },
  ],
  affiliationIdentifierSchemeDistribution: {
    property: "affiliationIdentifierScheme",
    data: distributionExample,
  },
};

export const contributors = {
  present: 30,
  isHighImpact: false,
  properties: [
    { property: "contributorName", present: 70 },
    { property: "givenName", present: 60 },
    { property: "familyName", present: 98 },
    { property: "nameType", present: 100 },
  ],
  contributorTypeDistribution: {
    property: "contributorType",
    data: distributionExample,
  },
  nameIdentifier: {
    property: "nameIdentifier",
    present: 75.4,
    isHighImpact: true,
  },
  nameIdentifierSchemeDistribution: {
    property: "nameIdentifierScheme",
    data: distributionExample,
  },
  affiliationPresent: [
    { property: "affiliation", present: 70 },
    { property: "affiliationIdentifier", present: 60, isHighImpact: true },
  ],
  affiliationIdentifierSchemeDistribution: {
    property: "affiliationIdentifierScheme",
    data: distributionExample,
  },
};

export const relatedIdentifiers = {
  present: 30,
  isHighImpact: true,
  relationTypeDistribution: {
    property: "relationType",
    data: [
      { value: "isCitedBy", present: 70 },
      { value: "isPartOf", present: 60 },
      { value: "HasPart", present: 98 },
    ],
  },
  relatedIdentifierTypeDistribution: {
    property: "relatedIdentifierType",
    data: [
      { value: "DOI", present: 70 },
      { value: "URL", present: 60 },
      { value: "CSTR", present: 98 },
    ],
  },
  resourceTypeDistribution: {
    property: "resourceType",
    data: [
      { value: "Dataset", present: 70 },
      { value: "Journal Article", present: 60 },
      { value: "Preprint", present: 98 },
    ],
  },
};

export const fundingReferences = {
  present: 30,
  isHighImpact: true,
  funderProperties: [
    { property: "funderName", present: 70 },
    { property: "funderIdentifier", present: 70, isHighImpact: true },
  ],
  funderIdentifierTypeDistribution: {
    property: "funderIdentifierType",
    data: [
      { value: "Crossref", present: 70 },
      { value: "ROR", present: 60 },
      { value: "Other", present: 98 },
    ],
  },
  awardProperties: [
    { property: "awardNumber", present: 70 },
    { property: "awardURI", present: 70 },
    { property: "awardTitle", present: 70 },
  ],
};

export const publisher = {
  present: 30,
  isHighImpact: false,
  publisherIdentifier: {
    property: "publisherIdentifier",
    present: 70,
    isHighImpact: true,
  },
  publisherIdentifierSchemeDistribution: {
    property: "publisherIdentifierScheme",
    data: [
      { value: "ROR", present: 70 },
      { value: "re3data", present: 60 },
      { value: "Other", present: 98 },
    ],
  },
};

// Descriptive Metadata
export const resourceType = {
  present: 30,
  isHighImpact: false,
  properties: [
    { property: "resourceType", present: 70 },
    { property: "resourceTypeGeneral", present: 70 },
  ],
  resourceTypeGeneralDistribution: {
    property: "resourceTypeGeneral",
    data: [
      { value: "Dataset", present: 70 },
      { value: "Award", present: 60 },
      { value: "Journal Article", present: 98 },
    ],
  },
};

export const subjects = {
  present: 30,
  isHighImpact: false,
  subjectScheme: { property: "subjectScheme", present: 70 },
  subjectSchemeDistribution: {
    property: "subjectScheme",
    data: [
      { value: "LCSH", present: 70 },
      { value: "MESH", present: 60 },
      { value: "FOS", present: 98 },
    ],
  },
  valueURI: { property: "valueURI", present: 70 },
};

export const descriptions = {
  present: 30,
  isHighImpact: true,
  descriptionTypeDistribution: {
    property: "descriptionType",
    data: [
      { value: "Abstract", present: 70 },
      { value: "Other", present: 98 },
    ],
  },
};

export const titles = {
  present: 30,
  isHighImpact: false,
  titleTypeDistribution: {
    property: "titleType",
    data: [
      { value: "Subtitle", present: 70 },
      { value: "Translation", present: 70 },
      { value: "Other", present: 98 },
    ],
  },
};

export const rights = {
  present: 30,
  isHighImpact: true,
  properties: [
    { property: "rightsURI", present: 70 },
    { property: "rightsIdentifierScheme", present: 70 },
    { property: "rightsIdentifier", present: 70 },
  ],
  rightsIdentifierDistribution: {
    property: "rightsIdentifier",
    data: [
      { value: "CCO", present: 70 },
      { value: "Other", present: 98 },
    ],
  },
};

export const dates = {
  present: 30,
  isHighImpact: true,
  dateTypeDistribution: {
    property: "dateType",
    data: [
      { value: "Issued", present: 70 },
      { value: "Available", present: 98 },
      { value: "Other", present: 98 },
    ],
  },
  dateInformation: { property: "dateInformation", present: 70 },
};

export const publicationYear = { present: 30 };
export const alternateIdentifiers = { present: 30 };
export const language = { present: 30 };
export const sizes = { present: 30 };
export const formats = { present: 30 };
export const version = { present: 30 };
export const geoLocation = { present: 30 };
export const relatedItem = { present: 30 };
