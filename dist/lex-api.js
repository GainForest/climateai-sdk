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
function is$type($type, id53, hash) {
  return hash === "main" ? $type === id53 : (
    // $type === `${id}#${hash}`
    typeof $type === "string" && $type.length === id53.length + 1 + hash.length && $type.charCodeAt(id53.length) === 35 && $type.startsWith(id53) && $type.endsWith(hash)
  );
}
function is$typed(v, id53, hash) {
  return isObject(v) && "$type" in v && is$type(v.$type, id53, hash);
}
function maybe$typed(v, id53, hash) {
  return isObject(v) && ("$type" in v ? v.$type === void 0 || is$type(v.$type, id53, hash) : true);
}

// lex-api/lexicons.ts
var schemaDict = {
  AppBskyRichtextFacet: {
    lexicon: 1,
    id: "app.bsky.richtext.facet",
    defs: {
      main: {
        type: "object",
        description: "Annotation of a sub-string within rich text.",
        required: ["index", "features"],
        properties: {
          index: {
            type: "ref",
            ref: "lex:app.bsky.richtext.facet#byteSlice"
          },
          features: {
            type: "array",
            items: {
              type: "union",
              refs: [
                "lex:app.bsky.richtext.facet#mention",
                "lex:app.bsky.richtext.facet#link",
                "lex:app.bsky.richtext.facet#tag"
              ]
            }
          }
        }
      },
      mention: {
        type: "object",
        description: "Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID.",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did"
          }
        }
      },
      link: {
        type: "object",
        description: "Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL.",
        required: ["uri"],
        properties: {
          uri: {
            type: "string",
            format: "uri"
          }
        }
      },
      tag: {
        type: "object",
        description: "Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags').",
        required: ["tag"],
        properties: {
          tag: {
            type: "string",
            maxLength: 640,
            maxGraphemes: 64
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
      }
    }
  },
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
        type: "object",
        description: "A Decentralized Identifier (DID) string.",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did",
            description: "The DID string value.",
            maxLength: 256
          }
        }
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
                "lex:org.hypercerts.defs#smallBlob",
                "lex:app.certified.location#string"
              ],
              description: "The location of where the work was performed as a URI, blob, or inline string."
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
      },
      string: {
        type: "object",
        required: ["string"],
        description: "A location represented as a string, e.g. coordinates or a small GeoJSON string.",
        properties: {
          string: {
            type: "string",
            description: "The location string value",
            maxLength: 1e4,
            maxGraphemes: 1e3
          }
        }
      }
    }
  },
  AppGainforestCommonDefs: {
    lexicon: 1,
    id: "app.gainforest.common.defs",
    description: "Shared type definitions for biodiversity and environmental data collection",
    defs: {
      uri: {
        type: "object",
        required: ["uri"],
        description: "Reference to external data via URI",
        properties: {
          uri: {
            type: "string",
            format: "uri",
            maxGraphemes: 1024,
            description: "URI to external resource"
          }
        }
      },
      image: {
        type: "object",
        required: ["file"],
        description: "Image file for photos, camera traps, drone stills, scanned documents",
        properties: {
          file: {
            type: "blob",
            accept: [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/webp",
              "image/heic",
              "image/heif",
              "image/tiff",
              "image/tif",
              "image/gif",
              "image/bmp",
              "image/svg+xml"
            ],
            maxSize: 20971520,
            description: "Image up to 20MB. Supports JPEG, PNG, WebP, HEIC (phones), TIFF (scientific), GIF, BMP, SVG."
          }
        }
      },
      imageThumbnail: {
        type: "object",
        required: ["file"],
        description: "Small image for thumbnails and previews",
        properties: {
          file: {
            type: "blob",
            accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            maxSize: 1048576,
            description: "Thumbnail image up to 1MB"
          }
        }
      },
      video: {
        type: "object",
        required: ["file"],
        description: "Video file for camera traps, drone footage, underwater video, behavioral observations",
        properties: {
          file: {
            type: "blob",
            accept: [
              "video/mp4",
              "video/quicktime",
              "video/x-msvideo",
              "video/webm",
              "video/x-matroska",
              "video/mpeg",
              "video/3gpp",
              "video/3gpp2"
            ],
            maxSize: 104857600,
            description: "Video up to 100MB. Supports MP4, MOV, AVI, WebM, MKV, MPEG, 3GP."
          }
        }
      },
      audio: {
        type: "object",
        required: ["file"],
        description: "Audio file for bioacoustics, soundscapes, field recordings, species calls",
        properties: {
          file: {
            type: "blob",
            accept: [
              "audio/wav",
              "audio/x-wav",
              "audio/mpeg",
              "audio/mp3",
              "audio/mp4",
              "audio/x-m4a",
              "audio/aac",
              "audio/flac",
              "audio/x-flac",
              "audio/ogg",
              "audio/opus",
              "audio/webm",
              "audio/aiff",
              "audio/x-aiff"
            ],
            maxSize: 104857600,
            description: "Audio up to 100MB. Supports WAV, MP3, M4A, AAC, FLAC, OGG, Opus, WebM, AIFF."
          }
        }
      },
      spectrogram: {
        type: "object",
        required: ["file"],
        description: "Spectrogram image - visual representation of audio frequency content",
        properties: {
          file: {
            type: "blob",
            accept: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
            maxSize: 5242880,
            description: "Spectrogram image up to 5MB"
          }
        }
      },
      document: {
        type: "object",
        required: ["file"],
        description: "Document file for reports, field notes, permits, publications",
        properties: {
          file: {
            type: "blob",
            accept: [
              "application/pdf",
              "text/plain",
              "text/markdown",
              "text/html",
              "application/rtf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ],
            maxSize: 20971520,
            description: "Document up to 20MB. Supports PDF, TXT, Markdown, HTML, RTF, DOC, DOCX."
          }
        }
      },
      dataFile: {
        type: "object",
        required: ["file"],
        description: "Structured data file for observations, measurements, exports",
        properties: {
          file: {
            type: "blob",
            accept: [
              "text/csv",
              "text/tab-separated-values",
              "application/json",
              "application/ld+json",
              "application/xml",
              "text/xml",
              "application/vnd.ms-excel",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "application/vnd.oasis.opendocument.spreadsheet"
            ],
            maxSize: 52428800,
            description: "Data file up to 50MB. Supports CSV, TSV, JSON, JSON-LD, XML, XLS, XLSX, ODS."
          }
        }
      },
      gpsTrack: {
        type: "object",
        required: ["file"],
        description: "GPS track file for transects, survey routes, patrol paths",
        properties: {
          file: {
            type: "blob",
            accept: [
              "application/gpx+xml",
              "application/vnd.google-earth.kml+xml",
              "application/vnd.google-earth.kmz",
              "application/geo+json",
              "application/json"
            ],
            maxSize: 10485760,
            description: "GPS track up to 10MB. Supports GPX, KML, KMZ, GeoJSON."
          }
        }
      },
      geospatial: {
        type: "object",
        required: ["file"],
        description: "Geospatial data file for maps, boundaries, habitat layers",
        properties: {
          file: {
            type: "blob",
            accept: [
              "application/geo+json",
              "application/json",
              "application/vnd.google-earth.kml+xml",
              "application/vnd.google-earth.kmz",
              "application/geopackage+sqlite3",
              "application/x-shapefile",
              "application/zip",
              "image/tiff",
              "image/geotiff"
            ],
            maxSize: 104857600,
            description: "Geospatial data up to 100MB. Supports GeoJSON, KML, KMZ, GeoPackage, Shapefile (zipped), GeoTIFF."
          }
        }
      },
      sensorData: {
        type: "object",
        required: ["file"],
        description: "Sensor data file for environmental monitoring (temperature, humidity, light, etc.)",
        properties: {
          file: {
            type: "blob",
            accept: [
              "text/csv",
              "application/json",
              "text/plain",
              "application/x-netcdf",
              "application/x-hdf5"
            ],
            maxSize: 52428800,
            description: "Sensor data up to 50MB. Supports CSV, JSON, TXT, NetCDF, HDF5."
          }
        }
      },
      geneticData: {
        type: "object",
        required: ["file"],
        description: "Genetic/genomic data file for eDNA, barcoding, sequencing results",
        properties: {
          file: {
            type: "blob",
            accept: [
              "text/x-fasta",
              "application/x-fasta",
              "text/x-fastq",
              "application/x-fastq",
              "text/plain",
              "text/csv",
              "application/json"
            ],
            maxSize: 104857600,
            description: "Genetic data up to 100MB. Supports FASTA, FASTQ, CSV, JSON."
          }
        }
      },
      indexedOrganization: {
        type: "object",
        required: ["id", "name"],
        description: "Reference to an indexed organization",
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
  AppGainforestDwcDefs: {
    lexicon: 1,
    id: "app.gainforest.dwc.defs",
    description: "Shared type definitions for Darwin Core aligned biodiversity records",
    defs: {
      geolocation: {
        type: "object",
        description: "A geographic point with uncertainty, following Darwin Core Location class",
        required: ["decimalLatitude", "decimalLongitude"],
        properties: {
          decimalLatitude: {
            type: "string",
            description: "Geographic latitude in decimal degrees (WGS84). Positive values north of the Equator, negative south. Range: -90 to 90.",
            maxGraphemes: 32
          },
          decimalLongitude: {
            type: "string",
            description: "Geographic longitude in decimal degrees (WGS84). Positive values east of the Greenwich Meridian, negative west. Range: -180 to 180.",
            maxGraphemes: 32
          },
          coordinateUncertaintyInMeters: {
            type: "integer",
            description: "Horizontal distance from the coordinates describing the smallest circle containing the whole location. Zero is not valid.",
            minimum: 1
          },
          geodeticDatum: {
            type: "string",
            description: "The ellipsoid, geodetic datum, or spatial reference system. Recommended: 'EPSG:4326' (WGS84)",
            maxGraphemes: 64
          }
        }
      },
      taxonIdentification: {
        type: "object",
        description: "A taxonomic identification with provenance metadata",
        required: ["scientificName"],
        properties: {
          scientificName: {
            type: "string",
            description: "The full scientific name including authorship and date",
            maxGraphemes: 512
          },
          gbifTaxonKey: {
            type: "string",
            description: "GBIF backbone taxonomy key for the identified taxon",
            maxGraphemes: 64
          },
          identifiedBy: {
            type: "string",
            description: "Person(s) who made the identification (pipe-delimited for multiple)",
            maxGraphemes: 512
          },
          identifiedByID: {
            type: "string",
            description: "ORCID or other persistent identifier for the person(s) who identified (pipe-delimited)",
            maxGraphemes: 512
          },
          dateIdentified: {
            type: "string",
            description: "Date the identification was made (ISO 8601)",
            maxGraphemes: 64
          },
          identificationQualifier: {
            type: "string",
            description: "Uncertainty qualifier applied to the taxon name (e.g., 'cf. agrestis', 'aff. agrestis')",
            maxGraphemes: 256
          },
          identificationRemarks: {
            type: "string",
            description: "Notes or comments about the identification",
            maxGraphemes: 2048
          }
        }
      },
      basisOfRecordEnum: {
        type: "string",
        description: "The specific nature of the data record. Controlled vocabulary per Darwin Core.",
        maxGraphemes: 64,
        knownValues: [
          "HumanObservation",
          "MachineObservation",
          "PreservedSpecimen",
          "LivingSpecimen",
          "FossilSpecimen",
          "MaterialSample",
          "MaterialEntity",
          "MaterialCitation"
        ]
      },
      occurrenceStatusEnum: {
        type: "string",
        description: "Statement about the presence or absence of a taxon at a location.",
        maxGraphemes: 64,
        knownValues: ["present", "absent"]
      },
      dublinCoreTypeEnum: {
        type: "string",
        description: "Dublin Core type vocabulary for the nature of the resource.",
        maxGraphemes: 64,
        knownValues: [
          "PhysicalObject",
          "StillImage",
          "MovingImage",
          "Sound",
          "Text",
          "Event",
          "Dataset"
        ]
      },
      nomenclaturalCodeEnum: {
        type: "string",
        description: "The nomenclatural code under which the scientific name is constructed.",
        maxGraphemes: 64,
        knownValues: ["ICZN", "ICN", "ICNP", "ICTV", "BioCode"]
      },
      sexEnum: {
        type: "string",
        description: "The sex of the biological individual(s) represented in the occurrence.",
        maxGraphemes: 64,
        knownValues: ["male", "female", "hermaphrodite"]
      },
      taxonRankEnum: {
        type: "string",
        description: "The taxonomic rank of the most specific name in the scientificName.",
        maxGraphemes: 64,
        knownValues: [
          "kingdom",
          "phylum",
          "class",
          "order",
          "family",
          "subfamily",
          "genus",
          "subgenus",
          "species",
          "subspecies",
          "variety",
          "form"
        ]
      }
    }
  },
  AppGainforestDwcEvent: {
    lexicon: 1,
    id: "app.gainforest.dwc.event",
    description: "A sampling event record aligned with Darwin Core Event class. Enables star-schema pattern where multiple occurrences reference a shared event context (location, protocol, effort).",
    defs: {
      main: {
        type: "record",
        description: "A sampling or collecting event. Multiple dwc.occurrence records can reference the same event via eventRef, sharing location and protocol metadata.",
        key: "tid",
        record: {
          type: "object",
          required: ["eventID", "eventDate", "createdAt"],
          properties: {
            eventID: {
              type: "string",
              description: "An identifier for the event. Should be globally unique or unique within the dataset.",
              maxGraphemes: 256
            },
            parentEventID: {
              type: "string",
              description: "An identifier for the broader event that this event is part of (e.g., a survey campaign that contains multiple transects).",
              maxGraphemes: 256
            },
            parentEventRef: {
              type: "string",
              format: "at-uri",
              description: "AT-URI reference to the parent app.gainforest.dwc.event record."
            },
            eventDate: {
              type: "string",
              description: "The date or date range during which the event occurred. ISO 8601 format (e.g., '2024-03-15', '2024-03-15/2024-03-17').",
              maxGraphemes: 64
            },
            eventTime: {
              type: "string",
              description: "The time or time range during which the event occurred. ISO 8601 format (e.g., '06:30:00', '06:30:00/09:00:00').",
              maxGraphemes: 64
            },
            habitat: {
              type: "string",
              description: "A category or description of the habitat in which the event occurred (e.g., 'primary tropical rainforest', 'degraded pasture', 'riparian zone').",
              maxGraphemes: 512
            },
            samplingProtocol: {
              type: "string",
              description: "The names of, references to, or descriptions of the methods used during the event (e.g., 'camera trap array', 'line transect distance sampling', 'audio point count 10-min').",
              maxGraphemes: 1024
            },
            sampleSizeValue: {
              type: "string",
              description: "A numeric value for a measurement of the size of a sample in the event (e.g., '20', '0.25').",
              maxGraphemes: 64
            },
            sampleSizeUnit: {
              type: "string",
              description: "The unit of measurement for the sampleSizeValue (e.g., 'square meters', 'hectares', 'trap-nights').",
              maxGraphemes: 128
            },
            samplingEffort: {
              type: "string",
              description: "The amount of effort expended during the event (e.g., '3 person-hours', '14 trap-nights', '2 km transect walked').",
              maxGraphemes: 256
            },
            fieldNotes: {
              type: "string",
              description: "Notes or a reference to notes taken in the field about the event.",
              maxGraphemes: 1e4
            },
            eventRemarks: {
              type: "string",
              description: "Comments or notes about the event.",
              maxGraphemes: 5e3
            },
            locationID: {
              type: "string",
              description: "Identifier for the location where the event occurred.",
              maxGraphemes: 256
            },
            decimalLatitude: {
              type: "string",
              description: "Geographic latitude in decimal degrees (WGS84). Range: -90 to 90.",
              maxGraphemes: 32
            },
            decimalLongitude: {
              type: "string",
              description: "Geographic longitude in decimal degrees (WGS84). Range: -180 to 180.",
              maxGraphemes: 32
            },
            geodeticDatum: {
              type: "string",
              description: "The spatial reference system. Recommended: 'EPSG:4326'.",
              maxGraphemes: 64
            },
            coordinateUncertaintyInMeters: {
              type: "integer",
              description: "Uncertainty radius in meters around the coordinates.",
              minimum: 1
            },
            country: {
              type: "string",
              description: "The name of the country.",
              maxGraphemes: 128
            },
            countryCode: {
              type: "string",
              description: "ISO 3166-1 alpha-2 country code.",
              minLength: 2,
              maxLength: 2
            },
            stateProvince: {
              type: "string",
              description: "First-level administrative division.",
              maxGraphemes: 256
            },
            county: {
              type: "string",
              description: "Second-level administrative division.",
              maxGraphemes: 256
            },
            municipality: {
              type: "string",
              description: "Third-level administrative division.",
              maxGraphemes: 256
            },
            locality: {
              type: "string",
              description: "Specific locality description.",
              maxGraphemes: 1024
            },
            minimumElevationInMeters: {
              type: "integer",
              description: "Lower limit of elevation range in meters above sea level."
            },
            maximumElevationInMeters: {
              type: "integer",
              description: "Upper limit of elevation range in meters above sea level."
            },
            locationRemarks: {
              type: "string",
              description: "Comments about the location.",
              maxGraphemes: 2048
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp of record creation in the ATProto PDS."
            }
          }
        }
      }
    }
  },
  AppGainforestDwcMeasurement: {
    lexicon: 1,
    id: "app.gainforest.dwc.measurement",
    description: "A measurement or fact record aligned with the Darwin Core MeasurementOrFact class. Extension record that links to an occurrence, enabling multiple measurements per organism (e.g., DBH, height, canopy cover for a tree).",
    defs: {
      main: {
        type: "record",
        description: "A measurement, fact, characteristic, or assertion about an occurrence. Multiple measurement records can reference the same occurrence, solving the Simple DwC one-measurement-per-record limitation.",
        key: "tid",
        record: {
          type: "object",
          required: [
            "occurrenceRef",
            "measurementType",
            "measurementValue",
            "createdAt"
          ],
          properties: {
            measurementID: {
              type: "string",
              description: "An identifier for the measurement. Should be unique within the dataset.",
              maxGraphemes: 256
            },
            occurrenceRef: {
              type: "string",
              format: "at-uri",
              description: "AT-URI reference to the app.gainforest.dwc.occurrence record this measurement belongs to."
            },
            occurrenceID: {
              type: "string",
              description: "The occurrenceID of the linked occurrence record (for cross-system interoperability).",
              maxGraphemes: 256
            },
            measurementType: {
              type: "string",
              description: "The nature of the measurement, fact, characteristic, or assertion (e.g., 'DBH', 'tree height', 'canopy cover', 'tail length', 'body mass', 'soil pH', 'water temperature').",
              maxGraphemes: 256
            },
            measurementValue: {
              type: "string",
              description: "The value of the measurement, fact, characteristic, or assertion (e.g., '45.2', 'present', 'blue').",
              maxGraphemes: 1024
            },
            measurementUnit: {
              type: "string",
              description: "The units for the measurementValue (e.g., 'cm', 'm', 'kg', 'mm', '%', 'degrees Celsius').",
              maxGraphemes: 64
            },
            measurementAccuracy: {
              type: "string",
              description: "The description of the potential error associated with the measurementValue (e.g., '0.5 cm', '5%').",
              maxGraphemes: 256
            },
            measurementMethod: {
              type: "string",
              description: "The description of or reference to the method used to determine the measurement (e.g., 'diameter tape at 1.3m height', 'laser rangefinder', 'Bitterlich method').",
              maxGraphemes: 1024
            },
            measurementDeterminedBy: {
              type: "string",
              description: "Person(s) who determined the measurement. Pipe-delimited for multiple.",
              maxGraphemes: 512
            },
            measurementDeterminedDate: {
              type: "string",
              description: "The date the measurement was made. ISO 8601 format.",
              maxGraphemes: 64
            },
            measurementRemarks: {
              type: "string",
              description: "Comments or notes accompanying the measurement.",
              maxGraphemes: 5e3
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp of record creation in the ATProto PDS."
            }
          }
        }
      }
    }
  },
  AppGainforestDwcOccurrence: {
    lexicon: 1,
    id: "app.gainforest.dwc.occurrence",
    description: "A single biodiversity occurrence record aligned with Simple Darwin Core (TDWG Standard 450, version 2023-09-13). Represents one organism or group of organisms at a particular place and time.",
    defs: {
      main: {
        type: "record",
        description: "A biodiversity occurrence record following the Simple Darwin Core standard. Each record represents one occurrence of an organism at a location and time.",
        key: "tid",
        record: {
          type: "object",
          required: [
            "basisOfRecord",
            "scientificName",
            "eventDate",
            "createdAt"
          ],
          properties: {
            occurrenceID: {
              type: "string",
              description: "A globally unique identifier for the occurrence record. Recommended: a persistent URI (e.g., DOI, LSID, or UUID-based URI).",
              maxGraphemes: 256
            },
            basisOfRecord: {
              type: "string",
              description: "The specific nature of the data record. Must be one of the Darwin Core class names.",
              maxGraphemes: 64,
              enum: [
                "HumanObservation",
                "MachineObservation",
                "PreservedSpecimen",
                "LivingSpecimen",
                "FossilSpecimen",
                "MaterialSample",
                "MaterialEntity",
                "MaterialCitation"
              ]
            },
            dcType: {
              type: "string",
              description: "The Dublin Core type class that best describes the resource (dc:type).",
              maxGraphemes: 64,
              enum: [
                "PhysicalObject",
                "StillImage",
                "MovingImage",
                "Sound",
                "Text",
                "Event",
                "Dataset"
              ]
            },
            license: {
              type: "string",
              description: "A legal document giving official permission to do something with the record. Recommended: a Creative Commons URI (e.g., 'http://creativecommons.org/licenses/by/4.0/').",
              maxGraphemes: 512
            },
            rightsHolder: {
              type: "string",
              description: "Person or organization owning or managing rights over the resource.",
              maxGraphemes: 256
            },
            institutionCode: {
              type: "string",
              description: "The name or acronym of the institution having custody of the object(s) or information in the record.",
              maxGraphemes: 256
            },
            collectionCode: {
              type: "string",
              description: "The name, acronym, or code identifying the collection or dataset from which the record was derived.",
              maxGraphemes: 256
            },
            datasetName: {
              type: "string",
              description: "The name identifying the dataset from which the record was derived.",
              maxGraphemes: 256
            },
            informationWithheld: {
              type: "string",
              description: "A description of what information is withheld from this record and why (e.g., 'coordinates generalized to protect endangered species').",
              maxGraphemes: 1024
            },
            dataGeneralizations: {
              type: "string",
              description: "A description of actions taken to make the data less specific or complete (e.g., 'coordinates rounded to nearest 0.1 degree').",
              maxGraphemes: 1024
            },
            references: {
              type: "string",
              format: "uri",
              description: "A related resource that is referenced, cited, or otherwise pointed to by the record (URL)."
            },
            recordedBy: {
              type: "string",
              description: "Person(s) responsible for recording the occurrence in the field. Pipe-delimited for multiple (e.g., 'Jane Smith | John Doe').",
              maxGraphemes: 512
            },
            recordedByID: {
              type: "string",
              description: "Persistent identifier(s) (e.g., ORCID) of the person(s) who recorded. Pipe-delimited for multiple.",
              maxGraphemes: 512
            },
            individualCount: {
              type: "integer",
              description: "The number of individuals present at the time of the occurrence.",
              minimum: 0
            },
            organismQuantity: {
              type: "string",
              description: "A number or enumeration value for the quantity of organisms (e.g., '27', '12.5', 'many').",
              maxGraphemes: 64
            },
            organismQuantityType: {
              type: "string",
              description: "The type of quantification system used for organismQuantity (e.g., 'individuals', '% biomass', 'stems/ha').",
              maxGraphemes: 128
            },
            sex: {
              type: "string",
              description: "The sex of the biological individual(s).",
              maxGraphemes: 64,
              enum: ["male", "female", "hermaphrodite"]
            },
            lifeStage: {
              type: "string",
              description: "The age class or life stage at the time of occurrence (e.g., 'adult', 'juvenile', 'larva', 'seedling', 'sapling').",
              maxGraphemes: 128
            },
            reproductiveCondition: {
              type: "string",
              description: "The reproductive condition at the time of occurrence (e.g., 'flowering', 'fruiting', 'budding', 'pregnant').",
              maxGraphemes: 128
            },
            behavior: {
              type: "string",
              description: "The behavior shown by the subject at the time of occurrence (e.g., 'foraging', 'nesting', 'roosting').",
              maxGraphemes: 256
            },
            occurrenceStatus: {
              type: "string",
              description: "Statement about the presence or absence of a taxon at a location.",
              maxGraphemes: 64,
              enum: ["present", "absent"]
            },
            occurrenceRemarks: {
              type: "string",
              description: "Comments or notes about the occurrence.",
              maxGraphemes: 5e3
            },
            associatedMedia: {
              type: "string",
              description: "Identifiers (URIs) of media associated with the occurrence. Pipe-delimited for multiple.",
              maxGraphemes: 2048
            },
            associatedReferences: {
              type: "string",
              description: "Identifiers (URIs) of literature associated with the occurrence. Pipe-delimited for multiple.",
              maxGraphemes: 2048
            },
            associatedSequences: {
              type: "string",
              description: "Identifiers (URIs) of genetic sequence information associated with the occurrence. Pipe-delimited for multiple.",
              maxGraphemes: 2048
            },
            associatedOccurrences: {
              type: "string",
              description: "Identifiers of other occurrences associated with this one (e.g., parasite-host). Pipe-delimited.",
              maxGraphemes: 2048
            },
            eventID: {
              type: "string",
              description: "Identifier for the sampling event. Can be used to group occurrences from the same event.",
              maxGraphemes: 256
            },
            eventRef: {
              type: "string",
              format: "at-uri",
              description: "AT-URI reference to an app.gainforest.dwc.event record (for star-schema linkage)."
            },
            eventDate: {
              type: "string",
              description: "The date or date-time (or interval) during which the occurrence was recorded. ISO 8601 format (e.g., '2024-03-15', '2024-03-15T10:30:00Z', '2024-03/2024-06').",
              maxGraphemes: 64
            },
            eventTime: {
              type: "string",
              description: "The time of the event. ISO 8601 format (e.g., '14:30:00', '14:30:00+02:00').",
              maxGraphemes: 64
            },
            habitat: {
              type: "string",
              description: "A description of the habitat in which the event occurred (e.g., 'tropical rainforest', 'mangrove swamp', 'montane cloud forest').",
              maxGraphemes: 512
            },
            samplingProtocol: {
              type: "string",
              description: "The method or protocol used during the event (e.g., 'camera trap', 'point count', 'mist net', '20m x 20m plot survey', 'acoustic monitoring').",
              maxGraphemes: 1024
            },
            samplingEffort: {
              type: "string",
              description: "The amount of effort expended during the event (e.g., '2 trap-nights', '30 minutes', '10 km transect').",
              maxGraphemes: 256
            },
            fieldNotes: {
              type: "string",
              description: "Notes or reference to notes taken in the field about the event.",
              maxGraphemes: 1e4
            },
            locationID: {
              type: "string",
              description: "Identifier for the location (e.g., a reference to a named site).",
              maxGraphemes: 256
            },
            decimalLatitude: {
              type: "string",
              description: "Geographic latitude in decimal degrees (WGS84). Positive values are north of the Equator. Range: -90 to 90.",
              maxGraphemes: 32
            },
            decimalLongitude: {
              type: "string",
              description: "Geographic longitude in decimal degrees (WGS84). Positive values are east of the Greenwich Meridian. Range: -180 to 180.",
              maxGraphemes: 32
            },
            geodeticDatum: {
              type: "string",
              description: "The spatial reference system for the coordinates. Recommended: 'EPSG:4326' (WGS84).",
              maxGraphemes: 64
            },
            coordinateUncertaintyInMeters: {
              type: "integer",
              description: "Horizontal distance (meters) from the given coordinates describing the smallest circle containing the whole location.",
              minimum: 1
            },
            country: {
              type: "string",
              description: "The name of the country or major administrative unit.",
              maxGraphemes: 128
            },
            countryCode: {
              type: "string",
              description: "The standard code for the country (ISO 3166-1 alpha-2).",
              minLength: 2,
              maxLength: 2
            },
            stateProvince: {
              type: "string",
              description: "The name of the next smaller administrative region than country.",
              maxGraphemes: 256
            },
            county: {
              type: "string",
              description: "The full, unabbreviated name of the next smaller administrative region than stateProvince.",
              maxGraphemes: 256
            },
            municipality: {
              type: "string",
              description: "The full, unabbreviated name of the next smaller administrative region than county.",
              maxGraphemes: 256
            },
            locality: {
              type: "string",
              description: "The specific description of the place (e.g., '500m upstream of bridge on Rio Par\xE1').",
              maxGraphemes: 1024
            },
            verbatimLocality: {
              type: "string",
              description: "The original textual description of the place as provided by the recorder.",
              maxGraphemes: 1024
            },
            minimumElevationInMeters: {
              type: "integer",
              description: "The lower limit of the range of elevation (in meters above sea level)."
            },
            maximumElevationInMeters: {
              type: "integer",
              description: "The upper limit of the range of elevation (in meters above sea level)."
            },
            minimumDepthInMeters: {
              type: "integer",
              description: "The lesser depth of a range of depth below the local surface (in meters).",
              minimum: 0
            },
            maximumDepthInMeters: {
              type: "integer",
              description: "The greater depth of a range of depth below the local surface (in meters).",
              minimum: 0
            },
            locationRemarks: {
              type: "string",
              description: "Comments about the location.",
              maxGraphemes: 2048
            },
            gbifTaxonKey: {
              type: "string",
              description: "GBIF backbone taxonomy key for the identified taxon. Retained for backward compatibility with existing GainForest workflows.",
              maxGraphemes: 64
            },
            scientificName: {
              type: "string",
              description: "The full scientific name, with authorship and date if known (e.g., 'Centropyge flavicauda Fraser-Brunner 1933').",
              maxGraphemes: 512
            },
            scientificNameAuthorship: {
              type: "string",
              description: "The authorship information for the scientific name (e.g., 'Fraser-Brunner 1933').",
              maxGraphemes: 256
            },
            kingdom: {
              type: "string",
              description: "The full scientific name of the kingdom (e.g., 'Animalia', 'Plantae', 'Fungi').",
              maxGraphemes: 128
            },
            phylum: {
              type: "string",
              description: "The full scientific name of the phylum or division.",
              maxGraphemes: 128
            },
            class: {
              type: "string",
              description: "The full scientific name of the class.",
              maxGraphemes: 128
            },
            order: {
              type: "string",
              description: "The full scientific name of the order.",
              maxGraphemes: 128
            },
            family: {
              type: "string",
              description: "The full scientific name of the family.",
              maxGraphemes: 128
            },
            genus: {
              type: "string",
              description: "The full scientific name of the genus.",
              maxGraphemes: 128
            },
            specificEpithet: {
              type: "string",
              description: "The name of the species epithet of the scientificName.",
              maxGraphemes: 128
            },
            infraspecificEpithet: {
              type: "string",
              description: "The name of the lowest or terminal infraspecific epithet.",
              maxGraphemes: 128
            },
            taxonRank: {
              type: "string",
              description: "The taxonomic rank of the most specific name in scientificName.",
              maxGraphemes: 64,
              enum: [
                "kingdom",
                "phylum",
                "class",
                "order",
                "family",
                "subfamily",
                "genus",
                "subgenus",
                "species",
                "subspecies",
                "variety",
                "form"
              ]
            },
            vernacularName: {
              type: "string",
              description: "A common or vernacular name for the taxon.",
              maxGraphemes: 256
            },
            taxonomicStatus: {
              type: "string",
              description: "The status of the use of the scientificName (e.g., 'accepted', 'synonym', 'doubtful').",
              maxGraphemes: 64
            },
            nomenclaturalCode: {
              type: "string",
              description: "The nomenclatural code under which the scientificName is constructed.",
              maxGraphemes: 64,
              enum: ["ICZN", "ICN", "ICNP", "ICTV", "BioCode"]
            },
            higherClassification: {
              type: "string",
              description: "A complete list of taxa names terminating at the rank immediately superior to the taxon. Pipe-delimited (e.g., 'Animalia|Chordata|Mammalia|Rodentia|Ctenomyidae|Ctenomys').",
              maxGraphemes: 1024
            },
            identifiedBy: {
              type: "string",
              description: "Person(s) who assigned the taxon to the occurrence. Pipe-delimited for multiple.",
              maxGraphemes: 512
            },
            identifiedByID: {
              type: "string",
              description: "Persistent identifier(s) (e.g., ORCID) of the person(s) who identified. Pipe-delimited.",
              maxGraphemes: 512
            },
            dateIdentified: {
              type: "string",
              description: "The date on which the identification was made. ISO 8601 format.",
              maxGraphemes: 64
            },
            identificationQualifier: {
              type: "string",
              description: "A brief phrase or standard term qualifying the identification (e.g., 'cf. agrestis', 'aff. agrestis').",
              maxGraphemes: 256
            },
            identificationRemarks: {
              type: "string",
              description: "Comments or notes about the identification.",
              maxGraphemes: 2048
            },
            previousIdentifications: {
              type: "string",
              description: "Previous assignments of names to the occurrence. Pipe-delimited.",
              maxGraphemes: 2048
            },
            dynamicProperties: {
              type: "string",
              description: `Additional structured data as a valid JSON string (per Simple DwC Section 7.1). Example: '{"iucnStatus":"vulnerable","canopyCover":"85%"}'. Should be flattened to a single line with no non-printing characters.`,
              maxGraphemes: 1e4
            },
            imageEvidence: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#image",
              description: "Image evidence (photo, camera trap, drone still, scanned specimen, etc.)."
            },
            audioEvidence: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#audio",
              description: "Audio evidence (bioacoustics, soundscape, species call, field recording, etc.)."
            },
            videoEvidence: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#video",
              description: "Video evidence (camera trap, drone footage, underwater video, behavioral observation, etc.)."
            },
            spectrogramEvidence: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#spectrogram",
              description: "Spectrogram image showing frequency analysis of audio recording."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp of record creation in the ATProto PDS."
            }
          }
        }
      }
    }
  },
  AppGainforestEvaluatorDefs: {
    lexicon: 1,
    id: "app.gainforest.evaluator.defs",
    description: "Shared type definitions for decentralized evaluator services. Evaluators attach structured, typed evaluation data to records (a more sophisticated evolution of the labeler pattern).",
    defs: {
      subjectRef: {
        type: "object",
        description: "Reference to a target record that is being evaluated.",
        required: ["uri"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri",
            description: "AT-URI of the target record."
          },
          cid: {
            type: "string",
            format: "cid",
            description: "CID pinning the exact version of the target record."
          }
        }
      },
      methodInfo: {
        type: "object",
        description: "Provenance metadata describing the method used to produce an evaluation.",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            maxGraphemes: 256,
            description: "Human-readable name of the method or model (e.g., 'GainForest BioClassifier')."
          },
          version: {
            type: "string",
            maxGraphemes: 64,
            description: "Version string of the method or model (e.g., '2.1.0')."
          },
          modelCheckpoint: {
            type: "string",
            maxGraphemes: 128,
            description: "Identifier for the specific model checkpoint used (e.g., date or hash)."
          },
          references: {
            type: "array",
            items: {
              type: "string",
              format: "uri"
            },
            maxLength: 10,
            description: "URIs to papers, documentation, or repositories describing this method."
          }
        }
      },
      candidateTaxon: {
        type: "object",
        description: "A candidate taxon identification with confidence score and rank.",
        required: ["scientificName", "confidence", "rank"],
        properties: {
          scientificName: {
            type: "string",
            maxGraphemes: 512,
            description: "Full scientific name of the candidate taxon."
          },
          gbifTaxonKey: {
            type: "string",
            maxGraphemes: 64,
            description: "GBIF backbone taxonomy key for the candidate."
          },
          confidence: {
            type: "integer",
            minimum: 0,
            maximum: 1e3,
            description: "Confidence score (0-1000, where 1000 = 100.0%)."
          },
          rank: {
            type: "integer",
            minimum: 1,
            description: "Rank position among candidates (1 = best match)."
          },
          kingdom: {
            type: "string",
            maxGraphemes: 128,
            description: "Kingdom of the candidate taxon."
          },
          family: {
            type: "string",
            maxGraphemes: 128,
            description: "Family of the candidate taxon."
          },
          genus: {
            type: "string",
            maxGraphemes: 128,
            description: "Genus of the candidate taxon."
          }
        }
      },
      qualityFlag: {
        type: "object",
        description: "A single data quality flag indicating an issue with a specific field.",
        required: ["field", "issue"],
        properties: {
          field: {
            type: "string",
            maxGraphemes: 64,
            description: "The field name that has the quality issue."
          },
          issue: {
            type: "string",
            maxGraphemes: 256,
            description: "Description of the quality issue."
          },
          severity: {
            type: "string",
            maxGraphemes: 64,
            knownValues: ["error", "warning", "info"],
            description: "Severity level of the quality issue."
          }
        }
      },
      derivedMeasurement: {
        type: "object",
        description: "A single measurement derived by an evaluator from source data.",
        required: ["measurementType", "measurementValue"],
        properties: {
          measurementType: {
            type: "string",
            maxGraphemes: 256,
            description: "The nature of the measurement (e.g., 'canopy cover', 'NDVI', 'tree height')."
          },
          measurementValue: {
            type: "string",
            maxGraphemes: 1024,
            description: "The value of the measurement."
          },
          measurementUnit: {
            type: "string",
            maxGraphemes: 64,
            description: "The units for the measurement value (e.g., '%', 'm', 'kg')."
          },
          measurementMethod: {
            type: "string",
            maxGraphemes: 1024,
            description: "Description of the method used to obtain the measurement."
          }
        }
      },
      speciesIdResult: {
        type: "object",
        description: "AI or human species recognition result with ranked candidate identifications.",
        required: ["candidates"],
        properties: {
          candidates: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.gainforest.evaluator.defs#candidateTaxon"
            },
            maxLength: 20,
            description: "Ranked list of candidate species identifications."
          },
          inputFeature: {
            type: "string",
            maxGraphemes: 64,
            description: "Which feature of the subject record was used as input (e.g., 'mediaEvidence')."
          },
          remarks: {
            type: "string",
            maxGraphemes: 2048,
            description: "Additional notes about the species identification."
          }
        }
      },
      dataQualityResult: {
        type: "object",
        description: "Data quality assessment result with per-field quality flags.",
        required: ["flags"],
        properties: {
          flags: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.gainforest.evaluator.defs#qualityFlag"
            },
            maxLength: 50,
            description: "List of quality issues found in the record."
          },
          completenessScore: {
            type: "integer",
            minimum: 0,
            maximum: 1e3,
            description: "Overall completeness score (0-1000, where 1000 = 100.0%)."
          },
          remarks: {
            type: "string",
            maxGraphemes: 2048,
            description: "Additional notes about the quality assessment."
          }
        }
      },
      verificationResult: {
        type: "object",
        description: "Expert verification result for a previous identification or evaluation.",
        required: ["status"],
        properties: {
          status: {
            type: "string",
            maxGraphemes: 64,
            knownValues: ["confirmed", "rejected", "uncertain"],
            description: "Verification status: confirmed, rejected, or uncertain."
          },
          verifiedBy: {
            type: "string",
            maxGraphemes: 256,
            description: "Name of the person who performed the verification."
          },
          verifiedByID: {
            type: "string",
            maxGraphemes: 256,
            description: "Persistent identifier (e.g., ORCID) of the verifier."
          },
          remarks: {
            type: "string",
            maxGraphemes: 2048,
            description: "Notes about the verification decision."
          },
          suggestedCorrections: {
            type: "string",
            maxGraphemes: 5e3,
            description: "Suggested corrections if the original identification was rejected or uncertain."
          }
        }
      },
      classificationResult: {
        type: "object",
        description: "Generic categorical classification result (e.g., conservation priority, habitat type).",
        required: ["category", "value"],
        properties: {
          category: {
            type: "string",
            maxGraphemes: 128,
            description: "The classification category (e.g., 'conservation-priority', 'habitat-type')."
          },
          value: {
            type: "string",
            maxGraphemes: 256,
            description: "The assigned classification value (e.g., 'critical', 'tropical-rainforest')."
          },
          remarks: {
            type: "string",
            maxGraphemes: 2048,
            description: "Additional notes about the classification."
          }
        }
      },
      measurementResult: {
        type: "object",
        description: "Derived measurements produced by an evaluator from source data (e.g., remote sensing metrics).",
        required: ["measurements"],
        properties: {
          measurements: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.gainforest.evaluator.defs#derivedMeasurement"
            },
            maxLength: 20,
            description: "List of derived measurements."
          },
          remarks: {
            type: "string",
            maxGraphemes: 2048,
            description: "Additional notes about the measurements."
          }
        }
      }
    }
  },
  AppGainforestEvaluatorEvaluation: {
    lexicon: 1,
    id: "app.gainforest.evaluator.evaluation",
    description: "An evaluation record published by an evaluator in their own repo. Contains structured, typed results about a target record (or batch of records). Discovered by AppViews via the atproto-accept-evaluators HTTP header pattern.",
    defs: {
      main: {
        type: "record",
        description: "A single evaluation produced by an evaluator service. Exactly one of 'subject' (single target) or 'subjects' (batch) must be provided.",
        key: "tid",
        record: {
          type: "object",
          required: ["evaluationType", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:app.gainforest.evaluator.defs#subjectRef",
              description: "Single target record being evaluated. Use this OR subjects, not both."
            },
            subjects: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.gainforest.evaluator.defs#subjectRef"
              },
              maxLength: 100,
              description: "Batch evaluation: multiple target records sharing the same result. Use this OR subject, not both."
            },
            evaluationType: {
              type: "string",
              maxGraphemes: 64,
              description: "Identifier for the type of evaluation (must match one declared in the evaluator's service record)."
            },
            result: {
              type: "union",
              description: "The typed evaluation result. The $type field determines which result schema is used.",
              refs: [
                "lex:app.gainforest.evaluator.defs#speciesIdResult",
                "lex:app.gainforest.evaluator.defs#dataQualityResult",
                "lex:app.gainforest.evaluator.defs#verificationResult",
                "lex:app.gainforest.evaluator.defs#classificationResult",
                "lex:app.gainforest.evaluator.defs#measurementResult"
              ]
            },
            confidence: {
              type: "integer",
              minimum: 0,
              maximum: 1e3,
              description: "Overall confidence in this evaluation (0-1000, where 1000 = 100.0%)."
            },
            method: {
              type: "ref",
              ref: "lex:app.gainforest.evaluator.defs#methodInfo",
              description: "Method/model provenance for this specific evaluation (overrides service-level method if set)."
            },
            neg: {
              type: "boolean",
              description: "If true, this is a negation/withdrawal of a previous evaluation (like label negation)."
            },
            supersedes: {
              type: "string",
              format: "at-uri",
              description: "AT-URI of a previous evaluation record that this one supersedes (e.g., model re-run with improved version)."
            },
            dynamicProperties: {
              type: "string",
              maxGraphemes: 1e4,
              description: "Additional structured data as a JSON string. Escape hatch for experimental result types before they are formalized into the union."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp of when this evaluation was produced."
            }
          }
        }
      }
    }
  },
  AppGainforestEvaluatorService: {
    lexicon: 1,
    id: "app.gainforest.evaluator.service",
    description: "Declaration record published at rkey 'self' to register an account as an evaluator service. Analogous to app.bsky.labeler.service for labelers.",
    defs: {
      main: {
        type: "record",
        description: "An evaluator service declaration. Publish at /app.gainforest.evaluator.service/self to declare this account as an evaluator.",
        key: "literal:self",
        record: {
          type: "object",
          required: ["policies", "createdAt"],
          properties: {
            policies: {
              type: "ref",
              ref: "lex:app.gainforest.evaluator.service#evaluatorPolicies",
              description: "The evaluator's policies including supported evaluation types and access model."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp of when this evaluator service was declared."
            }
          }
        }
      },
      evaluatorPolicies: {
        type: "object",
        description: "Policies declaring what this evaluator does and how it operates.",
        required: ["evaluationTypes"],
        properties: {
          accessModel: {
            type: "string",
            maxGraphemes: 64,
            knownValues: ["open", "subscription"],
            description: "Whether this evaluator requires user subscription ('subscription') or processes all matching records ('open')."
          },
          evaluationTypes: {
            type: "array",
            items: {
              type: "string",
              maxGraphemes: 64
            },
            maxLength: 20,
            description: "List of evaluation type identifiers this evaluator produces (e.g., 'species-id', 'data-quality')."
          },
          evaluationTypeDefinitions: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.gainforest.evaluator.service#evaluationTypeDefinition"
            },
            maxLength: 20,
            description: "Detailed definitions for each evaluation type, including human-readable descriptions."
          },
          subjectCollections: {
            type: "array",
            items: {
              type: "string",
              maxGraphemes: 128
            },
            maxLength: 20,
            description: "NSIDs of record collections this evaluator can evaluate (e.g., 'app.gainforest.dwc.occurrence')."
          }
        }
      },
      evaluationTypeDefinition: {
        type: "object",
        description: "Definition of a single evaluation type produced by this evaluator.",
        required: ["identifier", "resultType"],
        properties: {
          identifier: {
            type: "string",
            maxGraphemes: 64,
            description: "The evaluation type identifier (must match an entry in evaluationTypes)."
          },
          resultType: {
            type: "string",
            maxGraphemes: 128,
            description: "The lexicon reference for the result type (e.g., 'app.gainforest.evaluator.defs#speciesIdResult')."
          },
          method: {
            type: "ref",
            ref: "lex:app.gainforest.evaluator.defs#methodInfo",
            description: "Default method info for this evaluation type (can be overridden per-evaluation)."
          },
          locales: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:app.gainforest.evaluator.service#evaluationTypeLocale"
            },
            maxLength: 20,
            description: "Human-readable names and descriptions in various languages."
          }
        }
      },
      evaluationTypeLocale: {
        type: "object",
        description: "Localized name and description for an evaluation type.",
        required: ["lang", "name", "description"],
        properties: {
          lang: {
            type: "string",
            maxGraphemes: 16,
            description: "Language code (BCP-47, e.g., 'en', 'pt-BR')."
          },
          name: {
            type: "string",
            maxGraphemes: 128,
            description: "Short human-readable name for this evaluation type."
          },
          description: {
            type: "string",
            maxGraphemes: 2048,
            description: "Longer description of what this evaluation type does."
          }
        }
      }
    }
  },
  AppGainforestEvaluatorSubscription: {
    lexicon: 1,
    id: "app.gainforest.evaluator.subscription",
    description: "A subscription record published by a user in their own repo to request evaluations from a specific evaluator service. The evaluator detects subscriptions via Jetstream and processes matching records. Deleting this record unsubscribes.",
    defs: {
      main: {
        type: "record",
        description: "User subscription to an evaluator service. Published by the user (not the evaluator) to declare they want evaluations.",
        key: "tid",
        record: {
          type: "object",
          required: ["evaluator", "createdAt"],
          properties: {
            evaluator: {
              type: "string",
              format: "did",
              description: "DID of the evaluator service to subscribe to."
            },
            collections: {
              type: "array",
              items: {
                type: "string",
                maxGraphemes: 128
              },
              maxLength: 20,
              description: "Which of the user's record collections should be evaluated (NSIDs). Must be a subset of the evaluator's subjectCollections. If omitted, all supported collections are evaluated."
            },
            evaluationTypes: {
              type: "array",
              items: {
                type: "string",
                maxGraphemes: 64
              },
              maxLength: 20,
              description: "Which evaluation types the user wants. If omitted, all types the evaluator supports are applied."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp of when this subscription was created."
            }
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
              type: "ref",
              ref: "lex:app.bsky.richtext.facet",
              description: "The description of the organization or project"
            },
            longDescription: {
              type: "ref",
              ref: "lex:pub.leaflet.pages.linearDocument",
              description: "The long description of the organization or project in richtext"
            },
            coverImage: {
              type: "ref",
              ref: "lex:org.hypercerts.defs#smallImage",
              description: "Cover image for the organization"
            },
            logo: {
              type: "ref",
              ref: "lex:org.hypercerts.defs#smallImage",
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
              enum: ["Public", "Unlisted"]
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
              ref: "lex:org.hypercerts.defs#smallBlob",
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
        description: "DEPRECATED: Use app.gainforest.dwc.occurrence instead. A declaration of a fauna observation for an organization.",
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
        description: "DEPRECATED: Use app.gainforest.dwc.occurrence instead. A declaration of a flora observation for an organization.",
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
              ref: "lex:org.hypercerts.defs#smallBlob",
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
        description: "DEPRECATED: Use app.gainforest.dwc.occurrence with basisOfRecord='MachineObservation' instead. A declaration of a fauna prediction for an organization.",
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
        description: "DEPRECATED: Use app.gainforest.dwc.occurrence with basisOfRecord='MachineObservation' instead. A declaration of a flora prediction for an organization.",
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
          required: ["title", "shortDescription", "createdAt"],
          properties: {
            title: {
              type: "string",
              description: "Title of the hypercert.",
              maxLength: 256
            },
            shortDescription: {
              type: "string",
              description: "Short summary of this activity claim, suitable for previews and list views. Rich text annotations may be provided via `shortDescriptionFacets`.",
              maxLength: 3e3,
              maxGraphemes: 300
            },
            shortDescriptionFacets: {
              type: "array",
              description: "Rich text annotations for `shortDescription` (mentions, URLs, hashtags, etc).",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            description: {
              type: "string",
              description: "Optional longer description of this activity claim, including context or interpretation. Rich text annotations may be provided via `descriptionFacets`.",
              maxLength: 3e4,
              maxGraphemes: 3e3
            },
            descriptionFacets: {
              type: "array",
              description: "Rich text annotations for `description` (mentions, URLs, hashtags, etc).",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
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
              type: "union",
              refs: [
                "lex:com.atproto.repo.strongRef",
                "lex:org.hypercerts.claim.activity#workScopeString"
              ],
              description: "Work scope definition. Either a strongRef to a work-scope logic record (structured, nested logic), or a free-form string for simple or legacy scopes. The work scope record should conform to the org.hypercerts.helper.workScopeTag lexicon."
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
            contributors: {
              type: "array",
              description: "An array of contributor objects, each containing contributor information, weight, and contribution details.",
              items: {
                type: "ref",
                ref: "lex:org.hypercerts.claim.activity#contributor"
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
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      },
      contributor: {
        type: "object",
        required: ["contributorIdentity"],
        properties: {
          contributorIdentity: {
            type: "union",
            refs: [
              "lex:org.hypercerts.claim.activity#contributorIdentity",
              "lex:com.atproto.repo.strongRef"
            ],
            description: "Contributor identity as a string (DID or identifier) via org.hypercerts.claim.activity#contributorIdentity, or a strong reference to a contributor information record."
          },
          contributionWeight: {
            type: "string",
            description: "The relative weight/importance of this contribution (stored as a string to avoid float precision issues). Must be a positive numeric value. Weights do not need to sum to a specific total; normalization can be performed by the consuming application as needed."
          },
          contributionDetails: {
            type: "union",
            refs: [
              "lex:org.hypercerts.claim.activity#contributorRole",
              "lex:com.atproto.repo.strongRef"
            ],
            description: "Contribution details as a string via org.hypercerts.claim.activity#contributorRole, or a strong reference to a contribution details record."
          }
        }
      },
      contributorIdentity: {
        type: "object",
        description: "Contributor information as a string (DID or identifier).",
        required: ["identity"],
        properties: {
          identity: {
            type: "string",
            description: "The contributor identity string (DID or identifier).",
            maxLength: 1e3,
            maxGraphemes: 100
          }
        }
      },
      contributorRole: {
        type: "object",
        description: "Contribution details as a string.",
        required: ["role"],
        properties: {
          role: {
            type: "string",
            description: "The contribution role or details.",
            maxLength: 1e3,
            maxGraphemes: 100
          }
        }
      },
      workScopeString: {
        type: "object",
        description: "A free-form string describing the work scope for simple or legacy scopes.",
        required: ["scope"],
        properties: {
          scope: {
            type: "string",
            description: "The work scope description string.",
            maxLength: 1e3,
            maxGraphemes: 100
          }
        }
      }
    }
  },
  OrgHypercertsClaimAttachment: {
    lexicon: 1,
    id: "org.hypercerts.claim.attachment",
    defs: {
      main: {
        type: "record",
        description: "An attachment providing commentary, context, evidence, or documentary material related to a hypercert record (e.g. an activity, project, claim, or evaluation).",
        key: "tid",
        record: {
          type: "object",
          required: ["title", "content", "createdAt"],
          properties: {
            subjects: {
              type: "array",
              description: "References to the subject(s) the attachment is connected to\u2014this may be an activity claim, outcome claim, measurement, evaluation, or even another attachment. This is optional as the attachment can exist before the claim is recorded.",
              items: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              maxLength: 100
            },
            contentType: {
              type: "string",
              maxLength: 64,
              description: "The type of attachment, e.g. report, audit, evidence, testimonial, methodology, etc."
            },
            content: {
              type: "array",
              description: "The files, documents, or external references included in this attachment record.",
              items: {
                type: "union",
                refs: [
                  "lex:org.hypercerts.defs#uri",
                  "lex:org.hypercerts.defs#smallBlob"
                ]
              },
              maxLength: 100
            },
            title: {
              type: "string",
              maxLength: 256,
              description: "Title of this attachment."
            },
            shortDescription: {
              type: "string",
              description: "Short summary of this attachment, suitable for previews and list views. Rich text annotations may be provided via `shortDescriptionFacets`.",
              maxLength: 3e3,
              maxGraphemes: 300
            },
            shortDescriptionFacets: {
              type: "array",
              description: "Rich text annotations for `shortDescription` (mentions, URLs, hashtags, etc).",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            description: {
              type: "string",
              description: "Optional longer description of this attachment, including context or interpretation. Rich text annotations may be provided via `descriptionFacets`.",
              maxLength: 3e4,
              maxGraphemes: 3e3
            },
            descriptionFacets: {
              type: "array",
              description: "Rich text annotations for `description` (mentions, URLs, hashtags, etc).",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            location: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the location where this attachment's subject matter occurred. The record referenced must conform with the lexicon app.certified.location."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created."
            }
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
        description: "A collection/group of items (activities and/or other collections). Collections support recursive nesting.",
        key: "tid",
        record: {
          type: "object",
          required: ["title", "items", "createdAt"],
          properties: {
            type: {
              type: "string",
              description: "The type of this collection. Possible fields can be 'favorites', 'project', or any other type of collection."
            },
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
              description: "Short summary of this collection, suitable for previews and list views"
            },
            description: {
              type: "ref",
              ref: "lex:pub.leaflet.pages.linearDocument#main",
              description: "Rich-text description, represented as a Leaflet linear document."
            },
            avatar: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallImage"
              ],
              description: "The collection's avatar/profile image as a URI or image blob."
            },
            banner: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#largeImage"
              ],
              description: "Larger horizontal image to display behind the collection view."
            },
            items: {
              type: "array",
              description: "Array of items in this collection with optional weights.",
              items: {
                type: "ref",
                ref: "lex:org.hypercerts.claim.collection#item"
              }
            },
            location: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the location where this collection's activities were performed. The record referenced must conform with the lexicon app.certified.location."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      },
      item: {
        type: "object",
        required: ["itemIdentifier"],
        properties: {
          itemIdentifier: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef",
            description: "Strong reference to an item in this collection. Items can be activities (org.hypercerts.claim.activity) and/or other collections (org.hypercerts.claim.collection)."
          },
          itemWeight: {
            type: "string",
            description: "Optional weight for this item (positive numeric value stored as string). Weights do not need to sum to a specific total; normalization can be performed by the consuming application as needed."
          }
        }
      }
    }
  },
  OrgHypercertsClaimContributionDetails: {
    lexicon: 1,
    id: "org.hypercerts.claim.contributionDetails",
    defs: {
      main: {
        type: "record",
        description: "Details about a specific contribution including role, description, and timeframe.",
        key: "tid",
        record: {
          type: "object",
          required: ["createdAt"],
          properties: {
            role: {
              type: "string",
              description: "Role or title of the contributor.",
              maxLength: 100
            },
            contributionDescription: {
              type: "string",
              description: "What the contribution concretely was.",
              maxLength: 1e4,
              maxGraphemes: 1e3
            },
            startDate: {
              type: "string",
              format: "datetime",
              description: "When this contribution started. This should be a subset of the hypercert timeframe."
            },
            endDate: {
              type: "string",
              format: "datetime",
              description: "When this contribution finished. This should be a subset of the hypercert timeframe."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created."
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimContributorInformation: {
    lexicon: 1,
    id: "org.hypercerts.claim.contributorInformation",
    defs: {
      main: {
        type: "record",
        description: "Contributor information including identifier, display name, and image.",
        key: "tid",
        record: {
          type: "object",
          required: ["createdAt"],
          properties: {
            identifier: {
              type: "string",
              description: "DID or a URI to a social profile of the contributor."
            },
            displayName: {
              type: "string",
              description: "Display name of the contributor.",
              maxLength: 100
            },
            image: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallImage"
              ],
              description: "The contributor visual representation as a URI or image blob."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created."
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
              description: "Optional references to the measurements that contributed to this evaluation. The record(s) referenced must conform with the lexicon org.hypercerts.claim.measurement",
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
          required: ["metric", "unit", "value", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the record this measurement refers to (e.g. an activity, project, or claim)."
            },
            metric: {
              type: "string",
              description: "The metric being measured, e.g. forest area restored, number of users, etc.",
              maxLength: 500
            },
            unit: {
              type: "string",
              description: "The unit of the measured value (e.g. kg CO\u2082e, hectares, %, index score).",
              maxLength: 50
            },
            value: {
              type: "string",
              description: "The measured numeric value.",
              maxLength: 500
            },
            startDate: {
              type: "string",
              format: "datetime",
              description: "The start date and time when the measurement began."
            },
            endDate: {
              type: "string",
              format: "datetime",
              description: "The end date and time when the measurement ended. If it was a one time measurement, the endDate should be equal to the startDate."
            },
            locations: {
              type: "array",
              description: "Optional geographic references related to where the measurement was taken. Each referenced record must conform with the app.certified.location lexicon.",
              items: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              maxLength: 100
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
            measurers: {
              type: "array",
              description: "DIDs of the entity (or entities) that measured this data",
              items: {
                type: "ref",
                ref: "lex:app.certified.defs#did"
              },
              maxLength: 100
            },
            comment: {
              type: "string",
              description: "Short comment of this measurement, suitable for previews and list views. Rich text annotations may be provided via `commentFacets`.",
              maxLength: 3e3,
              maxGraphemes: 300
            },
            commentFacets: {
              type: "array",
              description: "Rich text annotations for `comment` (mentions, URLs, hashtags, etc).",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
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
  OrgHypercertsHelperWorkScopeTag: {
    lexicon: 1,
    id: "org.hypercerts.helper.workScopeTag",
    defs: {
      main: {
        type: "record",
        description: "A reusable scope atom for work scope logic expressions. Scopes can represent topics, languages, domains, deliverables, methods, regions, tags, or other categorical labels.",
        key: "tid",
        record: {
          type: "object",
          required: ["createdAt", "key", "label"],
          properties: {
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            },
            key: {
              type: "string",
              description: "Lowercase, hyphenated machine-readable key for this scope (e.g., 'ipfs', 'go-lang', 'filecoin').",
              maxLength: 120
            },
            label: {
              type: "string",
              description: "Human-readable label for this scope.",
              maxLength: 200
            },
            kind: {
              type: "string",
              description: "Category type of this scope. Recommended values: topic, language, domain, method, tag.",
              maxLength: 50
            },
            description: {
              type: "string",
              description: "Optional longer description of this scope.",
              maxLength: 1e4,
              maxGraphemes: 1e3
            },
            parent: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "Optional strong reference to a parent scope record for taxonomy/hierarchy support."
            },
            aliases: {
              type: "array",
              items: {
                type: "string",
                maxLength: 200
              },
              maxLength: 50,
              description: "Optional array of alternative names or identifiers for this scope."
            },
            externalReference: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallBlob"
              ],
              description: "Optional external reference for this scope as a URI or blob."
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
function validate(v, id53, hash, requiredType) {
  return (requiredType ? is$typed : maybe$typed)(v, id53, hash) ? lexicons.validate(`${id53}#${hash}`, v) : {
    success: false,
    error: new ValidationError(
      `Must be an object with "${hash === "main" ? id53 : `${id53}#${hash}`}" $type property`
    )
  };
}

// lex-api/types/app/bsky/richtext/facet.ts
var facet_exports = {};
__export(facet_exports, {
  isByteSlice: () => isByteSlice,
  isLink: () => isLink,
  isMain: () => isMain,
  isMention: () => isMention,
  isTag: () => isTag,
  validateByteSlice: () => validateByteSlice,
  validateLink: () => validateLink,
  validateMain: () => validateMain,
  validateMention: () => validateMention,
  validateTag: () => validateTag
});
var is$typed2 = is$typed;
var validate2 = validate;
var id = "app.bsky.richtext.facet";
var hashMain = "main";
function isMain(v) {
  return is$typed2(v, id, hashMain);
}
function validateMain(v) {
  return validate2(v, id, hashMain);
}
var hashMention = "mention";
function isMention(v) {
  return is$typed2(v, id, hashMention);
}
function validateMention(v) {
  return validate2(v, id, hashMention);
}
var hashLink = "link";
function isLink(v) {
  return is$typed2(v, id, hashLink);
}
function validateLink(v) {
  return validate2(v, id, hashLink);
}
var hashTag = "tag";
function isTag(v) {
  return is$typed2(v, id, hashTag);
}
function validateTag(v) {
  return validate2(v, id, hashTag);
}
var hashByteSlice = "byteSlice";
function isByteSlice(v) {
  return is$typed2(v, id, hashByteSlice);
}
function validateByteSlice(v) {
  return validate2(v, id, hashByteSlice);
}

// lex-api/types/app/certified/badge/award.ts
var award_exports = {};
__export(award_exports, {
  isMain: () => isMain2,
  isRecord: () => isMain2,
  validateMain: () => validateMain2,
  validateRecord: () => validateMain2
});
var is$typed3 = is$typed;
var validate3 = validate;
var id2 = "app.certified.badge.award";
var hashMain2 = "main";
function isMain2(v) {
  return is$typed3(v, id2, hashMain2);
}
function validateMain2(v) {
  return validate3(v, id2, hashMain2, true);
}

// lex-api/types/app/certified/badge/definition.ts
var definition_exports = {};
__export(definition_exports, {
  isMain: () => isMain3,
  isRecord: () => isMain3,
  validateMain: () => validateMain3,
  validateRecord: () => validateMain3
});
var is$typed4 = is$typed;
var validate4 = validate;
var id3 = "app.certified.badge.definition";
var hashMain3 = "main";
function isMain3(v) {
  return is$typed4(v, id3, hashMain3);
}
function validateMain3(v) {
  return validate4(v, id3, hashMain3, true);
}

// lex-api/types/app/certified/badge/response.ts
var response_exports = {};
__export(response_exports, {
  isMain: () => isMain4,
  isRecord: () => isMain4,
  validateMain: () => validateMain4,
  validateRecord: () => validateMain4
});
var is$typed5 = is$typed;
var validate5 = validate;
var id4 = "app.certified.badge.response";
var hashMain4 = "main";
function isMain4(v) {
  return is$typed5(v, id4, hashMain4);
}
function validateMain4(v) {
  return validate5(v, id4, hashMain4, true);
}

// lex-api/types/app/certified/defs.ts
var defs_exports = {};
__export(defs_exports, {
  isDid: () => isDid,
  validateDid: () => validateDid
});
var is$typed6 = is$typed;
var validate6 = validate;
var id5 = "app.certified.defs";
var hashDid = "did";
function isDid(v) {
  return is$typed6(v, id5, hashDid);
}
function validateDid(v) {
  return validate6(v, id5, hashDid);
}

// lex-api/types/app/certified/location.ts
var location_exports = {};
__export(location_exports, {
  isMain: () => isMain5,
  isRecord: () => isMain5,
  isString: () => isString,
  validateMain: () => validateMain5,
  validateRecord: () => validateMain5,
  validateString: () => validateString
});
var is$typed7 = is$typed;
var validate7 = validate;
var id6 = "app.certified.location";
var hashMain5 = "main";
function isMain5(v) {
  return is$typed7(v, id6, hashMain5);
}
function validateMain5(v) {
  return validate7(v, id6, hashMain5, true);
}
var hashString = "string";
function isString(v) {
  return is$typed7(v, id6, hashString);
}
function validateString(v) {
  return validate7(v, id6, hashString);
}

// lex-api/types/app/gainforest/common/defs.ts
var defs_exports2 = {};
__export(defs_exports2, {
  isAudio: () => isAudio,
  isDataFile: () => isDataFile,
  isDocument: () => isDocument,
  isGeneticData: () => isGeneticData,
  isGeospatial: () => isGeospatial,
  isGpsTrack: () => isGpsTrack,
  isImage: () => isImage,
  isImageThumbnail: () => isImageThumbnail,
  isIndexedOrganization: () => isIndexedOrganization,
  isSensorData: () => isSensorData,
  isSpectrogram: () => isSpectrogram,
  isUri: () => isUri,
  isVideo: () => isVideo,
  validateAudio: () => validateAudio,
  validateDataFile: () => validateDataFile,
  validateDocument: () => validateDocument,
  validateGeneticData: () => validateGeneticData,
  validateGeospatial: () => validateGeospatial,
  validateGpsTrack: () => validateGpsTrack,
  validateImage: () => validateImage,
  validateImageThumbnail: () => validateImageThumbnail,
  validateIndexedOrganization: () => validateIndexedOrganization,
  validateSensorData: () => validateSensorData,
  validateSpectrogram: () => validateSpectrogram,
  validateUri: () => validateUri,
  validateVideo: () => validateVideo
});
var is$typed8 = is$typed;
var validate8 = validate;
var id7 = "app.gainforest.common.defs";
var hashUri = "uri";
function isUri(v) {
  return is$typed8(v, id7, hashUri);
}
function validateUri(v) {
  return validate8(v, id7, hashUri);
}
var hashImage = "image";
function isImage(v) {
  return is$typed8(v, id7, hashImage);
}
function validateImage(v) {
  return validate8(v, id7, hashImage);
}
var hashImageThumbnail = "imageThumbnail";
function isImageThumbnail(v) {
  return is$typed8(v, id7, hashImageThumbnail);
}
function validateImageThumbnail(v) {
  return validate8(v, id7, hashImageThumbnail);
}
var hashVideo = "video";
function isVideo(v) {
  return is$typed8(v, id7, hashVideo);
}
function validateVideo(v) {
  return validate8(v, id7, hashVideo);
}
var hashAudio = "audio";
function isAudio(v) {
  return is$typed8(v, id7, hashAudio);
}
function validateAudio(v) {
  return validate8(v, id7, hashAudio);
}
var hashSpectrogram = "spectrogram";
function isSpectrogram(v) {
  return is$typed8(v, id7, hashSpectrogram);
}
function validateSpectrogram(v) {
  return validate8(v, id7, hashSpectrogram);
}
var hashDocument = "document";
function isDocument(v) {
  return is$typed8(v, id7, hashDocument);
}
function validateDocument(v) {
  return validate8(v, id7, hashDocument);
}
var hashDataFile = "dataFile";
function isDataFile(v) {
  return is$typed8(v, id7, hashDataFile);
}
function validateDataFile(v) {
  return validate8(v, id7, hashDataFile);
}
var hashGpsTrack = "gpsTrack";
function isGpsTrack(v) {
  return is$typed8(v, id7, hashGpsTrack);
}
function validateGpsTrack(v) {
  return validate8(v, id7, hashGpsTrack);
}
var hashGeospatial = "geospatial";
function isGeospatial(v) {
  return is$typed8(v, id7, hashGeospatial);
}
function validateGeospatial(v) {
  return validate8(v, id7, hashGeospatial);
}
var hashSensorData = "sensorData";
function isSensorData(v) {
  return is$typed8(v, id7, hashSensorData);
}
function validateSensorData(v) {
  return validate8(v, id7, hashSensorData);
}
var hashGeneticData = "geneticData";
function isGeneticData(v) {
  return is$typed8(v, id7, hashGeneticData);
}
function validateGeneticData(v) {
  return validate8(v, id7, hashGeneticData);
}
var hashIndexedOrganization = "indexedOrganization";
function isIndexedOrganization(v) {
  return is$typed8(v, id7, hashIndexedOrganization);
}
function validateIndexedOrganization(v) {
  return validate8(v, id7, hashIndexedOrganization);
}

// lex-api/types/app/gainforest/dwc/defs.ts
var defs_exports3 = {};
__export(defs_exports3, {
  isGeolocation: () => isGeolocation,
  isTaxonIdentification: () => isTaxonIdentification,
  validateGeolocation: () => validateGeolocation,
  validateTaxonIdentification: () => validateTaxonIdentification
});
var is$typed9 = is$typed;
var validate9 = validate;
var id8 = "app.gainforest.dwc.defs";
var hashGeolocation = "geolocation";
function isGeolocation(v) {
  return is$typed9(v, id8, hashGeolocation);
}
function validateGeolocation(v) {
  return validate9(v, id8, hashGeolocation);
}
var hashTaxonIdentification = "taxonIdentification";
function isTaxonIdentification(v) {
  return is$typed9(v, id8, hashTaxonIdentification);
}
function validateTaxonIdentification(v) {
  return validate9(v, id8, hashTaxonIdentification);
}

// lex-api/types/app/gainforest/dwc/event.ts
var event_exports = {};
__export(event_exports, {
  isMain: () => isMain6,
  isRecord: () => isMain6,
  validateMain: () => validateMain6,
  validateRecord: () => validateMain6
});
var is$typed10 = is$typed;
var validate10 = validate;
var id9 = "app.gainforest.dwc.event";
var hashMain6 = "main";
function isMain6(v) {
  return is$typed10(v, id9, hashMain6);
}
function validateMain6(v) {
  return validate10(v, id9, hashMain6, true);
}

// lex-api/types/app/gainforest/dwc/measurement.ts
var measurement_exports = {};
__export(measurement_exports, {
  isMain: () => isMain7,
  isRecord: () => isMain7,
  validateMain: () => validateMain7,
  validateRecord: () => validateMain7
});
var is$typed11 = is$typed;
var validate11 = validate;
var id10 = "app.gainforest.dwc.measurement";
var hashMain7 = "main";
function isMain7(v) {
  return is$typed11(v, id10, hashMain7);
}
function validateMain7(v) {
  return validate11(v, id10, hashMain7, true);
}

// lex-api/types/app/gainforest/dwc/occurrence.ts
var occurrence_exports = {};
__export(occurrence_exports, {
  isMain: () => isMain8,
  isRecord: () => isMain8,
  validateMain: () => validateMain8,
  validateRecord: () => validateMain8
});
var is$typed12 = is$typed;
var validate12 = validate;
var id11 = "app.gainforest.dwc.occurrence";
var hashMain8 = "main";
function isMain8(v) {
  return is$typed12(v, id11, hashMain8);
}
function validateMain8(v) {
  return validate12(v, id11, hashMain8, true);
}

// lex-api/types/app/gainforest/evaluator/defs.ts
var defs_exports4 = {};
__export(defs_exports4, {
  isCandidateTaxon: () => isCandidateTaxon,
  isClassificationResult: () => isClassificationResult,
  isDataQualityResult: () => isDataQualityResult,
  isDerivedMeasurement: () => isDerivedMeasurement,
  isMeasurementResult: () => isMeasurementResult,
  isMethodInfo: () => isMethodInfo,
  isQualityFlag: () => isQualityFlag,
  isSpeciesIdResult: () => isSpeciesIdResult,
  isSubjectRef: () => isSubjectRef,
  isVerificationResult: () => isVerificationResult,
  validateCandidateTaxon: () => validateCandidateTaxon,
  validateClassificationResult: () => validateClassificationResult,
  validateDataQualityResult: () => validateDataQualityResult,
  validateDerivedMeasurement: () => validateDerivedMeasurement,
  validateMeasurementResult: () => validateMeasurementResult,
  validateMethodInfo: () => validateMethodInfo,
  validateQualityFlag: () => validateQualityFlag,
  validateSpeciesIdResult: () => validateSpeciesIdResult,
  validateSubjectRef: () => validateSubjectRef,
  validateVerificationResult: () => validateVerificationResult
});
var is$typed13 = is$typed;
var validate13 = validate;
var id12 = "app.gainforest.evaluator.defs";
var hashSubjectRef = "subjectRef";
function isSubjectRef(v) {
  return is$typed13(v, id12, hashSubjectRef);
}
function validateSubjectRef(v) {
  return validate13(v, id12, hashSubjectRef);
}
var hashMethodInfo = "methodInfo";
function isMethodInfo(v) {
  return is$typed13(v, id12, hashMethodInfo);
}
function validateMethodInfo(v) {
  return validate13(v, id12, hashMethodInfo);
}
var hashCandidateTaxon = "candidateTaxon";
function isCandidateTaxon(v) {
  return is$typed13(v, id12, hashCandidateTaxon);
}
function validateCandidateTaxon(v) {
  return validate13(v, id12, hashCandidateTaxon);
}
var hashQualityFlag = "qualityFlag";
function isQualityFlag(v) {
  return is$typed13(v, id12, hashQualityFlag);
}
function validateQualityFlag(v) {
  return validate13(v, id12, hashQualityFlag);
}
var hashDerivedMeasurement = "derivedMeasurement";
function isDerivedMeasurement(v) {
  return is$typed13(v, id12, hashDerivedMeasurement);
}
function validateDerivedMeasurement(v) {
  return validate13(v, id12, hashDerivedMeasurement);
}
var hashSpeciesIdResult = "speciesIdResult";
function isSpeciesIdResult(v) {
  return is$typed13(v, id12, hashSpeciesIdResult);
}
function validateSpeciesIdResult(v) {
  return validate13(v, id12, hashSpeciesIdResult);
}
var hashDataQualityResult = "dataQualityResult";
function isDataQualityResult(v) {
  return is$typed13(v, id12, hashDataQualityResult);
}
function validateDataQualityResult(v) {
  return validate13(v, id12, hashDataQualityResult);
}
var hashVerificationResult = "verificationResult";
function isVerificationResult(v) {
  return is$typed13(v, id12, hashVerificationResult);
}
function validateVerificationResult(v) {
  return validate13(v, id12, hashVerificationResult);
}
var hashClassificationResult = "classificationResult";
function isClassificationResult(v) {
  return is$typed13(v, id12, hashClassificationResult);
}
function validateClassificationResult(v) {
  return validate13(v, id12, hashClassificationResult);
}
var hashMeasurementResult = "measurementResult";
function isMeasurementResult(v) {
  return is$typed13(v, id12, hashMeasurementResult);
}
function validateMeasurementResult(v) {
  return validate13(v, id12, hashMeasurementResult);
}

// lex-api/types/app/gainforest/evaluator/evaluation.ts
var evaluation_exports = {};
__export(evaluation_exports, {
  isMain: () => isMain9,
  isRecord: () => isMain9,
  validateMain: () => validateMain9,
  validateRecord: () => validateMain9
});
var is$typed14 = is$typed;
var validate14 = validate;
var id13 = "app.gainforest.evaluator.evaluation";
var hashMain9 = "main";
function isMain9(v) {
  return is$typed14(v, id13, hashMain9);
}
function validateMain9(v) {
  return validate14(v, id13, hashMain9, true);
}

// lex-api/types/app/gainforest/evaluator/service.ts
var service_exports = {};
__export(service_exports, {
  isEvaluationTypeDefinition: () => isEvaluationTypeDefinition,
  isEvaluationTypeLocale: () => isEvaluationTypeLocale,
  isEvaluatorPolicies: () => isEvaluatorPolicies,
  isMain: () => isMain10,
  isRecord: () => isMain10,
  validateEvaluationTypeDefinition: () => validateEvaluationTypeDefinition,
  validateEvaluationTypeLocale: () => validateEvaluationTypeLocale,
  validateEvaluatorPolicies: () => validateEvaluatorPolicies,
  validateMain: () => validateMain10,
  validateRecord: () => validateMain10
});
var is$typed15 = is$typed;
var validate15 = validate;
var id14 = "app.gainforest.evaluator.service";
var hashMain10 = "main";
function isMain10(v) {
  return is$typed15(v, id14, hashMain10);
}
function validateMain10(v) {
  return validate15(v, id14, hashMain10, true);
}
var hashEvaluatorPolicies = "evaluatorPolicies";
function isEvaluatorPolicies(v) {
  return is$typed15(v, id14, hashEvaluatorPolicies);
}
function validateEvaluatorPolicies(v) {
  return validate15(v, id14, hashEvaluatorPolicies);
}
var hashEvaluationTypeDefinition = "evaluationTypeDefinition";
function isEvaluationTypeDefinition(v) {
  return is$typed15(v, id14, hashEvaluationTypeDefinition);
}
function validateEvaluationTypeDefinition(v) {
  return validate15(
    v,
    id14,
    hashEvaluationTypeDefinition
  );
}
var hashEvaluationTypeLocale = "evaluationTypeLocale";
function isEvaluationTypeLocale(v) {
  return is$typed15(v, id14, hashEvaluationTypeLocale);
}
function validateEvaluationTypeLocale(v) {
  return validate15(v, id14, hashEvaluationTypeLocale);
}

// lex-api/types/app/gainforest/evaluator/subscription.ts
var subscription_exports = {};
__export(subscription_exports, {
  isMain: () => isMain11,
  isRecord: () => isMain11,
  validateMain: () => validateMain11,
  validateRecord: () => validateMain11
});
var is$typed16 = is$typed;
var validate16 = validate;
var id15 = "app.gainforest.evaluator.subscription";
var hashMain11 = "main";
function isMain11(v) {
  return is$typed16(v, id15, hashMain11);
}
function validateMain11(v) {
  return validate16(v, id15, hashMain11, true);
}

// lex-api/types/app/gainforest/organization/defaultSite.ts
var defaultSite_exports = {};
__export(defaultSite_exports, {
  isMain: () => isMain12,
  isRecord: () => isMain12,
  validateMain: () => validateMain12,
  validateRecord: () => validateMain12
});
var is$typed17 = is$typed;
var validate17 = validate;
var id16 = "app.gainforest.organization.defaultSite";
var hashMain12 = "main";
function isMain12(v) {
  return is$typed17(v, id16, hashMain12);
}
function validateMain12(v) {
  return validate17(v, id16, hashMain12, true);
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
  isMain: () => isMain13,
  isRecord: () => isMain13,
  validateMain: () => validateMain13,
  validateRecord: () => validateMain13
});
var is$typed18 = is$typed;
var validate18 = validate;
var id17 = "app.gainforest.organization.info";
var hashMain13 = "main";
function isMain13(v) {
  return is$typed18(v, id17, hashMain13);
}
function validateMain13(v) {
  return validate18(v, id17, hashMain13, true);
}

// lex-api/types/app/gainforest/organization/layer.ts
var layer_exports = {};
__export(layer_exports, {
  isMain: () => isMain14,
  isRecord: () => isMain14,
  validateMain: () => validateMain14,
  validateRecord: () => validateMain14
});
var is$typed19 = is$typed;
var validate19 = validate;
var id18 = "app.gainforest.organization.layer";
var hashMain14 = "main";
function isMain14(v) {
  return is$typed19(v, id18, hashMain14);
}
function validateMain14(v) {
  return validate19(v, id18, hashMain14, true);
}

// lex-api/types/app/gainforest/organization/observations/dendogram.ts
var dendogram_exports = {};
__export(dendogram_exports, {
  isMain: () => isMain15,
  isRecord: () => isMain15,
  validateMain: () => validateMain15,
  validateRecord: () => validateMain15
});
var is$typed20 = is$typed;
var validate20 = validate;
var id19 = "app.gainforest.organization.observations.dendogram";
var hashMain15 = "main";
function isMain15(v) {
  return is$typed20(v, id19, hashMain15);
}
function validateMain15(v) {
  return validate20(v, id19, hashMain15, true);
}

// lex-api/types/app/gainforest/organization/observations/fauna.ts
var fauna_exports = {};
__export(fauna_exports, {
  isMain: () => isMain16,
  isRecord: () => isMain16,
  validateMain: () => validateMain16,
  validateRecord: () => validateMain16
});
var is$typed21 = is$typed;
var validate21 = validate;
var id20 = "app.gainforest.organization.observations.fauna";
var hashMain16 = "main";
function isMain16(v) {
  return is$typed21(v, id20, hashMain16);
}
function validateMain16(v) {
  return validate21(v, id20, hashMain16, true);
}

// lex-api/types/app/gainforest/organization/observations/flora.ts
var flora_exports = {};
__export(flora_exports, {
  isMain: () => isMain17,
  isRecord: () => isMain17,
  validateMain: () => validateMain17,
  validateRecord: () => validateMain17
});
var is$typed22 = is$typed;
var validate22 = validate;
var id21 = "app.gainforest.organization.observations.flora";
var hashMain17 = "main";
function isMain17(v) {
  return is$typed22(v, id21, hashMain17);
}
function validateMain17(v) {
  return validate22(v, id21, hashMain17, true);
}

// lex-api/types/app/gainforest/organization/observations/measuredTreesCluster.ts
var measuredTreesCluster_exports = {};
__export(measuredTreesCluster_exports, {
  isMain: () => isMain18,
  isRecord: () => isMain18,
  validateMain: () => validateMain18,
  validateRecord: () => validateMain18
});
var is$typed23 = is$typed;
var validate23 = validate;
var id22 = "app.gainforest.organization.observations.measuredTreesCluster";
var hashMain18 = "main";
function isMain18(v) {
  return is$typed23(v, id22, hashMain18);
}
function validateMain18(v) {
  return validate23(v, id22, hashMain18, true);
}

// lex-api/types/app/gainforest/organization/predictions/fauna.ts
var fauna_exports2 = {};
__export(fauna_exports2, {
  isMain: () => isMain19,
  isRecord: () => isMain19,
  validateMain: () => validateMain19,
  validateRecord: () => validateMain19
});
var is$typed24 = is$typed;
var validate24 = validate;
var id23 = "app.gainforest.organization.predictions.fauna";
var hashMain19 = "main";
function isMain19(v) {
  return is$typed24(v, id23, hashMain19);
}
function validateMain19(v) {
  return validate24(v, id23, hashMain19, true);
}

// lex-api/types/app/gainforest/organization/predictions/flora.ts
var flora_exports2 = {};
__export(flora_exports2, {
  isMain: () => isMain20,
  isRecord: () => isMain20,
  validateMain: () => validateMain20,
  validateRecord: () => validateMain20
});
var is$typed25 = is$typed;
var validate25 = validate;
var id24 = "app.gainforest.organization.predictions.flora";
var hashMain20 = "main";
function isMain20(v) {
  return is$typed25(v, id24, hashMain20);
}
function validateMain20(v) {
  return validate25(v, id24, hashMain20, true);
}

// lex-api/types/com/atproto/repo/strongRef.ts
var strongRef_exports = {};
__export(strongRef_exports, {
  isMain: () => isMain21,
  validateMain: () => validateMain21
});
var is$typed26 = is$typed;
var validate26 = validate;
var id25 = "com.atproto.repo.strongRef";
var hashMain21 = "main";
function isMain21(v) {
  return is$typed26(v, id25, hashMain21);
}
function validateMain21(v) {
  return validate26(v, id25, hashMain21);
}

// lex-api/types/org/hypercerts/claim/activity.ts
var activity_exports = {};
__export(activity_exports, {
  isContributor: () => isContributor,
  isContributorIdentity: () => isContributorIdentity,
  isContributorRole: () => isContributorRole,
  isMain: () => isMain22,
  isRecord: () => isMain22,
  isWorkScopeString: () => isWorkScopeString,
  validateContributor: () => validateContributor,
  validateContributorIdentity: () => validateContributorIdentity,
  validateContributorRole: () => validateContributorRole,
  validateMain: () => validateMain22,
  validateRecord: () => validateMain22,
  validateWorkScopeString: () => validateWorkScopeString
});
var is$typed27 = is$typed;
var validate27 = validate;
var id26 = "org.hypercerts.claim.activity";
var hashMain22 = "main";
function isMain22(v) {
  return is$typed27(v, id26, hashMain22);
}
function validateMain22(v) {
  return validate27(v, id26, hashMain22, true);
}
var hashContributor = "contributor";
function isContributor(v) {
  return is$typed27(v, id26, hashContributor);
}
function validateContributor(v) {
  return validate27(v, id26, hashContributor);
}
var hashContributorIdentity = "contributorIdentity";
function isContributorIdentity(v) {
  return is$typed27(v, id26, hashContributorIdentity);
}
function validateContributorIdentity(v) {
  return validate27(v, id26, hashContributorIdentity);
}
var hashContributorRole = "contributorRole";
function isContributorRole(v) {
  return is$typed27(v, id26, hashContributorRole);
}
function validateContributorRole(v) {
  return validate27(v, id26, hashContributorRole);
}
var hashWorkScopeString = "workScopeString";
function isWorkScopeString(v) {
  return is$typed27(v, id26, hashWorkScopeString);
}
function validateWorkScopeString(v) {
  return validate27(v, id26, hashWorkScopeString);
}

// lex-api/types/org/hypercerts/claim/attachment.ts
var attachment_exports = {};
__export(attachment_exports, {
  isMain: () => isMain23,
  isRecord: () => isMain23,
  validateMain: () => validateMain23,
  validateRecord: () => validateMain23
});
var is$typed28 = is$typed;
var validate28 = validate;
var id27 = "org.hypercerts.claim.attachment";
var hashMain23 = "main";
function isMain23(v) {
  return is$typed28(v, id27, hashMain23);
}
function validateMain23(v) {
  return validate28(v, id27, hashMain23, true);
}

// lex-api/types/org/hypercerts/claim/collection.ts
var collection_exports = {};
__export(collection_exports, {
  isItem: () => isItem,
  isMain: () => isMain24,
  isRecord: () => isMain24,
  validateItem: () => validateItem,
  validateMain: () => validateMain24,
  validateRecord: () => validateMain24
});
var is$typed29 = is$typed;
var validate29 = validate;
var id28 = "org.hypercerts.claim.collection";
var hashMain24 = "main";
function isMain24(v) {
  return is$typed29(v, id28, hashMain24);
}
function validateMain24(v) {
  return validate29(v, id28, hashMain24, true);
}
var hashItem = "item";
function isItem(v) {
  return is$typed29(v, id28, hashItem);
}
function validateItem(v) {
  return validate29(v, id28, hashItem);
}

// lex-api/types/org/hypercerts/claim/contributionDetails.ts
var contributionDetails_exports = {};
__export(contributionDetails_exports, {
  isMain: () => isMain25,
  isRecord: () => isMain25,
  validateMain: () => validateMain25,
  validateRecord: () => validateMain25
});
var is$typed30 = is$typed;
var validate30 = validate;
var id29 = "org.hypercerts.claim.contributionDetails";
var hashMain25 = "main";
function isMain25(v) {
  return is$typed30(v, id29, hashMain25);
}
function validateMain25(v) {
  return validate30(v, id29, hashMain25, true);
}

// lex-api/types/org/hypercerts/claim/contributorInformation.ts
var contributorInformation_exports = {};
__export(contributorInformation_exports, {
  isMain: () => isMain26,
  isRecord: () => isMain26,
  validateMain: () => validateMain26,
  validateRecord: () => validateMain26
});
var is$typed31 = is$typed;
var validate31 = validate;
var id30 = "org.hypercerts.claim.contributorInformation";
var hashMain26 = "main";
function isMain26(v) {
  return is$typed31(v, id30, hashMain26);
}
function validateMain26(v) {
  return validate31(v, id30, hashMain26, true);
}

// lex-api/types/org/hypercerts/claim/evaluation.ts
var evaluation_exports2 = {};
__export(evaluation_exports2, {
  isMain: () => isMain27,
  isRecord: () => isMain27,
  isScore: () => isScore,
  validateMain: () => validateMain27,
  validateRecord: () => validateMain27,
  validateScore: () => validateScore
});
var is$typed32 = is$typed;
var validate32 = validate;
var id31 = "org.hypercerts.claim.evaluation";
var hashScore = "score";
function isScore(v) {
  return is$typed32(v, id31, hashScore);
}
function validateScore(v) {
  return validate32(v, id31, hashScore);
}
var hashMain27 = "main";
function isMain27(v) {
  return is$typed32(v, id31, hashMain27);
}
function validateMain27(v) {
  return validate32(v, id31, hashMain27, true);
}

// lex-api/types/org/hypercerts/claim/measurement.ts
var measurement_exports2 = {};
__export(measurement_exports2, {
  isMain: () => isMain28,
  isRecord: () => isMain28,
  validateMain: () => validateMain28,
  validateRecord: () => validateMain28
});
var is$typed33 = is$typed;
var validate33 = validate;
var id32 = "org.hypercerts.claim.measurement";
var hashMain28 = "main";
function isMain28(v) {
  return is$typed33(v, id32, hashMain28);
}
function validateMain28(v) {
  return validate33(v, id32, hashMain28, true);
}

// lex-api/types/org/hypercerts/claim/rights.ts
var rights_exports = {};
__export(rights_exports, {
  isMain: () => isMain29,
  isRecord: () => isMain29,
  validateMain: () => validateMain29,
  validateRecord: () => validateMain29
});
var is$typed34 = is$typed;
var validate34 = validate;
var id33 = "org.hypercerts.claim.rights";
var hashMain29 = "main";
function isMain29(v) {
  return is$typed34(v, id33, hashMain29);
}
function validateMain29(v) {
  return validate34(v, id33, hashMain29, true);
}

// lex-api/types/org/hypercerts/defs.ts
var defs_exports5 = {};
__export(defs_exports5, {
  isLargeBlob: () => isLargeBlob,
  isLargeImage: () => isLargeImage,
  isSmallBlob: () => isSmallBlob,
  isSmallImage: () => isSmallImage,
  isUri: () => isUri2,
  validateLargeBlob: () => validateLargeBlob,
  validateLargeImage: () => validateLargeImage,
  validateSmallBlob: () => validateSmallBlob,
  validateSmallImage: () => validateSmallImage,
  validateUri: () => validateUri2
});
var is$typed35 = is$typed;
var validate35 = validate;
var id34 = "org.hypercerts.defs";
var hashUri2 = "uri";
function isUri2(v) {
  return is$typed35(v, id34, hashUri2);
}
function validateUri2(v) {
  return validate35(v, id34, hashUri2);
}
var hashSmallBlob = "smallBlob";
function isSmallBlob(v) {
  return is$typed35(v, id34, hashSmallBlob);
}
function validateSmallBlob(v) {
  return validate35(v, id34, hashSmallBlob);
}
var hashLargeBlob = "largeBlob";
function isLargeBlob(v) {
  return is$typed35(v, id34, hashLargeBlob);
}
function validateLargeBlob(v) {
  return validate35(v, id34, hashLargeBlob);
}
var hashSmallImage = "smallImage";
function isSmallImage(v) {
  return is$typed35(v, id34, hashSmallImage);
}
function validateSmallImage(v) {
  return validate35(v, id34, hashSmallImage);
}
var hashLargeImage = "largeImage";
function isLargeImage(v) {
  return is$typed35(v, id34, hashLargeImage);
}
function validateLargeImage(v) {
  return validate35(v, id34, hashLargeImage);
}

// lex-api/types/org/hypercerts/funding/receipt.ts
var receipt_exports = {};
__export(receipt_exports, {
  isMain: () => isMain30,
  isRecord: () => isMain30,
  validateMain: () => validateMain30,
  validateRecord: () => validateMain30
});
var is$typed36 = is$typed;
var validate36 = validate;
var id35 = "org.hypercerts.funding.receipt";
var hashMain30 = "main";
function isMain30(v) {
  return is$typed36(v, id35, hashMain30);
}
function validateMain30(v) {
  return validate36(v, id35, hashMain30, true);
}

// lex-api/types/org/hypercerts/helper/workScopeTag.ts
var workScopeTag_exports = {};
__export(workScopeTag_exports, {
  isMain: () => isMain31,
  isRecord: () => isMain31,
  validateMain: () => validateMain31,
  validateRecord: () => validateMain31
});
var is$typed37 = is$typed;
var validate37 = validate;
var id36 = "org.hypercerts.helper.workScopeTag";
var hashMain31 = "main";
function isMain31(v) {
  return is$typed37(v, id36, hashMain31);
}
function validateMain31(v) {
  return validate37(v, id36, hashMain31, true);
}

// lex-api/types/pub/leaflet/blocks/blockquote.ts
var blockquote_exports = {};
__export(blockquote_exports, {
  isMain: () => isMain32,
  validateMain: () => validateMain32
});
var is$typed38 = is$typed;
var validate38 = validate;
var id37 = "pub.leaflet.blocks.blockquote";
var hashMain32 = "main";
function isMain32(v) {
  return is$typed38(v, id37, hashMain32);
}
function validateMain32(v) {
  return validate38(v, id37, hashMain32);
}

// lex-api/types/pub/leaflet/blocks/bskyPost.ts
var bskyPost_exports = {};
__export(bskyPost_exports, {
  isMain: () => isMain33,
  validateMain: () => validateMain33
});
var is$typed39 = is$typed;
var validate39 = validate;
var id38 = "pub.leaflet.blocks.bskyPost";
var hashMain33 = "main";
function isMain33(v) {
  return is$typed39(v, id38, hashMain33);
}
function validateMain33(v) {
  return validate39(v, id38, hashMain33);
}

// lex-api/types/pub/leaflet/blocks/button.ts
var button_exports = {};
__export(button_exports, {
  isMain: () => isMain34,
  validateMain: () => validateMain34
});
var is$typed40 = is$typed;
var validate40 = validate;
var id39 = "pub.leaflet.blocks.button";
var hashMain34 = "main";
function isMain34(v) {
  return is$typed40(v, id39, hashMain34);
}
function validateMain34(v) {
  return validate40(v, id39, hashMain34);
}

// lex-api/types/pub/leaflet/blocks/code.ts
var code_exports = {};
__export(code_exports, {
  isMain: () => isMain35,
  validateMain: () => validateMain35
});
var is$typed41 = is$typed;
var validate41 = validate;
var id40 = "pub.leaflet.blocks.code";
var hashMain35 = "main";
function isMain35(v) {
  return is$typed41(v, id40, hashMain35);
}
function validateMain35(v) {
  return validate41(v, id40, hashMain35);
}

// lex-api/types/pub/leaflet/blocks/header.ts
var header_exports = {};
__export(header_exports, {
  isMain: () => isMain36,
  validateMain: () => validateMain36
});
var is$typed42 = is$typed;
var validate42 = validate;
var id41 = "pub.leaflet.blocks.header";
var hashMain36 = "main";
function isMain36(v) {
  return is$typed42(v, id41, hashMain36);
}
function validateMain36(v) {
  return validate42(v, id41, hashMain36);
}

// lex-api/types/pub/leaflet/blocks/horizontalRule.ts
var horizontalRule_exports = {};
__export(horizontalRule_exports, {
  isMain: () => isMain37,
  validateMain: () => validateMain37
});
var is$typed43 = is$typed;
var validate43 = validate;
var id42 = "pub.leaflet.blocks.horizontalRule";
var hashMain37 = "main";
function isMain37(v) {
  return is$typed43(v, id42, hashMain37);
}
function validateMain37(v) {
  return validate43(v, id42, hashMain37);
}

// lex-api/types/pub/leaflet/blocks/iframe.ts
var iframe_exports = {};
__export(iframe_exports, {
  isMain: () => isMain38,
  validateMain: () => validateMain38
});
var is$typed44 = is$typed;
var validate44 = validate;
var id43 = "pub.leaflet.blocks.iframe";
var hashMain38 = "main";
function isMain38(v) {
  return is$typed44(v, id43, hashMain38);
}
function validateMain38(v) {
  return validate44(v, id43, hashMain38);
}

// lex-api/types/pub/leaflet/blocks/image.ts
var image_exports = {};
__export(image_exports, {
  isAspectRatio: () => isAspectRatio,
  isMain: () => isMain39,
  validateAspectRatio: () => validateAspectRatio,
  validateMain: () => validateMain39
});
var is$typed45 = is$typed;
var validate45 = validate;
var id44 = "pub.leaflet.blocks.image";
var hashMain39 = "main";
function isMain39(v) {
  return is$typed45(v, id44, hashMain39);
}
function validateMain39(v) {
  return validate45(v, id44, hashMain39);
}
var hashAspectRatio = "aspectRatio";
function isAspectRatio(v) {
  return is$typed45(v, id44, hashAspectRatio);
}
function validateAspectRatio(v) {
  return validate45(v, id44, hashAspectRatio);
}

// lex-api/types/pub/leaflet/blocks/math.ts
var math_exports = {};
__export(math_exports, {
  isMain: () => isMain40,
  validateMain: () => validateMain40
});
var is$typed46 = is$typed;
var validate46 = validate;
var id45 = "pub.leaflet.blocks.math";
var hashMain40 = "main";
function isMain40(v) {
  return is$typed46(v, id45, hashMain40);
}
function validateMain40(v) {
  return validate46(v, id45, hashMain40);
}

// lex-api/types/pub/leaflet/blocks/page.ts
var page_exports = {};
__export(page_exports, {
  isMain: () => isMain41,
  validateMain: () => validateMain41
});
var is$typed47 = is$typed;
var validate47 = validate;
var id46 = "pub.leaflet.blocks.page";
var hashMain41 = "main";
function isMain41(v) {
  return is$typed47(v, id46, hashMain41);
}
function validateMain41(v) {
  return validate47(v, id46, hashMain41);
}

// lex-api/types/pub/leaflet/blocks/poll.ts
var poll_exports = {};
__export(poll_exports, {
  isMain: () => isMain42,
  validateMain: () => validateMain42
});
var is$typed48 = is$typed;
var validate48 = validate;
var id47 = "pub.leaflet.blocks.poll";
var hashMain42 = "main";
function isMain42(v) {
  return is$typed48(v, id47, hashMain42);
}
function validateMain42(v) {
  return validate48(v, id47, hashMain42);
}

// lex-api/types/pub/leaflet/blocks/text.ts
var text_exports = {};
__export(text_exports, {
  isMain: () => isMain43,
  validateMain: () => validateMain43
});
var is$typed49 = is$typed;
var validate49 = validate;
var id48 = "pub.leaflet.blocks.text";
var hashMain43 = "main";
function isMain43(v) {
  return is$typed49(v, id48, hashMain43);
}
function validateMain43(v) {
  return validate49(v, id48, hashMain43);
}

// lex-api/types/pub/leaflet/blocks/unorderedList.ts
var unorderedList_exports = {};
__export(unorderedList_exports, {
  isListItem: () => isListItem,
  isMain: () => isMain44,
  validateListItem: () => validateListItem,
  validateMain: () => validateMain44
});
var is$typed50 = is$typed;
var validate50 = validate;
var id49 = "pub.leaflet.blocks.unorderedList";
var hashMain44 = "main";
function isMain44(v) {
  return is$typed50(v, id49, hashMain44);
}
function validateMain44(v) {
  return validate50(v, id49, hashMain44);
}
var hashListItem = "listItem";
function isListItem(v) {
  return is$typed50(v, id49, hashListItem);
}
function validateListItem(v) {
  return validate50(v, id49, hashListItem);
}

// lex-api/types/pub/leaflet/blocks/website.ts
var website_exports = {};
__export(website_exports, {
  isMain: () => isMain45,
  validateMain: () => validateMain45
});
var is$typed51 = is$typed;
var validate51 = validate;
var id50 = "pub.leaflet.blocks.website";
var hashMain45 = "main";
function isMain45(v) {
  return is$typed51(v, id50, hashMain45);
}
function validateMain45(v) {
  return validate51(v, id50, hashMain45);
}

// lex-api/types/pub/leaflet/pages/linearDocument.ts
var linearDocument_exports = {};
__export(linearDocument_exports, {
  TEXTALIGNCENTER: () => TEXTALIGNCENTER,
  TEXTALIGNJUSTIFY: () => TEXTALIGNJUSTIFY,
  TEXTALIGNLEFT: () => TEXTALIGNLEFT,
  TEXTALIGNRIGHT: () => TEXTALIGNRIGHT,
  isBlock: () => isBlock,
  isMain: () => isMain46,
  isPosition: () => isPosition,
  isQuote: () => isQuote,
  validateBlock: () => validateBlock,
  validateMain: () => validateMain46,
  validatePosition: () => validatePosition,
  validateQuote: () => validateQuote
});
var is$typed52 = is$typed;
var validate52 = validate;
var id51 = "pub.leaflet.pages.linearDocument";
var hashMain46 = "main";
function isMain46(v) {
  return is$typed52(v, id51, hashMain46);
}
function validateMain46(v) {
  return validate52(v, id51, hashMain46);
}
var hashBlock = "block";
function isBlock(v) {
  return is$typed52(v, id51, hashBlock);
}
function validateBlock(v) {
  return validate52(v, id51, hashBlock);
}
var TEXTALIGNLEFT = `${id51}#textAlignLeft`;
var TEXTALIGNCENTER = `${id51}#textAlignCenter`;
var TEXTALIGNRIGHT = `${id51}#textAlignRight`;
var TEXTALIGNJUSTIFY = `${id51}#textAlignJustify`;
var hashQuote = "quote";
function isQuote(v) {
  return is$typed52(v, id51, hashQuote);
}
function validateQuote(v) {
  return validate52(v, id51, hashQuote);
}
var hashPosition = "position";
function isPosition(v) {
  return is$typed52(v, id51, hashPosition);
}
function validatePosition(v) {
  return validate52(v, id51, hashPosition);
}

// lex-api/types/pub/leaflet/richtext/facet.ts
var facet_exports2 = {};
__export(facet_exports2, {
  isAtMention: () => isAtMention,
  isBold: () => isBold,
  isByteSlice: () => isByteSlice2,
  isCode: () => isCode,
  isDidMention: () => isDidMention,
  isHighlight: () => isHighlight,
  isId: () => isId,
  isItalic: () => isItalic,
  isLink: () => isLink2,
  isMain: () => isMain47,
  isStrikethrough: () => isStrikethrough,
  isUnderline: () => isUnderline,
  validateAtMention: () => validateAtMention,
  validateBold: () => validateBold,
  validateByteSlice: () => validateByteSlice2,
  validateCode: () => validateCode,
  validateDidMention: () => validateDidMention,
  validateHighlight: () => validateHighlight,
  validateId: () => validateId,
  validateItalic: () => validateItalic,
  validateLink: () => validateLink2,
  validateMain: () => validateMain47,
  validateStrikethrough: () => validateStrikethrough,
  validateUnderline: () => validateUnderline
});
var is$typed53 = is$typed;
var validate53 = validate;
var id52 = "pub.leaflet.richtext.facet";
var hashMain47 = "main";
function isMain47(v) {
  return is$typed53(v, id52, hashMain47);
}
function validateMain47(v) {
  return validate53(v, id52, hashMain47);
}
var hashByteSlice2 = "byteSlice";
function isByteSlice2(v) {
  return is$typed53(v, id52, hashByteSlice2);
}
function validateByteSlice2(v) {
  return validate53(v, id52, hashByteSlice2);
}
var hashLink2 = "link";
function isLink2(v) {
  return is$typed53(v, id52, hashLink2);
}
function validateLink2(v) {
  return validate53(v, id52, hashLink2);
}
var hashDidMention = "didMention";
function isDidMention(v) {
  return is$typed53(v, id52, hashDidMention);
}
function validateDidMention(v) {
  return validate53(v, id52, hashDidMention);
}
var hashAtMention = "atMention";
function isAtMention(v) {
  return is$typed53(v, id52, hashAtMention);
}
function validateAtMention(v) {
  return validate53(v, id52, hashAtMention);
}
var hashCode = "code";
function isCode(v) {
  return is$typed53(v, id52, hashCode);
}
function validateCode(v) {
  return validate53(v, id52, hashCode);
}
var hashHighlight = "highlight";
function isHighlight(v) {
  return is$typed53(v, id52, hashHighlight);
}
function validateHighlight(v) {
  return validate53(v, id52, hashHighlight);
}
var hashUnderline = "underline";
function isUnderline(v) {
  return is$typed53(v, id52, hashUnderline);
}
function validateUnderline(v) {
  return validate53(v, id52, hashUnderline);
}
var hashStrikethrough = "strikethrough";
function isStrikethrough(v) {
  return is$typed53(v, id52, hashStrikethrough);
}
function validateStrikethrough(v) {
  return validate53(v, id52, hashStrikethrough);
}
var hashId = "id";
function isId(v) {
  return is$typed53(v, id52, hashId);
}
function validateId(v) {
  return validate53(v, id52, hashId);
}
var hashBold = "bold";
function isBold(v) {
  return is$typed53(v, id52, hashBold);
}
function validateBold(v) {
  return validate53(v, id52, hashBold);
}
var hashItalic = "italic";
function isItalic(v) {
  return is$typed53(v, id52, hashItalic);
}
function validateItalic(v) {
  return validate53(v, id52, hashItalic);
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
    __publicField(this, "bsky");
    __publicField(this, "certified");
    __publicField(this, "gainforest");
    this._client = client;
    this.bsky = new AppBskyNS(client);
    this.certified = new AppCertifiedNS(client);
    this.gainforest = new AppGainforestNS(client);
  }
};
var AppBskyNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "richtext");
    this._client = client;
    this.richtext = new AppBskyRichtextNS(client);
  }
};
var AppBskyRichtextNS = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
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
    __publicField(this, "dwc");
    __publicField(this, "evaluator");
    __publicField(this, "organization");
    this._client = client;
    this.dwc = new AppGainforestDwcNS(client);
    this.evaluator = new AppGainforestEvaluatorNS(client);
    this.organization = new AppGainforestOrganizationNS(client);
  }
};
var AppGainforestDwcNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "event");
    __publicField(this, "measurement");
    __publicField(this, "occurrence");
    this._client = client;
    this.event = new AppGainforestDwcEventRecord(client);
    this.measurement = new AppGainforestDwcMeasurementRecord(client);
    this.occurrence = new AppGainforestDwcOccurrenceRecord(client);
  }
};
var AppGainforestDwcEventRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.dwc.event",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.dwc.event",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.dwc.event";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.dwc.event";
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
      { collection: "app.gainforest.dwc.event", ...params },
      { headers }
    );
  }
};
var AppGainforestDwcMeasurementRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.dwc.measurement",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.dwc.measurement",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.dwc.measurement";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.dwc.measurement";
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
      { collection: "app.gainforest.dwc.measurement", ...params },
      { headers }
    );
  }
};
var AppGainforestDwcOccurrenceRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.dwc.occurrence",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.dwc.occurrence",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.dwc.occurrence";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.dwc.occurrence";
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
      { collection: "app.gainforest.dwc.occurrence", ...params },
      { headers }
    );
  }
};
var AppGainforestEvaluatorNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "evaluation");
    __publicField(this, "service");
    __publicField(this, "subscription");
    this._client = client;
    this.evaluation = new AppGainforestEvaluatorEvaluationRecord(client);
    this.service = new AppGainforestEvaluatorServiceRecord(client);
    this.subscription = new AppGainforestEvaluatorSubscriptionRecord(client);
  }
};
var AppGainforestEvaluatorEvaluationRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.evaluator.evaluation",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.evaluator.evaluation",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.evaluator.evaluation";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.evaluator.evaluation";
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
      { collection: "app.gainforest.evaluator.evaluation", ...params },
      { headers }
    );
  }
};
var AppGainforestEvaluatorServiceRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.evaluator.service",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.evaluator.service",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.evaluator.service";
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
    const collection = "app.gainforest.evaluator.service";
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
      { collection: "app.gainforest.evaluator.service", ...params },
      { headers }
    );
  }
};
var AppGainforestEvaluatorSubscriptionRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.evaluator.subscription",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.evaluator.subscription",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.evaluator.subscription";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.evaluator.subscription";
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
      { collection: "app.gainforest.evaluator.subscription", ...params },
      { headers }
    );
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
    __publicField(this, "helper");
    this._client = client;
    this.claim = new OrgHypercertsClaimNS(client);
    this.funding = new OrgHypercertsFundingNS(client);
    this.helper = new OrgHypercertsHelperNS(client);
  }
};
var OrgHypercertsClaimNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "activity");
    __publicField(this, "attachment");
    __publicField(this, "collection");
    __publicField(this, "contributionDetails");
    __publicField(this, "contributorInformation");
    __publicField(this, "evaluation");
    __publicField(this, "measurement");
    __publicField(this, "rights");
    this._client = client;
    this.activity = new OrgHypercertsClaimActivityRecord(client);
    this.attachment = new OrgHypercertsClaimAttachmentRecord(client);
    this.collection = new OrgHypercertsClaimCollectionRecord(client);
    this.contributionDetails = new OrgHypercertsClaimContributionDetailsRecord(
      client
    );
    this.contributorInformation = new OrgHypercertsClaimContributorInformationRecord(client);
    this.evaluation = new OrgHypercertsClaimEvaluationRecord(client);
    this.measurement = new OrgHypercertsClaimMeasurementRecord(client);
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
var OrgHypercertsClaimAttachmentRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.attachment",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.attachment",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.attachment";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.attachment";
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
      { collection: "org.hypercerts.claim.attachment", ...params },
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
var OrgHypercertsClaimContributionDetailsRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.contributionDetails",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.contributionDetails",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.contributionDetails";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.contributionDetails";
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
      { collection: "org.hypercerts.claim.contributionDetails", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimContributorInformationRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.contributorInformation",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.contributorInformation",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.contributorInformation";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.contributorInformation";
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
      { collection: "org.hypercerts.claim.contributorInformation", ...params },
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
var OrgHypercertsHelperNS = class {
  constructor(client) {
    __publicField(this, "_client");
    __publicField(this, "workScopeTag");
    this._client = client;
    this.workScopeTag = new OrgHypercertsHelperWorkScopeTagRecord(client);
  }
};
var OrgHypercertsHelperWorkScopeTagRecord = class {
  constructor(client) {
    __publicField(this, "_client");
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.helper.workScopeTag",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.helper.workScopeTag",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.helper.workScopeTag";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.helper.workScopeTag";
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
      { collection: "org.hypercerts.helper.workScopeTag", ...params },
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

export { AppBskyNS, facet_exports as AppBskyRichtextFacet, AppBskyRichtextNS, award_exports as AppCertifiedBadgeAward, AppCertifiedBadgeAwardRecord, definition_exports as AppCertifiedBadgeDefinition, AppCertifiedBadgeDefinitionRecord, AppCertifiedBadgeNS, response_exports as AppCertifiedBadgeResponse, AppCertifiedBadgeResponseRecord, defs_exports as AppCertifiedDefs, location_exports as AppCertifiedLocation, AppCertifiedLocationRecord, AppCertifiedNS, defs_exports2 as AppGainforestCommonDefs, defs_exports3 as AppGainforestDwcDefs, event_exports as AppGainforestDwcEvent, AppGainforestDwcEventRecord, measurement_exports as AppGainforestDwcMeasurement, AppGainforestDwcMeasurementRecord, AppGainforestDwcNS, occurrence_exports as AppGainforestDwcOccurrence, AppGainforestDwcOccurrenceRecord, defs_exports4 as AppGainforestEvaluatorDefs, evaluation_exports as AppGainforestEvaluatorEvaluation, AppGainforestEvaluatorEvaluationRecord, AppGainforestEvaluatorNS, service_exports as AppGainforestEvaluatorService, AppGainforestEvaluatorServiceRecord, subscription_exports as AppGainforestEvaluatorSubscription, AppGainforestEvaluatorSubscriptionRecord, AppGainforestNS, defaultSite_exports as AppGainforestOrganizationDefaultSite, AppGainforestOrganizationDefaultSiteRecord, getIndexedOrganizations_exports as AppGainforestOrganizationGetIndexedOrganizations, info_exports as AppGainforestOrganizationInfo, AppGainforestOrganizationInfoRecord, layer_exports as AppGainforestOrganizationLayer, AppGainforestOrganizationLayerRecord, AppGainforestOrganizationNS, dendogram_exports as AppGainforestOrganizationObservationsDendogram, AppGainforestOrganizationObservationsDendogramRecord, fauna_exports as AppGainforestOrganizationObservationsFauna, AppGainforestOrganizationObservationsFaunaRecord, flora_exports as AppGainforestOrganizationObservationsFlora, AppGainforestOrganizationObservationsFloraRecord, measuredTreesCluster_exports as AppGainforestOrganizationObservationsMeasuredTreesCluster, AppGainforestOrganizationObservationsMeasuredTreesClusterRecord, AppGainforestOrganizationObservationsNS, fauna_exports2 as AppGainforestOrganizationPredictionsFauna, AppGainforestOrganizationPredictionsFaunaRecord, flora_exports2 as AppGainforestOrganizationPredictionsFlora, AppGainforestOrganizationPredictionsFloraRecord, AppGainforestOrganizationPredictionsNS, AppNS, AtpBaseClient, ComAtprotoNS, ComAtprotoRepoNS, strongRef_exports as ComAtprotoRepoStrongRef, ComNS, activity_exports as OrgHypercertsClaimActivity, OrgHypercertsClaimActivityRecord, attachment_exports as OrgHypercertsClaimAttachment, OrgHypercertsClaimAttachmentRecord, collection_exports as OrgHypercertsClaimCollection, OrgHypercertsClaimCollectionRecord, contributionDetails_exports as OrgHypercertsClaimContributionDetails, OrgHypercertsClaimContributionDetailsRecord, contributorInformation_exports as OrgHypercertsClaimContributorInformation, OrgHypercertsClaimContributorInformationRecord, evaluation_exports2 as OrgHypercertsClaimEvaluation, OrgHypercertsClaimEvaluationRecord, measurement_exports2 as OrgHypercertsClaimMeasurement, OrgHypercertsClaimMeasurementRecord, OrgHypercertsClaimNS, rights_exports as OrgHypercertsClaimRights, OrgHypercertsClaimRightsRecord, defs_exports5 as OrgHypercertsDefs, OrgHypercertsFundingNS, receipt_exports as OrgHypercertsFundingReceipt, OrgHypercertsFundingReceiptRecord, OrgHypercertsHelperNS, workScopeTag_exports as OrgHypercertsHelperWorkScopeTag, OrgHypercertsHelperWorkScopeTagRecord, OrgHypercertsNS, OrgNS, PUB_LEAFLET_PAGES, blockquote_exports as PubLeafletBlocksBlockquote, bskyPost_exports as PubLeafletBlocksBskyPost, button_exports as PubLeafletBlocksButton, code_exports as PubLeafletBlocksCode, header_exports as PubLeafletBlocksHeader, horizontalRule_exports as PubLeafletBlocksHorizontalRule, iframe_exports as PubLeafletBlocksIframe, image_exports as PubLeafletBlocksImage, math_exports as PubLeafletBlocksMath, PubLeafletBlocksNS, page_exports as PubLeafletBlocksPage, poll_exports as PubLeafletBlocksPoll, text_exports as PubLeafletBlocksText, unorderedList_exports as PubLeafletBlocksUnorderedList, website_exports as PubLeafletBlocksWebsite, PubLeafletNS, linearDocument_exports as PubLeafletPagesLinearDocument, PubLeafletPagesNS, facet_exports2 as PubLeafletRichtextFacet, PubLeafletRichtextNS, PubNS };
//# sourceMappingURL=lex-api.js.map
//# sourceMappingURL=lex-api.js.map