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
  AppCertifiedLocation: {
    lexicon: 1,
    id: 'app.certified.location',
    defs: {
      main: {
        type: 'record',
        description: 'A location reference',
        key: 'any',
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
              ],
              description:
                'The location of where the work was performed as a URI or blob.',
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
    },
  },
  AppGainforestCommonDefs: {
    lexicon: 1,
    id: 'app.gainforest.common.defs',
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
      indexedOrganization: {
        type: 'object',
        required: ['id', 'name'],
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
  AppGainforestOrganizationDraftEcocert: {
    lexicon: 1,
    id: 'app.gainforest.organization.draft.ecocert',
    defs: {
      main: {
        type: 'record',
        description:
          'A declaration of an unpublished ecocert for an organization',
        key: 'tid',
        record: {
          type: 'object',
          required: [
            'title',
            'coverImage',
            'workScopes',
            'workStartDate',
            'workEndDate',
            'description',
            'shortDescription',
            'contributors',
            'site',
            'createdAt',
          ],
          nullable: ['coverImage'],
          properties: {
            title: {
              type: 'string',
              description: 'The title of the ecocert',
            },
            coverImage: {
              type: 'ref',
              ref: 'lex:app.gainforest.common.defs#smallImage',
              description: 'The cover image of the ecocert',
            },
            workScopes: {
              type: 'array',
              description: 'The work scopes of the ecocert',
              items: {
                type: 'string',
                description: 'The work scope of the ecocert',
              },
            },
            workStartDate: {
              type: 'string',
              description: 'The start date of the work',
              format: 'datetime',
            },
            workEndDate: {
              type: 'string',
              description: 'The end date of the work',
              format: 'datetime',
            },
            description: {
              type: 'string',
              description: 'The description of the ecocert in markdown',
            },
            shortDescription: {
              type: 'string',
              description: 'The short description of the ecocert in markdown',
            },
            contributors: {
              type: 'array',
              description: 'The contributors of the ecocert in markdown',
              items: {
                type: 'string',
                description: 'The contributor of the ecocert',
              },
            },
            site: {
              type: 'string',
              format: 'at-uri',
              description: 'The reference to the site record in the PDS',
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
              type: 'string',
              description: 'The description of the organization or project',
              minLength: 50,
              maxLength: 2000,
            },
            longDescription: {
              type: 'string',
              description:
                'The long description of the organization or project in markdown',
              minLength: 50,
              maxLength: 5000,
            },
            coverImage: {
              type: 'ref',
              ref: 'lex:app.gainforest.common.defs#smallImage',
              description: 'Cover image for the organization',
            },
            logo: {
              type: 'ref',
              ref: 'lex:app.gainforest.common.defs#smallImage',
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
              enum: ['Public', 'Hidden'],
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
              ref: 'lex:app.gainforest.common.defs#smallBlob',
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
        description: 'A declaration of a fauna observation for an organization',
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
        description: 'A declaration of a flora observation for an organization',
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
              ref: 'lex:app.gainforest.common.defs#smallBlob',
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
        description: 'A declaration of a fauna prediction for an organization',
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
        description: 'A declaration of a flora prediction for an organization',
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
  AppGainforestOrganizationProject: {
    lexicon: 1,
    id: 'app.gainforest.organization.project',
    defs: {
      main: {
        type: 'record',
        description: 'A declaration of a project for an organization',
        key: 'tid',
        record: {
          type: 'object',
          required: [
            'name',
            'shortDescription',
            'ecocerts',
            'sites',
            'measuredTreesClusters',
            'layers',
            'createdAt',
          ],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the site',
            },
            description: {
              type: 'string',
              description: 'The description of the project in markdown',
            },
            shortDescription: {
              type: 'string',
              description: 'The short description of the project',
            },
            ecocerts: {
              type: 'array',
              description:
                'An array of at-uris pointing to the records of the ecocerts related to the project',
              items: {
                type: 'string',
                format: 'at-uri',
                description: 'The reference to the ecocert record in the PDS',
              },
            },
            layers: {
              type: 'array',
              description:
                'An array of at-uris pointing to the records of the layers related to the project',
              items: {
                type: 'string',
                format: 'at-uri',
                description: 'The reference to the layer record in the PDS',
              },
            },
            sites: {
              type: 'array',
              description:
                'An array of at-uris pointing to the records of the sites related to the project',
              items: {
                type: 'string',
                format: 'at-uri',
                description: 'The reference to the site record in the PDS',
              },
            },
            measuredTreesClusters: {
              type: 'array',
              description:
                'An array of at-uris pointing to the records of the measured trees clusters related to the project',
              items: {
                type: 'string',
                format: 'at-uri',
                description:
                  'The reference to the measured trees cluster record in the PDS',
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
  AppGainforestOrganizationSite: {
    lexicon: 1,
    id: 'app.gainforest.organization.site',
    defs: {
      main: {
        type: 'record',
        description: 'A declaration of a site for an organization',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'lat', 'lon', 'area', 'shapefile', 'createdAt'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the site',
            },
            lat: {
              type: 'string',
              description: 'The latitude of the centerpoint of the site',
            },
            lon: {
              type: 'string',
              description: 'The longitude of the centerpoint of the site',
            },
            area: {
              type: 'string',
              description: 'The area of the site in hectares',
            },
            shapefile: {
              type: 'ref',
              ref: 'lex:app.gainforest.common.defs#smallBlob',
              description:
                'A blob pointing to a geoJSON file containing the site boundaries',
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
          required: [
            'title',
            'shortDescription',
            'createdAt',
            'startDate',
            'endDate',
          ],
          properties: {
            title: {
              type: 'string',
              description: 'Title of the hypercert',
              maxLength: 256,
            },
            shortDescription: {
              type: 'string',
              description: 'Short blurb of the impact work done.',
              maxLength: 3000,
              maxGraphemes: 300,
            },
            description: {
              type: 'string',
              description:
                'Optional longer description of the impact work done.',
              maxLength: 30000,
              maxGraphemes: 3000,
            },
            image: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#smallImage',
              ],
              description:
                'The hypercert visual representation as a URI or image blob',
            },
            workScope: {
              type: 'ref',
              ref: 'lex:org.hypercerts.claim.activity#workScope',
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
            contributions: {
              type: 'array',
              description:
                'A strong reference to the contributions done to create the impact in the hypercerts. The record referenced must conform with the lexicon org.hypercerts.claim.contribution',
              items: {
                type: 'ref',
                ref: 'lex:com.atproto.repo.strongRef',
              },
            },
            rights: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'A strong reference to the rights that this hypercert has. The record referenced must conform with the lexicon org.hypercerts.claim.rights',
            },
            location: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'A strong reference to the location where the work for done hypercert was located. The record referenced must conform with the lexicon app.certified.location',
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
      workScope: {
        type: 'object',
        description:
          'Logical scope of the work using label-based conditions. All labels in `allOf` must apply; at least one label in `anyOf` must apply if provided; no label in `noneOf` may apply.',
        properties: {
          allOf: {
            type: 'array',
            description: 'Labels that MUST all hold for the scope to apply.',
            items: {
              type: 'string',
            },
            maxLength: 100,
          },
          anyOf: {
            type: 'array',
            description:
              'Labels of which AT LEAST ONE must hold (optional). If omitted or empty, imposes no additional condition.',
            items: {
              type: 'string',
            },
            maxLength: 100,
          },
          noneOf: {
            type: 'array',
            description: 'Labels that MUST NOT hold for the scope to apply.',
            items: {
              type: 'string',
            },
            maxLength: 100,
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
          'A collection/group of hypercerts that have a specific property.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['title', 'claims', 'createdAt'],
          properties: {
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
              description: 'A short description of this collection',
            },
            coverPhoto: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#smallBlob',
              ],
              description:
                'The cover photo of this collection (either in URI format or in a blob).',
            },
            claims: {
              type: 'array',
              description:
                'Array of claims with their associated weights in this collection',
              items: {
                type: 'ref',
                ref: 'lex:org.hypercerts.claim.collection#claimItem',
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
      claimItem: {
        type: 'object',
        required: ['claim', 'weight'],
        properties: {
          claim: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
            description:
              'A strong reference to a hypercert claim record. This claim must conform to the lexicon org.hypercerts.claim.activity',
          },
          weight: {
            type: 'string',
            description:
              'The weight/importance of this hypercert claim in the collection (a percentage from 0-100, stored as a string to avoid float precision issues). The total claim weights should add up to 100.',
          },
        },
      },
    },
  },
  OrgHypercertsClaimContribution: {
    lexicon: 1,
    id: 'org.hypercerts.claim.contribution',
    defs: {
      main: {
        type: 'record',
        description: "A contribution made toward a hypercert's impact.",
        key: 'any',
        record: {
          type: 'object',
          required: ['contributors', 'createdAt'],
          properties: {
            role: {
              type: 'string',
              description: 'Role or title of the contributor(s).',
              maxLength: 100,
            },
            contributors: {
              type: 'array',
              description:
                'List of the contributors (names, pseudonyms, or DIDs). If multiple contributors are stored in the same hypercertContribution, then they would have the exact same role.',
              items: {
                type: 'string',
              },
            },
            description: {
              type: 'string',
              description: 'What the contribution concretely achieved',
              maxLength: 2000,
              maxGraphemes: 500,
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
                'When this contribution finished.  This should be a subset of the hypercert timeframe.',
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
  OrgHypercertsClaimEvaluation: {
    lexicon: 1,
    id: 'org.hypercerts.claim.evaluation',
    defs: {
      main: {
        type: 'record',
        description: 'An evaluation of a hypercert or other claim',
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'evaluators', 'summary', 'createdAt'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'A strong reference to the evaluated claim. (e.g measurement, hypercert, contribution, etc)',
            },
            evaluators: {
              type: 'array',
              description: 'DIDs of the evaluators',
              items: {
                type: 'string',
                format: 'did',
              },
              maxLength: 100,
            },
            evaluations: {
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
            summary: {
              type: 'string',
              description: 'Brief evaluation summary',
              maxLength: 5000,
              maxGraphemes: 1000,
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
  OrgHypercertsClaimEvidence: {
    lexicon: 1,
    id: 'org.hypercerts.claim.evidence',
    defs: {
      main: {
        type: 'record',
        description: 'A piece of evidence supporting a hypercert claim',
        key: 'any',
        record: {
          type: 'object',
          required: ['content', 'title', 'createdAt'],
          properties: {
            activity: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'A strong reference to the activity this evidence is for. The record referenced must conform with the lexicon org.hypercerts.claim.activity',
            },
            content: {
              type: 'union',
              refs: [
                'lex:org.hypercerts.defs#uri',
                'lex:org.hypercerts.defs#smallBlob',
              ],
              description:
                'A piece of evidence (URI or blobs) supporting a hypercert claim',
            },
            title: {
              type: 'string',
              maxLength: 256,
              description: 'Title to describe the nature of the evidence',
            },
            shortDescription: {
              type: 'string',
              maxLength: 3000,
              maxGraphemes: 300,
              description:
                'Short description explaining what this evidence demonstrates or proves',
            },
            description: {
              type: 'string',
              description:
                'Longer description describing the impact claim evidence.',
              maxLength: 30000,
              maxGraphemes: 3000,
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this hypercert claim was originally created',
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
        description: 'External measurement data supporting a hypercert claim',
        key: 'tid',
        record: {
          type: 'object',
          required: ['activity', 'measurers', 'metric', 'value', 'createdAt'],
          properties: {
            activity: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'A strong reference to the activity that this measurement is for. The record referenced must conform with the lexicon org.hypercerts.claim.activity',
            },
            measurers: {
              type: 'array',
              description:
                'DIDs of the entity (or entities) that measured this data',
              items: {
                type: 'string',
                format: 'did',
              },
              maxLength: 100,
            },
            metric: {
              type: 'string',
              description: 'The metric being measured',
              maxLength: 500,
            },
            value: {
              type: 'string',
              description: 'The measured value',
              maxLength: 500,
            },
            measurementMethodType: {
              type: 'string',
              description: 'Short identifier for the measurement methodology',
              maxLength: 30,
            },
            measurementMethodURI: {
              type: 'string',
              format: 'uri',
              description:
                'URI to methodology documentation, standard protocol, or measurement procedure',
            },
            evidenceURI: {
              type: 'array',
              description: 'URIs to supporting evidence or data',
              items: {
                type: 'string',
                format: 'uri',
              },
              maxLength: 50,
            },
            location: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
              description:
                'A strong reference to the location where the measurement was taken. The record referenced must conform with the lexicon app.certified.location',
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
        key: 'any',
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
  AppCertifiedLocation: 'app.certified.location',
  AppGainforestCommonDefs: 'app.gainforest.common.defs',
  AppGainforestOrganizationDefaultSite:
    'app.gainforest.organization.defaultSite',
  AppGainforestOrganizationDraftEcocert:
    'app.gainforest.organization.draft.ecocert',
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
  AppGainforestOrganizationProject: 'app.gainforest.organization.project',
  AppGainforestOrganizationSite: 'app.gainforest.organization.site',
  ComAtprotoRepoStrongRef: 'com.atproto.repo.strongRef',
  OrgHypercertsClaimActivity: 'org.hypercerts.claim.activity',
  OrgHypercertsClaimCollection: 'org.hypercerts.claim.collection',
  OrgHypercertsClaimContribution: 'org.hypercerts.claim.contribution',
  OrgHypercertsClaimEvaluation: 'org.hypercerts.claim.evaluation',
  OrgHypercertsClaimEvidence: 'org.hypercerts.claim.evidence',
  OrgHypercertsClaimMeasurement: 'org.hypercerts.claim.measurement',
  OrgHypercertsClaimRights: 'org.hypercerts.claim.rights',
  OrgHypercertsDefs: 'org.hypercerts.defs',
} as const
