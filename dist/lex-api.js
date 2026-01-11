import { XrpcClient } from '@atproto/xrpc';
import { Lexicons, ValidationError } from '@atproto/lexicon';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// lex-api/util.ts
function isObject(v) {
  return v != null && typeof v === "object";
}
function is$type($type, id42, hash) {
  return hash === "main" ? $type === id42 : (
    // $type === `${id}#${hash}`
    typeof $type === "string" && $type.length === id42.length + 1 + hash.length && $type.charCodeAt(id42.length) === 35 && $type.startsWith(id42) && $type.endsWith(hash)
  );
}
function is$typed(v, id42, hash) {
  return isObject(v) && "$type" in v && is$type(v.$type, id42, hash);
}
function maybe$typed(v, id42, hash) {
  return isObject(v) && ("$type" in v ? v.$type === void 0 || is$type(v.$type, id42, hash) : true);
}

// lex-api/lexicons.ts
var schemaDict = {
  AppCertifiedBadgeAward: {
    lexicon: 1,
    id: "app.certified.badge.award",
    defs: {
      main: {
        type: "record",
        description: "Records a badge award to a user, project, or activity claim.",
        key: "tid",
        record: {
          type: "object",
          required: ["badge", "subject", "createdAt"],
          properties: {
            badge: {
              type: "ref",
              ref: "lex:app.certified.badge.definition",
              description: "Reference to the badge definition for this award."
            },
            subject: {
              type: "union",
              description: "Entity the badge award is for (either an account DID or any specific AT Protocol record), e.g. a user, a project, or a specific activity claim.",
              refs: [
                "lex:app.certified.defs#did",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            note: {
              type: "string",
              description: "Optional statement explaining the reason for this badge award."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  AppCertifiedBadgeDefinition: {
    lexicon: 1,
    id: "app.certified.badge.definition",
    defs: {
      main: {
        type: "record",
        description: "Defines a badge that can be awarded via badge award records to users, projects, or activity claims.",
        key: "tid",
        record: {
          type: "object",
          required: ["title", "badgeType", "icon", "createdAt"],
          properties: {
            badgeType: {
              type: "string",
              description: "Category of the badge (e.g. endorsement, participation, affiliation)."
            },
            title: {
              type: "string",
              description: "Human-readable title of the badge."
            },
            icon: {
              type: "blob",
              description: "Icon representing the badge, stored as a blob for compact visual display.",
              accept: [
                "image/png",
                "image/jpeg",
                "image/webp",
                "image/svg+xml"
              ],
              maxSize: 1048576
            },
            description: {
              type: "string",
              description: "Optional short statement describing what the badge represents."
            },
            allowedIssuers: {
              type: "array",
              description: "Optional allowlist of DIDs allowed to issue this badge. If omitted, anyone may issue it.",
              items: {
                type: "ref",
                ref: "lex:app.certified.defs#did"
              }
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  AppCertifiedBadgeResponse: {
    lexicon: 1,
    id: "app.certified.badge.response",
    defs: {
      main: {
        type: "record",
        description: "Recipient response to a badge award.",
        key: "tid",
        record: {
          type: "object",
          required: ["badgeAward", "response", "createdAt"],
          properties: {
            badgeAward: {
              type: "ref",
              ref: "lex:app.certified.badge.award",
              description: "Reference to the badge award."
            },
            response: {
              type: "string",
              enum: ["accepted", "rejected"],
              description: "The recipient\u2019s response for the badge (accepted or rejected)."
            },
            weight: {
              type: "string",
              description: "Optional relative weight for accepted badges, assigned by the recipient."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  AppCertifiedDefs: {
    lexicon: 1,
    id: "app.certified.defs",
    description: "Common type definitions used across certified protocols.",
    defs: {
      did: {
        type: "string",
        format: "did",
        description: "A Decentralized Identifier (DID) string."
      }
    }
  },
  AppCertifiedLocation: {
    lexicon: 1,
    id: "app.certified.location",
    defs: {
      main: {
        type: "record",
        description: "A location reference",
        key: "tid",
        record: {
          type: "object",
          required: [
            "lpVersion",
            "srs",
            "locationType",
            "location",
            "createdAt"
          ],
          properties: {
            lpVersion: {
              type: "string",
              description: "The version of the Location Protocol",
              maxLength: 10
            },
            srs: {
              type: "string",
              format: "uri",
              description: "The Spatial Reference System URI (e.g., http://www.opengis.net/def/crs/OGC/1.3/CRS84) that defines the coordinate system.",
              maxLength: 100
            },
            locationType: {
              type: "string",
              description: "An identifier for the format of the location data (e.g., coordinate-decimal, geojson-point)",
              knownValues: ["coordinate-decimal", "geojson-point"],
              maxLength: 20
            },
            location: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallBlob"
              ],
              description: "The location of where the work was performed as a URI or blob."
            },
            name: {
              type: "string",
              description: "Optional name for this location",
              maxLength: 1e3,
              maxGraphemes: 100
            },
            description: {
              type: "string",
              description: "Optional description for this location",
              maxLength: 2e3,
              maxGraphemes: 500
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  AppGainforestCommonDefs: {
    lexicon: 1,
    id: "app.gainforest.common.defs",
    defs: {
      uri: {
        type: "object",
        required: ["uri"],
        description: "Object containing a URI to external data",
        properties: {
          uri: {
            type: "string",
            format: "uri",
            maxGraphemes: 1024,
            description: "URI to external data"
          }
        }
      },
      smallBlob: {
        type: "object",
        required: ["blob"],
        description: "Object containing a blob to external data",
        properties: {
          blob: {
            type: "blob",
            accept: ["*/*"],
            maxSize: 10485760,
            description: "Blob to external data (up to 10MB)"
          }
        }
      },
      largeBlob: {
        type: "object",
        required: ["blob"],
        description: "Object containing a blob to external data",
        properties: {
          blob: {
            type: "blob",
            accept: ["*/*"],
            maxSize: 104857600,
            description: "Blob to external data (up to 100MB)"
          }
        }
      },
      smallImage: {
        type: "object",
        required: ["image"],
        description: "Object containing a small image",
        properties: {
          image: {
            type: "blob",
            accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            maxSize: 5242880,
            description: "Image (up to 5MB)"
          }
        }
      },
      largeImage: {
        type: "object",
        required: ["image"],
        description: "Object containing a large image",
        properties: {
          image: {
            type: "blob",
            accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            maxSize: 10485760,
            description: "Image (up to 10MB)"
          }
        }
      },
      indexedOrganization: {
        type: "object",
        required: ["id", "name"],
        properties: {
          id: {
            type: "string",
            format: "uri",
            description: "The URI of the organization"
          },
          name: {
            type: "string",
            description: "The name of the organization"
          }
        }
      }
    }
  },
  AppGainforestOrganizationDefaultSite: {
    lexicon: 1,
    id: "app.gainforest.organization.defaultSite",
    defs: {
      main: {
        type: "record",
        description: "A declaration of the default site for an organization",
        key: "literal:self",
        record: {
          type: "object",
          required: ["site", "createdAt"],
          properties: {
            site: {
              type: "string",
              format: "at-uri",
              description: "The reference to the default site record in the PDS"
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationGetIndexedOrganizations: {
    lexicon: 1,
    id: "app.gainforest.organization.getIndexedOrganizations",
    defs: {
      main: {
        type: "query",
        description: "Get all organizations to view initially on map",
        parameters: {
          type: "params",
          properties: {}
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["organizations"],
            properties: {
              organizations: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.gainforest.common.defs#indexedOrganization"
                }
              }
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationInfo: {
    lexicon: 1,
    id: "app.gainforest.organization.info",
    defs: {
      main: {
        type: "record",
        description: "A declaration of an organization or project",
        key: "literal:self",
        record: {
          type: "object",
          required: [
            "displayName",
            "shortDescription",
            "longDescription",
            "objectives",
            "country",
            "visibility",
            "createdAt"
          ],
          properties: {
            displayName: {
              type: "string",
              description: "The name of the organization or project",
              minLength: 8,
              maxLength: 255
            },
            shortDescription: {
              type: "string",
              description: "The description of the organization or project",
              minLength: 50,
              maxLength: 2e3
            },
            longDescription: {
              type: "string",
              description: "The long description of the organization or project in richtext",
              minLength: 50,
              maxLength: 5e3
            },
            coverImage: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallImage",
              description: "Cover image for the organization"
            },
            logo: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallImage",
              description: "Logo for the organization"
            },
            objectives: {
              type: "array",
              description: "The objectives of the organization or project",
              items: {
                type: "string",
                enum: [
                  "Conservation",
                  "Research",
                  "Education",
                  "Community",
                  "Other"
                ]
              }
            },
            startDate: {
              type: "string",
              description: "The start date of the organization or project",
              format: "datetime"
            },
            website: {
              type: "string",
              description: "The website of the organization or project",
              format: "uri"
            },
            country: {
              type: "string",
              description: "The country of the organization or project in two letter code (ISO 3166-1 alpha-2)"
            },
            visibility: {
              type: "string",
              description: "The visibility of the organization or project in the Green Globe",
              enum: ["Public", "Hidden"]
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationLayer: {
    lexicon: 1,
    id: "app.gainforest.organization.layer",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a layer for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["name", "type", "uri", "createdAt"],
          properties: {
            name: {
              type: "string",
              description: "The name of the site"
            },
            type: {
              type: "string",
              description: "The type of the layer",
              enum: [
                "geojson_points",
                "geojson_points_trees",
                "geojson_line",
                "choropleth",
                "choropleth_shannon",
                "raster_tif",
                "tms_tile"
              ]
            },
            uri: {
              type: "string",
              format: "uri",
              description: "The URI of the layer"
            },
            description: {
              type: "string",
              description: "The description of the layer"
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationObservationsDendogram: {
    lexicon: 1,
    id: "app.gainforest.organization.observations.dendogram",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a dendogram observation for an organization",
        key: "literal:self",
        record: {
          type: "object",
          required: ["dendogram", "createdAt"],
          properties: {
            dendogram: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallBlob",
              description: "An SVG of the dendogram uploaded as blob"
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationObservationsFauna: {
    lexicon: 1,
    id: "app.gainforest.organization.observations.fauna",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a fauna observation for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["gbifTaxonKeys", "createdAt"],
          properties: {
            gbifTaxonKeys: {
              type: "array",
              description: "An array of GBIF taxon keys for each fauna observation",
              items: {
                type: "string",
                description: "The GBIF taxon key of the fauna observation"
              }
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationObservationsFlora: {
    lexicon: 1,
    id: "app.gainforest.organization.observations.flora",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a flora observation for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["gbifTaxonKeys", "createdAt"],
          properties: {
            gbifTaxonKeys: {
              type: "array",
              description: "An array of GBIF taxon keys for each flora observation",
              items: {
                type: "string",
                description: "The GBIF taxon key of the flora observation"
              }
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationObservationsMeasuredTreesCluster: {
    lexicon: 1,
    id: "app.gainforest.organization.observations.measuredTreesCluster",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a measured trees cluster for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["shapefile", "createdAt"],
          properties: {
            shapefile: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallBlob",
              description: "A blob pointing to a shapefile of the measured trees cluster"
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationPredictionsFauna: {
    lexicon: 1,
    id: "app.gainforest.organization.predictions.fauna",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a fauna prediction for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["gbifTaxonKeys", "createdAt"],
          properties: {
            gbifTaxonKeys: {
              type: "array",
              description: "An array of GBIF taxon keys for each fauna prediction",
              items: {
                type: "string",
                description: "The GBIF taxon key of the fauna prediction"
              }
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationPredictionsFlora: {
    lexicon: 1,
    id: "app.gainforest.organization.predictions.flora",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a flora prediction for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["gbifTaxonKeys", "createdAt"],
          properties: {
            gbifTaxonKeys: {
              type: "array",
              description: "An array of GBIF taxon keys for each flora prediction",
              items: {
                type: "string",
                description: "The GBIF taxon key of the flora prediction"
              }
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  ComAtprotoRepoStrongRef: {
    lexicon: 1,
    id: "com.atproto.repo.strongRef",
    description: "A URI with a content-hash fingerprint.",
    defs: {
      main: {
        type: "object",
        required: ["uri", "cid"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          }
        }
      }
    }
  },
  OrgHypercertsClaimActivity: {
    lexicon: 1,
    id: "org.hypercerts.claim.activity",
    defs: {
      main: {
        type: "record",
        description: "A hypercert record tracking impact work.",
        key: "any",
        record: {
          type: "object",
          required: [
            "title",
            "shortDescription",
            "createdAt",
            "startDate",
            "endDate"
          ],
          properties: {
            title: {
              type: "string",
              description: "Title of the hypercert.",
              maxLength: 256
            },
            shortDescription: {
              type: "string",
              description: "Short blurb of the impact work done.",
              maxLength: 3e3,
              maxGraphemes: 300
            },
            description: {
              type: "string",
              description: "Optional longer description of the impact work done.",
              maxLength: 3e4,
              maxGraphemes: 3e3
            },
            image: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallImage"
              ],
              description: "The hypercert visual representation as a URI or image blob."
            },
            workScope: {
              type: "ref",
              ref: "lex:org.hypercerts.claim.activity#workScope"
            },
            startDate: {
              type: "string",
              format: "datetime",
              description: "When the work began"
            },
            endDate: {
              type: "string",
              format: "datetime",
              description: "When the work ended"
            },
            contributions: {
              type: "array",
              description: "A strong reference to the contributions done to create the impact in the hypercerts. The record referenced must conform with the lexicon org.hypercerts.claim.contribution.",
              items: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              }
            },
            rights: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the rights that this hypercert has. The record referenced must conform with the lexicon org.hypercerts.claim.rights."
            },
            locations: {
              type: "array",
              description: "An array of strong references to the location where activity was performed. The record referenced must conform with the lexicon app.certified.location.",
              items: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              }
            },
            project: {
              type: "string",
              format: "at-uri",
              description: "A reference (AT-URI) to the project record that this activity is part of. The record referenced must conform with the lexicon org.hypercerts.claim.project. This activity must also be referenced by the project, establishing a bidirectional link."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      },
      workScope: {
        type: "object",
        description: "Logical scope of the work using label-based conditions. All labels in `withinAllOf` must apply; at least one label in `withinAnyOf` must apply if provided; no label in `withinNoneOf` may apply.",
        properties: {
          withinAllOf: {
            type: "array",
            description: "Labels that MUST all hold for the scope to apply.",
            items: {
              type: "string"
            },
            maxLength: 100
          },
          withinAnyOf: {
            type: "array",
            description: "Labels of which AT LEAST ONE must hold (optional). If omitted or empty, imposes no additional condition.",
            items: {
              type: "string"
            },
            maxLength: 100
          },
          withinNoneOf: {
            type: "array",
            description: "Labels that MUST NOT hold for the scope to apply.",
            items: {
              type: "string"
            },
            maxLength: 100
          }
        }
      },
      activityWeight: {
        type: "object",
        required: ["activity", "weight"],
        properties: {
          activity: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef",
            description: "A strong reference to a hypercert activity record. This activity must conform to the lexicon org.hypercerts.claim.activity"
          },
          weight: {
            type: "string",
            description: "The relative weight/importance of this hypercert activity (stored as a string to avoid float precision issues). Weights can be any positive numeric values and do not need to sum to a specific total; normalization can be performed by the consuming application as needed."
          }
        }
      }
    }
  },
  OrgHypercertsClaimCollection: {
    lexicon: 1,
    id: "org.hypercerts.claim.collection",
    defs: {
      main: {
        type: "record",
        description: "A collection/group of hypercerts that have a specific property.",
        key: "tid",
        record: {
          type: "object",
          required: ["title", "activities", "createdAt"],
          properties: {
            title: {
              type: "string",
              description: "The title of this collection",
              maxLength: 800,
              maxGraphemes: 80
            },
            shortDescription: {
              type: "string",
              maxLength: 3e3,
              maxGraphemes: 300,
              description: "A short description of this collection"
            },
            avatar: {
              type: "blob",
              description: "Primary avatar image representing this collection across apps and views; typically a square image.",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            coverPhoto: {
              type: "blob",
              description: "The cover photo of this collection.",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            activities: {
              type: "array",
              description: "Array of activities with their associated weights in this collection",
              items: {
                type: "ref",
                ref: "lex:org.hypercerts.claim.activity#activityWeight"
              }
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimContribution: {
    lexicon: 1,
    id: "org.hypercerts.claim.contribution",
    defs: {
      main: {
        type: "record",
        description: "A contribution made toward a hypercert's impact.",
        key: "tid",
        record: {
          type: "object",
          required: ["contributors", "createdAt"],
          properties: {
            role: {
              type: "string",
              description: "Role or title of the contributor(s).",
              maxLength: 100
            },
            contributors: {
              type: "array",
              description: "List of the contributors (names, pseudonyms, or DIDs). If multiple contributors are stored in the same hypercertContribution, then they would have the exact same role.",
              items: {
                type: "string"
              }
            },
            description: {
              type: "string",
              description: "What the contribution concretely achieved",
              maxLength: 2e3,
              maxGraphemes: 500
            },
            startDate: {
              type: "string",
              format: "datetime",
              description: "When this contribution started. This should be a subset of the hypercert timeframe."
            },
            endDate: {
              type: "string",
              format: "datetime",
              description: "When this contribution finished.  This should be a subset of the hypercert timeframe."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimEvaluation: {
    lexicon: 1,
    id: "org.hypercerts.claim.evaluation",
    defs: {
      score: {
        type: "object",
        description: "Overall score for an evaluation on a numeric scale.",
        required: ["min", "max", "value"],
        properties: {
          min: {
            type: "integer",
            description: "Minimum value of the scale, e.g. 0 or 1."
          },
          max: {
            type: "integer",
            description: "Maximum value of the scale, e.g. 5 or 10."
          },
          value: {
            type: "integer",
            description: "Score within the inclusive range [min, max]."
          }
        }
      },
      main: {
        type: "record",
        description: "An evaluation of a hypercert record (e.g. an activity and its impact).",
        key: "tid",
        record: {
          type: "object",
          required: ["evaluators", "summary", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to what is being evaluated. (e.g activity, measurement, contribution, etc.)"
            },
            evaluators: {
              type: "array",
              description: "DIDs of the evaluators",
              items: {
                type: "ref",
                ref: "lex:app.certified.defs#did"
              },
              maxLength: 1e3
            },
            content: {
              type: "array",
              description: "Evaluation data (URIs or blobs) containing detailed reports or methodology",
              items: {
                type: "union",
                refs: [
                  "lex:org.hypercerts.defs#uri",
                  "lex:org.hypercerts.defs#smallBlob"
                ]
              },
              maxLength: 100
            },
            measurements: {
              type: "array",
              description: "Optional references to the measurements that contributed to this evaluation. The record(s) referenced must conform with the lexicon org.hypercerts.claim.measurement ",
              items: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              maxLength: 100
            },
            summary: {
              type: "string",
              description: "Brief evaluation summary",
              maxLength: 5e3,
              maxGraphemes: 1e3
            },
            score: {
              type: "ref",
              ref: "lex:org.hypercerts.claim.evaluation#score",
              description: "Optional overall score for this evaluation on a numeric scale."
            },
            location: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "An optional reference for georeferenced evaluations. The record referenced must conform with the lexicon app.certified.location."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimEvidence: {
    lexicon: 1,
    id: "org.hypercerts.claim.evidence",
    defs: {
      main: {
        type: "record",
        description: "A piece of evidence related to a hypercert record (e.g. an activity, project, claim, or evaluation). Evidence may support, clarify, or challenge the referenced subject.",
        key: "tid",
        record: {
          type: "object",
          required: ["content", "title", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the record this evidence relates to (e.g. an activity, project, claim, or evaluation)."
            },
            content: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallBlob"
              ],
              description: "A piece of evidence (URI or blob) related to the subject record; it may support, clarify, or challenge a hypercert claim."
            },
            title: {
              type: "string",
              maxLength: 256,
              description: "Title to describe the nature of the evidence."
            },
            shortDescription: {
              type: "string",
              maxLength: 3e3,
              maxGraphemes: 300,
              description: "Short description explaining what this evidence shows."
            },
            description: {
              type: "string",
              description: "Longer description describing the evidence in more detail.",
              maxLength: 3e4,
              maxGraphemes: 3e3
            },
            relationType: {
              type: "string",
              description: "How this evidence relates to the subject.",
              knownValues: ["supports", "challenges", "clarifies"]
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimMeasurement: {
    lexicon: 1,
    id: "org.hypercerts.claim.measurement",
    defs: {
      main: {
        type: "record",
        description: "Measurement data related to a hypercert record (e.g. an activity and its impact).",
        key: "tid",
        record: {
          type: "object",
          required: ["measurers", "metric", "value", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the record this measurement refers to (e.g. an activity, project, or claim)."
            },
            measurers: {
              type: "array",
              description: "DIDs of the entity (or entities) that measured this data",
              items: {
                type: "ref",
                ref: "lex:app.certified.defs#did"
              },
              maxLength: 100
            },
            metric: {
              type: "string",
              description: "The metric being measured",
              maxLength: 500
            },
            value: {
              type: "string",
              description: "The measured value",
              maxLength: 500
            },
            methodType: {
              type: "string",
              description: "Short identifier for the measurement methodology",
              maxLength: 30
            },
            methodURI: {
              type: "string",
              format: "uri",
              description: "URI to methodology documentation, standard protocol, or measurement procedure"
            },
            evidenceURI: {
              type: "array",
              description: "URIs to related evidence or underlying data (e.g. org.hypercerts.claim.evidence records or raw datasets)",
              items: {
                type: "string",
                format: "uri"
              },
              maxLength: 50
            },
            location: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the location where the measurement was taken. The record referenced must conform with the lexicon app.certified.location"
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimProject: {
    lexicon: 1,
    id: "org.hypercerts.claim.project",
    defs: {
      main: {
        type: "record",
        description: "A project that can include multiple activities, each of which may be linked to at most one project.",
        key: "tid",
        record: {
          type: "object",
          required: ["title", "shortDescription", "createdAt"],
          properties: {
            title: {
              type: "string",
              description: "Title of this project",
              maxLength: 800,
              maxGraphemes: 80
            },
            shortDescription: {
              type: "string",
              maxLength: 3e3,
              maxGraphemes: 300,
              description: "Short summary of this project, suitable for previews and list views."
            },
            description: {
              type: "ref",
              ref: "lex:pub.leaflet.pages.linearDocument#main",
              description: "Rich-text description of this project, represented as a Leaflet linear document."
            },
            avatar: {
              type: "blob",
              description: "Primary avatar image representing this project across apps and views; typically a square logo or project identity image.",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            coverPhoto: {
              type: "blob",
              description: "The cover photo of this project.",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            activities: {
              type: "array",
              description: "Array of activities with their associated weights in this project",
              items: {
                type: "ref",
                ref: "lex:org.hypercerts.claim.activity#activityWeight"
              }
            },
            location: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to a location record describing where the work for this project took place. The referenced record must conform to the app.certified.location lexicon."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimRights: {
    lexicon: 1,
    id: "org.hypercerts.claim.rights",
    defs: {
      main: {
        type: "record",
        description: "Describes the rights that a contributor and/or an owner has, such as whether the hypercert can be sold, transferred, and under what conditions.",
        key: "tid",
        record: {
          type: "object",
          required: [
            "rightsName",
            "rightsType",
            "rightsDescription",
            "createdAt"
          ],
          properties: {
            rightsName: {
              type: "string",
              description: "Full name of the rights",
              maxLength: 100
            },
            rightsType: {
              type: "string",
              description: "Short rights identifier for easier search",
              maxLength: 10
            },
            rightsDescription: {
              type: "string",
              description: "Description of the rights of this hypercert"
            },
            attachment: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallBlob"
              ],
              description: "An attachment to define the rights further, e.g. a legal document."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsDefs: {
    lexicon: 1,
    id: "org.hypercerts.defs",
    defs: {
      uri: {
        type: "object",
        required: ["uri"],
        description: "Object containing a URI to external data",
        properties: {
          uri: {
            type: "string",
            format: "uri",
            maxGraphemes: 1024,
            description: "URI to external data"
          }
        }
      },
      smallBlob: {
        type: "object",
        required: ["blob"],
        description: "Object containing a blob to external data",
        properties: {
          blob: {
            type: "blob",
            accept: ["*/*"],
            maxSize: 10485760,
            description: "Blob to external data (up to 10MB)"
          }
        }
      },
      largeBlob: {
        type: "object",
        required: ["blob"],
        description: "Object containing a blob to external data",
        properties: {
          blob: {
            type: "blob",
            accept: ["*/*"],
            maxSize: 104857600,
            description: "Blob to external data (up to 100MB)"
          }
        }
      },
      smallImage: {
        type: "object",
        required: ["image"],
        description: "Object containing a small image",
        properties: {
          image: {
            type: "blob",
            accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            maxSize: 5242880,
            description: "Image (up to 5MB)"
          }
        }
      },
      largeImage: {
        type: "object",
        required: ["image"],
        description: "Object containing a large image",
        properties: {
          image: {
            type: "blob",
            accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            maxSize: 10485760,
            description: "Image (up to 10MB)"
          }
        }
      }
    }
  },
  OrgHypercertsFundingReceipt: {
    lexicon: 1,
    id: "org.hypercerts.funding.receipt",
    defs: {
      main: {
        type: "record",
        description: "Records a funding receipt for a payment from one user to another user. It may be recorded by the recipient, by the sender, or by a third party. The sender may remain anonymous.",
        key: "tid",
        record: {
          type: "object",
          required: ["from", "to", "amount", "currency", "createdAt"],
          properties: {
            from: {
              type: "ref",
              ref: "lex:app.certified.defs#did",
              description: "DID of the sender who transferred the funds. Leave empty if sender wants to stay anonymous."
            },
            to: {
              type: "string",
              description: "The recipient of the funds. Can be identified by DID or a clear-text name."
            },
            amount: {
              type: "string",
              description: "Amount of funding received."
            },
            currency: {
              type: "string",
              description: "Currency of the payment (e.g. EUR, USD, ETH)."
            },
            paymentRail: {
              type: "string",
              description: "How the funds were transferred (e.g. bank_transfer, credit_card, onchain, cash, check, payment_processor)."
            },
            paymentNetwork: {
              type: "string",
              description: "Optional network within the payment rail (e.g. arbitrum, ethereum, sepa, visa, paypal)."
            },
            transactionId: {
              type: "string",
              description: "Identifier of the underlying payment transaction (e.g. bank reference, onchain transaction hash, or processor-specific ID). Use paymentNetwork to specify the network where applicable."
            },
            for: {
              type: "string",
              format: "at-uri",
              description: "Optional reference to the activity, project, or organization this funding relates to."
            },
            notes: {
              type: "string",
              description: "Optional notes or additional context for this funding receipt.",
              maxLength: 500
            },
            occurredAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp when the payment occurred."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this receipt record was created."
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksBlockquote: {
    lexicon: 1,
    id: "pub.leaflet.blocks.blockquote",
    defs: {
      main: {
        type: "object",
        required: ["plaintext"],
        properties: {
          plaintext: {
            type: "string"
          },
          facets: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.richtext.facet"
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksBskyPost: {
    lexicon: 1,
    id: "pub.leaflet.blocks.bskyPost",
    defs: {
      main: {
        type: "object",
        required: ["postRef"],
        properties: {
          postRef: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          }
        }
      }
    }
  },
  PubLeafletBlocksButton: {
    lexicon: 1,
    id: "pub.leaflet.blocks.button",
    defs: {
      main: {
        type: "object",
        required: ["text", "url"],
        properties: {
          text: {
            type: "string"
          },
          url: {
            type: "string",
            format: "uri"
          }
        }
      }
    }
  },
  PubLeafletBlocksCode: {
    lexicon: 1,
    id: "pub.leaflet.blocks.code",
    defs: {
      main: {
        type: "object",
        required: ["plaintext"],
        properties: {
          plaintext: {
            type: "string"
          },
          language: {
            type: "string"
          },
          syntaxHighlightingTheme: {
            type: "string"
          }
        }
      }
    }
  },
  PubLeafletBlocksHeader: {
    lexicon: 1,
    id: "pub.leaflet.blocks.header",
    defs: {
      main: {
        type: "object",
        required: ["plaintext"],
        properties: {
          level: {
            type: "integer",
            minimum: 1,
            maximum: 6
          },
          plaintext: {
            type: "string"
          },
          facets: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.richtext.facet"
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksHorizontalRule: {
    lexicon: 1,
    id: "pub.leaflet.blocks.horizontalRule",
    defs: {
      main: {
        type: "object",
        required: [],
        properties: {}
      }
    }
  },
  PubLeafletBlocksIframe: {
    lexicon: 1,
    id: "pub.leaflet.blocks.iframe",
    defs: {
      main: {
        type: "object",
        required: ["url"],
        properties: {
          url: {
            type: "string",
            format: "uri"
          },
          height: {
            type: "integer",
            minimum: 16,
            maximum: 1600
          }
        }
      }
    }
  },
  PubLeafletBlocksImage: {
    lexicon: 1,
    id: "pub.leaflet.blocks.image",
    defs: {
      main: {
        type: "object",
        required: ["image", "aspectRatio"],
        properties: {
          image: {
            type: "blob",
            accept: ["image/*"],
            maxSize: 1e6
          },
          alt: {
            type: "string",
            description: "Alt text description of the image, for accessibility."
          },
          aspectRatio: {
            type: "ref",
            ref: "lex:pub.leaflet.blocks.image#aspectRatio"
          }
        }
      },
      aspectRatio: {
        type: "object",
        required: ["width", "height"],
        properties: {
          width: {
            type: "integer"
          },
          height: {
            type: "integer"
          }
        }
      }
    }
  },
  PubLeafletBlocksMath: {
    lexicon: 1,
    id: "pub.leaflet.blocks.math",
    defs: {
      main: {
        type: "object",
        required: ["tex"],
        properties: {
          tex: {
            type: "string"
          }
        }
      }
    }
  },
  PubLeafletBlocksPage: {
    lexicon: 1,
    id: "pub.leaflet.blocks.page",
    defs: {
      main: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "string"
          }
        }
      }
    }
  },
  PubLeafletBlocksPoll: {
    lexicon: 1,
    id: "pub.leaflet.blocks.poll",
    defs: {
      main: {
        type: "object",
        required: ["pollRef"],
        properties: {
          pollRef: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          }
        }
      }
    }
  },
  PubLeafletBlocksText: {
    lexicon: 1,
    id: "pub.leaflet.blocks.text",
    defs: {
      main: {
        type: "object",
        required: ["plaintext"],
        properties: {
          plaintext: {
            type: "string"
          },
          textSize: {
            type: "string",
            enum: ["default", "small", "large"]
          },
          facets: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.richtext.facet"
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksUnorderedList: {
    lexicon: 1,
    id: "pub.leaflet.blocks.unorderedList",
    defs: {
      main: {
        type: "object",
        required: ["children"],
        properties: {
          children: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.blocks.unorderedList#listItem"
            }
          }
        }
      },
      listItem: {
        type: "object",
        required: ["content"],
        properties: {
          content: {
            type: "union",
            refs: [
              "lex:pub.leaflet.blocks.text",
              "lex:pub.leaflet.blocks.header",
              "lex:pub.leaflet.blocks.image"
            ]
          },
          children: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.blocks.unorderedList#listItem"
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksWebsite: {
    lexicon: 1,
    id: "pub.leaflet.blocks.website",
    defs: {
      main: {
        type: "object",
        required: ["src"],
        properties: {
          previewImage: {
            type: "blob",
            accept: ["image/*"],
            maxSize: 1e6
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          src: {
            type: "string",
            format: "uri"
          }
        }
      }
    }
  },
  PubLeafletPagesLinearDocument: {
    lexicon: 1,
    id: "pub.leaflet.pages.linearDocument",
    defs: {
      main: {
        type: "object",
        required: ["blocks"],
        properties: {
          id: {
            type: "string"
          },
          blocks: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.pages.linearDocument#block"
            }
          }
        }
      },
      block: {
        type: "object",
        required: ["block"],
        properties: {
          block: {
            type: "union",
            refs: [
              "lex:pub.leaflet.blocks.iframe",
              "lex:pub.leaflet.blocks.text",
              "lex:pub.leaflet.blocks.blockquote",
              "lex:pub.leaflet.blocks.header",
              "lex:pub.leaflet.blocks.image",
              "lex:pub.leaflet.blocks.unorderedList",
              "lex:pub.leaflet.blocks.website",
              "lex:pub.leaflet.blocks.math",
              "lex:pub.leaflet.blocks.code",
              "lex:pub.leaflet.blocks.horizontalRule",
              "lex:pub.leaflet.blocks.bskyPost",
              "lex:pub.leaflet.blocks.page",
              "lex:pub.leaflet.blocks.poll",
              "lex:pub.leaflet.blocks.button"
            ]
          },
          alignment: {
            type: "string",
            knownValues: [
              "lex:pub.leaflet.pages.linearDocument#textAlignLeft",
              "lex:pub.leaflet.pages.linearDocument#textAlignCenter",
              "lex:pub.leaflet.pages.linearDocument#textAlignRight",
              "lex:pub.leaflet.pages.linearDocument#textAlignJustify"
            ]
          }
        }
      },
      textAlignLeft: {
        type: "token"
      },
      textAlignCenter: {
        type: "token"
      },
      textAlignRight: {
        type: "token"
      },
      textAlignJustify: {
        type: "token"
      },
      quote: {
        type: "object",
        required: ["start", "end"],
        properties: {
          start: {
            type: "ref",
            ref: "lex:pub.leaflet.pages.linearDocument#position"
          },
          end: {
            type: "ref",
            ref: "lex:pub.leaflet.pages.linearDocument#position"
          }
        }
      },
      position: {
        type: "object",
        required: ["block", "offset"],
        properties: {
          block: {
            type: "array",
            items: {
              type: "integer"
            }
          },
          offset: {
            type: "integer"
          }
        }
      }
    }
  },
  PubLeafletRichtextFacet: {
    lexicon: 1,
    id: "pub.leaflet.richtext.facet",
    defs: {
      main: {
        type: "object",
        description: "Annotation of a sub-string within rich text.",
        required: ["index", "features"],
        properties: {
          index: {
            type: "ref",
            ref: "lex:pub.leaflet.richtext.facet#byteSlice"
          },
          features: {
            type: "array",
            items: {
              type: "union",
              refs: [
                "lex:pub.leaflet.richtext.facet#link",
                "lex:pub.leaflet.richtext.facet#didMention",
                "lex:pub.leaflet.richtext.facet#atMention",
                "lex:pub.leaflet.richtext.facet#code",
                "lex:pub.leaflet.richtext.facet#highlight",
                "lex:pub.leaflet.richtext.facet#underline",
                "lex:pub.leaflet.richtext.facet#strikethrough",
                "lex:pub.leaflet.richtext.facet#id",
                "lex:pub.leaflet.richtext.facet#bold",
                "lex:pub.leaflet.richtext.facet#italic"
              ]
            }
          }
        }
      },
      byteSlice: {
        type: "object",
        description: "Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets.",
        required: ["byteStart", "byteEnd"],
        properties: {
          byteStart: {
            type: "integer",
            minimum: 0
          },
          byteEnd: {
            type: "integer",
            minimum: 0
          }
        }
      },
      link: {
        type: "object",
        description: "Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL.",
        required: ["uri"],
        properties: {
          uri: {
            type: "string"
          }
        }
      },
      didMention: {
        type: "object",
        description: "Facet feature for mentioning a did.",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did"
          }
        }
      },
      atMention: {
        type: "object",
        description: "Facet feature for mentioning an AT URI.",
        required: ["atURI"],
        properties: {
          atURI: {
            type: "string",
            format: "uri"
          }
        }
      },
      code: {
        type: "object",
        description: "Facet feature for inline code.",
        required: [],
        properties: {}
      },
      highlight: {
        type: "object",
        description: "Facet feature for highlighted text.",
        required: [],
        properties: {}
      },
      underline: {
        type: "object",
        description: "Facet feature for underline markup",
        required: [],
        properties: {}
      },
      strikethrough: {
        type: "object",
        description: "Facet feature for strikethrough markup",
        required: [],
        properties: {}
      },
      id: {
        type: "object",
        description: "Facet feature for an identifier. Used for linking to a segment",
        required: [],
        properties: {
          id: {
            type: "string"
          }
        }
      },
      bold: {
        type: "object",
        description: "Facet feature for bold text",
        required: [],
        properties: {}
      },
      italic: {
        type: "object",
        description: "Facet feature for italic text",
        required: [],
        properties: {}
      }
    }
  }
};
var schemas = Object.values(schemaDict);
var lexicons = new Lexicons(schemas);
function validate(v, id42, hash, requiredType) {
  return (requiredType ? is$typed : maybe$typed)(v, id42, hash) ? lexicons.validate(`${id42}#${hash}`, v) : {
    success: false,
    error: new ValidationError(
      `Must be an object with "${hash === "main" ? id42 : `${id42}#${hash}`}" $type property`
    )
  };
}

// lex-api/types/app/certified/badge/award.ts
var award_exports = {};
__export(award_exports, {
  isMain: () => isMain,
  isRecord: () => isMain,
  validateMain: () => validateMain,
  validateRecord: () => validateMain
});
var is$typed2 = is$typed;
var validate2 = validate;
var id = "app.certified.badge.award";
var hashMain = "main";
function isMain(v) {
  return is$typed2(v, id, hashMain);
}
function validateMain(v) {
  return validate2(v, id, hashMain, true);
}

// lex-api/types/app/certified/badge/definition.ts
var definition_exports = {};
__export(definition_exports, {
  isMain: () => isMain2,
  isRecord: () => isMain2,
  validateMain: () => validateMain2,
  validateRecord: () => validateMain2
});
var is$typed3 = is$typed;
var validate3 = validate;
var id2 = "app.certified.badge.definition";
var hashMain2 = "main";
function isMain2(v) {
  return is$typed3(v, id2, hashMain2);
}
function validateMain2(v) {
  return validate3(v, id2, hashMain2, true);
}

// lex-api/types/app/certified/badge/response.ts
var response_exports = {};
__export(response_exports, {
  isMain: () => isMain3,
  isRecord: () => isMain3,
  validateMain: () => validateMain3,
  validateRecord: () => validateMain3
});
var is$typed4 = is$typed;
var validate4 = validate;
var id3 = "app.certified.badge.response";
var hashMain3 = "main";
function isMain3(v) {
  return is$typed4(v, id3, hashMain3);
}
function validateMain3(v) {
  return validate4(v, id3, hashMain3, true);
}

// lex-api/types/app/certified/defs.ts
var defs_exports = {};

// lex-api/types/app/certified/location.ts
var location_exports = {};
__export(location_exports, {
  isMain: () => isMain4,
  isRecord: () => isMain4,
  validateMain: () => validateMain4,
  validateRecord: () => validateMain4
});
var is$typed5 = is$typed;
var validate5 = validate;
var id4 = "app.certified.location";
var hashMain4 = "main";
function isMain4(v) {
  return is$typed5(v, id4, hashMain4);
}
function validateMain4(v) {
  return validate5(v, id4, hashMain4, true);
}

// lex-api/types/app/gainforest/common/defs.ts
var defs_exports2 = {};
__export(defs_exports2, {
  isIndexedOrganization: () => isIndexedOrganization,
  isLargeBlob: () => isLargeBlob,
  isLargeImage: () => isLargeImage,
  isSmallBlob: () => isSmallBlob,
  isSmallImage: () => isSmallImage,
  isUri: () => isUri,
  validateIndexedOrganization: () => validateIndexedOrganization,
  validateLargeBlob: () => validateLargeBlob,
  validateLargeImage: () => validateLargeImage,
  validateSmallBlob: () => validateSmallBlob,
  validateSmallImage: () => validateSmallImage,
  validateUri: () => validateUri
});
var is$typed6 = is$typed;
var validate6 = validate;
var id5 = "app.gainforest.common.defs";
var hashUri = "uri";
function isUri(v) {
  return is$typed6(v, id5, hashUri);
}
function validateUri(v) {
  return validate6(v, id5, hashUri);
}
var hashSmallBlob = "smallBlob";
function isSmallBlob(v) {
  return is$typed6(v, id5, hashSmallBlob);
}
function validateSmallBlob(v) {
  return validate6(v, id5, hashSmallBlob);
}
var hashLargeBlob = "largeBlob";
function isLargeBlob(v) {
  return is$typed6(v, id5, hashLargeBlob);
}
function validateLargeBlob(v) {
  return validate6(v, id5, hashLargeBlob);
}
var hashSmallImage = "smallImage";
function isSmallImage(v) {
  return is$typed6(v, id5, hashSmallImage);
}
function validateSmallImage(v) {
  return validate6(v, id5, hashSmallImage);
}
var hashLargeImage = "largeImage";
function isLargeImage(v) {
  return is$typed6(v, id5, hashLargeImage);
}
function validateLargeImage(v) {
  return validate6(v, id5, hashLargeImage);
}
var hashIndexedOrganization = "indexedOrganization";
function isIndexedOrganization(v) {
  return is$typed6(v, id5, hashIndexedOrganization);
}
function validateIndexedOrganization(v) {
  return validate6(v, id5, hashIndexedOrganization);
}

// lex-api/types/app/gainforest/organization/defaultSite.ts
var defaultSite_exports = {};
__export(defaultSite_exports, {
  isMain: () => isMain5,
  isRecord: () => isMain5,
  validateMain: () => validateMain5,
  validateRecord: () => validateMain5
});
var is$typed7 = is$typed;
var validate7 = validate;
var id6 = "app.gainforest.organization.defaultSite";
var hashMain5 = "main";
function isMain5(v) {
  return is$typed7(v, id6, hashMain5);
}
function validateMain5(v) {
  return validate7(v, id6, hashMain5, true);
}

// lex-api/types/app/gainforest/organization/getIndexedOrganizations.ts
var getIndexedOrganizations_exports = {};
__export(getIndexedOrganizations_exports, {
  toKnownErr: () => toKnownErr
});
function toKnownErr(e) {
  return e;
}

// lex-api/types/app/gainforest/organization/info.ts
var info_exports = {};
__export(info_exports, {
  isMain: () => isMain6,
  isRecord: () => isMain6,
  validateMain: () => validateMain6,
  validateRecord: () => validateMain6
});
var is$typed8 = is$typed;
var validate8 = validate;
var id7 = "app.gainforest.organization.info";
var hashMain6 = "main";
function isMain6(v) {
  return is$typed8(v, id7, hashMain6);
}
function validateMain6(v) {
  return validate8(v, id7, hashMain6, true);
}

// lex-api/types/app/gainforest/organization/layer.ts
var layer_exports = {};
__export(layer_exports, {
  isMain: () => isMain7,
  isRecord: () => isMain7,
  validateMain: () => validateMain7,
  validateRecord: () => validateMain7
});
var is$typed9 = is$typed;
var validate9 = validate;
var id8 = "app.gainforest.organization.layer";
var hashMain7 = "main";
function isMain7(v) {
  return is$typed9(v, id8, hashMain7);
}
function validateMain7(v) {
  return validate9(v, id8, hashMain7, true);
}

// lex-api/types/app/gainforest/organization/observations/dendogram.ts
var dendogram_exports = {};
__export(dendogram_exports, {
  isMain: () => isMain8,
  isRecord: () => isMain8,
  validateMain: () => validateMain8,
  validateRecord: () => validateMain8
});
var is$typed10 = is$typed;
var validate10 = validate;
var id9 = "app.gainforest.organization.observations.dendogram";
var hashMain8 = "main";
function isMain8(v) {
  return is$typed10(v, id9, hashMain8);
}
function validateMain8(v) {
  return validate10(v, id9, hashMain8, true);
}

// lex-api/types/app/gainforest/organization/observations/fauna.ts
var fauna_exports = {};
__export(fauna_exports, {
  isMain: () => isMain9,
  isRecord: () => isMain9,
  validateMain: () => validateMain9,
  validateRecord: () => validateMain9
});
var is$typed11 = is$typed;
var validate11 = validate;
var id10 = "app.gainforest.organization.observations.fauna";
var hashMain9 = "main";
function isMain9(v) {
  return is$typed11(v, id10, hashMain9);
}
function validateMain9(v) {
  return validate11(v, id10, hashMain9, true);
}

// lex-api/types/app/gainforest/organization/observations/flora.ts
var flora_exports = {};
__export(flora_exports, {
  isMain: () => isMain10,
  isRecord: () => isMain10,
  validateMain: () => validateMain10,
  validateRecord: () => validateMain10
});
var is$typed12 = is$typed;
var validate12 = validate;
var id11 = "app.gainforest.organization.observations.flora";
var hashMain10 = "main";
function isMain10(v) {
  return is$typed12(v, id11, hashMain10);
}
function validateMain10(v) {
  return validate12(v, id11, hashMain10, true);
}

// lex-api/types/app/gainforest/organization/observations/measuredTreesCluster.ts
var measuredTreesCluster_exports = {};
__export(measuredTreesCluster_exports, {
  isMain: () => isMain11,
  isRecord: () => isMain11,
  validateMain: () => validateMain11,
  validateRecord: () => validateMain11
});
var is$typed13 = is$typed;
var validate13 = validate;
var id12 = "app.gainforest.organization.observations.measuredTreesCluster";
var hashMain11 = "main";
function isMain11(v) {
  return is$typed13(v, id12, hashMain11);
}
function validateMain11(v) {
  return validate13(v, id12, hashMain11, true);
}

// lex-api/types/app/gainforest/organization/predictions/fauna.ts
var fauna_exports2 = {};
__export(fauna_exports2, {
  isMain: () => isMain12,
  isRecord: () => isMain12,
  validateMain: () => validateMain12,
  validateRecord: () => validateMain12
});
var is$typed14 = is$typed;
var validate14 = validate;
var id13 = "app.gainforest.organization.predictions.fauna";
var hashMain12 = "main";
function isMain12(v) {
  return is$typed14(v, id13, hashMain12);
}
function validateMain12(v) {
  return validate14(v, id13, hashMain12, true);
}

// lex-api/types/app/gainforest/organization/predictions/flora.ts
var flora_exports2 = {};
__export(flora_exports2, {
  isMain: () => isMain13,
  isRecord: () => isMain13,
  validateMain: () => validateMain13,
  validateRecord: () => validateMain13
});
var is$typed15 = is$typed;
var validate15 = validate;
var id14 = "app.gainforest.organization.predictions.flora";
var hashMain13 = "main";
function isMain13(v) {
  return is$typed15(v, id14, hashMain13);
}
function validateMain13(v) {
  return validate15(v, id14, hashMain13, true);
}

// lex-api/types/com/atproto/repo/strongRef.ts
var strongRef_exports = {};
__export(strongRef_exports, {
  isMain: () => isMain14,
  validateMain: () => validateMain14
});
var is$typed16 = is$typed;
var validate16 = validate;
var id15 = "com.atproto.repo.strongRef";
var hashMain14 = "main";
function isMain14(v) {
  return is$typed16(v, id15, hashMain14);
}
function validateMain14(v) {
  return validate16(v, id15, hashMain14);
}

// lex-api/types/org/hypercerts/claim/activity.ts
var activity_exports = {};
__export(activity_exports, {
  isActivityWeight: () => isActivityWeight,
  isMain: () => isMain15,
  isRecord: () => isMain15,
  isWorkScope: () => isWorkScope,
  validateActivityWeight: () => validateActivityWeight,
  validateMain: () => validateMain15,
  validateRecord: () => validateMain15,
  validateWorkScope: () => validateWorkScope
});
var is$typed17 = is$typed;
var validate17 = validate;
var id16 = "org.hypercerts.claim.activity";
var hashMain15 = "main";
function isMain15(v) {
  return is$typed17(v, id16, hashMain15);
}
function validateMain15(v) {
  return validate17(v, id16, hashMain15, true);
}
var hashWorkScope = "workScope";
function isWorkScope(v) {
  return is$typed17(v, id16, hashWorkScope);
}
function validateWorkScope(v) {
  return validate17(v, id16, hashWorkScope);
}
var hashActivityWeight = "activityWeight";
function isActivityWeight(v) {
  return is$typed17(v, id16, hashActivityWeight);
}
function validateActivityWeight(v) {
  return validate17(v, id16, hashActivityWeight);
}

// lex-api/types/org/hypercerts/claim/collection.ts
var collection_exports = {};
__export(collection_exports, {
  isMain: () => isMain16,
  isRecord: () => isMain16,
  validateMain: () => validateMain16,
  validateRecord: () => validateMain16
});
var is$typed18 = is$typed;
var validate18 = validate;
var id17 = "org.hypercerts.claim.collection";
var hashMain16 = "main";
function isMain16(v) {
  return is$typed18(v, id17, hashMain16);
}
function validateMain16(v) {
  return validate18(v, id17, hashMain16, true);
}

// lex-api/types/org/hypercerts/claim/contribution.ts
var contribution_exports = {};
__export(contribution_exports, {
  isMain: () => isMain17,
  isRecord: () => isMain17,
  validateMain: () => validateMain17,
  validateRecord: () => validateMain17
});
var is$typed19 = is$typed;
var validate19 = validate;
var id18 = "org.hypercerts.claim.contribution";
var hashMain17 = "main";
function isMain17(v) {
  return is$typed19(v, id18, hashMain17);
}
function validateMain17(v) {
  return validate19(v, id18, hashMain17, true);
}

// lex-api/types/org/hypercerts/claim/evaluation.ts
var evaluation_exports = {};
__export(evaluation_exports, {
  isMain: () => isMain18,
  isRecord: () => isMain18,
  isScore: () => isScore,
  validateMain: () => validateMain18,
  validateRecord: () => validateMain18,
  validateScore: () => validateScore
});
var is$typed20 = is$typed;
var validate20 = validate;
var id19 = "org.hypercerts.claim.evaluation";
var hashScore = "score";
function isScore(v) {
  return is$typed20(v, id19, hashScore);
}
function validateScore(v) {
  return validate20(v, id19, hashScore);
}
var hashMain18 = "main";
function isMain18(v) {
  return is$typed20(v, id19, hashMain18);
}
function validateMain18(v) {
  return validate20(v, id19, hashMain18, true);
}

// lex-api/types/org/hypercerts/claim/evidence.ts
var evidence_exports = {};
__export(evidence_exports, {
  isMain: () => isMain19,
  isRecord: () => isMain19,
  validateMain: () => validateMain19,
  validateRecord: () => validateMain19
});
var is$typed21 = is$typed;
var validate21 = validate;
var id20 = "org.hypercerts.claim.evidence";
var hashMain19 = "main";
function isMain19(v) {
  return is$typed21(v, id20, hashMain19);
}
function validateMain19(v) {
  return validate21(v, id20, hashMain19, true);
}

// lex-api/types/org/hypercerts/claim/measurement.ts
var measurement_exports = {};
__export(measurement_exports, {
  isMain: () => isMain20,
  isRecord: () => isMain20,
  validateMain: () => validateMain20,
  validateRecord: () => validateMain20
});
var is$typed22 = is$typed;
var validate22 = validate;
var id21 = "org.hypercerts.claim.measurement";
var hashMain20 = "main";
function isMain20(v) {
  return is$typed22(v, id21, hashMain20);
}
function validateMain20(v) {
  return validate22(v, id21, hashMain20, true);
}

// lex-api/types/org/hypercerts/claim/project.ts
var project_exports = {};
__export(project_exports, {
  isMain: () => isMain21,
  isRecord: () => isMain21,
  validateMain: () => validateMain21,
  validateRecord: () => validateMain21
});
var is$typed23 = is$typed;
var validate23 = validate;
var id22 = "org.hypercerts.claim.project";
var hashMain21 = "main";
function isMain21(v) {
  return is$typed23(v, id22, hashMain21);
}
function validateMain21(v) {
  return validate23(v, id22, hashMain21, true);
}

// lex-api/types/org/hypercerts/claim/rights.ts
var rights_exports = {};
__export(rights_exports, {
  isMain: () => isMain22,
  isRecord: () => isMain22,
  validateMain: () => validateMain22,
  validateRecord: () => validateMain22
});
var is$typed24 = is$typed;
var validate24 = validate;
var id23 = "org.hypercerts.claim.rights";
var hashMain22 = "main";
function isMain22(v) {
  return is$typed24(v, id23, hashMain22);
}
function validateMain22(v) {
  return validate24(v, id23, hashMain22, true);
}

// lex-api/types/org/hypercerts/defs.ts
var defs_exports3 = {};
__export(defs_exports3, {
  isLargeBlob: () => isLargeBlob2,
  isLargeImage: () => isLargeImage2,
  isSmallBlob: () => isSmallBlob2,
  isSmallImage: () => isSmallImage2,
  isUri: () => isUri2,
  validateLargeBlob: () => validateLargeBlob2,
  validateLargeImage: () => validateLargeImage2,
  validateSmallBlob: () => validateSmallBlob2,
  validateSmallImage: () => validateSmallImage2,
  validateUri: () => validateUri2
});
var is$typed25 = is$typed;
var validate25 = validate;
var id24 = "org.hypercerts.defs";
var hashUri2 = "uri";
function isUri2(v) {
  return is$typed25(v, id24, hashUri2);
}
function validateUri2(v) {
  return validate25(v, id24, hashUri2);
}
var hashSmallBlob2 = "smallBlob";
function isSmallBlob2(v) {
  return is$typed25(v, id24, hashSmallBlob2);
}
function validateSmallBlob2(v) {
  return validate25(v, id24, hashSmallBlob2);
}
var hashLargeBlob2 = "largeBlob";
function isLargeBlob2(v) {
  return is$typed25(v, id24, hashLargeBlob2);
}
function validateLargeBlob2(v) {
  return validate25(v, id24, hashLargeBlob2);
}
var hashSmallImage2 = "smallImage";
function isSmallImage2(v) {
  return is$typed25(v, id24, hashSmallImage2);
}
function validateSmallImage2(v) {
  return validate25(v, id24, hashSmallImage2);
}
var hashLargeImage2 = "largeImage";
function isLargeImage2(v) {
  return is$typed25(v, id24, hashLargeImage2);
}
function validateLargeImage2(v) {
  return validate25(v, id24, hashLargeImage2);
}

// lex-api/types/org/hypercerts/funding/receipt.ts
var receipt_exports = {};
__export(receipt_exports, {
  isMain: () => isMain23,
  isRecord: () => isMain23,
  validateMain: () => validateMain23,
  validateRecord: () => validateMain23
});
var is$typed26 = is$typed;
var validate26 = validate;
var id25 = "org.hypercerts.funding.receipt";
var hashMain23 = "main";
function isMain23(v) {
  return is$typed26(v, id25, hashMain23);
}
function validateMain23(v) {
  return validate26(v, id25, hashMain23, true);
}

// lex-api/types/pub/leaflet/blocks/blockquote.ts
var blockquote_exports = {};
__export(blockquote_exports, {
  isMain: () => isMain24,
  validateMain: () => validateMain24
});
var is$typed27 = is$typed;
var validate27 = validate;
var id26 = "pub.leaflet.blocks.blockquote";
var hashMain24 = "main";
function isMain24(v) {
  return is$typed27(v, id26, hashMain24);
}
function validateMain24(v) {
  return validate27(v, id26, hashMain24);
}

// lex-api/types/pub/leaflet/blocks/bskyPost.ts
var bskyPost_exports = {};
__export(bskyPost_exports, {
  isMain: () => isMain25,
  validateMain: () => validateMain25
});
var is$typed28 = is$typed;
var validate28 = validate;
var id27 = "pub.leaflet.blocks.bskyPost";
var hashMain25 = "main";
function isMain25(v) {
  return is$typed28(v, id27, hashMain25);
}
function validateMain25(v) {
  return validate28(v, id27, hashMain25);
}

// lex-api/types/pub/leaflet/blocks/button.ts
var button_exports = {};
__export(button_exports, {
  isMain: () => isMain26,
  validateMain: () => validateMain26
});
var is$typed29 = is$typed;
var validate29 = validate;
var id28 = "pub.leaflet.blocks.button";
var hashMain26 = "main";
function isMain26(v) {
  return is$typed29(v, id28, hashMain26);
}
function validateMain26(v) {
  return validate29(v, id28, hashMain26);
}

// lex-api/types/pub/leaflet/blocks/code.ts
var code_exports = {};
__export(code_exports, {
  isMain: () => isMain27,
  validateMain: () => validateMain27
});
var is$typed30 = is$typed;
var validate30 = validate;
var id29 = "pub.leaflet.blocks.code";
var hashMain27 = "main";
function isMain27(v) {
  return is$typed30(v, id29, hashMain27);
}
function validateMain27(v) {
  return validate30(v, id29, hashMain27);
}

// lex-api/types/pub/leaflet/blocks/header.ts
var header_exports = {};
__export(header_exports, {
  isMain: () => isMain28,
  validateMain: () => validateMain28
});
var is$typed31 = is$typed;
var validate31 = validate;
var id30 = "pub.leaflet.blocks.header";
var hashMain28 = "main";
function isMain28(v) {
  return is$typed31(v, id30, hashMain28);
}
function validateMain28(v) {
  return validate31(v, id30, hashMain28);
}

// lex-api/types/pub/leaflet/blocks/horizontalRule.ts
var horizontalRule_exports = {};
__export(horizontalRule_exports, {
  isMain: () => isMain29,
  validateMain: () => validateMain29
});
var is$typed32 = is$typed;
var validate32 = validate;
var id31 = "pub.leaflet.blocks.horizontalRule";
var hashMain29 = "main";
function isMain29(v) {
  return is$typed32(v, id31, hashMain29);
}
function validateMain29(v) {
  return validate32(v, id31, hashMain29);
}

// lex-api/types/pub/leaflet/blocks/iframe.ts
var iframe_exports = {};
__export(iframe_exports, {
  isMain: () => isMain30,
  validateMain: () => validateMain30
});
var is$typed33 = is$typed;
var validate33 = validate;
var id32 = "pub.leaflet.blocks.iframe";
var hashMain30 = "main";
function isMain30(v) {
  return is$typed33(v, id32, hashMain30);
}
function validateMain30(v) {
  return validate33(v, id32, hashMain30);
}

// lex-api/types/pub/leaflet/blocks/image.ts
var image_exports = {};
__export(image_exports, {
  isAspectRatio: () => isAspectRatio,
  isMain: () => isMain31,
  validateAspectRatio: () => validateAspectRatio,
  validateMain: () => validateMain31
});
var is$typed34 = is$typed;
var validate34 = validate;
var id33 = "pub.leaflet.blocks.image";
var hashMain31 = "main";
function isMain31(v) {
  return is$typed34(v, id33, hashMain31);
}
function validateMain31(v) {
  return validate34(v, id33, hashMain31);
}
var hashAspectRatio = "aspectRatio";
function isAspectRatio(v) {
  return is$typed34(v, id33, hashAspectRatio);
}
function validateAspectRatio(v) {
  return validate34(v, id33, hashAspectRatio);
}

// lex-api/types/pub/leaflet/blocks/math.ts
var math_exports = {};
__export(math_exports, {
  isMain: () => isMain32,
  validateMain: () => validateMain32
});
var is$typed35 = is$typed;
var validate35 = validate;
var id34 = "pub.leaflet.blocks.math";
var hashMain32 = "main";
function isMain32(v) {
  return is$typed35(v, id34, hashMain32);
}
function validateMain32(v) {
  return validate35(v, id34, hashMain32);
}

// lex-api/types/pub/leaflet/blocks/page.ts
var page_exports = {};
__export(page_exports, {
  isMain: () => isMain33,
  validateMain: () => validateMain33
});
var is$typed36 = is$typed;
var validate36 = validate;
var id35 = "pub.leaflet.blocks.page";
var hashMain33 = "main";
function isMain33(v) {
  return is$typed36(v, id35, hashMain33);
}
function validateMain33(v) {
  return validate36(v, id35, hashMain33);
}

// lex-api/types/pub/leaflet/blocks/poll.ts
var poll_exports = {};
__export(poll_exports, {
  isMain: () => isMain34,
  validateMain: () => validateMain34
});
var is$typed37 = is$typed;
var validate37 = validate;
var id36 = "pub.leaflet.blocks.poll";
var hashMain34 = "main";
function isMain34(v) {
  return is$typed37(v, id36, hashMain34);
}
function validateMain34(v) {
  return validate37(v, id36, hashMain34);
}

// lex-api/types/pub/leaflet/blocks/text.ts
var text_exports = {};
__export(text_exports, {
  isMain: () => isMain35,
  validateMain: () => validateMain35
});
var is$typed38 = is$typed;
var validate38 = validate;
var id37 = "pub.leaflet.blocks.text";
var hashMain35 = "main";
function isMain35(v) {
  return is$typed38(v, id37, hashMain35);
}
function validateMain35(v) {
  return validate38(v, id37, hashMain35);
}

// lex-api/types/pub/leaflet/blocks/unorderedList.ts
var unorderedList_exports = {};
__export(unorderedList_exports, {
  isListItem: () => isListItem,
  isMain: () => isMain36,
  validateListItem: () => validateListItem,
  validateMain: () => validateMain36
});
var is$typed39 = is$typed;
var validate39 = validate;
var id38 = "pub.leaflet.blocks.unorderedList";
var hashMain36 = "main";
function isMain36(v) {
  return is$typed39(v, id38, hashMain36);
}
function validateMain36(v) {
  return validate39(v, id38, hashMain36);
}
var hashListItem = "listItem";
function isListItem(v) {
  return is$typed39(v, id38, hashListItem);
}
function validateListItem(v) {
  return validate39(v, id38, hashListItem);
}

// lex-api/types/pub/leaflet/blocks/website.ts
var website_exports = {};
__export(website_exports, {
  isMain: () => isMain37,
  validateMain: () => validateMain37
});
var is$typed40 = is$typed;
var validate40 = validate;
var id39 = "pub.leaflet.blocks.website";
var hashMain37 = "main";
function isMain37(v) {
  return is$typed40(v, id39, hashMain37);
}
function validateMain37(v) {
  return validate40(v, id39, hashMain37);
}

// lex-api/types/pub/leaflet/pages/linearDocument.ts
var linearDocument_exports = {};
__export(linearDocument_exports, {
  TEXTALIGNCENTER: () => TEXTALIGNCENTER,
  TEXTALIGNJUSTIFY: () => TEXTALIGNJUSTIFY,
  TEXTALIGNLEFT: () => TEXTALIGNLEFT,
  TEXTALIGNRIGHT: () => TEXTALIGNRIGHT,
  isBlock: () => isBlock,
  isMain: () => isMain38,
  isPosition: () => isPosition,
  isQuote: () => isQuote,
  validateBlock: () => validateBlock,
  validateMain: () => validateMain38,
  validatePosition: () => validatePosition,
  validateQuote: () => validateQuote
});
var is$typed41 = is$typed;
var validate41 = validate;
var id40 = "pub.leaflet.pages.linearDocument";
var hashMain38 = "main";
function isMain38(v) {
  return is$typed41(v, id40, hashMain38);
}
function validateMain38(v) {
  return validate41(v, id40, hashMain38);
}
var hashBlock = "block";
function isBlock(v) {
  return is$typed41(v, id40, hashBlock);
}
function validateBlock(v) {
  return validate41(v, id40, hashBlock);
}
var TEXTALIGNLEFT = `${id40}#textAlignLeft`;
var TEXTALIGNCENTER = `${id40}#textAlignCenter`;
var TEXTALIGNRIGHT = `${id40}#textAlignRight`;
var TEXTALIGNJUSTIFY = `${id40}#textAlignJustify`;
var hashQuote = "quote";
function isQuote(v) {
  return is$typed41(v, id40, hashQuote);
}
function validateQuote(v) {
  return validate41(v, id40, hashQuote);
}
var hashPosition = "position";
function isPosition(v) {
  return is$typed41(v, id40, hashPosition);
}
function validatePosition(v) {
  return validate41(v, id40, hashPosition);
}

// lex-api/types/pub/leaflet/richtext/facet.ts
var facet_exports = {};
__export(facet_exports, {
  isAtMention: () => isAtMention,
  isBold: () => isBold,
  isByteSlice: () => isByteSlice,
  isCode: () => isCode,
  isDidMention: () => isDidMention,
  isHighlight: () => isHighlight,
  isId: () => isId,
  isItalic: () => isItalic,
  isLink: () => isLink,
  isMain: () => isMain39,
  isStrikethrough: () => isStrikethrough,
  isUnderline: () => isUnderline,
  validateAtMention: () => validateAtMention,
  validateBold: () => validateBold,
  validateByteSlice: () => validateByteSlice,
  validateCode: () => validateCode,
  validateDidMention: () => validateDidMention,
  validateHighlight: () => validateHighlight,
  validateId: () => validateId,
  validateItalic: () => validateItalic,
  validateLink: () => validateLink,
  validateMain: () => validateMain39,
  validateStrikethrough: () => validateStrikethrough,
  validateUnderline: () => validateUnderline
});
var is$typed42 = is$typed;
var validate42 = validate;
var id41 = "pub.leaflet.richtext.facet";
var hashMain39 = "main";
function isMain39(v) {
  return is$typed42(v, id41, hashMain39);
}
function validateMain39(v) {
  return validate42(v, id41, hashMain39);
}
var hashByteSlice = "byteSlice";
function isByteSlice(v) {
  return is$typed42(v, id41, hashByteSlice);
}
function validateByteSlice(v) {
  return validate42(v, id41, hashByteSlice);
}
var hashLink = "link";
function isLink(v) {
  return is$typed42(v, id41, hashLink);
}
function validateLink(v) {
  return validate42(v, id41, hashLink);
}
var hashDidMention = "didMention";
function isDidMention(v) {
  return is$typed42(v, id41, hashDidMention);
}
function validateDidMention(v) {
  return validate42(v, id41, hashDidMention);
}
var hashAtMention = "atMention";
function isAtMention(v) {
  return is$typed42(v, id41, hashAtMention);
}
function validateAtMention(v) {
  return validate42(v, id41, hashAtMention);
}
var hashCode = "code";
function isCode(v) {
  return is$typed42(v, id41, hashCode);
}
function validateCode(v) {
  return validate42(v, id41, hashCode);
}
var hashHighlight = "highlight";
function isHighlight(v) {
  return is$typed42(v, id41, hashHighlight);
}
function validateHighlight(v) {
  return validate42(v, id41, hashHighlight);
}
var hashUnderline = "underline";
function isUnderline(v) {
  return is$typed42(v, id41, hashUnderline);
}
function validateUnderline(v) {
  return validate42(v, id41, hashUnderline);
}
var hashStrikethrough = "strikethrough";
function isStrikethrough(v) {
  return is$typed42(v, id41, hashStrikethrough);
}
function validateStrikethrough(v) {
  return validate42(v, id41, hashStrikethrough);
}
var hashId = "id";
function isId(v) {
  return is$typed42(v, id41, hashId);
}
function validateId(v) {
  return validate42(v, id41, hashId);
}
var hashBold = "bold";
function isBold(v) {
  return is$typed42(v, id41, hashBold);
}
function validateBold(v) {
  return validate42(v, id41, hashBold);
}
var hashItalic = "italic";
function isItalic(v) {
  return is$typed42(v, id41, hashItalic);
}
function validateItalic(v) {
  return validate42(v, id41, hashItalic);
}

// lex-api/index.ts
var PUB_LEAFLET_PAGES = {
  LinearDocumentTextAlignLeft: "pub.leaflet.pages.linearDocument#textAlignLeft",
  LinearDocumentTextAlignCenter: "pub.leaflet.pages.linearDocument#textAlignCenter",
  LinearDocumentTextAlignRight: "pub.leaflet.pages.linearDocument#textAlignRight",
  LinearDocumentTextAlignJustify: "pub.leaflet.pages.linearDocument#textAlignJustify"
};
var AtpBaseClient = class extends XrpcClient {
  constructor(options) {
    super(options, schemas);
    __publicField(this, "app");
    __publicField(this, "com");
    __publicField(this, "org");
    __publicField(this, "pub");
    this.app = new AppNS(this);
    this.com = new ComNS(this);
    this.org = new OrgNS(this);
    this.pub = new PubNS(this);
  }
  /** @deprecated use `this` instead */
  get xrpc() {
    return this;
  }
};
var AppNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "certified");
    __publicField(this, "gainforest");
    this._client = client;
    this.certified = new AppCertifiedNS(client);
    this.gainforest = new AppGainforestNS(client);
  }
};
var AppCertifiedNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "location");
    __publicField(this, "badge");
    this._client = client;
    this.badge = new AppCertifiedBadgeNS(client);
    this.location = new AppCertifiedLocationRecord(client);
  }
};
var AppCertifiedBadgeNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "award");
    __publicField(this, "definition");
    __publicField(this, "response");
    this._client = client;
    this.award = new AppCertifiedBadgeAwardRecord(client);
    this.definition = new AppCertifiedBadgeDefinitionRecord(client);
    this.response = new AppCertifiedBadgeResponseRecord(client);
  }
};
var AppCertifiedBadgeAwardRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.certified.badge.award",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.certified.badge.award",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.certified.badge.award";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.certified.badge.award";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.certified.badge.award", ...params },
      { headers }
    );
  }
};
var AppCertifiedBadgeDefinitionRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.certified.badge.definition",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.certified.badge.definition",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.certified.badge.definition";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.certified.badge.definition";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.certified.badge.definition", ...params },
      { headers }
    );
  }
};
var AppCertifiedBadgeResponseRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.certified.badge.response",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.certified.badge.response",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.certified.badge.response";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.certified.badge.response";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.certified.badge.response", ...params },
      { headers }
    );
  }
};
var AppCertifiedLocationRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.certified.location",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.certified.location",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.certified.location";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.certified.location";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.certified.location", ...params },
      { headers }
    );
  }
};
var AppGainforestNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "organization");
    this._client = client;
    this.organization = new AppGainforestOrganizationNS(client);
  }
};
var AppGainforestOrganizationNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "defaultSite");
    __publicField(this, "info");
    __publicField(this, "layer");
    __publicField(this, "observations");
    __publicField(this, "predictions");
    this._client = client;
    this.observations = new AppGainforestOrganizationObservationsNS(client);
    this.predictions = new AppGainforestOrganizationPredictionsNS(client);
    this.defaultSite = new AppGainforestOrganizationDefaultSiteRecord(client);
    this.info = new AppGainforestOrganizationInfoRecord(client);
    this.layer = new AppGainforestOrganizationLayerRecord(client);
  }
  getIndexedOrganizations(params, opts) {
    return this._client.call(
      "app.gainforest.organization.getIndexedOrganizations",
      params,
      void 0,
      opts
    );
  }
};
var AppGainforestOrganizationObservationsNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "dendogram");
    __publicField(this, "fauna");
    __publicField(this, "flora");
    __publicField(this, "measuredTreesCluster");
    this._client = client;
    this.dendogram = new AppGainforestOrganizationObservationsDendogramRecord(
      client
    );
    this.fauna = new AppGainforestOrganizationObservationsFaunaRecord(client);
    this.flora = new AppGainforestOrganizationObservationsFloraRecord(client);
    this.measuredTreesCluster = new AppGainforestOrganizationObservationsMeasuredTreesClusterRecord(
      client
    );
  }
};
var AppGainforestOrganizationObservationsDendogramRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.observations.dendogram",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.observations.dendogram",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.observations.dendogram";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      {
        collection,
        rkey: "self",
        ...params,
        record: { ...record, $type: collection }
      },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.observations.dendogram";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.observations.dendogram",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationObservationsFaunaRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.observations.fauna",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.observations.fauna",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.observations.fauna";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.observations.fauna";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.observations.fauna",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationObservationsFloraRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.observations.flora",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.observations.flora",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.observations.flora";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.observations.flora";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.observations.flora",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationObservationsMeasuredTreesClusterRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.observations.measuredTreesCluster",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.observations.measuredTreesCluster",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.observations.measuredTreesCluster";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.observations.measuredTreesCluster";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.observations.measuredTreesCluster",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationPredictionsNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "fauna");
    __publicField(this, "flora");
    this._client = client;
    this.fauna = new AppGainforestOrganizationPredictionsFaunaRecord(client);
    this.flora = new AppGainforestOrganizationPredictionsFloraRecord(client);
  }
};
var AppGainforestOrganizationPredictionsFaunaRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.predictions.fauna",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.predictions.fauna",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.predictions.fauna";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.predictions.fauna";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.predictions.fauna",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationPredictionsFloraRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.predictions.flora",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.predictions.flora",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.predictions.flora";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.predictions.flora";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.predictions.flora",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationDefaultSiteRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.defaultSite",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.defaultSite",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.defaultSite";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      {
        collection,
        rkey: "self",
        ...params,
        record: { ...record, $type: collection }
      },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.defaultSite";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.gainforest.organization.defaultSite", ...params },
      { headers }
    );
  }
};
var AppGainforestOrganizationInfoRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.info",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.info",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.info";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      {
        collection,
        rkey: "self",
        ...params,
        record: { ...record, $type: collection }
      },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.info";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.gainforest.organization.info", ...params },
      { headers }
    );
  }
};
var AppGainforestOrganizationLayerRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.layer",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.layer",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.layer";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.layer";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.gainforest.organization.layer", ...params },
      { headers }
    );
  }
};
var ComNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "atproto");
    this._client = client;
    this.atproto = new ComAtprotoNS(client);
  }
};
var ComAtprotoNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "repo");
    this._client = client;
    this.repo = new ComAtprotoRepoNS(client);
  }
};
var ComAtprotoRepoNS = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
};
var OrgNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "hypercerts");
    this._client = client;
    this.hypercerts = new OrgHypercertsNS(client);
  }
};
var OrgHypercertsNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "claim");
    __publicField(this, "funding");
    this._client = client;
    this.claim = new OrgHypercertsClaimNS(client);
    this.funding = new OrgHypercertsFundingNS(client);
  }
};
var OrgHypercertsClaimNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "activity");
    __publicField(this, "collection");
    __publicField(this, "contribution");
    __publicField(this, "evaluation");
    __publicField(this, "evidence");
    __publicField(this, "measurement");
    __publicField(this, "project");
    __publicField(this, "rights");
    this._client = client;
    this.activity = new OrgHypercertsClaimActivityRecord(client);
    this.collection = new OrgHypercertsClaimCollectionRecord(client);
    this.contribution = new OrgHypercertsClaimContributionRecord(client);
    this.evaluation = new OrgHypercertsClaimEvaluationRecord(client);
    this.evidence = new OrgHypercertsClaimEvidenceRecord(client);
    this.measurement = new OrgHypercertsClaimMeasurementRecord(client);
    this.project = new OrgHypercertsClaimProjectRecord(client);
    this.rights = new OrgHypercertsClaimRightsRecord(client);
  }
};
var OrgHypercertsClaimActivityRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.activity",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.activity",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.activity";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.activity";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.activity", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimCollectionRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.collection",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.collection",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.collection";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.collection";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.collection", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimContributionRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.contribution",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.contribution",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.contribution";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.contribution";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.contribution", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimEvaluationRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.evaluation",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.evaluation",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.evaluation";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.evaluation";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.evaluation", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimEvidenceRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.evidence",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.evidence",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.evidence";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.evidence";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.evidence", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimMeasurementRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.measurement",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.measurement",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.measurement";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.measurement";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.measurement", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimProjectRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.project",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.project",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.project";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.project";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.project", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimRightsRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.rights",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.rights",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.rights";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.rights";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.rights", ...params },
      { headers }
    );
  }
};
var OrgHypercertsFundingNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "receipt");
    this._client = client;
    this.receipt = new OrgHypercertsFundingReceiptRecord(client);
  }
};
var OrgHypercertsFundingReceiptRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.funding.receipt",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.funding.receipt",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.funding.receipt";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.funding.receipt";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.funding.receipt", ...params },
      { headers }
    );
  }
};
var PubNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "leaflet");
    this._client = client;
    this.leaflet = new PubLeafletNS(client);
  }
};
var PubLeafletNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "blocks");
    __publicField(this, "pages");
    __publicField(this, "richtext");
    this._client = client;
    this.blocks = new PubLeafletBlocksNS(client);
    this.pages = new PubLeafletPagesNS(client);
    this.richtext = new PubLeafletRichtextNS(client);
  }
};
var PubLeafletBlocksNS = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
};
var PubLeafletPagesNS = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
};
var PubLeafletRichtextNS = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
};

export { award_exports as AppCertifiedBadgeAward, AppCertifiedBadgeAwardRecord, definition_exports as AppCertifiedBadgeDefinition, AppCertifiedBadgeDefinitionRecord, AppCertifiedBadgeNS, response_exports as AppCertifiedBadgeResponse, AppCertifiedBadgeResponseRecord, defs_exports as AppCertifiedDefs, location_exports as AppCertifiedLocation, AppCertifiedLocationRecord, AppCertifiedNS, defs_exports2 as AppGainforestCommonDefs, AppGainforestNS, defaultSite_exports as AppGainforestOrganizationDefaultSite, AppGainforestOrganizationDefaultSiteRecord, getIndexedOrganizations_exports as AppGainforestOrganizationGetIndexedOrganizations, info_exports as AppGainforestOrganizationInfo, AppGainforestOrganizationInfoRecord, layer_exports as AppGainforestOrganizationLayer, AppGainforestOrganizationLayerRecord, AppGainforestOrganizationNS, dendogram_exports as AppGainforestOrganizationObservationsDendogram, AppGainforestOrganizationObservationsDendogramRecord, fauna_exports as AppGainforestOrganizationObservationsFauna, AppGainforestOrganizationObservationsFaunaRecord, flora_exports as AppGainforestOrganizationObservationsFlora, AppGainforestOrganizationObservationsFloraRecord, measuredTreesCluster_exports as AppGainforestOrganizationObservationsMeasuredTreesCluster, AppGainforestOrganizationObservationsMeasuredTreesClusterRecord, AppGainforestOrganizationObservationsNS, fauna_exports2 as AppGainforestOrganizationPredictionsFauna, AppGainforestOrganizationPredictionsFaunaRecord, flora_exports2 as AppGainforestOrganizationPredictionsFlora, AppGainforestOrganizationPredictionsFloraRecord, AppGainforestOrganizationPredictionsNS, AppNS, AtpBaseClient, ComAtprotoNS, ComAtprotoRepoNS, strongRef_exports as ComAtprotoRepoStrongRef, ComNS, activity_exports as OrgHypercertsClaimActivity, OrgHypercertsClaimActivityRecord, collection_exports as OrgHypercertsClaimCollection, OrgHypercertsClaimCollectionRecord, contribution_exports as OrgHypercertsClaimContribution, OrgHypercertsClaimContributionRecord, evaluation_exports as OrgHypercertsClaimEvaluation, OrgHypercertsClaimEvaluationRecord, evidence_exports as OrgHypercertsClaimEvidence, OrgHypercertsClaimEvidenceRecord, measurement_exports as OrgHypercertsClaimMeasurement, OrgHypercertsClaimMeasurementRecord, OrgHypercertsClaimNS, project_exports as OrgHypercertsClaimProject, OrgHypercertsClaimProjectRecord, rights_exports as OrgHypercertsClaimRights, OrgHypercertsClaimRightsRecord, defs_exports3 as OrgHypercertsDefs, OrgHypercertsFundingNS, receipt_exports as OrgHypercertsFundingReceipt, OrgHypercertsFundingReceiptRecord, OrgHypercertsNS, OrgNS, PUB_LEAFLET_PAGES, blockquote_exports as PubLeafletBlocksBlockquote, bskyPost_exports as PubLeafletBlocksBskyPost, button_exports as PubLeafletBlocksButton, code_exports as PubLeafletBlocksCode, header_exports as PubLeafletBlocksHeader, horizontalRule_exports as PubLeafletBlocksHorizontalRule, iframe_exports as PubLeafletBlocksIframe, image_exports as PubLeafletBlocksImage, math_exports as PubLeafletBlocksMath, PubLeafletBlocksNS, page_exports as PubLeafletBlocksPage, poll_exports as PubLeafletBlocksPoll, text_exports as PubLeafletBlocksText, unorderedList_exports as PubLeafletBlocksUnorderedList, website_exports as PubLeafletBlocksWebsite, PubLeafletNS, linearDocument_exports as PubLeafletPagesLinearDocument, PubLeafletPagesNS, facet_exports as PubLeafletRichtextFacet, PubLeafletRichtextNS, PubNS };
//# sourceMappingURL=lex-api.js.map
//# sourceMappingURL=lex-api.js.map