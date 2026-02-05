/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  type LexiconDoc,
  Lexicons,
  ValidationError,
  type ValidationResult,
} from '@atproto/lexicon'
import { type $Typed, is$typed, maybe$typed } from './util.js'

export const schemaDict = {
  AppBskyRichtextFacet: {
    lexicon: 1,
    id: 'app.bsky.richtext.facet',
    defs: {
      main: {
        type: 'object',
        description: 'Annotation of a sub-string within rich text.',
        required: ['index', 'features'],
        properties: {
          index: {
            type: 'ref',
            ref: 'lex:app.bsky.richtext.facet#byteSlice',
          },
          features: {
            type: 'array',
            items: {
              type: 'union',
              refs: [
                'lex:app.bsky.richtext.facet#mention',
                'lex:app.bsky.richtext.facet#link',
                'lex:app.bsky.richtext.facet#tag',
              ],
            },
          },
        },
      },
      mention: {
        type: 'object',
        description:
          "Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID.",
        required: ['did'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
        },
      },
      link: {
        type: 'object',
        description:
          'Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL.',
        required: ['uri'],
        properties: {
          uri: {
            type: 'string',
            format: 'uri',
          },
        },
      },
      tag: {
        type: 'object',
        description:
          "Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags').",
        required: ['tag'],
        properties: {
          tag: {
            type: 'string',
            maxLength: 640,
            maxGraphemes: 64,
          },
        },
      },
      byteSlice: {
        type: 'object',
        description:
          'Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets.',
        required: ['byteStart', 'byteEnd'],
        properties: {
          byteStart: {
            type: 'integer',
            minimum: 0,
          },
          byteEnd: {
            type: 'integer',
            minimum: 0,
          },
        },
      },
    },
  },
  AppCertifiedBadgeAward: {
    lexicon: 1,
    id: 'app.certified.badge.award',
    defs: {
      main: {
        type: 'record',
        description:
          'Records a badge award to a user, project, or activity claim.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['badge', 'subject', 'createdAt'],
          properties: {
            badge: {
              type: 'ref',
              ref: 'lex:app.certified.badge.definition',
              description: 'Reference to the badge definition for this award.',
            },
            subject: {
              type: 'union',
              description:
                'Entity the badge award is for (either an account DID or any specific AT Protocol record), e.g. a user, a project, or a specific activity claim.',
              refs: [
                'lex:app.certified.defs#did',
                'lex:com.atproto.repo.strongRef',
              ],
            },
            note: {
              type: 'string',
              description:
                'Optional statement explaining the reason for this badge award.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
          },
        },
      },
    },
  },
  AppCertifiedBadgeDefinition: {
    lexicon: 1,
    id: 'app.certified.badge.definition',
    defs: {
      main: {
        type: 'record',
        description:
          'Defines a badge that can be awarded via badge award records to users, projects, or activity claims.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['title', 'badgeType', 'icon', 'createdAt'],
          properties: {
            badgeType: {
              type: 'string',
              description:
                'Category of the badge (e.g. endorsement, participation, affiliation).',
            },
            title: {
              type: 'string',
              description: 'Human-readable title of the badge.',
            },
            icon: {
              type: 'blob',
              description:
                'Icon representing the badge, stored as a blob for compact visual display.',
              accept: [
                'image/png',
                'image/jpeg',
                'image/webp',
                'image/svg+xml',
              ],
              maxSize: 1048576,
            },
            description: {
              type: 'string',
              description:
                'Optional short statement describing what the badge represents.',
            },
            allowedIssuers: {
              type: 'array',
              description:
                'Optional allowlist of DIDs allowed to issue this badge. If omitted, anyone may issue it.',
              items: {
                type: 'ref',
                ref: 'lex:app.certified.defs#did',
              },
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
          },
        },
      },
    },
  },
  AppCertifiedBadgeResponse: {
    lexicon: 1,
    id: 'app.certified.badge.response',
    defs: {
      main: {
        type: 'record',
        description: 'Recipient response to a badge award.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['badgeAward', 'response', 'createdAt'],
          properties: {
            badgeAward: {
              type: 'ref',
              ref: 'lex:app.certified.badge.award',
              description: 'Reference to the badge award.',
            },
            response: {
              type: 'string',
              enum: ['accepted', 'rejected'],
              description:
                'The recipient’s response for the badge (accepted or rejected).',
            },
            weight: {
              type: 'string',
              description:
                'Optional relative weight for accepted badges, assigned by the recipient.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
          },
        },
      },
    },
  },
  AppCertifiedDefs: {
    lexicon: 1,
    id: 'app.certified.defs',
    description: 'Common type definitions used across certified protocols.',
    defs: {
      did: {
        type: 'object',
        description: 'A Decentralized Identifier (DID) string.',
        required: ['did'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
            description: 'The DID string value.',
            maxLength: 256,
          },
        },
      },
    },
  },
  AppCertifiedLocation: {
    lexicon: 1,
    id: 'app.certified.location',
    defs: {
      main: {
        type: 'record',
        description: 'A location reference',
        key: 'tid',
        record: {
          type: 'object',
          required: [
            'lpVersion',
            'srs',
            'locationType',
            'location',
            'createdAt',
          ],
          properties: {
            lpVersion: {
              type: 'string',
              description: 'The version of the Location Protocol',
              maxLength: 10,
            },
            srs: {
              type: 'string',
              format: 'uri',
              description:
                'The Spatial Reference System URI (e.g., http://www.opengis.net/def/crs/OGC/1.3/CRS84) that defines the coordinate system.',
              maxLength: 100,
            },
            locationType: {
              type: 'string',
              description:
                'An identifier for the format of the location data (e.g., coordinate-decimal, geojson-point)',
              knownValues: ['coordinate-decimal', 'geojson-point'],
              maxLength: 20,
            },
            location: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#smallBlob',
                'lex:app.certified.location#string',
              ],
              description:
                'The location of where the work was performed as a URI, blob, or inline string.',
            },
            name: {
              type: 'string',
              description: 'Optional name for this location',
              maxLength: 1000,
              maxGraphemes: 100,
            },
            description: {
              type: 'string',
              description: 'Optional description for this location',
              maxLength: 2000,
              maxGraphemes: 500,
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
          },
        },
      },
      string: {
        type: 'object',
        required: ['string'],
        description:
          'A location represented as a string, e.g. coordinates or a small GeoJSON string.',
        properties: {
          string: {
            type: 'string',
            description: 'The location string value',
            maxLength: 10000,
            maxGraphemes: 1000,
          },
        },
      },
    },
  },
  AppGainforestCommonDefs: {
    lexicon: 1,
    id: 'app.gainforest.common.defs',
    description:
      'Shared type definitions for biodiversity and environmental data collection',
    defs: {
      richtext: {
        type: 'object',
        required: ['text'],
        description:
          'An object that contains the text and an object that defins and enables richtext formatting on the text.',
        properties: {
          text: {
            type: 'string',
            description: 'The text to be formatted',
          },
          facets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.richtext.facet',
            },
          },
        },
      },
      uri: {
        type: 'object',
        required: ['uri'],
        description: 'Reference to external data via URI',
        properties: {
          uri: {
            type: 'string',
            format: 'uri',
            maxGraphemes: 1024,
            description: 'URI to external resource',
          },
        },
      },
      image: {
        type: 'object',
        required: ['file'],
        description:
          'Image file for photos, camera traps, drone stills, scanned documents',
        properties: {
          file: {
            type: 'blob',
            accept: [
              'image/jpeg',
              'image/jpg',
              'image/png',
              'image/webp',
              'image/heic',
              'image/heif',
              'image/tiff',
              'image/tif',
              'image/gif',
              'image/bmp',
              'image/svg+xml',
            ],
            maxSize: 20971520,
            description:
              'Image up to 20MB. Supports JPEG, PNG, WebP, HEIC (phones), TIFF (scientific), GIF, BMP, SVG.',
          },
        },
      },
      imageThumbnail: {
        type: 'object',
        required: ['file'],
        description: 'Small image for thumbnails and previews',
        properties: {
          file: {
            type: 'blob',
            accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
            maxSize: 1048576,
            description: 'Thumbnail image up to 1MB',
          },
        },
      },
      video: {
        type: 'object',
        required: ['file'],
        description:
          'Video file for camera traps, drone footage, underwater video, behavioral observations',
        properties: {
          file: {
            type: 'blob',
            accept: [
              'video/mp4',
              'video/quicktime',
              'video/x-msvideo',
              'video/webm',
              'video/x-matroska',
              'video/mpeg',
              'video/3gpp',
              'video/3gpp2',
            ],
            maxSize: 104857600,
            description:
              'Video up to 100MB. Supports MP4, MOV, AVI, WebM, MKV, MPEG, 3GP.',
          },
        },
      },
      audio: {
        type: 'object',
        required: ['file'],
        description:
          'Audio file for bioacoustics, soundscapes, field recordings, species calls',
        properties: {
          file: {
            type: 'blob',
            accept: [
              'audio/wav',
              'audio/x-wav',
              'audio/mpeg',
              'audio/mp3',
              'audio/mp4',
              'audio/x-m4a',
              'audio/aac',
              'audio/flac',
              'audio/x-flac',
              'audio/ogg',
              'audio/opus',
              'audio/webm',
              'audio/aiff',
              'audio/x-aiff',
            ],
            maxSize: 104857600,
            description:
              'Audio up to 100MB. Supports WAV, MP3, M4A, AAC, FLAC, OGG, Opus, WebM, AIFF.',
          },
        },
      },
      spectrogram: {
        type: 'object',
        required: ['file'],
        description:
          'Spectrogram image - visual representation of audio frequency content',
        properties: {
          file: {
            type: 'blob',
            accept: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
            maxSize: 5242880,
            description: 'Spectrogram image up to 5MB',
          },
        },
      },
      document: {
        type: 'object',
        required: ['file'],
        description:
          'Document file for reports, field notes, permits, publications',
        properties: {
          file: {
            type: 'blob',
            accept: [
              'application/pdf',
              'text/plain',
              'text/markdown',
              'text/html',
              'application/rtf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
            maxSize: 20971520,
            description:
              'Document up to 20MB. Supports PDF, TXT, Markdown, HTML, RTF, DOC, DOCX.',
          },
        },
      },
      dataFile: {
        type: 'object',
        required: ['file'],
        description:
          'Structured data file for observations, measurements, exports',
        properties: {
          file: {
            type: 'blob',
            accept: [
              'text/csv',
              'text/tab-separated-values',
              'application/json',
              'application/ld+json',
              'application/xml',
              'text/xml',
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'application/vnd.oasis.opendocument.spreadsheet',
            ],
            maxSize: 52428800,
            description:
              'Data file up to 50MB. Supports CSV, TSV, JSON, JSON-LD, XML, XLS, XLSX, ODS.',
          },
        },
      },
      gpsTrack: {
        type: 'object',
        required: ['file'],
        description:
          'GPS track file for transects, survey routes, patrol paths',
        properties: {
          file: {
            type: 'blob',
            accept: [
              'application/gpx+xml',
              'application/vnd.google-earth.kml+xml',
              'application/vnd.google-earth.kmz',
              'application/geo+json',
              'application/json',
            ],
            maxSize: 10485760,
            description:
              'GPS track up to 10MB. Supports GPX, KML, KMZ, GeoJSON.',
          },
        },
      },
      geospatial: {
        type: 'object',
        required: ['file'],
        description:
          'Geospatial data file for maps, boundaries, habitat layers',
        properties: {
          file: {
            type: 'blob',
            accept: [
              'application/geo+json',
              'application/json',
              'application/vnd.google-earth.kml+xml',
              'application/vnd.google-earth.kmz',
              'application/geopackage+sqlite3',
              'application/x-shapefile',
              'application/zip',
              'image/tiff',
              'image/geotiff',
            ],
            maxSize: 104857600,
            description:
              'Geospatial data up to 100MB. Supports GeoJSON, KML, KMZ, GeoPackage, Shapefile (zipped), GeoTIFF.',
          },
        },
      },
      sensorData: {
        type: 'object',
        required: ['file'],
        description:
          'Sensor data file for environmental monitoring (temperature, humidity, light, etc.)',
        properties: {
          file: {
            type: 'blob',
            accept: [
              'text/csv',
              'application/json',
              'text/plain',
              'application/x-netcdf',
              'application/x-hdf5',
            ],
            maxSize: 52428800,
            description:
              'Sensor data up to 50MB. Supports CSV, JSON, TXT, NetCDF, HDF5.',
          },
        },
      },
      geneticData: {
        type: 'object',
        required: ['file'],
        description:
          'Genetic/genomic data file for eDNA, barcoding, sequencing results',
        properties: {
          file: {
            type: 'blob',
            accept: [
              'text/x-fasta',
              'application/x-fasta',
              'text/x-fastq',
              'application/x-fastq',
              'text/plain',
              'text/csv',
              'application/json',
            ],
            maxSize: 104857600,
            description:
              'Genetic data up to 100MB. Supports FASTA, FASTQ, CSV, JSON.',
          },
        },
      },
      indexedOrganization: {
        type: 'object',
        required: ['id', 'name'],
        description: 'Reference to an indexed organization',
        properties: {
          id: {
            type: 'string',
            format: 'uri',
            description: 'The URI of the organization',
          },
          name: {
            type: 'string',
            description: 'The name of the organization',
          },
        },
      },
    },
  },
  AppGainforestDwcDefs: {
    lexicon: 1,
    id: 'app.gainforest.dwc.defs',
    description:
      'Shared type definitions for Darwin Core aligned biodiversity records',
    defs: {
      geolocation: {
        type: 'object',
        description:
          'A geographic point with uncertainty, following Darwin Core Location class',
        required: ['decimalLatitude', 'decimalLongitude'],
        properties: {
          decimalLatitude: {
            type: 'string',
            description:
              'Geographic latitude in decimal degrees (WGS84). Positive values north of the Equator, negative south. Range: -90 to 90.',
            maxGraphemes: 32,
          },
          decimalLongitude: {
            type: 'string',
            description:
              'Geographic longitude in decimal degrees (WGS84). Positive values east of the Greenwich Meridian, negative west. Range: -180 to 180.',
            maxGraphemes: 32,
          },
          coordinateUncertaintyInMeters: {
            type: 'integer',
            description:
              'Horizontal distance from the coordinates describing the smallest circle containing the whole location. Zero is not valid.',
            minimum: 1,
          },
          geodeticDatum: {
            type: 'string',
            description:
              "The ellipsoid, geodetic datum, or spatial reference system. Recommended: 'EPSG:4326' (WGS84)",
            maxGraphemes: 64,
          },
        },
      },
      taxonIdentification: {
        type: 'object',
        description: 'A taxonomic identification with provenance metadata',
        required: ['scientificName'],
        properties: {
          scientificName: {
            type: 'string',
            description:
              'The full scientific name including authorship and date',
            maxGraphemes: 512,
          },
          gbifTaxonKey: {
            type: 'string',
            description: 'GBIF backbone taxonomy key for the identified taxon',
            maxGraphemes: 64,
          },
          identifiedBy: {
            type: 'string',
            description:
              'Person(s) who made the identification (pipe-delimited for multiple)',
            maxGraphemes: 512,
          },
          identifiedByID: {
            type: 'string',
            description:
              'ORCID or other persistent identifier for the person(s) who identified (pipe-delimited)',
            maxGraphemes: 512,
          },
          dateIdentified: {
            type: 'string',
            description: 'Date the identification was made (ISO 8601)',
            maxGraphemes: 64,
          },
          identificationQualifier: {
            type: 'string',
            description:
              "Uncertainty qualifier applied to the taxon name (e.g., 'cf. agrestis', 'aff. agrestis')",
            maxGraphemes: 256,
          },
          identificationRemarks: {
            type: 'string',
            description: 'Notes or comments about the identification',
            maxGraphemes: 2048,
          },
        },
      },
      basisOfRecordEnum: {
        type: 'string',
        description:
          'The specific nature of the data record. Controlled vocabulary per Darwin Core.',
        maxGraphemes: 64,
        knownValues: [
          'HumanObservation',
          'MachineObservation',
          'PreservedSpecimen',
          'LivingSpecimen',
          'FossilSpecimen',
          'MaterialSample',
          'MaterialEntity',
          'MaterialCitation',
        ],
      },
      occurrenceStatusEnum: {
        type: 'string',
        description:
          'Statement about the presence or absence of a taxon at a location.',
        maxGraphemes: 64,
        knownValues: ['present', 'absent'],
      },
      dublinCoreTypeEnum: {
        type: 'string',
        description:
          'Dublin Core type vocabulary for the nature of the resource.',
        maxGraphemes: 64,
        knownValues: [
          'PhysicalObject',
          'StillImage',
          'MovingImage',
          'Sound',
          'Text',
          'Event',
          'Dataset',
        ],
      },
      nomenclaturalCodeEnum: {
        type: 'string',
        description:
          'The nomenclatural code under which the scientific name is constructed.',
        maxGraphemes: 64,
        knownValues: ['ICZN', 'ICN', 'ICNP', 'ICTV', 'BioCode'],
      },
      sexEnum: {
        type: 'string',
        description:
          'The sex of the biological individual(s) represented in the occurrence.',
        maxGraphemes: 64,
        knownValues: ['male', 'female', 'hermaphrodite'],
      },
      taxonRankEnum: {
        type: 'string',
        description:
          'The taxonomic rank of the most specific name in the scientificName.',
        maxGraphemes: 64,
        knownValues: [
          'kingdom',
          'phylum',
          'class',
          'order',
          'family',
          'subfamily',
          'genus',
          'subgenus',
          'species',
          'subspecies',
          'variety',
          'form',
        ],
      },
    },
  },
  AppGainforestDwcEvent: {
    lexicon: 1,
    id: 'app.gainforest.dwc.event',
    description:
      'A sampling event record aligned with Darwin Core Event class. Enables star-schema pattern where multiple occurrences reference a shared event context (location, protocol, effort).',
    defs: {
      main: {
        type: 'record',
        description:
          'A sampling or collecting event. Multiple dwc.occurrence records can reference the same event via eventRef, sharing location and protocol metadata.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['eventID', 'eventDate', 'createdAt'],
          properties: {
            eventID: {
              type: 'string',
              description:
                'An identifier for the event. Should be globally unique or unique within the dataset.',
              maxGraphemes: 256,
            },
            parentEventID: {
              type: 'string',
              description:
                'An identifier for the broader event that this event is part of (e.g., a survey campaign that contains multiple transects).',
              maxGraphemes: 256,
            },
            parentEventRef: {
              type: 'string',
              format: 'at-uri',
              description:
                'AT-URI reference to the parent app.gainforest.dwc.event record.',
            },
            eventDate: {
              type: 'string',
              description:
                "The date or date range during which the event occurred. ISO 8601 format (e.g., '2024-03-15', '2024-03-15/2024-03-17').",
              maxGraphemes: 64,
            },
            eventTime: {
              type: 'string',
              description:
                "The time or time range during which the event occurred. ISO 8601 format (e.g., '06:30:00', '06:30:00/09:00:00').",
              maxGraphemes: 64,
            },
            habitat: {
              type: 'string',
              description:
                "A category or description of the habitat in which the event occurred (e.g., 'primary tropical rainforest', 'degraded pasture', 'riparian zone').",
              maxGraphemes: 512,
            },
            samplingProtocol: {
              type: 'string',
              description:
                "The names of, references to, or descriptions of the methods used during the event (e.g., 'camera trap array', 'line transect distance sampling', 'audio point count 10-min').",
              maxGraphemes: 1024,
            },
            sampleSizeValue: {
              type: 'string',
              description:
                "A numeric value for a measurement of the size of a sample in the event (e.g., '20', '0.25').",
              maxGraphemes: 64,
            },
            sampleSizeUnit: {
              type: 'string',
              description:
                "The unit of measurement for the sampleSizeValue (e.g., 'square meters', 'hectares', 'trap-nights').",
              maxGraphemes: 128,
            },
            samplingEffort: {
              type: 'string',
              description:
                "The amount of effort expended during the event (e.g., '3 person-hours', '14 trap-nights', '2 km transect walked').",
              maxGraphemes: 256,
            },
            fieldNotes: {
              type: 'string',
              description:
                'Notes or a reference to notes taken in the field about the event.',
              maxGraphemes: 10000,
            },
            eventRemarks: {
              type: 'string',
              description: 'Comments or notes about the event.',
              maxGraphemes: 5000,
            },
            locationID: {
              type: 'string',
              description:
                'Identifier for the location where the event occurred.',
              maxGraphemes: 256,
            },
            decimalLatitude: {
              type: 'string',
              description:
                'Geographic latitude in decimal degrees (WGS84). Range: -90 to 90.',
              maxGraphemes: 32,
            },
            decimalLongitude: {
              type: 'string',
              description:
                'Geographic longitude in decimal degrees (WGS84). Range: -180 to 180.',
              maxGraphemes: 32,
            },
            geodeticDatum: {
              type: 'string',
              description:
                "The spatial reference system. Recommended: 'EPSG:4326'.",
              maxGraphemes: 64,
            },
            coordinateUncertaintyInMeters: {
              type: 'integer',
              description:
                'Uncertainty radius in meters around the coordinates.',
              minimum: 1,
            },
            country: {
              type: 'string',
              description: 'The name of the country.',
              maxGraphemes: 128,
            },
            countryCode: {
              type: 'string',
              description: 'ISO 3166-1 alpha-2 country code.',
              minLength: 2,
              maxLength: 2,
            },
            stateProvince: {
              type: 'string',
              description: 'First-level administrative division.',
              maxGraphemes: 256,
            },
            county: {
              type: 'string',
              description: 'Second-level administrative division.',
              maxGraphemes: 256,
            },
            municipality: {
              type: 'string',
              description: 'Third-level administrative division.',
              maxGraphemes: 256,
            },
            locality: {
              type: 'string',
              description: 'Specific locality description.',
              maxGraphemes: 1024,
            },
            minimumElevationInMeters: {
              type: 'integer',
              description:
                'Lower limit of elevation range in meters above sea level.',
            },
            maximumElevationInMeters: {
              type: 'integer',
              description:
                'Upper limit of elevation range in meters above sea level.',
            },
            locationRemarks: {
              type: 'string',
              description: 'Comments about the location.',
              maxGraphemes: 2048,
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description: 'Timestamp of record creation in the ATProto PDS.',
            },
          },
        },
      },
    },
  },
  AppGainforestDwcMeasurement: {
    lexicon: 1,
    id: 'app.gainforest.dwc.measurement',
    description:
      'A measurement or fact record aligned with the Darwin Core MeasurementOrFact class. Extension record that links to an occurrence, enabling multiple measurements per organism (e.g., DBH, height, canopy cover for a tree).',
    defs: {
      main: {
        type: 'record',
        description:
          'A measurement, fact, characteristic, or assertion about an occurrence. Multiple measurement records can reference the same occurrence, solving the Simple DwC one-measurement-per-record limitation.',
        key: 'tid',
        record: {
          type: 'object',
          required: [
            'occurrenceRef',
            'measurementType',
            'measurementValue',
            'createdAt',
          ],
          properties: {
            measurementID: {
              type: 'string',
              description:
                'An identifier for the measurement. Should be unique within the dataset.',
              maxGraphemes: 256,
            },
            occurrenceRef: {
              type: 'string',
              format: 'at-uri',
              description:
                'AT-URI reference to the app.gainforest.dwc.occurrence record this measurement belongs to.',
            },
            occurrenceID: {
              type: 'string',
              description:
                'The occurrenceID of the linked occurrence record (for cross-system interoperability).',
              maxGraphemes: 256,
            },
            measurementType: {
              type: 'string',
              description:
                "The nature of the measurement, fact, characteristic, or assertion (e.g., 'DBH', 'tree height', 'canopy cover', 'tail length', 'body mass', 'soil pH', 'water temperature').",
              maxGraphemes: 256,
            },
            measurementValue: {
              type: 'string',
              description:
                "The value of the measurement, fact, characteristic, or assertion (e.g., '45.2', 'present', 'blue').",
              maxGraphemes: 1024,
            },
            measurementUnit: {
              type: 'string',
              description:
                "The units for the measurementValue (e.g., 'cm', 'm', 'kg', 'mm', '%', 'degrees Celsius').",
              maxGraphemes: 64,
            },
            measurementAccuracy: {
              type: 'string',
              description:
                "The description of the potential error associated with the measurementValue (e.g., '0.5 cm', '5%').",
              maxGraphemes: 256,
            },
            measurementMethod: {
              type: 'string',
              description:
                "The description of or reference to the method used to determine the measurement (e.g., 'diameter tape at 1.3m height', 'laser rangefinder', 'Bitterlich method').",
              maxGraphemes: 1024,
            },
            measurementDeterminedBy: {
              type: 'string',
              description:
                'Person(s) who determined the measurement. Pipe-delimited for multiple.',
              maxGraphemes: 512,
            },
            measurementDeterminedDate: {
              type: 'string',
              description:
                'The date the measurement was made. ISO 8601 format.',
              maxGraphemes: 64,
            },
            measurementRemarks: {
              type: 'string',
              description: 'Comments or notes accompanying the measurement.',
              maxGraphemes: 5000,
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description: 'Timestamp of record creation in the ATProto PDS.',
            },
          },
        },
      },
    },
  },
  AppGainforestDwcOccurrence: {
    lexicon: 1,
    id: 'app.gainforest.dwc.occurrence',
    description:
      'A single biodiversity occurrence record aligned with Simple Darwin Core (TDWG Standard 450, version 2023-09-13). Represents one organism or group of organisms at a particular place and time.',
    defs: {
      main: {
        type: 'record',
        description:
          'A biodiversity occurrence record following the Simple Darwin Core standard. Each record represents one occurrence of an organism at a location and time.',
        key: 'tid',
        record: {
          type: 'object',
          required: [
            'basisOfRecord',
            'scientificName',
            'eventDate',
            'createdAt',
          ],
          properties: {
            occurrenceID: {
              type: 'string',
              description:
                'A globally unique identifier for the occurrence record. Recommended: a persistent URI (e.g., DOI, LSID, or UUID-based URI).',
              maxGraphemes: 256,
            },
            basisOfRecord: {
              type: 'string',
              description:
                'The specific nature of the data record. Must be one of the Darwin Core class names.',
              maxGraphemes: 64,
              enum: [
                'HumanObservation',
                'MachineObservation',
                'PreservedSpecimen',
                'LivingSpecimen',
                'FossilSpecimen',
                'MaterialSample',
                'MaterialEntity',
                'MaterialCitation',
              ],
            },
            dcType: {
              type: 'string',
              description:
                'The Dublin Core type class that best describes the resource (dc:type).',
              maxGraphemes: 64,
              enum: [
                'PhysicalObject',
                'StillImage',
                'MovingImage',
                'Sound',
                'Text',
                'Event',
                'Dataset',
              ],
            },
            license: {
              type: 'string',
              description:
                "A legal document giving official permission to do something with the record. Recommended: a Creative Commons URI (e.g., 'http://creativecommons.org/licenses/by/4.0/').",
              maxGraphemes: 512,
            },
            rightsHolder: {
              type: 'string',
              description:
                'Person or organization owning or managing rights over the resource.',
              maxGraphemes: 256,
            },
            institutionCode: {
              type: 'string',
              description:
                'The name or acronym of the institution having custody of the object(s) or information in the record.',
              maxGraphemes: 256,
            },
            collectionCode: {
              type: 'string',
              description:
                'The name, acronym, or code identifying the collection or dataset from which the record was derived.',
              maxGraphemes: 256,
            },
            datasetName: {
              type: 'string',
              description:
                'The name identifying the dataset from which the record was derived.',
              maxGraphemes: 256,
            },
            informationWithheld: {
              type: 'string',
              description:
                "A description of what information is withheld from this record and why (e.g., 'coordinates generalized to protect endangered species').",
              maxGraphemes: 1024,
            },
            dataGeneralizations: {
              type: 'string',
              description:
                "A description of actions taken to make the data less specific or complete (e.g., 'coordinates rounded to nearest 0.1 degree').",
              maxGraphemes: 1024,
            },
            references: {
              type: 'string',
              format: 'uri',
              description:
                'A related resource that is referenced, cited, or otherwise pointed to by the record (URL).',
            },
            recordedBy: {
              type: 'string',
              description:
                "Person(s) responsible for recording the occurrence in the field. Pipe-delimited for multiple (e.g., 'Jane Smith | John Doe').",
              maxGraphemes: 512,
            },
            recordedByID: {
              type: 'string',
              description:
                'Persistent identifier(s) (e.g., ORCID) of the person(s) who recorded. Pipe-delimited for multiple.',
              maxGraphemes: 512,
            },
            individualCount: {
              type: 'integer',
              description:
                'The number of individuals present at the time of the occurrence.',
              minimum: 0,
            },
            organismQuantity: {
              type: 'string',
              description:
                "A number or enumeration value for the quantity of organisms (e.g., '27', '12.5', 'many').",
              maxGraphemes: 64,
            },
            organismQuantityType: {
              type: 'string',
              description:
                "The type of quantification system used for organismQuantity (e.g., 'individuals', '% biomass', 'stems/ha').",
              maxGraphemes: 128,
            },
            sex: {
              type: 'string',
              description: 'The sex of the biological individual(s).',
              maxGraphemes: 64,
              enum: ['male', 'female', 'hermaphrodite'],
            },
            lifeStage: {
              type: 'string',
              description:
                "The age class or life stage at the time of occurrence (e.g., 'adult', 'juvenile', 'larva', 'seedling', 'sapling').",
              maxGraphemes: 128,
            },
            reproductiveCondition: {
              type: 'string',
              description:
                "The reproductive condition at the time of occurrence (e.g., 'flowering', 'fruiting', 'budding', 'pregnant').",
              maxGraphemes: 128,
            },
            behavior: {
              type: 'string',
              description:
                "The behavior shown by the subject at the time of occurrence (e.g., 'foraging', 'nesting', 'roosting').",
              maxGraphemes: 256,
            },
            occurrenceStatus: {
              type: 'string',
              description:
                'Statement about the presence or absence of a taxon at a location.',
              maxGraphemes: 64,
              enum: ['present', 'absent'],
            },
            occurrenceRemarks: {
              type: 'string',
              description: 'Comments or notes about the occurrence.',
              maxGraphemes: 5000,
            },
            associatedMedia: {
              type: 'string',
              description:
                'Identifiers (URIs) of media associated with the occurrence. Pipe-delimited for multiple.',
              maxGraphemes: 2048,
            },
            associatedReferences: {
              type: 'string',
              description:
                'Identifiers (URIs) of literature associated with the occurrence. Pipe-delimited for multiple.',
              maxGraphemes: 2048,
            },
            associatedSequences: {
              type: 'string',
              description:
                'Identifiers (URIs) of genetic sequence information associated with the occurrence. Pipe-delimited for multiple.',
              maxGraphemes: 2048,
            },
            associatedOccurrences: {
              type: 'string',
              description:
                'Identifiers of other occurrences associated with this one (e.g., parasite-host). Pipe-delimited.',
              maxGraphemes: 2048,
            },
            eventID: {
              type: 'string',
              description:
                'Identifier for the sampling event. Can be used to group occurrences from the same event.',
              maxGraphemes: 256,
            },
            eventRef: {
              type: 'string',
              format: 'at-uri',
              description:
                'AT-URI reference to an app.gainforest.dwc.event record (for star-schema linkage).',
            },
            eventDate: {
              type: 'string',
              description:
                "The date or date-time (or interval) during which the occurrence was recorded. ISO 8601 format (e.g., '2024-03-15', '2024-03-15T10:30:00Z', '2024-03/2024-06').",
              maxGraphemes: 64,
            },
            eventTime: {
              type: 'string',
              description:
                "The time of the event. ISO 8601 format (e.g., '14:30:00', '14:30:00+02:00').",
              maxGraphemes: 64,
            },
            habitat: {
              type: 'string',
              description:
                "A description of the habitat in which the event occurred (e.g., 'tropical rainforest', 'mangrove swamp', 'montane cloud forest').",
              maxGraphemes: 512,
            },
            samplingProtocol: {
              type: 'string',
              description:
                "The method or protocol used during the event (e.g., 'camera trap', 'point count', 'mist net', '20m x 20m plot survey', 'acoustic monitoring').",
              maxGraphemes: 1024,
            },
            samplingEffort: {
              type: 'string',
              description:
                "The amount of effort expended during the event (e.g., '2 trap-nights', '30 minutes', '10 km transect').",
              maxGraphemes: 256,
            },
            fieldNotes: {
              type: 'string',
              description:
                'Notes or reference to notes taken in the field about the event.',
              maxGraphemes: 10000,
            },
            locationID: {
              type: 'string',
              description:
                'Identifier for the location (e.g., a reference to a named site).',
              maxGraphemes: 256,
            },
            decimalLatitude: {
              type: 'string',
              description:
                'Geographic latitude in decimal degrees (WGS84). Positive values are north of the Equator. Range: -90 to 90.',
              maxGraphemes: 32,
            },
            decimalLongitude: {
              type: 'string',
              description:
                'Geographic longitude in decimal degrees (WGS84). Positive values are east of the Greenwich Meridian. Range: -180 to 180.',
              maxGraphemes: 32,
            },
            geodeticDatum: {
              type: 'string',
              description:
                "The spatial reference system for the coordinates. Recommended: 'EPSG:4326' (WGS84).",
              maxGraphemes: 64,
            },
            coordinateUncertaintyInMeters: {
              type: 'integer',
              description:
                'Horizontal distance (meters) from the given coordinates describing the smallest circle containing the whole location.',
              minimum: 1,
            },
            country: {
              type: 'string',
              description:
                'The name of the country or major administrative unit.',
              maxGraphemes: 128,
            },
            countryCode: {
              type: 'string',
              description:
                'The standard code for the country (ISO 3166-1 alpha-2).',
              minLength: 2,
              maxLength: 2,
            },
            stateProvince: {
              type: 'string',
              description:
                'The name of the next smaller administrative region than country.',
              maxGraphemes: 256,
            },
            county: {
              type: 'string',
              description:
                'The full, unabbreviated name of the next smaller administrative region than stateProvince.',
              maxGraphemes: 256,
            },
            municipality: {
              type: 'string',
              description:
                'The full, unabbreviated name of the next smaller administrative region than county.',
              maxGraphemes: 256,
            },
            locality: {
              type: 'string',
              description:
                "The specific description of the place (e.g., '500m upstream of bridge on Rio Pará').",
              maxGraphemes: 1024,
            },
            verbatimLocality: {
              type: 'string',
              description:
                'The original textual description of the place as provided by the recorder.',
              maxGraphemes: 1024,
            },
            minimumElevationInMeters: {
              type: 'integer',
              description:
                'The lower limit of the range of elevation (in meters above sea level).',
            },
            maximumElevationInMeters: {
              type: 'integer',
              description:
                'The upper limit of the range of elevation (in meters above sea level).',
            },
            minimumDepthInMeters: {
              type: 'integer',
              description:
                'The lesser depth of a range of depth below the local surface (in meters).',
              minimum: 0,
            },
            maximumDepthInMeters: {
              type: 'integer',
              description:
                'The greater depth of a range of depth below the local surface (in meters).',
              minimum: 0,
            },
            locationRemarks: {
              type: 'string',
              description: 'Comments about the location.',
              maxGraphemes: 2048,
            },
            gbifTaxonKey: {
              type: 'string',
              description:
                'GBIF backbone taxonomy key for the identified taxon. Retained for backward compatibility with existing GainForest workflows.',
              maxGraphemes: 64,
            },
            scientificName: {
              type: 'string',
              description:
                "The full scientific name, with authorship and date if known (e.g., 'Centropyge flavicauda Fraser-Brunner 1933').",
              maxGraphemes: 512,
            },
            scientificNameAuthorship: {
              type: 'string',
              description:
                "The authorship information for the scientific name (e.g., 'Fraser-Brunner 1933').",
              maxGraphemes: 256,
            },
            kingdom: {
              type: 'string',
              description:
                "The full scientific name of the kingdom (e.g., 'Animalia', 'Plantae', 'Fungi').",
              maxGraphemes: 128,
            },
            phylum: {
              type: 'string',
              description:
                'The full scientific name of the phylum or division.',
              maxGraphemes: 128,
            },
            class: {
              type: 'string',
              description: 'The full scientific name of the class.',
              maxGraphemes: 128,
            },
            order: {
              type: 'string',
              description: 'The full scientific name of the order.',
              maxGraphemes: 128,
            },
            family: {
              type: 'string',
              description: 'The full scientific name of the family.',
              maxGraphemes: 128,
            },
            genus: {
              type: 'string',
              description: 'The full scientific name of the genus.',
              maxGraphemes: 128,
            },
            specificEpithet: {
              type: 'string',
              description:
                'The name of the species epithet of the scientificName.',
              maxGraphemes: 128,
            },
            infraspecificEpithet: {
              type: 'string',
              description:
                'The name of the lowest or terminal infraspecific epithet.',
              maxGraphemes: 128,
            },
            taxonRank: {
              type: 'string',
              description:
                'The taxonomic rank of the most specific name in scientificName.',
              maxGraphemes: 64,
              enum: [
                'kingdom',
                'phylum',
                'class',
                'order',
                'family',
                'subfamily',
                'genus',
                'subgenus',
                'species',
                'subspecies',
                'variety',
                'form',
              ],
            },
            vernacularName: {
              type: 'string',
              description: 'A common or vernacular name for the taxon.',
              maxGraphemes: 256,
            },
            taxonomicStatus: {
              type: 'string',
              description:
                "The status of the use of the scientificName (e.g., 'accepted', 'synonym', 'doubtful').",
              maxGraphemes: 64,
            },
            nomenclaturalCode: {
              type: 'string',
              description:
                'The nomenclatural code under which the scientificName is constructed.',
              maxGraphemes: 64,
              enum: ['ICZN', 'ICN', 'ICNP', 'ICTV', 'BioCode'],
            },
            higherClassification: {
              type: 'string',
              description:
                "A complete list of taxa names terminating at the rank immediately superior to the taxon. Pipe-delimited (e.g., 'Animalia|Chordata|Mammalia|Rodentia|Ctenomyidae|Ctenomys').",
              maxGraphemes: 1024,
            },
            identifiedBy: {
              type: 'string',
              description:
                'Person(s) who assigned the taxon to the occurrence. Pipe-delimited for multiple.',
              maxGraphemes: 512,
            },
            identifiedByID: {
              type: 'string',
              description:
                'Persistent identifier(s) (e.g., ORCID) of the person(s) who identified. Pipe-delimited.',
              maxGraphemes: 512,
            },
            dateIdentified: {
              type: 'string',
              description:
                'The date on which the identification was made. ISO 8601 format.',
              maxGraphemes: 64,
            },
            identificationQualifier: {
              type: 'string',
              description:
                "A brief phrase or standard term qualifying the identification (e.g., 'cf. agrestis', 'aff. agrestis').",
              maxGraphemes: 256,
            },
            identificationRemarks: {
              type: 'string',
              description: 'Comments or notes about the identification.',
              maxGraphemes: 2048,
            },
            previousIdentifications: {
              type: 'string',
              description:
                'Previous assignments of names to the occurrence. Pipe-delimited.',
              maxGraphemes: 2048,
            },
            dynamicProperties: {
              type: 'string',
              description:
                'Additional structured data as a valid JSON string (per Simple DwC Section 7.1). Example: \'{"iucnStatus":"vulnerable","canopyCover":"85%"}\'. Should be flattened to a single line with no non-printing characters.',
              maxGraphemes: 10000,
            },
            imageEvidence: {
              type: 'ref',
              ref: 'lex:app.gainforest.common.defs#image',
              description:
                'Image evidence (photo, camera trap, drone still, scanned specimen, etc.).',
            },
            audioEvidence: {
              type: 'ref',
              ref: 'lex:app.gainforest.common.defs#audio',
              description:
                'Audio evidence (bioacoustics, soundscape, species call, field recording, etc.).',
            },
            videoEvidence: {
              type: 'ref',
              ref: 'lex:app.gainforest.common.defs#video',
              description:
                'Video evidence (camera trap, drone footage, underwater video, behavioral observation, etc.).',
            },
            spectrogramEvidence: {
              type: 'ref',
              ref: 'lex:app.gainforest.common.defs#spectrogram',
              description:
                'Spectrogram image showing frequency analysis of audio recording.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description: 'Timestamp of record creation in the ATProto PDS.',
            },
          },
        },
      },
    },
  },
  AppGainforestEvaluatorDefs: {
    lexicon: 1,
    id: 'app.gainforest.evaluator.defs',
    description:
      'Shared type definitions for decentralized evaluator services. Evaluators attach structured, typed evaluation data to records (a more sophisticated evolution of the labeler pattern).',
    defs: {
      subjectRef: {
        type: 'object',
        description: 'Reference to a target record that is being evaluated.',
        required: ['uri'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
            description: 'AT-URI of the target record.',
          },
          cid: {
            type: 'string',
            format: 'cid',
            description: 'CID pinning the exact version of the target record.',
          },
        },
      },
      methodInfo: {
        type: 'object',
        description:
          'Provenance metadata describing the method used to produce an evaluation.',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            maxGraphemes: 256,
            description:
              "Human-readable name of the method or model (e.g., 'GainForest BioClassifier').",
          },
          version: {
            type: 'string',
            maxGraphemes: 64,
            description:
              "Version string of the method or model (e.g., '2.1.0').",
          },
          modelCheckpoint: {
            type: 'string',
            maxGraphemes: 128,
            description:
              'Identifier for the specific model checkpoint used (e.g., date or hash).',
          },
          references: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uri',
            },
            maxLength: 10,
            description:
              'URIs to papers, documentation, or repositories describing this method.',
          },
        },
      },
      candidateTaxon: {
        type: 'object',
        description:
          'A candidate taxon identification with confidence score and rank.',
        required: ['scientificName', 'confidence', 'rank'],
        properties: {
          scientificName: {
            type: 'string',
            maxGraphemes: 512,
            description: 'Full scientific name of the candidate taxon.',
          },
          gbifTaxonKey: {
            type: 'string',
            maxGraphemes: 64,
            description: 'GBIF backbone taxonomy key for the candidate.',
          },
          confidence: {
            type: 'integer',
            minimum: 0,
            maximum: 1000,
            description: 'Confidence score (0-1000, where 1000 = 100.0%).',
          },
          rank: {
            type: 'integer',
            minimum: 1,
            description: 'Rank position among candidates (1 = best match).',
          },
          kingdom: {
            type: 'string',
            maxGraphemes: 128,
            description: 'Kingdom of the candidate taxon.',
          },
          family: {
            type: 'string',
            maxGraphemes: 128,
            description: 'Family of the candidate taxon.',
          },
          genus: {
            type: 'string',
            maxGraphemes: 128,
            description: 'Genus of the candidate taxon.',
          },
        },
      },
      qualityFlag: {
        type: 'object',
        description:
          'A single data quality flag indicating an issue with a specific field.',
        required: ['field', 'issue'],
        properties: {
          field: {
            type: 'string',
            maxGraphemes: 64,
            description: 'The field name that has the quality issue.',
          },
          issue: {
            type: 'string',
            maxGraphemes: 256,
            description: 'Description of the quality issue.',
          },
          severity: {
            type: 'string',
            maxGraphemes: 64,
            knownValues: ['error', 'warning', 'info'],
            description: 'Severity level of the quality issue.',
          },
        },
      },
      derivedMeasurement: {
        type: 'object',
        description:
          'A single measurement derived by an evaluator from source data.',
        required: ['measurementType', 'measurementValue'],
        properties: {
          measurementType: {
            type: 'string',
            maxGraphemes: 256,
            description:
              "The nature of the measurement (e.g., 'canopy cover', 'NDVI', 'tree height').",
          },
          measurementValue: {
            type: 'string',
            maxGraphemes: 1024,
            description: 'The value of the measurement.',
          },
          measurementUnit: {
            type: 'string',
            maxGraphemes: 64,
            description:
              "The units for the measurement value (e.g., '%', 'm', 'kg').",
          },
          measurementMethod: {
            type: 'string',
            maxGraphemes: 1024,
            description:
              'Description of the method used to obtain the measurement.',
          },
        },
      },
      speciesIdResult: {
        type: 'object',
        description:
          'AI or human species recognition result with ranked candidate identifications.',
        required: ['candidates'],
        properties: {
          candidates: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.gainforest.evaluator.defs#candidateTaxon',
            },
            maxLength: 20,
            description: 'Ranked list of candidate species identifications.',
          },
          inputFeature: {
            type: 'string',
            maxGraphemes: 64,
            description:
              "Which feature of the subject record was used as input (e.g., 'mediaEvidence').",
          },
          remarks: {
            type: 'string',
            maxGraphemes: 2048,
            description: 'Additional notes about the species identification.',
          },
        },
      },
      dataQualityResult: {
        type: 'object',
        description:
          'Data quality assessment result with per-field quality flags.',
        required: ['flags'],
        properties: {
          flags: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.gainforest.evaluator.defs#qualityFlag',
            },
            maxLength: 50,
            description: 'List of quality issues found in the record.',
          },
          completenessScore: {
            type: 'integer',
            minimum: 0,
            maximum: 1000,
            description:
              'Overall completeness score (0-1000, where 1000 = 100.0%).',
          },
          remarks: {
            type: 'string',
            maxGraphemes: 2048,
            description: 'Additional notes about the quality assessment.',
          },
        },
      },
      verificationResult: {
        type: 'object',
        description:
          'Expert verification result for a previous identification or evaluation.',
        required: ['status'],
        properties: {
          status: {
            type: 'string',
            maxGraphemes: 64,
            knownValues: ['confirmed', 'rejected', 'uncertain'],
            description:
              'Verification status: confirmed, rejected, or uncertain.',
          },
          verifiedBy: {
            type: 'string',
            maxGraphemes: 256,
            description: 'Name of the person who performed the verification.',
          },
          verifiedByID: {
            type: 'string',
            maxGraphemes: 256,
            description: 'Persistent identifier (e.g., ORCID) of the verifier.',
          },
          remarks: {
            type: 'string',
            maxGraphemes: 2048,
            description: 'Notes about the verification decision.',
          },
          suggestedCorrections: {
            type: 'string',
            maxGraphemes: 5000,
            description:
              'Suggested corrections if the original identification was rejected or uncertain.',
          },
        },
      },
      classificationResult: {
        type: 'object',
        description:
          'Generic categorical classification result (e.g., conservation priority, habitat type).',
        required: ['category', 'value'],
        properties: {
          category: {
            type: 'string',
            maxGraphemes: 128,
            description:
              "The classification category (e.g., 'conservation-priority', 'habitat-type').",
          },
          value: {
            type: 'string',
            maxGraphemes: 256,
            description:
              "The assigned classification value (e.g., 'critical', 'tropical-rainforest').",
          },
          remarks: {
            type: 'string',
            maxGraphemes: 2048,
            description: 'Additional notes about the classification.',
          },
        },
      },
      measurementResult: {
        type: 'object',
        description:
          'Derived measurements produced by an evaluator from source data (e.g., remote sensing metrics).',
        required: ['measurements'],
        properties: {
          measurements: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.gainforest.evaluator.defs#derivedMeasurement',
            },
            maxLength: 20,
            description: 'List of derived measurements.',
          },
          remarks: {
            type: 'string',
            maxGraphemes: 2048,
            description: 'Additional notes about the measurements.',
          },
        },
      },
    },
  },
  AppGainforestEvaluatorEvaluation: {
    lexicon: 1,
    id: 'app.gainforest.evaluator.evaluation',
    description:
      'An evaluation record published by an evaluator in their own repo. Contains structured, typed results about a target record (or batch of records). Discovered by AppViews via the atproto-accept-evaluators HTTP header pattern.',
    defs: {
      main: {
        type: 'record',
        description:
          "A single evaluation produced by an evaluator service. Exactly one of 'subject' (single target) or 'subjects' (batch) must be provided.",
        key: 'tid',
        record: {
          type: 'object',
          required: ['evaluationType', 'createdAt'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:app.gainforest.evaluator.defs#subjectRef',
              description:
                'Single target record being evaluated. Use this OR subjects, not both.',
            },
            subjects: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:app.gainforest.evaluator.defs#subjectRef',
              },
              maxLength: 100,
              description:
                'Batch evaluation: multiple target records sharing the same result. Use this OR subject, not both.',
            },
            evaluationType: {
              type: 'string',
              maxGraphemes: 64,
              description:
                "Identifier for the type of evaluation (must match one declared in the evaluator's service record).",
            },
            result: {
              type: 'union',
              description:
                'The typed evaluation result. The $type field determines which result schema is used.',
              refs: [
                'lex:app.gainforest.evaluator.defs#speciesIdResult',
                'lex:app.gainforest.evaluator.defs#dataQualityResult',
                'lex:app.gainforest.evaluator.defs#verificationResult',
                'lex:app.gainforest.evaluator.defs#classificationResult',
                'lex:app.gainforest.evaluator.defs#measurementResult',
              ],
            },
            confidence: {
              type: 'integer',
              minimum: 0,
              maximum: 1000,
              description:
                'Overall confidence in this evaluation (0-1000, where 1000 = 100.0%).',
            },
            method: {
              type: 'ref',
              ref: 'lex:app.gainforest.evaluator.defs#methodInfo',
              description:
                'Method/model provenance for this specific evaluation (overrides service-level method if set).',
            },
            neg: {
              type: 'boolean',
              description:
                'If true, this is a negation/withdrawal of a previous evaluation (like label negation).',
            },
            supersedes: {
              type: 'string',
              format: 'at-uri',
              description:
                'AT-URI of a previous evaluation record that this one supersedes (e.g., model re-run with improved version).',
            },
            dynamicProperties: {
              type: 'string',
              maxGraphemes: 10000,
              description:
                'Additional structured data as a JSON string. Escape hatch for experimental result types before they are formalized into the union.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description: 'Timestamp of when this evaluation was produced.',
            },
          },
        },
      },
    },
  },
  AppGainforestEvaluatorService: {
    lexicon: 1,
    id: 'app.gainforest.evaluator.service',
    description:
      "Declaration record published at rkey 'self' to register an account as an evaluator service. Analogous to app.bsky.labeler.service for labelers.",
    defs: {
      main: {
        type: 'record',
        description:
          'An evaluator service declaration. Publish at /app.gainforest.evaluator.service/self to declare this account as an evaluator.',
        key: 'literal:self',
        record: {
          type: 'object',
          required: ['policies', 'createdAt'],
          properties: {
            policies: {
              type: 'ref',
              ref: 'lex:app.gainforest.evaluator.service#evaluatorPolicies',
              description:
                "The evaluator's policies including supported evaluation types and access model.",
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Timestamp of when this evaluator service was declared.',
            },
          },
        },
      },
      evaluatorPolicies: {
        type: 'object',
        description:
          'Policies declaring what this evaluator does and how it operates.',
        required: ['evaluationTypes'],
        properties: {
          accessModel: {
            type: 'string',
            maxGraphemes: 64,
            knownValues: ['open', 'subscription'],
            description:
              "Whether this evaluator requires user subscription ('subscription') or processes all matching records ('open').",
          },
          evaluationTypes: {
            type: 'array',
            items: {
              type: 'string',
              maxGraphemes: 64,
            },
            maxLength: 20,
            description:
              "List of evaluation type identifiers this evaluator produces (e.g., 'species-id', 'data-quality').",
          },
          evaluationTypeDefinitions: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.gainforest.evaluator.service#evaluationTypeDefinition',
            },
            maxLength: 20,
            description:
              'Detailed definitions for each evaluation type, including human-readable descriptions.',
          },
          subjectCollections: {
            type: 'array',
            items: {
              type: 'string',
              maxGraphemes: 128,
            },
            maxLength: 20,
            description:
              "NSIDs of record collections this evaluator can evaluate (e.g., 'app.gainforest.dwc.occurrence').",
          },
        },
      },
      evaluationTypeDefinition: {
        type: 'object',
        description:
          'Definition of a single evaluation type produced by this evaluator.',
        required: ['identifier', 'resultType'],
        properties: {
          identifier: {
            type: 'string',
            maxGraphemes: 64,
            description:
              'The evaluation type identifier (must match an entry in evaluationTypes).',
          },
          resultType: {
            type: 'string',
            maxGraphemes: 128,
            description:
              "The lexicon reference for the result type (e.g., 'app.gainforest.evaluator.defs#speciesIdResult').",
          },
          method: {
            type: 'ref',
            ref: 'lex:app.gainforest.evaluator.defs#methodInfo',
            description:
              'Default method info for this evaluation type (can be overridden per-evaluation).',
          },
          locales: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.gainforest.evaluator.service#evaluationTypeLocale',
            },
            maxLength: 20,
            description:
              'Human-readable names and descriptions in various languages.',
          },
        },
      },
      evaluationTypeLocale: {
        type: 'object',
        description: 'Localized name and description for an evaluation type.',
        required: ['lang', 'name', 'description'],
        properties: {
          lang: {
            type: 'string',
            maxGraphemes: 16,
            description: "Language code (BCP-47, e.g., 'en', 'pt-BR').",
          },
          name: {
            type: 'string',
            maxGraphemes: 128,
            description: 'Short human-readable name for this evaluation type.',
          },
          description: {
            type: 'string',
            maxGraphemes: 2048,
            description:
              'Longer description of what this evaluation type does.',
          },
        },
      },
    },
  },
  AppGainforestEvaluatorSubscription: {
    lexicon: 1,
    id: 'app.gainforest.evaluator.subscription',
    description:
      'A subscription record published by a user in their own repo to request evaluations from a specific evaluator service. The evaluator detects subscriptions via Jetstream and processes matching records. Deleting this record unsubscribes.',
    defs: {
      main: {
        type: 'record',
        description:
          'User subscription to an evaluator service. Published by the user (not the evaluator) to declare they want evaluations.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['evaluator', 'createdAt'],
          properties: {
            evaluator: {
              type: 'string',
              format: 'did',
              description: 'DID of the evaluator service to subscribe to.',
            },
            collections: {
              type: 'array',
              items: {
                type: 'string',
                maxGraphemes: 128,
              },
              maxLength: 20,
              description:
                "Which of the user's record collections should be evaluated (NSIDs). Must be a subset of the evaluator's subjectCollections. If omitted, all supported collections are evaluated.",
            },
            evaluationTypes: {
              type: 'array',
              items: {
                type: 'string',
                maxGraphemes: 64,
              },
              maxLength: 20,
              description:
                'Which evaluation types the user wants. If omitted, all types the evaluator supports are applied.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description: 'Timestamp of when this subscription was created.',
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationDefaultSite: {
    lexicon: 1,
    id: 'app.gainforest.organization.defaultSite',
    defs: {
      main: {
        type: 'record',
        description: 'A declaration of the default site for an organization',
        key: 'literal:self',
        record: {
          type: 'object',
          required: ['site', 'createdAt'],
          properties: {
            site: {
              type: 'string',
              format: 'at-uri',
              description:
                'The reference to the default site record in the PDS',
            },
            createdAt: {
              type: 'string',
              description: 'The date and time of the creation of the record',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationGetIndexedOrganizations: {
    lexicon: 1,
    id: 'app.gainforest.organization.getIndexedOrganizations',
    defs: {
      main: {
        type: 'query',
        description: 'Get all organizations to view initially on map',
        parameters: {
          type: 'params',
          properties: {},
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['organizations'],
            properties: {
              organizations: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.gainforest.common.defs#indexedOrganization',
                },
              },
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationInfo: {
    lexicon: 1,
    id: 'app.gainforest.organization.info',
    defs: {
      main: {
        type: 'record',
        description: 'A declaration of an organization or project',
        key: 'literal:self',
        record: {
          type: 'object',
          required: [
            'displayName',
            'shortDescription',
            'longDescription',
            'objectives',
            'country',
            'visibility',
            'createdAt',
          ],
          properties: {
            displayName: {
              type: 'string',
              description: 'The name of the organization or project',
              minLength: 8,
              maxLength: 255,
            },
            shortDescription: {
              type: 'ref',
              ref: 'lex:app.gainforest.common.defs#richtext',
              description: 'The description of the organization or project',
            },
            longDescription: {
              type: 'ref',
              ref: 'lex:pub.leaflet.pages.linearDocument',
              description:
                'The long description of the organization or project in richtext',
            },
            coverImage: {
              type: 'ref',
              ref: 'lex:org.hypercerts.defs#smallImage',
              description: 'Cover image for the organization',
            },
            logo: {
              type: 'ref',
              ref: 'lex:org.hypercerts.defs#smallImage',
              description: 'Logo for the organization',
            },
            objectives: {
              type: 'array',
              description: 'The objectives of the organization or project',
              items: {
                type: 'string',
                enum: [
                  'Conservation',
                  'Research',
                  'Education',
                  'Community',
                  'Other',
                ],
              },
            },
            startDate: {
              type: 'string',
              description: 'The start date of the organization or project',
              format: 'datetime',
            },
            website: {
              type: 'string',
              description: 'The website of the organization or project',
              format: 'uri',
            },
            country: {
              type: 'string',
              description:
                'The country of the organization or project in two letter code (ISO 3166-1 alpha-2)',
            },
            visibility: {
              type: 'string',
              description:
                'The visibility of the organization or project in the Green Globe',
              enum: ['Public', 'Unlisted'],
            },
            createdAt: {
              type: 'string',
              description: 'The date and time of the creation of the record',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationLayer: {
    lexicon: 1,
    id: 'app.gainforest.organization.layer',
    defs: {
      main: {
        type: 'record',
        description: 'A declaration of a layer for an organization',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'type', 'uri', 'createdAt'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the site',
            },
            type: {
              type: 'string',
              description: 'The type of the layer',
              enum: [
                'geojson_points',
                'geojson_points_trees',
                'geojson_line',
                'choropleth',
                'choropleth_shannon',
                'raster_tif',
                'tms_tile',
              ],
            },
            uri: {
              type: 'string',
              format: 'uri',
              description: 'The URI of the layer',
            },
            description: {
              type: 'string',
              description: 'The description of the layer',
            },
            createdAt: {
              type: 'string',
              description: 'The date and time of the creation of the record',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationObservationsDendogram: {
    lexicon: 1,
    id: 'app.gainforest.organization.observations.dendogram',
    defs: {
      main: {
        type: 'record',
        description:
          'A declaration of a dendogram observation for an organization',
        key: 'literal:self',
        record: {
          type: 'object',
          required: ['dendogram', 'createdAt'],
          properties: {
            dendogram: {
              type: 'ref',
              ref: 'lex:org.hypercerts.defs#smallBlob',
              description: 'An SVG of the dendogram uploaded as blob',
            },
            createdAt: {
              type: 'string',
              description: 'The date and time of the creation of the record',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationObservationsFauna: {
    lexicon: 1,
    id: 'app.gainforest.organization.observations.fauna',
    defs: {
      main: {
        type: 'record',
        description:
          'DEPRECATED: Use app.gainforest.dwc.occurrence instead. A declaration of a fauna observation for an organization.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['gbifTaxonKeys', 'createdAt'],
          properties: {
            gbifTaxonKeys: {
              type: 'array',
              description:
                'An array of GBIF taxon keys for each fauna observation',
              items: {
                type: 'string',
                description: 'The GBIF taxon key of the fauna observation',
              },
            },
            createdAt: {
              type: 'string',
              description: 'The date and time of the creation of the record',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationObservationsFlora: {
    lexicon: 1,
    id: 'app.gainforest.organization.observations.flora',
    defs: {
      main: {
        type: 'record',
        description:
          'DEPRECATED: Use app.gainforest.dwc.occurrence instead. A declaration of a flora observation for an organization.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['gbifTaxonKeys', 'createdAt'],
          properties: {
            gbifTaxonKeys: {
              type: 'array',
              description:
                'An array of GBIF taxon keys for each flora observation',
              items: {
                type: 'string',
                description: 'The GBIF taxon key of the flora observation',
              },
            },
            createdAt: {
              type: 'string',
              description: 'The date and time of the creation of the record',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationObservationsMeasuredTreesCluster: {
    lexicon: 1,
    id: 'app.gainforest.organization.observations.measuredTreesCluster',
    defs: {
      main: {
        type: 'record',
        description:
          'A declaration of a measured trees cluster for an organization',
        key: 'tid',
        record: {
          type: 'object',
          required: ['shapefile', 'createdAt'],
          properties: {
            shapefile: {
              type: 'ref',
              ref: 'lex:org.hypercerts.defs#smallBlob',
              description:
                'A blob pointing to a shapefile of the measured trees cluster',
            },
            createdAt: {
              type: 'string',
              description: 'The date and time of the creation of the record',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationPredictionsFauna: {
    lexicon: 1,
    id: 'app.gainforest.organization.predictions.fauna',
    defs: {
      main: {
        type: 'record',
        description:
          "DEPRECATED: Use app.gainforest.dwc.occurrence with basisOfRecord='MachineObservation' instead. A declaration of a fauna prediction for an organization.",
        key: 'tid',
        record: {
          type: 'object',
          required: ['gbifTaxonKeys', 'createdAt'],
          properties: {
            gbifTaxonKeys: {
              type: 'array',
              description:
                'An array of GBIF taxon keys for each fauna prediction',
              items: {
                type: 'string',
                description: 'The GBIF taxon key of the fauna prediction',
              },
            },
            createdAt: {
              type: 'string',
              description: 'The date and time of the creation of the record',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  AppGainforestOrganizationPredictionsFlora: {
    lexicon: 1,
    id: 'app.gainforest.organization.predictions.flora',
    defs: {
      main: {
        type: 'record',
        description:
          "DEPRECATED: Use app.gainforest.dwc.occurrence with basisOfRecord='MachineObservation' instead. A declaration of a flora prediction for an organization.",
        key: 'tid',
        record: {
          type: 'object',
          required: ['gbifTaxonKeys', 'createdAt'],
          properties: {
            gbifTaxonKeys: {
              type: 'array',
              description:
                'An array of GBIF taxon keys for each flora prediction',
              items: {
                type: 'string',
                description: 'The GBIF taxon key of the flora prediction',
              },
            },
            createdAt: {
              type: 'string',
              description: 'The date and time of the creation of the record',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  ComAtprotoRepoStrongRef: {
    lexicon: 1,
    id: 'com.atproto.repo.strongRef',
    description: 'A URI with a content-hash fingerprint.',
    defs: {
      main: {
        type: 'object',
        required: ['uri', 'cid'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
        },
      },
    },
  },
  OrgHypercertsClaimActivity: {
    lexicon: 1,
    id: 'org.hypercerts.claim.activity',
    defs: {
      main: {
        type: 'record',
        description: 'A hypercert record tracking impact work.',
        key: 'any',
        record: {
          type: 'object',
          required: ['title', 'shortDescription', 'createdAt'],
          properties: {
            title: {
              type: 'string',
              description: 'Title of the hypercert.',
              maxLength: 256,
            },
            shortDescription: {
              type: 'string',
              description:
                'Short summary of this activity claim, suitable for previews and list views. Rich text annotations may be provided via `shortDescriptionFacets`.',
              maxLength: 3000,
              maxGraphemes: 300,
            },
            shortDescriptionFacets: {
              type: 'array',
              description:
                'Rich text annotations for `shortDescription` (mentions, URLs, hashtags, etc).',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.richtext.facet',
              },
            },
            description: {
              type: 'string',
              description:
                'Optional longer description of this activity claim, including context or interpretation. Rich text annotations may be provided via `descriptionFacets`.',
              maxLength: 30000,
              maxGraphemes: 3000,
            },
            descriptionFacets: {
              type: 'array',
              description:
                'Rich text annotations for `description` (mentions, URLs, hashtags, etc).',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.richtext.facet',
              },
            },
            image: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#smallImage',
              ],
              description:
                'The hypercert visual representation as a URI or image blob.',
            },
            workScope: {
              type: 'union',
              refs: [
                'lex:com.atproto.repo.strongRef',
                'lex:org.hypercerts.claim.activity#workScopeString',
              ],
              description:
                'Work scope definition. Either a strongRef to a work-scope logic record (structured, nested logic), or a free-form string for simple or legacy scopes. The work scope record should conform to the org.hypercerts.helper.workScopeTag lexicon.',
            },
            startDate: {
              type: 'string',
              format: 'datetime',
              description: 'When the work began',
            },
            endDate: {
              type: 'string',
              format: 'datetime',
              description: 'When the work ended',
            },
            contributors: {
              type: 'array',
              description:
                'An array of contributor objects, each containing contributor information, weight, and contribution details.',
              items: {
                type: 'ref',
                ref: 'lex:org.hypercerts.claim.activity#contributor',
              },
            },
            rights: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'A strong reference to the rights that this hypercert has. The record referenced must conform with the lexicon org.hypercerts.claim.rights.',
            },
            locations: {
              type: 'array',
              description:
                'An array of strong references to the location where activity was performed. The record referenced must conform with the lexicon app.certified.location.',
              items: {
                type: 'ref',
                ref: 'lex:com.atproto.repo.strongRef',
              },
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
          },
        },
      },
      contributor: {
        type: 'object',
        required: ['contributorIdentity'],
        properties: {
          contributorIdentity: {
            type: 'union',
            refs: [
              'lex:org.hypercerts.claim.activity#contributorIdentity',
              'lex:com.atproto.repo.strongRef',
            ],
            description:
              'Contributor identity as a string (DID or identifier) via org.hypercerts.claim.activity#contributorIdentity, or a strong reference to a contributor information record.',
          },
          contributionWeight: {
            type: 'string',
            description:
              'The relative weight/importance of this contribution (stored as a string to avoid float precision issues). Must be a positive numeric value. Weights do not need to sum to a specific total; normalization can be performed by the consuming application as needed.',
          },
          contributionDetails: {
            type: 'union',
            refs: [
              'lex:org.hypercerts.claim.activity#contributorRole',
              'lex:com.atproto.repo.strongRef',
            ],
            description:
              'Contribution details as a string via org.hypercerts.claim.activity#contributorRole, or a strong reference to a contribution details record.',
          },
        },
      },
      contributorIdentity: {
        type: 'object',
        description: 'Contributor information as a string (DID or identifier).',
        required: ['identity'],
        properties: {
          identity: {
            type: 'string',
            description: 'The contributor identity string (DID or identifier).',
            maxLength: 1000,
            maxGraphemes: 100,
          },
        },
      },
      contributorRole: {
        type: 'object',
        description: 'Contribution details as a string.',
        required: ['role'],
        properties: {
          role: {
            type: 'string',
            description: 'The contribution role or details.',
            maxLength: 1000,
            maxGraphemes: 100,
          },
        },
      },
      workScopeString: {
        type: 'object',
        description:
          'A free-form string describing the work scope for simple or legacy scopes.',
        required: ['scope'],
        properties: {
          scope: {
            type: 'string',
            description: 'The work scope description string.',
            maxLength: 1000,
            maxGraphemes: 100,
          },
        },
      },
    },
  },
  OrgHypercertsClaimAttachment: {
    lexicon: 1,
    id: 'org.hypercerts.claim.attachment',
    defs: {
      main: {
        type: 'record',
        description:
          'An attachment providing commentary, context, evidence, or documentary material related to a hypercert record (e.g. an activity, project, claim, or evaluation).',
        key: 'tid',
        record: {
          type: 'object',
          required: ['title', 'content', 'createdAt'],
          properties: {
            subjects: {
              type: 'array',
              description:
                'References to the subject(s) the attachment is connected to—this may be an activity claim, outcome claim, measurement, evaluation, or even another attachment. This is optional as the attachment can exist before the claim is recorded.',
              items: {
                type: 'ref',
                ref: 'lex:com.atproto.repo.strongRef',
              },
              maxLength: 100,
            },
            contentType: {
              type: 'string',
              maxLength: 64,
              description:
                'The type of attachment, e.g. report, audit, evidence, testimonial, methodology, etc.',
            },
            content: {
              type: 'array',
              description:
                'The files, documents, or external references included in this attachment record.',
              items: {
                type: 'union',
                refs: [
                  'lex:org.hypercerts.defs#uri',
                  'lex:org.hypercerts.defs#smallBlob',
                ],
              },
              maxLength: 100,
            },
            title: {
              type: 'string',
              maxLength: 256,
              description: 'Title of this attachment.',
            },
            shortDescription: {
              type: 'string',
              description:
                'Short summary of this attachment, suitable for previews and list views. Rich text annotations may be provided via `shortDescriptionFacets`.',
              maxLength: 3000,
              maxGraphemes: 300,
            },
            shortDescriptionFacets: {
              type: 'array',
              description:
                'Rich text annotations for `shortDescription` (mentions, URLs, hashtags, etc).',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.richtext.facet',
              },
            },
            description: {
              type: 'string',
              description:
                'Optional longer description of this attachment, including context or interpretation. Rich text annotations may be provided via `descriptionFacets`.',
              maxLength: 30000,
              maxGraphemes: 3000,
            },
            descriptionFacets: {
              type: 'array',
              description:
                'Rich text annotations for `description` (mentions, URLs, hashtags, etc).',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.richtext.facet',
              },
            },
            location: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                "A strong reference to the location where this attachment's subject matter occurred. The record referenced must conform with the lexicon app.certified.location.",
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created.',
            },
          },
        },
      },
    },
  },
  OrgHypercertsClaimCollection: {
    lexicon: 1,
    id: 'org.hypercerts.claim.collection',
    defs: {
      main: {
        type: 'record',
        description:
          'A collection/group of items (activities and/or other collections). Collections support recursive nesting.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['title', 'items', 'createdAt'],
          properties: {
            type: {
              type: 'string',
              description:
                "The type of this collection. Possible fields can be 'favorites', 'project', or any other type of collection.",
            },
            title: {
              type: 'string',
              description: 'The title of this collection',
              maxLength: 800,
              maxGraphemes: 80,
            },
            shortDescription: {
              type: 'string',
              maxLength: 3000,
              maxGraphemes: 300,
              description:
                'Short summary of this collection, suitable for previews and list views',
            },
            description: {
              type: 'ref',
              ref: 'lex:pub.leaflet.pages.linearDocument#main',
              description:
                'Rich-text description, represented as a Leaflet linear document.',
            },
            avatar: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#smallImage',
              ],
              description:
                "The collection's avatar/profile image as a URI or image blob.",
            },
            banner: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#largeImage',
              ],
              description:
                'Larger horizontal image to display behind the collection view.',
            },
            items: {
              type: 'array',
              description:
                'Array of items in this collection with optional weights.',
              items: {
                type: 'ref',
                ref: 'lex:org.hypercerts.claim.collection#item',
              },
            },
            location: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                "A strong reference to the location where this collection's activities were performed. The record referenced must conform with the lexicon app.certified.location.",
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
          },
        },
      },
      item: {
        type: 'object',
        required: ['itemIdentifier'],
        properties: {
          itemIdentifier: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
            description:
              'Strong reference to an item in this collection. Items can be activities (org.hypercerts.claim.activity) and/or other collections (org.hypercerts.claim.collection).',
          },
          itemWeight: {
            type: 'string',
            description:
              'Optional weight for this item (positive numeric value stored as string). Weights do not need to sum to a specific total; normalization can be performed by the consuming application as needed.',
          },
        },
      },
    },
  },
  OrgHypercertsClaimContributionDetails: {
    lexicon: 1,
    id: 'org.hypercerts.claim.contributionDetails',
    defs: {
      main: {
        type: 'record',
        description:
          'Details about a specific contribution including role, description, and timeframe.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['createdAt'],
          properties: {
            role: {
              type: 'string',
              description: 'Role or title of the contributor.',
              maxLength: 100,
            },
            contributionDescription: {
              type: 'string',
              description: 'What the contribution concretely was.',
              maxLength: 10000,
              maxGraphemes: 1000,
            },
            startDate: {
              type: 'string',
              format: 'datetime',
              description:
                'When this contribution started. This should be a subset of the hypercert timeframe.',
            },
            endDate: {
              type: 'string',
              format: 'datetime',
              description:
                'When this contribution finished. This should be a subset of the hypercert timeframe.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created.',
            },
          },
        },
      },
    },
  },
  OrgHypercertsClaimContributorInformation: {
    lexicon: 1,
    id: 'org.hypercerts.claim.contributorInformation',
    defs: {
      main: {
        type: 'record',
        description:
          'Contributor information including identifier, display name, and image.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['createdAt'],
          properties: {
            identifier: {
              type: 'string',
              description:
                'DID or a URI to a social profile of the contributor.',
            },
            displayName: {
              type: 'string',
              description: 'Display name of the contributor.',
              maxLength: 100,
            },
            image: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#smallImage',
              ],
              description:
                'The contributor visual representation as a URI or image blob.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created.',
            },
          },
        },
      },
    },
  },
  OrgHypercertsClaimEvaluation: {
    lexicon: 1,
    id: 'org.hypercerts.claim.evaluation',
    defs: {
      score: {
        type: 'object',
        description: 'Overall score for an evaluation on a numeric scale.',
        required: ['min', 'max', 'value'],
        properties: {
          min: {
            type: 'integer',
            description: 'Minimum value of the scale, e.g. 0 or 1.',
          },
          max: {
            type: 'integer',
            description: 'Maximum value of the scale, e.g. 5 or 10.',
          },
          value: {
            type: 'integer',
            description: 'Score within the inclusive range [min, max].',
          },
        },
      },
      main: {
        type: 'record',
        description:
          'An evaluation of a hypercert record (e.g. an activity and its impact).',
        key: 'tid',
        record: {
          type: 'object',
          required: ['evaluators', 'summary', 'createdAt'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'A strong reference to what is being evaluated. (e.g activity, measurement, contribution, etc.)',
            },
            evaluators: {
              type: 'array',
              description: 'DIDs of the evaluators',
              items: {
                type: 'ref',
                ref: 'lex:app.certified.defs#did',
              },
              maxLength: 1000,
            },
            content: {
              type: 'array',
              description:
                'Evaluation data (URIs or blobs) containing detailed reports or methodology',
              items: {
                type: 'union',
                refs: [
                  'lex:org.hypercerts.defs#uri',
                  'lex:org.hypercerts.defs#smallBlob',
                ],
              },
              maxLength: 100,
            },
            measurements: {
              type: 'array',
              description:
                'Optional references to the measurements that contributed to this evaluation. The record(s) referenced must conform with the lexicon org.hypercerts.claim.measurement',
              items: {
                type: 'ref',
                ref: 'lex:com.atproto.repo.strongRef',
              },
              maxLength: 100,
            },
            summary: {
              type: 'string',
              description: 'Brief evaluation summary',
              maxLength: 5000,
              maxGraphemes: 1000,
            },
            score: {
              type: 'ref',
              ref: 'lex:org.hypercerts.claim.evaluation#score',
              description:
                'Optional overall score for this evaluation on a numeric scale.',
            },
            location: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'An optional reference for georeferenced evaluations. The record referenced must conform with the lexicon app.certified.location.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
          },
        },
      },
    },
  },
  OrgHypercertsClaimMeasurement: {
    lexicon: 1,
    id: 'org.hypercerts.claim.measurement',
    defs: {
      main: {
        type: 'record',
        description:
          'Measurement data related to a hypercert record (e.g. an activity and its impact).',
        key: 'tid',
        record: {
          type: 'object',
          required: ['metric', 'unit', 'value', 'createdAt'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'A strong reference to the record this measurement refers to (e.g. an activity, project, or claim).',
            },
            metric: {
              type: 'string',
              description:
                'The metric being measured, e.g. forest area restored, number of users, etc.',
              maxLength: 500,
            },
            unit: {
              type: 'string',
              description:
                'The unit of the measured value (e.g. kg CO₂e, hectares, %, index score).',
              maxLength: 50,
            },
            value: {
              type: 'string',
              description: 'The measured numeric value.',
              maxLength: 500,
            },
            startDate: {
              type: 'string',
              format: 'datetime',
              description:
                'The start date and time when the measurement began.',
            },
            endDate: {
              type: 'string',
              format: 'datetime',
              description:
                'The end date and time when the measurement ended. If it was a one time measurement, the endDate should be equal to the startDate.',
            },
            locations: {
              type: 'array',
              description:
                'Optional geographic references related to where the measurement was taken. Each referenced record must conform with the app.certified.location lexicon.',
              items: {
                type: 'ref',
                ref: 'lex:com.atproto.repo.strongRef',
              },
              maxLength: 100,
            },
            methodType: {
              type: 'string',
              description: 'Short identifier for the measurement methodology',
              maxLength: 30,
            },
            methodURI: {
              type: 'string',
              format: 'uri',
              description:
                'URI to methodology documentation, standard protocol, or measurement procedure',
            },
            evidenceURI: {
              type: 'array',
              description:
                'URIs to related evidence or underlying data (e.g. org.hypercerts.claim.evidence records or raw datasets)',
              items: {
                type: 'string',
                format: 'uri',
              },
              maxLength: 50,
            },
            measurers: {
              type: 'array',
              description:
                'DIDs of the entity (or entities) that measured this data',
              items: {
                type: 'ref',
                ref: 'lex:app.certified.defs#did',
              },
              maxLength: 100,
            },
            comment: {
              type: 'string',
              description:
                'Short comment of this measurement, suitable for previews and list views. Rich text annotations may be provided via `commentFacets`.',
              maxLength: 3000,
              maxGraphemes: 300,
            },
            commentFacets: {
              type: 'array',
              description:
                'Rich text annotations for `comment` (mentions, URLs, hashtags, etc).',
              items: {
                type: 'ref',
                ref: 'lex:app.bsky.richtext.facet',
              },
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
          },
        },
      },
    },
  },
  OrgHypercertsClaimRights: {
    lexicon: 1,
    id: 'org.hypercerts.claim.rights',
    defs: {
      main: {
        type: 'record',
        description:
          'Describes the rights that a contributor and/or an owner has, such as whether the hypercert can be sold, transferred, and under what conditions.',
        key: 'tid',
        record: {
          type: 'object',
          required: [
            'rightsName',
            'rightsType',
            'rightsDescription',
            'createdAt',
          ],
          properties: {
            rightsName: {
              type: 'string',
              description: 'Full name of the rights',
              maxLength: 100,
            },
            rightsType: {
              type: 'string',
              description: 'Short rights identifier for easier search',
              maxLength: 10,
            },
            rightsDescription: {
              type: 'string',
              description: 'Description of the rights of this hypercert',
            },
            attachment: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#smallBlob',
              ],
              description:
                'An attachment to define the rights further, e.g. a legal document.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
          },
        },
      },
    },
  },
  OrgHypercertsDefs: {
    lexicon: 1,
    id: 'org.hypercerts.defs',
    defs: {
      uri: {
        type: 'object',
        required: ['uri'],
        description: 'Object containing a URI to external data',
        properties: {
          uri: {
            type: 'string',
            format: 'uri',
            maxGraphemes: 1024,
            description: 'URI to external data',
          },
        },
      },
      smallBlob: {
        type: 'object',
        required: ['blob'],
        description: 'Object containing a blob to external data',
        properties: {
          blob: {
            type: 'blob',
            accept: ['*/*'],
            maxSize: 10485760,
            description: 'Blob to external data (up to 10MB)',
          },
        },
      },
      largeBlob: {
        type: 'object',
        required: ['blob'],
        description: 'Object containing a blob to external data',
        properties: {
          blob: {
            type: 'blob',
            accept: ['*/*'],
            maxSize: 104857600,
            description: 'Blob to external data (up to 100MB)',
          },
        },
      },
      smallImage: {
        type: 'object',
        required: ['image'],
        description: 'Object containing a small image',
        properties: {
          image: {
            type: 'blob',
            accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
            maxSize: 5242880,
            description: 'Image (up to 5MB)',
          },
        },
      },
      largeImage: {
        type: 'object',
        required: ['image'],
        description: 'Object containing a large image',
        properties: {
          image: {
            type: 'blob',
            accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
            maxSize: 10485760,
            description: 'Image (up to 10MB)',
          },
        },
      },
    },
  },
  OrgHypercertsFundingReceipt: {
    lexicon: 1,
    id: 'org.hypercerts.funding.receipt',
    defs: {
      main: {
        type: 'record',
        description:
          'Records a funding receipt for a payment from one user to another user. It may be recorded by the recipient, by the sender, or by a third party. The sender may remain anonymous.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['from', 'to', 'amount', 'currency', 'createdAt'],
          properties: {
            from: {
              type: 'ref',
              ref: 'lex:app.certified.defs#did',
              description:
                'DID of the sender who transferred the funds. Leave empty if sender wants to stay anonymous.',
            },
            to: {
              type: 'string',
              description:
                'The recipient of the funds. Can be identified by DID or a clear-text name.',
            },
            amount: {
              type: 'string',
              description: 'Amount of funding received.',
            },
            currency: {
              type: 'string',
              description: 'Currency of the payment (e.g. EUR, USD, ETH).',
            },
            paymentRail: {
              type: 'string',
              description:
                'How the funds were transferred (e.g. bank_transfer, credit_card, onchain, cash, check, payment_processor).',
            },
            paymentNetwork: {
              type: 'string',
              description:
                'Optional network within the payment rail (e.g. arbitrum, ethereum, sepa, visa, paypal).',
            },
            transactionId: {
              type: 'string',
              description:
                'Identifier of the underlying payment transaction (e.g. bank reference, onchain transaction hash, or processor-specific ID). Use paymentNetwork to specify the network where applicable.',
            },
            for: {
              type: 'string',
              format: 'at-uri',
              description:
                'Optional reference to the activity, project, or organization this funding relates to.',
            },
            notes: {
              type: 'string',
              description:
                'Optional notes or additional context for this funding receipt.',
              maxLength: 500,
            },
            occurredAt: {
              type: 'string',
              format: 'datetime',
              description: 'Timestamp when the payment occurred.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this receipt record was created.',
            },
          },
        },
      },
    },
  },
  OrgHypercertsHelperWorkScopeTag: {
    lexicon: 1,
    id: 'org.hypercerts.helper.workScopeTag',
    defs: {
      main: {
        type: 'record',
        description:
          'A reusable scope atom for work scope logic expressions. Scopes can represent topics, languages, domains, deliverables, methods, regions, tags, or other categorical labels.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['createdAt', 'key', 'label'],
          properties: {
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this record was originally created',
            },
            key: {
              type: 'string',
              description:
                "Lowercase, hyphenated machine-readable key for this scope (e.g., 'ipfs', 'go-lang', 'filecoin').",
              maxLength: 120,
            },
            label: {
              type: 'string',
              description: 'Human-readable label for this scope.',
              maxLength: 200,
            },
            kind: {
              type: 'string',
              description:
                'Category type of this scope. Recommended values: topic, language, domain, method, tag.',
              maxLength: 50,
            },
            description: {
              type: 'string',
              description: 'Optional longer description of this scope.',
              maxLength: 10000,
              maxGraphemes: 1000,
            },
            parent: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'Optional strong reference to a parent scope record for taxonomy/hierarchy support.',
            },
            aliases: {
              type: 'array',
              items: {
                type: 'string',
                maxLength: 200,
              },
              maxLength: 50,
              description:
                'Optional array of alternative names or identifiers for this scope.',
            },
            externalReference: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#smallBlob',
              ],
              description:
                'Optional external reference for this scope as a URI or blob.',
            },
          },
        },
      },
    },
  },
  OrgImpactindexerLinkAttestation: {
    lexicon: 1,
    id: 'org.impactindexer.link.attestation',
    defs: {
      main: {
        type: 'record',
        description:
          'An attestation linking an ATProto DID to an EVM wallet address, signed with EIP-712.',
        key: 'tid',
        record: {
          type: 'object',
          required: [
            'address',
            'chainId',
            'signature',
            'message',
            'signatureType',
            'createdAt',
          ],
          properties: {
            address: {
              type: 'string',
              minLength: 42,
              maxLength: 42,
              description:
                'The EVM wallet address (checksummed or lowercase, 0x-prefixed)',
            },
            chainId: {
              type: 'integer',
              minimum: 1,
              description: 'The EVM chain ID where the signature was created',
            },
            signature: {
              type: 'string',
              minLength: 132,
              maxLength: 1000,
              description:
                'The EIP-712 signature in hex format (0x-prefixed, 65 bytes for ECDSA, longer for smart contract sigs)',
            },
            message: {
              type: 'ref',
              ref: 'lex:org.impactindexer.link.attestation#eip712Message',
              description: 'The EIP-712 typed data message that was signed',
            },
            signatureType: {
              type: 'string',
              maxLength: 10,
              knownValues: ['eoa', 'erc1271', 'erc6492'],
              description:
                'The type of signature: eoa (EOA/ECDSA), erc1271 (smart contract), erc6492 (counterfactual)',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description: 'Timestamp when the attestation was created',
            },
          },
        },
      },
      eip712Message: {
        type: 'object',
        description: 'The EIP-712 typed data message structure',
        required: ['did', 'evmAddress', 'chainId', 'timestamp', 'nonce'],
        properties: {
          did: {
            type: 'string',
            maxLength: 2048,
            description: 'The ATProto DID being linked',
          },
          evmAddress: {
            type: 'string',
            minLength: 42,
            maxLength: 42,
            description: 'The EVM address being linked (0x-prefixed)',
          },
          chainId: {
            type: 'string',
            maxLength: 78,
            description:
              'The chain ID as a string (for bigint compatibility, max uint256)',
          },
          timestamp: {
            type: 'string',
            maxLength: 78,
            description:
              'Unix timestamp as a string (for bigint compatibility)',
          },
          nonce: {
            type: 'string',
            maxLength: 78,
            description:
              'Replay protection nonce as a string (for bigint compatibility)',
          },
        },
      },
    },
  },
  OrgImpactindexerReviewComment: {
    lexicon: 1,
    id: 'org.impactindexer.review.comment',
    description:
      'A text comment on an AT-Proto entity. Users can comment on records, users, PDSes, or lexicons to provide feedback, ask questions, or share insights.',
    defs: {
      main: {
        type: 'record',
        description: 'A text comment on a subject.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'text', 'createdAt'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:org.impactindexer.review.defs#subjectRef',
              description: 'The subject being commented on.',
            },
            text: {
              type: 'string',
              maxLength: 20480,
              maxGraphemes: 6000,
              description: 'The comment text.',
            },
            replyTo: {
              type: 'string',
              format: 'at-uri',
              description:
                'Optional AT-URI of another comment this is replying to, enabling threaded discussions.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description: 'Timestamp when the comment was created.',
            },
          },
        },
      },
    },
  },
  OrgImpactindexerReviewDefs: {
    lexicon: 1,
    id: 'org.impactindexer.review.defs',
    description: 'Shared definitions for the Impact Indexer review system.',
    defs: {
      subjectType: {
        type: 'string',
        maxLength: 32,
        knownValues: ['record', 'user', 'pds', 'lexicon'],
        description: 'The type of subject being reviewed.',
      },
      subjectRef: {
        type: 'object',
        description: 'Reference to the subject being reviewed.',
        required: ['uri', 'type'],
        properties: {
          uri: {
            type: 'string',
            maxLength: 8192,
            description:
              'The subject identifier. For records: AT-URI (at://did/collection/rkey). For users: DID (did:plc:xxx). For PDSes: hostname (example.com). For lexicons: NSID (app.bsky.feed.post).',
          },
          type: {
            type: 'ref',
            ref: 'lex:org.impactindexer.review.defs#subjectType',
            description: 'The type of subject.',
          },
          cid: {
            type: 'string',
            maxLength: 128,
            description:
              'Optional CID for record subjects to pin to a specific version.',
          },
        },
      },
    },
  },
  OrgImpactindexerReviewLike: {
    lexicon: 1,
    id: 'org.impactindexer.review.like',
    description:
      'A like on an AT-Proto entity. Users can like records, users, PDSes, or lexicons. One like per subject per user - delete the record to remove the like.',
    defs: {
      main: {
        type: 'record',
        description:
          'A like on a subject. Create to like, delete to remove like.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'createdAt'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:org.impactindexer.review.defs#subjectRef',
              description: 'The subject being liked.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description: 'Timestamp when the like was created.',
            },
          },
        },
      },
    },
  },
  PubLeafletBlocksBlockquote: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.blockquote',
    defs: {
      main: {
        type: 'object',
        required: ['plaintext'],
        properties: {
          plaintext: {
            type: 'string',
          },
          facets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:pub.leaflet.richtext.facet',
            },
          },
        },
      },
    },
  },
  PubLeafletBlocksBskyPost: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.bskyPost',
    defs: {
      main: {
        type: 'object',
        required: ['postRef'],
        properties: {
          postRef: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
          },
        },
      },
    },
  },
  PubLeafletBlocksButton: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.button',
    defs: {
      main: {
        type: 'object',
        required: ['text', 'url'],
        properties: {
          text: {
            type: 'string',
          },
          url: {
            type: 'string',
            format: 'uri',
          },
        },
      },
    },
  },
  PubLeafletBlocksCode: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.code',
    defs: {
      main: {
        type: 'object',
        required: ['plaintext'],
        properties: {
          plaintext: {
            type: 'string',
          },
          language: {
            type: 'string',
          },
          syntaxHighlightingTheme: {
            type: 'string',
          },
        },
      },
    },
  },
  PubLeafletBlocksHeader: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.header',
    defs: {
      main: {
        type: 'object',
        required: ['plaintext'],
        properties: {
          level: {
            type: 'integer',
            minimum: 1,
            maximum: 6,
          },
          plaintext: {
            type: 'string',
          },
          facets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:pub.leaflet.richtext.facet',
            },
          },
        },
      },
    },
  },
  PubLeafletBlocksHorizontalRule: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.horizontalRule',
    defs: {
      main: {
        type: 'object',
        required: [],
        properties: {},
      },
    },
  },
  PubLeafletBlocksIframe: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.iframe',
    defs: {
      main: {
        type: 'object',
        required: ['url'],
        properties: {
          url: {
            type: 'string',
            format: 'uri',
          },
          height: {
            type: 'integer',
            minimum: 16,
            maximum: 1600,
          },
        },
      },
    },
  },
  PubLeafletBlocksImage: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.image',
    defs: {
      main: {
        type: 'object',
        required: ['image', 'aspectRatio'],
        properties: {
          image: {
            type: 'blob',
            accept: ['image/*'],
            maxSize: 1000000,
          },
          alt: {
            type: 'string',
            description:
              'Alt text description of the image, for accessibility.',
          },
          aspectRatio: {
            type: 'ref',
            ref: 'lex:pub.leaflet.blocks.image#aspectRatio',
          },
        },
      },
      aspectRatio: {
        type: 'object',
        required: ['width', 'height'],
        properties: {
          width: {
            type: 'integer',
          },
          height: {
            type: 'integer',
          },
        },
      },
    },
  },
  PubLeafletBlocksMath: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.math',
    defs: {
      main: {
        type: 'object',
        required: ['tex'],
        properties: {
          tex: {
            type: 'string',
          },
        },
      },
    },
  },
  PubLeafletBlocksPage: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.page',
    defs: {
      main: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
          },
        },
      },
    },
  },
  PubLeafletBlocksPoll: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.poll',
    defs: {
      main: {
        type: 'object',
        required: ['pollRef'],
        properties: {
          pollRef: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
          },
        },
      },
    },
  },
  PubLeafletBlocksText: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.text',
    defs: {
      main: {
        type: 'object',
        required: ['plaintext'],
        properties: {
          plaintext: {
            type: 'string',
          },
          textSize: {
            type: 'string',
            enum: ['default', 'small', 'large'],
          },
          facets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:pub.leaflet.richtext.facet',
            },
          },
        },
      },
    },
  },
  PubLeafletBlocksUnorderedList: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.unorderedList',
    defs: {
      main: {
        type: 'object',
        required: ['children'],
        properties: {
          children: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:pub.leaflet.blocks.unorderedList#listItem',
            },
          },
        },
      },
      listItem: {
        type: 'object',
        required: ['content'],
        properties: {
          content: {
            type: 'union',
            refs: [
              'lex:pub.leaflet.blocks.text',
              'lex:pub.leaflet.blocks.header',
              'lex:pub.leaflet.blocks.image',
            ],
          },
          children: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:pub.leaflet.blocks.unorderedList#listItem',
            },
          },
        },
      },
    },
  },
  PubLeafletBlocksWebsite: {
    lexicon: 1,
    id: 'pub.leaflet.blocks.website',
    defs: {
      main: {
        type: 'object',
        required: ['src'],
        properties: {
          previewImage: {
            type: 'blob',
            accept: ['image/*'],
            maxSize: 1000000,
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          src: {
            type: 'string',
            format: 'uri',
          },
        },
      },
    },
  },
  PubLeafletPagesLinearDocument: {
    lexicon: 1,
    id: 'pub.leaflet.pages.linearDocument',
    defs: {
      main: {
        type: 'object',
        required: ['blocks'],
        properties: {
          id: {
            type: 'string',
          },
          blocks: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:pub.leaflet.pages.linearDocument#block',
            },
          },
        },
      },
      block: {
        type: 'object',
        required: ['block'],
        properties: {
          block: {
            type: 'union',
            refs: [
              'lex:pub.leaflet.blocks.iframe',
              'lex:pub.leaflet.blocks.text',
              'lex:pub.leaflet.blocks.blockquote',
              'lex:pub.leaflet.blocks.header',
              'lex:pub.leaflet.blocks.image',
              'lex:pub.leaflet.blocks.unorderedList',
              'lex:pub.leaflet.blocks.website',
              'lex:pub.leaflet.blocks.math',
              'lex:pub.leaflet.blocks.code',
              'lex:pub.leaflet.blocks.horizontalRule',
              'lex:pub.leaflet.blocks.bskyPost',
              'lex:pub.leaflet.blocks.page',
              'lex:pub.leaflet.blocks.poll',
              'lex:pub.leaflet.blocks.button',
            ],
          },
          alignment: {
            type: 'string',
            knownValues: [
              'lex:pub.leaflet.pages.linearDocument#textAlignLeft',
              'lex:pub.leaflet.pages.linearDocument#textAlignCenter',
              'lex:pub.leaflet.pages.linearDocument#textAlignRight',
              'lex:pub.leaflet.pages.linearDocument#textAlignJustify',
            ],
          },
        },
      },
      textAlignLeft: {
        type: 'token',
      },
      textAlignCenter: {
        type: 'token',
      },
      textAlignRight: {
        type: 'token',
      },
      textAlignJustify: {
        type: 'token',
      },
      quote: {
        type: 'object',
        required: ['start', 'end'],
        properties: {
          start: {
            type: 'ref',
            ref: 'lex:pub.leaflet.pages.linearDocument#position',
          },
          end: {
            type: 'ref',
            ref: 'lex:pub.leaflet.pages.linearDocument#position',
          },
        },
      },
      position: {
        type: 'object',
        required: ['block', 'offset'],
        properties: {
          block: {
            type: 'array',
            items: {
              type: 'integer',
            },
          },
          offset: {
            type: 'integer',
          },
        },
      },
    },
  },
  PubLeafletRichtextFacet: {
    lexicon: 1,
    id: 'pub.leaflet.richtext.facet',
    defs: {
      main: {
        type: 'object',
        description: 'Annotation of a sub-string within rich text.',
        required: ['index', 'features'],
        properties: {
          index: {
            type: 'ref',
            ref: 'lex:pub.leaflet.richtext.facet#byteSlice',
          },
          features: {
            type: 'array',
            items: {
              type: 'union',
              refs: [
                'lex:pub.leaflet.richtext.facet#link',
                'lex:pub.leaflet.richtext.facet#didMention',
                'lex:pub.leaflet.richtext.facet#atMention',
                'lex:pub.leaflet.richtext.facet#code',
                'lex:pub.leaflet.richtext.facet#highlight',
                'lex:pub.leaflet.richtext.facet#underline',
                'lex:pub.leaflet.richtext.facet#strikethrough',
                'lex:pub.leaflet.richtext.facet#id',
                'lex:pub.leaflet.richtext.facet#bold',
                'lex:pub.leaflet.richtext.facet#italic',
              ],
            },
          },
        },
      },
      byteSlice: {
        type: 'object',
        description:
          'Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets.',
        required: ['byteStart', 'byteEnd'],
        properties: {
          byteStart: {
            type: 'integer',
            minimum: 0,
          },
          byteEnd: {
            type: 'integer',
            minimum: 0,
          },
        },
      },
      link: {
        type: 'object',
        description:
          'Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL.',
        required: ['uri'],
        properties: {
          uri: {
            type: 'string',
          },
        },
      },
      didMention: {
        type: 'object',
        description: 'Facet feature for mentioning a did.',
        required: ['did'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
        },
      },
      atMention: {
        type: 'object',
        description: 'Facet feature for mentioning an AT URI.',
        required: ['atURI'],
        properties: {
          atURI: {
            type: 'string',
            format: 'uri',
          },
        },
      },
      code: {
        type: 'object',
        description: 'Facet feature for inline code.',
        required: [],
        properties: {},
      },
      highlight: {
        type: 'object',
        description: 'Facet feature for highlighted text.',
        required: [],
        properties: {},
      },
      underline: {
        type: 'object',
        description: 'Facet feature for underline markup',
        required: [],
        properties: {},
      },
      strikethrough: {
        type: 'object',
        description: 'Facet feature for strikethrough markup',
        required: [],
        properties: {},
      },
      id: {
        type: 'object',
        description:
          'Facet feature for an identifier. Used for linking to a segment',
        required: [],
        properties: {
          id: {
            type: 'string',
          },
        },
      },
      bold: {
        type: 'object',
        description: 'Facet feature for bold text',
        required: [],
        properties: {},
      },
      italic: {
        type: 'object',
        description: 'Facet feature for italic text',
        required: [],
        properties: {},
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>
export const schemas = Object.values(schemaDict) satisfies LexiconDoc[]
export const lexicons: Lexicons = new Lexicons(schemas)

export function validate<T extends { $type: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType: true,
): ValidationResult<T>
export function validate<T extends { $type?: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: false,
): ValidationResult<T>
export function validate(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: boolean,
): ValidationResult {
  return (requiredType ? is$typed : maybe$typed)(v, id, hash)
    ? lexicons.validate(`${id}#${hash}`, v)
    : {
        success: false,
        error: new ValidationError(
          `Must be an object with "${hash === 'main' ? id : `${id}#${hash}`}" $type property`,
        ),
      }
}

export const ids = {
  AppBskyRichtextFacet: 'app.bsky.richtext.facet',
  AppCertifiedBadgeAward: 'app.certified.badge.award',
  AppCertifiedBadgeDefinition: 'app.certified.badge.definition',
  AppCertifiedBadgeResponse: 'app.certified.badge.response',
  AppCertifiedDefs: 'app.certified.defs',
  AppCertifiedLocation: 'app.certified.location',
  AppGainforestCommonDefs: 'app.gainforest.common.defs',
  AppGainforestDwcDefs: 'app.gainforest.dwc.defs',
  AppGainforestDwcEvent: 'app.gainforest.dwc.event',
  AppGainforestDwcMeasurement: 'app.gainforest.dwc.measurement',
  AppGainforestDwcOccurrence: 'app.gainforest.dwc.occurrence',
  AppGainforestEvaluatorDefs: 'app.gainforest.evaluator.defs',
  AppGainforestEvaluatorEvaluation: 'app.gainforest.evaluator.evaluation',
  AppGainforestEvaluatorService: 'app.gainforest.evaluator.service',
  AppGainforestEvaluatorSubscription: 'app.gainforest.evaluator.subscription',
  AppGainforestOrganizationDefaultSite:
    'app.gainforest.organization.defaultSite',
  AppGainforestOrganizationGetIndexedOrganizations:
    'app.gainforest.organization.getIndexedOrganizations',
  AppGainforestOrganizationInfo: 'app.gainforest.organization.info',
  AppGainforestOrganizationLayer: 'app.gainforest.organization.layer',
  AppGainforestOrganizationObservationsDendogram:
    'app.gainforest.organization.observations.dendogram',
  AppGainforestOrganizationObservationsFauna:
    'app.gainforest.organization.observations.fauna',
  AppGainforestOrganizationObservationsFlora:
    'app.gainforest.organization.observations.flora',
  AppGainforestOrganizationObservationsMeasuredTreesCluster:
    'app.gainforest.organization.observations.measuredTreesCluster',
  AppGainforestOrganizationPredictionsFauna:
    'app.gainforest.organization.predictions.fauna',
  AppGainforestOrganizationPredictionsFlora:
    'app.gainforest.organization.predictions.flora',
  ComAtprotoRepoStrongRef: 'com.atproto.repo.strongRef',
  OrgHypercertsClaimActivity: 'org.hypercerts.claim.activity',
  OrgHypercertsClaimAttachment: 'org.hypercerts.claim.attachment',
  OrgHypercertsClaimCollection: 'org.hypercerts.claim.collection',
  OrgHypercertsClaimContributionDetails:
    'org.hypercerts.claim.contributionDetails',
  OrgHypercertsClaimContributorInformation:
    'org.hypercerts.claim.contributorInformation',
  OrgHypercertsClaimEvaluation: 'org.hypercerts.claim.evaluation',
  OrgHypercertsClaimMeasurement: 'org.hypercerts.claim.measurement',
  OrgHypercertsClaimRights: 'org.hypercerts.claim.rights',
  OrgHypercertsDefs: 'org.hypercerts.defs',
  OrgHypercertsFundingReceipt: 'org.hypercerts.funding.receipt',
  OrgHypercertsHelperWorkScopeTag: 'org.hypercerts.helper.workScopeTag',
  OrgImpactindexerLinkAttestation: 'org.impactindexer.link.attestation',
  OrgImpactindexerReviewComment: 'org.impactindexer.review.comment',
  OrgImpactindexerReviewDefs: 'org.impactindexer.review.defs',
  OrgImpactindexerReviewLike: 'org.impactindexer.review.like',
  PubLeafletBlocksBlockquote: 'pub.leaflet.blocks.blockquote',
  PubLeafletBlocksBskyPost: 'pub.leaflet.blocks.bskyPost',
  PubLeafletBlocksButton: 'pub.leaflet.blocks.button',
  PubLeafletBlocksCode: 'pub.leaflet.blocks.code',
  PubLeafletBlocksHeader: 'pub.leaflet.blocks.header',
  PubLeafletBlocksHorizontalRule: 'pub.leaflet.blocks.horizontalRule',
  PubLeafletBlocksIframe: 'pub.leaflet.blocks.iframe',
  PubLeafletBlocksImage: 'pub.leaflet.blocks.image',
  PubLeafletBlocksMath: 'pub.leaflet.blocks.math',
  PubLeafletBlocksPage: 'pub.leaflet.blocks.page',
  PubLeafletBlocksPoll: 'pub.leaflet.blocks.poll',
  PubLeafletBlocksText: 'pub.leaflet.blocks.text',
  PubLeafletBlocksUnorderedList: 'pub.leaflet.blocks.unorderedList',
  PubLeafletBlocksWebsite: 'pub.leaflet.blocks.website',
  PubLeafletPagesLinearDocument: 'pub.leaflet.pages.linearDocument',
  PubLeafletRichtextFacet: 'pub.leaflet.richtext.facet',
} as const
