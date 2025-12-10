/**
 * The following lines are added by lex-api-mod.ts to fix build errors.
 */
import {
  ComAtprotoRepoListRecords,
  ComAtprotoRepoGetRecord,
  ComAtprotoRepoCreateRecord,
  ComAtprotoRepoPutRecord,
  ComAtprotoRepoDeleteRecord,
} from "@atproto/api";
/**
 * GENERATED CODE - DO NOT MODIFY
 */

/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  XrpcClient,
  type FetchHandler,
  type FetchHandlerOptions,
} from '@atproto/xrpc'
import { schemas } from './lexicons.js'
import { CID } from 'multiformats/cid'
import { type OmitKey, type Un$Typed } from './util.js'
import * as AppCertifiedLocation from './types/app/certified/location.js'
import * as AppGainforestCommonDefs from './types/app/gainforest/common/defs.js'
import * as AppGainforestOrganizationDefaultSite from './types/app/gainforest/organization/defaultSite.js'
import * as AppGainforestOrganizationDraftEcocert from './types/app/gainforest/organization/draft/ecocert.js'
import * as AppGainforestOrganizationGetIndexedOrganizations from './types/app/gainforest/organization/getIndexedOrganizations.js'
import * as AppGainforestOrganizationInfo from './types/app/gainforest/organization/info.js'
import * as AppGainforestOrganizationLayer from './types/app/gainforest/organization/layer.js'
import * as AppGainforestOrganizationObservationsDendogram from './types/app/gainforest/organization/observations/dendogram.js'
import * as AppGainforestOrganizationObservationsFauna from './types/app/gainforest/organization/observations/fauna.js'
import * as AppGainforestOrganizationObservationsFlora from './types/app/gainforest/organization/observations/flora.js'
import * as AppGainforestOrganizationObservationsMeasuredTreesCluster from './types/app/gainforest/organization/observations/measuredTreesCluster.js'
import * as AppGainforestOrganizationPredictionsFauna from './types/app/gainforest/organization/predictions/fauna.js'
import * as AppGainforestOrganizationPredictionsFlora from './types/app/gainforest/organization/predictions/flora.js'
import * as AppGainforestOrganizationProject from './types/app/gainforest/organization/project.js'
import * as AppGainforestOrganizationSite from './types/app/gainforest/organization/site.js'
import * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef.js'
import * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob.js'
import * as OrgHypercertsClaimActivity from './types/org/hypercerts/claim/activity.js'
import * as OrgHypercertsClaimCollection from './types/org/hypercerts/claim/collection.js'
import * as OrgHypercertsClaimContribution from './types/org/hypercerts/claim/contribution.js'
import * as OrgHypercertsClaimEvaluation from './types/org/hypercerts/claim/evaluation.js'
import * as OrgHypercertsClaimEvidence from './types/org/hypercerts/claim/evidence.js'
import * as OrgHypercertsClaimMeasurement from './types/org/hypercerts/claim/measurement.js'
import * as OrgHypercertsClaimRights from './types/org/hypercerts/claim/rights.js'
import * as OrgHypercertsDefs from './types/org/hypercerts/defs.js'

export * as AppCertifiedLocation from './types/app/certified/location.js'
export * as AppGainforestCommonDefs from './types/app/gainforest/common/defs.js'
export * as AppGainforestOrganizationDefaultSite from './types/app/gainforest/organization/defaultSite.js'
export * as AppGainforestOrganizationDraftEcocert from './types/app/gainforest/organization/draft/ecocert.js'
export * as AppGainforestOrganizationGetIndexedOrganizations from './types/app/gainforest/organization/getIndexedOrganizations.js'
export * as AppGainforestOrganizationInfo from './types/app/gainforest/organization/info.js'
export * as AppGainforestOrganizationLayer from './types/app/gainforest/organization/layer.js'
export * as AppGainforestOrganizationObservationsDendogram from './types/app/gainforest/organization/observations/dendogram.js'
export * as AppGainforestOrganizationObservationsFauna from './types/app/gainforest/organization/observations/fauna.js'
export * as AppGainforestOrganizationObservationsFlora from './types/app/gainforest/organization/observations/flora.js'
export * as AppGainforestOrganizationObservationsMeasuredTreesCluster from './types/app/gainforest/organization/observations/measuredTreesCluster.js'
export * as AppGainforestOrganizationPredictionsFauna from './types/app/gainforest/organization/predictions/fauna.js'
export * as AppGainforestOrganizationPredictionsFlora from './types/app/gainforest/organization/predictions/flora.js'
export * as AppGainforestOrganizationProject from './types/app/gainforest/organization/project.js'
export * as AppGainforestOrganizationSite from './types/app/gainforest/organization/site.js'
export * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef.js'
export * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob.js'
export * as OrgHypercertsClaimActivity from './types/org/hypercerts/claim/activity.js'
export * as OrgHypercertsClaimCollection from './types/org/hypercerts/claim/collection.js'
export * as OrgHypercertsClaimContribution from './types/org/hypercerts/claim/contribution.js'
export * as OrgHypercertsClaimEvaluation from './types/org/hypercerts/claim/evaluation.js'
export * as OrgHypercertsClaimEvidence from './types/org/hypercerts/claim/evidence.js'
export * as OrgHypercertsClaimMeasurement from './types/org/hypercerts/claim/measurement.js'
export * as OrgHypercertsClaimRights from './types/org/hypercerts/claim/rights.js'
export * as OrgHypercertsDefs from './types/org/hypercerts/defs.js'

export class AtpBaseClient extends XrpcClient {
  app: AppNS
  com: ComNS
  org: OrgNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.app = new AppNS(this)
    this.com = new ComNS(this)
    this.org = new OrgNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class AppNS {
  _client: XrpcClient
  certified: AppCertifiedNS
  gainforest: AppGainforestNS

  constructor(client: XrpcClient) {
    this._client = client
    this.certified = new AppCertifiedNS(client)
    this.gainforest = new AppGainforestNS(client)
  }
}

export class AppCertifiedNS {
  _client: XrpcClient
  location: AppCertifiedLocationRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.location = new AppCertifiedLocationRecord(client)
  }
}

export class AppCertifiedLocationRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppCertifiedLocation.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.certified.location',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: AppCertifiedLocation.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.certified.location',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppCertifiedLocation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.certified.location'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppCertifiedLocation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.certified.location'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.certified.location', ...params },
      { headers },
    )
  }
}

export class AppGainforestNS {
  _client: XrpcClient
  organization: AppGainforestOrganizationNS

  constructor(client: XrpcClient) {
    this._client = client
    this.organization = new AppGainforestOrganizationNS(client)
  }
}

export class AppGainforestOrganizationNS {
  _client: XrpcClient
  defaultSite: AppGainforestOrganizationDefaultSiteRecord
  info: AppGainforestOrganizationInfoRecord
  layer: AppGainforestOrganizationLayerRecord
  project: AppGainforestOrganizationProjectRecord
  site: AppGainforestOrganizationSiteRecord
  draft: AppGainforestOrganizationDraftNS
  observations: AppGainforestOrganizationObservationsNS
  predictions: AppGainforestOrganizationPredictionsNS

  constructor(client: XrpcClient) {
    this._client = client
    this.draft = new AppGainforestOrganizationDraftNS(client)
    this.observations = new AppGainforestOrganizationObservationsNS(client)
    this.predictions = new AppGainforestOrganizationPredictionsNS(client)
    this.defaultSite = new AppGainforestOrganizationDefaultSiteRecord(client)
    this.info = new AppGainforestOrganizationInfoRecord(client)
    this.layer = new AppGainforestOrganizationLayerRecord(client)
    this.project = new AppGainforestOrganizationProjectRecord(client)
    this.site = new AppGainforestOrganizationSiteRecord(client)
  }

  getIndexedOrganizations(
    params?: AppGainforestOrganizationGetIndexedOrganizations.QueryParams,
    opts?: AppGainforestOrganizationGetIndexedOrganizations.CallOptions,
  ): Promise<AppGainforestOrganizationGetIndexedOrganizations.Response> {
    return this._client.call(
      'app.gainforest.organization.getIndexedOrganizations',
      params,
      undefined,
      opts,
    )
  }
}

export class AppGainforestOrganizationDraftNS {
  _client: XrpcClient
  ecocert: AppGainforestOrganizationDraftEcocertRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.ecocert = new AppGainforestOrganizationDraftEcocertRecord(client)
  }
}

export class AppGainforestOrganizationDraftEcocertRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: AppGainforestOrganizationDraftEcocert.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.draft.ecocert',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationDraftEcocert.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.draft.ecocert',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationDraftEcocert.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.draft.ecocert'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationDraftEcocert.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.draft.ecocert'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.gainforest.organization.draft.ecocert', ...params },
      { headers },
    )
  }
}

export class AppGainforestOrganizationObservationsNS {
  _client: XrpcClient
  dendogram: AppGainforestOrganizationObservationsDendogramRecord
  fauna: AppGainforestOrganizationObservationsFaunaRecord
  flora: AppGainforestOrganizationObservationsFloraRecord
  measuredTreesCluster: AppGainforestOrganizationObservationsMeasuredTreesClusterRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.dendogram = new AppGainforestOrganizationObservationsDendogramRecord(
      client,
    )
    this.fauna = new AppGainforestOrganizationObservationsFaunaRecord(client)
    this.flora = new AppGainforestOrganizationObservationsFloraRecord(client)
    this.measuredTreesCluster =
      new AppGainforestOrganizationObservationsMeasuredTreesClusterRecord(
        client,
      )
  }
}

export class AppGainforestOrganizationObservationsDendogramRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: AppGainforestOrganizationObservationsDendogram.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.observations.dendogram',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationObservationsDendogram.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.observations.dendogram',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationObservationsDendogram.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.observations.dendogram'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      {
        collection,
        rkey: 'self',
        ...params,
        record: { ...record, $type: collection },
      },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationObservationsDendogram.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.observations.dendogram'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      {
        collection: 'app.gainforest.organization.observations.dendogram',
        ...params,
      },
      { headers },
    )
  }
}

export class AppGainforestOrganizationObservationsFaunaRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: AppGainforestOrganizationObservationsFauna.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.observations.fauna',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationObservationsFauna.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.observations.fauna',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationObservationsFauna.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.observations.fauna'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationObservationsFauna.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.observations.fauna'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      {
        collection: 'app.gainforest.organization.observations.fauna',
        ...params,
      },
      { headers },
    )
  }
}

export class AppGainforestOrganizationObservationsFloraRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: AppGainforestOrganizationObservationsFlora.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.observations.flora',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationObservationsFlora.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.observations.flora',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationObservationsFlora.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.observations.flora'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationObservationsFlora.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.observations.flora'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      {
        collection: 'app.gainforest.organization.observations.flora',
        ...params,
      },
      { headers },
    )
  }
}

export class AppGainforestOrganizationObservationsMeasuredTreesClusterRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: AppGainforestOrganizationObservationsMeasuredTreesCluster.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection:
        'app.gainforest.organization.observations.measuredTreesCluster',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationObservationsMeasuredTreesCluster.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection:
        'app.gainforest.organization.observations.measuredTreesCluster',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationObservationsMeasuredTreesCluster.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection =
      'app.gainforest.organization.observations.measuredTreesCluster'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationObservationsMeasuredTreesCluster.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection =
      'app.gainforest.organization.observations.measuredTreesCluster'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      {
        collection:
          'app.gainforest.organization.observations.measuredTreesCluster',
        ...params,
      },
      { headers },
    )
  }
}

export class AppGainforestOrganizationPredictionsNS {
  _client: XrpcClient
  fauna: AppGainforestOrganizationPredictionsFaunaRecord
  flora: AppGainforestOrganizationPredictionsFloraRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.fauna = new AppGainforestOrganizationPredictionsFaunaRecord(client)
    this.flora = new AppGainforestOrganizationPredictionsFloraRecord(client)
  }
}

export class AppGainforestOrganizationPredictionsFaunaRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: AppGainforestOrganizationPredictionsFauna.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.predictions.fauna',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationPredictionsFauna.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.predictions.fauna',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationPredictionsFauna.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.predictions.fauna'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationPredictionsFauna.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.predictions.fauna'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      {
        collection: 'app.gainforest.organization.predictions.fauna',
        ...params,
      },
      { headers },
    )
  }
}

export class AppGainforestOrganizationPredictionsFloraRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: AppGainforestOrganizationPredictionsFlora.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.predictions.flora',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationPredictionsFlora.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.predictions.flora',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationPredictionsFlora.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.predictions.flora'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationPredictionsFlora.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.predictions.flora'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      {
        collection: 'app.gainforest.organization.predictions.flora',
        ...params,
      },
      { headers },
    )
  }
}

export class AppGainforestOrganizationDefaultSiteRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: AppGainforestOrganizationDefaultSite.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.defaultSite',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationDefaultSite.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.defaultSite',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationDefaultSite.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.defaultSite'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      {
        collection,
        rkey: 'self',
        ...params,
        record: { ...record, $type: collection },
      },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationDefaultSite.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.defaultSite'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.gainforest.organization.defaultSite', ...params },
      { headers },
    )
  }
}

export class AppGainforestOrganizationInfoRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestOrganizationInfo.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.info',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationInfo.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.info',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationInfo.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.info'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      {
        collection,
        rkey: 'self',
        ...params,
        record: { ...record, $type: collection },
      },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationInfo.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.info'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.gainforest.organization.info', ...params },
      { headers },
    )
  }
}

export class AppGainforestOrganizationLayerRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestOrganizationLayer.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.layer',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationLayer.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.layer',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationLayer.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.layer'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationLayer.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.layer'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.gainforest.organization.layer', ...params },
      { headers },
    )
  }
}

export class AppGainforestOrganizationProjectRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestOrganizationProject.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.project',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationProject.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.project',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationProject.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.project'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationProject.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.project'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.gainforest.organization.project', ...params },
      { headers },
    )
  }
}

export class AppGainforestOrganizationSiteRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestOrganizationSite.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.site',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationSite.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.site',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationSite.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.site'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationSite.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.site'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.gainforest.organization.site', ...params },
      { headers },
    )
  }
}

export class ComNS {
  _client: XrpcClient
  atproto: ComAtprotoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.atproto = new ComAtprotoNS(client)
  }
}

export class ComAtprotoNS {
  _client: XrpcClient
  repo: ComAtprotoRepoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.repo = new ComAtprotoRepoNS(client)
  }
}

export class ComAtprotoRepoNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  uploadBlob(
    data?: ComAtprotoRepoUploadBlob.InputSchema,
    opts?: ComAtprotoRepoUploadBlob.CallOptions,
  ): Promise<ComAtprotoRepoUploadBlob.Response> {
    return this._client.call(
      'com.atproto.repo.uploadBlob',
      opts?.qp,
      data,
      opts,
    )
  }
}

export class OrgNS {
  _client: XrpcClient
  hypercerts: OrgHypercertsNS

  constructor(client: XrpcClient) {
    this._client = client
    this.hypercerts = new OrgHypercertsNS(client)
  }
}

export class OrgHypercertsNS {
  _client: XrpcClient
  claim: OrgHypercertsClaimNS

  constructor(client: XrpcClient) {
    this._client = client
    this.claim = new OrgHypercertsClaimNS(client)
  }
}

export class OrgHypercertsClaimNS {
  _client: XrpcClient
  activity: OrgHypercertsClaimActivityRecord
  collection: OrgHypercertsClaimCollectionRecord
  contribution: OrgHypercertsClaimContributionRecord
  evaluation: OrgHypercertsClaimEvaluationRecord
  evidence: OrgHypercertsClaimEvidenceRecord
  measurement: OrgHypercertsClaimMeasurementRecord
  rights: OrgHypercertsClaimRightsRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.activity = new OrgHypercertsClaimActivityRecord(client)
    this.collection = new OrgHypercertsClaimCollectionRecord(client)
    this.contribution = new OrgHypercertsClaimContributionRecord(client)
    this.evaluation = new OrgHypercertsClaimEvaluationRecord(client)
    this.evidence = new OrgHypercertsClaimEvidenceRecord(client)
    this.measurement = new OrgHypercertsClaimMeasurementRecord(client)
    this.rights = new OrgHypercertsClaimRightsRecord(client)
  }
}

export class OrgHypercertsClaimActivityRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsClaimActivity.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.activity',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimActivity.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.activity',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimActivity.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.activity'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimActivity.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.activity'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'org.hypercerts.claim.activity', ...params },
      { headers },
    )
  }
}

export class OrgHypercertsClaimCollectionRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsClaimCollection.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.collection',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimCollection.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.collection',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimCollection.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.collection'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimCollection.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.collection'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'org.hypercerts.claim.collection', ...params },
      { headers },
    )
  }
}

export class OrgHypercertsClaimContributionRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsClaimContribution.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.contribution',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimContribution.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.contribution',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimContribution.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.contribution'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimContribution.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.contribution'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'org.hypercerts.claim.contribution', ...params },
      { headers },
    )
  }
}

export class OrgHypercertsClaimEvaluationRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsClaimEvaluation.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.evaluation',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimEvaluation.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.evaluation',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimEvaluation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.evaluation'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimEvaluation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.evaluation'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'org.hypercerts.claim.evaluation', ...params },
      { headers },
    )
  }
}

export class OrgHypercertsClaimEvidenceRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsClaimEvidence.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.evidence',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimEvidence.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.evidence',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimEvidence.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.evidence'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimEvidence.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.evidence'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'org.hypercerts.claim.evidence', ...params },
      { headers },
    )
  }
}

export class OrgHypercertsClaimMeasurementRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsClaimMeasurement.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.measurement',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimMeasurement.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.measurement',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimMeasurement.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.measurement'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimMeasurement.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.measurement'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'org.hypercerts.claim.measurement', ...params },
      { headers },
    )
  }
}

export class OrgHypercertsClaimRightsRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsClaimRights.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.rights',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimRights.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.rights',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimRights.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.rights'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async put(
    params: OmitKey<
      ComAtprotoRepoPutRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimRights.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.rights'
    const res = await this._client.call(
      'com.atproto.repo.putRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'org.hypercerts.claim.rights', ...params },
      { headers },
    )
  }
}
