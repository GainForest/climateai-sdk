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
import * as AppBskyRichtextFacet from './types/app/bsky/richtext/facet.js'
import * as AppCertifiedBadgeAward from './types/app/certified/badge/award.js'
import * as AppCertifiedBadgeDefinition from './types/app/certified/badge/definition.js'
import * as AppCertifiedBadgeResponse from './types/app/certified/badge/response.js'
import * as AppCertifiedDefs from './types/app/certified/defs.js'
import * as AppCertifiedLocation from './types/app/certified/location.js'
import * as AppGainforestCommonDefs from './types/app/gainforest/common/defs.js'
import * as AppGainforestDwcDefs from './types/app/gainforest/dwc/defs.js'
import * as AppGainforestDwcEvent from './types/app/gainforest/dwc/event.js'
import * as AppGainforestDwcMeasurement from './types/app/gainforest/dwc/measurement.js'
import * as AppGainforestDwcOccurrence from './types/app/gainforest/dwc/occurrence.js'
import * as AppGainforestEvaluatorDefs from './types/app/gainforest/evaluator/defs.js'
import * as AppGainforestEvaluatorEvaluation from './types/app/gainforest/evaluator/evaluation.js'
import * as AppGainforestEvaluatorService from './types/app/gainforest/evaluator/service.js'
import * as AppGainforestEvaluatorSubscription from './types/app/gainforest/evaluator/subscription.js'
import * as AppGainforestOrganizationDefaultSite from './types/app/gainforest/organization/defaultSite.js'
import * as AppGainforestOrganizationGetIndexedOrganizations from './types/app/gainforest/organization/getIndexedOrganizations.js'
import * as AppGainforestOrganizationInfo from './types/app/gainforest/organization/info.js'
import * as AppGainforestOrganizationLayer from './types/app/gainforest/organization/layer.js'
import * as AppGainforestOrganizationObservationsDendogram from './types/app/gainforest/organization/observations/dendogram.js'
import * as AppGainforestOrganizationObservationsFauna from './types/app/gainforest/organization/observations/fauna.js'
import * as AppGainforestOrganizationObservationsFlora from './types/app/gainforest/organization/observations/flora.js'
import * as AppGainforestOrganizationObservationsMeasuredTreesCluster from './types/app/gainforest/organization/observations/measuredTreesCluster.js'
import * as AppGainforestOrganizationPredictionsFauna from './types/app/gainforest/organization/predictions/fauna.js'
import * as AppGainforestOrganizationPredictionsFlora from './types/app/gainforest/organization/predictions/flora.js'
import * as AppGainforestOrganizationRecordingsAudio from './types/app/gainforest/organization/recordings/audio.js'
import * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef.js'
import * as OrgHypercertsClaimActivity from './types/org/hypercerts/claim/activity.js'
import * as OrgHypercertsClaimAttachment from './types/org/hypercerts/claim/attachment.js'
import * as OrgHypercertsClaimCollection from './types/org/hypercerts/claim/collection.js'
import * as OrgHypercertsClaimContributionDetails from './types/org/hypercerts/claim/contributionDetails.js'
import * as OrgHypercertsClaimContributorInformation from './types/org/hypercerts/claim/contributorInformation.js'
import * as OrgHypercertsClaimEvaluation from './types/org/hypercerts/claim/evaluation.js'
import * as OrgHypercertsClaimMeasurement from './types/org/hypercerts/claim/measurement.js'
import * as OrgHypercertsClaimRights from './types/org/hypercerts/claim/rights.js'
import * as OrgHypercertsDefs from './types/org/hypercerts/defs.js'
import * as OrgHypercertsFundingReceipt from './types/org/hypercerts/funding/receipt.js'
import * as OrgHypercertsHelperWorkScopeTag from './types/org/hypercerts/helper/workScopeTag.js'
import * as OrgImpactindexerLinkAttestation from './types/org/impactindexer/link/attestation.js'
import * as OrgImpactindexerReviewComment from './types/org/impactindexer/review/comment.js'
import * as OrgImpactindexerReviewDefs from './types/org/impactindexer/review/defs.js'
import * as OrgImpactindexerReviewLike from './types/org/impactindexer/review/like.js'
import * as PubLeafletBlocksBlockquote from './types/pub/leaflet/blocks/blockquote.js'
import * as PubLeafletBlocksBskyPost from './types/pub/leaflet/blocks/bskyPost.js'
import * as PubLeafletBlocksButton from './types/pub/leaflet/blocks/button.js'
import * as PubLeafletBlocksCode from './types/pub/leaflet/blocks/code.js'
import * as PubLeafletBlocksHeader from './types/pub/leaflet/blocks/header.js'
import * as PubLeafletBlocksHorizontalRule from './types/pub/leaflet/blocks/horizontalRule.js'
import * as PubLeafletBlocksIframe from './types/pub/leaflet/blocks/iframe.js'
import * as PubLeafletBlocksImage from './types/pub/leaflet/blocks/image.js'
import * as PubLeafletBlocksMath from './types/pub/leaflet/blocks/math.js'
import * as PubLeafletBlocksPage from './types/pub/leaflet/blocks/page.js'
import * as PubLeafletBlocksPoll from './types/pub/leaflet/blocks/poll.js'
import * as PubLeafletBlocksText from './types/pub/leaflet/blocks/text.js'
import * as PubLeafletBlocksUnorderedList from './types/pub/leaflet/blocks/unorderedList.js'
import * as PubLeafletBlocksWebsite from './types/pub/leaflet/blocks/website.js'
import * as PubLeafletPagesLinearDocument from './types/pub/leaflet/pages/linearDocument.js'
import * as PubLeafletRichtextFacet from './types/pub/leaflet/richtext/facet.js'

export * as AppBskyRichtextFacet from './types/app/bsky/richtext/facet.js'
export * as AppCertifiedBadgeAward from './types/app/certified/badge/award.js'
export * as AppCertifiedBadgeDefinition from './types/app/certified/badge/definition.js'
export * as AppCertifiedBadgeResponse from './types/app/certified/badge/response.js'
export * as AppCertifiedDefs from './types/app/certified/defs.js'
export * as AppCertifiedLocation from './types/app/certified/location.js'
export * as AppGainforestCommonDefs from './types/app/gainforest/common/defs.js'
export * as AppGainforestDwcDefs from './types/app/gainforest/dwc/defs.js'
export * as AppGainforestDwcEvent from './types/app/gainforest/dwc/event.js'
export * as AppGainforestDwcMeasurement from './types/app/gainforest/dwc/measurement.js'
export * as AppGainforestDwcOccurrence from './types/app/gainforest/dwc/occurrence.js'
export * as AppGainforestEvaluatorDefs from './types/app/gainforest/evaluator/defs.js'
export * as AppGainforestEvaluatorEvaluation from './types/app/gainforest/evaluator/evaluation.js'
export * as AppGainforestEvaluatorService from './types/app/gainforest/evaluator/service.js'
export * as AppGainforestEvaluatorSubscription from './types/app/gainforest/evaluator/subscription.js'
export * as AppGainforestOrganizationDefaultSite from './types/app/gainforest/organization/defaultSite.js'
export * as AppGainforestOrganizationGetIndexedOrganizations from './types/app/gainforest/organization/getIndexedOrganizations.js'
export * as AppGainforestOrganizationInfo from './types/app/gainforest/organization/info.js'
export * as AppGainforestOrganizationLayer from './types/app/gainforest/organization/layer.js'
export * as AppGainforestOrganizationObservationsDendogram from './types/app/gainforest/organization/observations/dendogram.js'
export * as AppGainforestOrganizationObservationsFauna from './types/app/gainforest/organization/observations/fauna.js'
export * as AppGainforestOrganizationObservationsFlora from './types/app/gainforest/organization/observations/flora.js'
export * as AppGainforestOrganizationObservationsMeasuredTreesCluster from './types/app/gainforest/organization/observations/measuredTreesCluster.js'
export * as AppGainforestOrganizationPredictionsFauna from './types/app/gainforest/organization/predictions/fauna.js'
export * as AppGainforestOrganizationPredictionsFlora from './types/app/gainforest/organization/predictions/flora.js'
export * as AppGainforestOrganizationRecordingsAudio from './types/app/gainforest/organization/recordings/audio.js'
export * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef.js'
export * as OrgHypercertsClaimActivity from './types/org/hypercerts/claim/activity.js'
export * as OrgHypercertsClaimAttachment from './types/org/hypercerts/claim/attachment.js'
export * as OrgHypercertsClaimCollection from './types/org/hypercerts/claim/collection.js'
export * as OrgHypercertsClaimContributionDetails from './types/org/hypercerts/claim/contributionDetails.js'
export * as OrgHypercertsClaimContributorInformation from './types/org/hypercerts/claim/contributorInformation.js'
export * as OrgHypercertsClaimEvaluation from './types/org/hypercerts/claim/evaluation.js'
export * as OrgHypercertsClaimMeasurement from './types/org/hypercerts/claim/measurement.js'
export * as OrgHypercertsClaimRights from './types/org/hypercerts/claim/rights.js'
export * as OrgHypercertsDefs from './types/org/hypercerts/defs.js'
export * as OrgHypercertsFundingReceipt from './types/org/hypercerts/funding/receipt.js'
export * as OrgHypercertsHelperWorkScopeTag from './types/org/hypercerts/helper/workScopeTag.js'
export * as OrgImpactindexerLinkAttestation from './types/org/impactindexer/link/attestation.js'
export * as OrgImpactindexerReviewComment from './types/org/impactindexer/review/comment.js'
export * as OrgImpactindexerReviewDefs from './types/org/impactindexer/review/defs.js'
export * as OrgImpactindexerReviewLike from './types/org/impactindexer/review/like.js'
export * as PubLeafletBlocksBlockquote from './types/pub/leaflet/blocks/blockquote.js'
export * as PubLeafletBlocksBskyPost from './types/pub/leaflet/blocks/bskyPost.js'
export * as PubLeafletBlocksButton from './types/pub/leaflet/blocks/button.js'
export * as PubLeafletBlocksCode from './types/pub/leaflet/blocks/code.js'
export * as PubLeafletBlocksHeader from './types/pub/leaflet/blocks/header.js'
export * as PubLeafletBlocksHorizontalRule from './types/pub/leaflet/blocks/horizontalRule.js'
export * as PubLeafletBlocksIframe from './types/pub/leaflet/blocks/iframe.js'
export * as PubLeafletBlocksImage from './types/pub/leaflet/blocks/image.js'
export * as PubLeafletBlocksMath from './types/pub/leaflet/blocks/math.js'
export * as PubLeafletBlocksPage from './types/pub/leaflet/blocks/page.js'
export * as PubLeafletBlocksPoll from './types/pub/leaflet/blocks/poll.js'
export * as PubLeafletBlocksText from './types/pub/leaflet/blocks/text.js'
export * as PubLeafletBlocksUnorderedList from './types/pub/leaflet/blocks/unorderedList.js'
export * as PubLeafletBlocksWebsite from './types/pub/leaflet/blocks/website.js'
export * as PubLeafletPagesLinearDocument from './types/pub/leaflet/pages/linearDocument.js'
export * as PubLeafletRichtextFacet from './types/pub/leaflet/richtext/facet.js'

export const PUB_LEAFLET_PAGES = {
  LinearDocumentTextAlignLeft: 'pub.leaflet.pages.linearDocument#textAlignLeft',
  LinearDocumentTextAlignCenter:
    'pub.leaflet.pages.linearDocument#textAlignCenter',
  LinearDocumentTextAlignRight:
    'pub.leaflet.pages.linearDocument#textAlignRight',
  LinearDocumentTextAlignJustify:
    'pub.leaflet.pages.linearDocument#textAlignJustify',
}

export class AtpBaseClient extends XrpcClient {
  app: AppNS
  com: ComNS
  org: OrgNS
  pub: PubNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.app = new AppNS(this)
    this.com = new ComNS(this)
    this.org = new OrgNS(this)
    this.pub = new PubNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class AppNS {
  _client: XrpcClient
  bsky: AppBskyNS
  certified: AppCertifiedNS
  gainforest: AppGainforestNS

  constructor(client: XrpcClient) {
    this._client = client
    this.bsky = new AppBskyNS(client)
    this.certified = new AppCertifiedNS(client)
    this.gainforest = new AppGainforestNS(client)
  }
}

export class AppBskyNS {
  _client: XrpcClient
  richtext: AppBskyRichtextNS

  constructor(client: XrpcClient) {
    this._client = client
    this.richtext = new AppBskyRichtextNS(client)
  }
}

export class AppBskyRichtextNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}

export class AppCertifiedNS {
  _client: XrpcClient
  location: AppCertifiedLocationRecord
  badge: AppCertifiedBadgeNS

  constructor(client: XrpcClient) {
    this._client = client
    this.badge = new AppCertifiedBadgeNS(client)
    this.location = new AppCertifiedLocationRecord(client)
  }
}

export class AppCertifiedBadgeNS {
  _client: XrpcClient
  award: AppCertifiedBadgeAwardRecord
  definition: AppCertifiedBadgeDefinitionRecord
  response: AppCertifiedBadgeResponseRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.award = new AppCertifiedBadgeAwardRecord(client)
    this.definition = new AppCertifiedBadgeDefinitionRecord(client)
    this.response = new AppCertifiedBadgeResponseRecord(client)
  }
}

export class AppCertifiedBadgeAwardRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppCertifiedBadgeAward.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.certified.badge.award',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppCertifiedBadgeAward.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.certified.badge.award',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppCertifiedBadgeAward.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.certified.badge.award'
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
    record: Un$Typed<AppCertifiedBadgeAward.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.certified.badge.award'
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
      { collection: 'app.certified.badge.award', ...params },
      { headers },
    )
  }
}

export class AppCertifiedBadgeDefinitionRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppCertifiedBadgeDefinition.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.certified.badge.definition',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppCertifiedBadgeDefinition.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.certified.badge.definition',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppCertifiedBadgeDefinition.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.certified.badge.definition'
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
    record: Un$Typed<AppCertifiedBadgeDefinition.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.certified.badge.definition'
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
      { collection: 'app.certified.badge.definition', ...params },
      { headers },
    )
  }
}

export class AppCertifiedBadgeResponseRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppCertifiedBadgeResponse.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.certified.badge.response',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppCertifiedBadgeResponse.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.certified.badge.response',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppCertifiedBadgeResponse.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.certified.badge.response'
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
    record: Un$Typed<AppCertifiedBadgeResponse.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.certified.badge.response'
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
      { collection: 'app.certified.badge.response', ...params },
      { headers },
    )
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
  dwc: AppGainforestDwcNS
  evaluator: AppGainforestEvaluatorNS
  organization: AppGainforestOrganizationNS

  constructor(client: XrpcClient) {
    this._client = client
    this.dwc = new AppGainforestDwcNS(client)
    this.evaluator = new AppGainforestEvaluatorNS(client)
    this.organization = new AppGainforestOrganizationNS(client)
  }
}

export class AppGainforestDwcNS {
  _client: XrpcClient
  event: AppGainforestDwcEventRecord
  measurement: AppGainforestDwcMeasurementRecord
  occurrence: AppGainforestDwcOccurrenceRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.event = new AppGainforestDwcEventRecord(client)
    this.measurement = new AppGainforestDwcMeasurementRecord(client)
    this.occurrence = new AppGainforestDwcOccurrenceRecord(client)
  }
}

export class AppGainforestDwcEventRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestDwcEvent.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.dwc.event',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestDwcEvent.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.dwc.event',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestDwcEvent.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.dwc.event'
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
    record: Un$Typed<AppGainforestDwcEvent.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.dwc.event'
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
      { collection: 'app.gainforest.dwc.event', ...params },
      { headers },
    )
  }
}

export class AppGainforestDwcMeasurementRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestDwcMeasurement.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.dwc.measurement',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestDwcMeasurement.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.dwc.measurement',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestDwcMeasurement.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.dwc.measurement'
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
    record: Un$Typed<AppGainforestDwcMeasurement.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.dwc.measurement'
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
      { collection: 'app.gainforest.dwc.measurement', ...params },
      { headers },
    )
  }
}

export class AppGainforestDwcOccurrenceRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestDwcOccurrence.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.dwc.occurrence',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestDwcOccurrence.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.dwc.occurrence',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestDwcOccurrence.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.dwc.occurrence'
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
    record: Un$Typed<AppGainforestDwcOccurrence.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.dwc.occurrence'
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
      { collection: 'app.gainforest.dwc.occurrence', ...params },
      { headers },
    )
  }
}

export class AppGainforestEvaluatorNS {
  _client: XrpcClient
  evaluation: AppGainforestEvaluatorEvaluationRecord
  service: AppGainforestEvaluatorServiceRecord
  subscription: AppGainforestEvaluatorSubscriptionRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.evaluation = new AppGainforestEvaluatorEvaluationRecord(client)
    this.service = new AppGainforestEvaluatorServiceRecord(client)
    this.subscription = new AppGainforestEvaluatorSubscriptionRecord(client)
  }
}

export class AppGainforestEvaluatorEvaluationRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestEvaluatorEvaluation.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.evaluator.evaluation',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestEvaluatorEvaluation.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.evaluator.evaluation',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestEvaluatorEvaluation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.evaluator.evaluation'
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
    record: Un$Typed<AppGainforestEvaluatorEvaluation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.evaluator.evaluation'
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
      { collection: 'app.gainforest.evaluator.evaluation', ...params },
      { headers },
    )
  }
}

export class AppGainforestEvaluatorServiceRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestEvaluatorService.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.evaluator.service',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestEvaluatorService.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.evaluator.service',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestEvaluatorService.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.evaluator.service'
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
    record: Un$Typed<AppGainforestEvaluatorService.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.evaluator.service'
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
      { collection: 'app.gainforest.evaluator.service', ...params },
      { headers },
    )
  }
}

export class AppGainforestEvaluatorSubscriptionRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppGainforestEvaluatorSubscription.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.evaluator.subscription',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestEvaluatorSubscription.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.evaluator.subscription',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestEvaluatorSubscription.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.evaluator.subscription'
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
    record: Un$Typed<AppGainforestEvaluatorSubscription.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.evaluator.subscription'
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
      { collection: 'app.gainforest.evaluator.subscription', ...params },
      { headers },
    )
  }
}

export class AppGainforestOrganizationNS {
  _client: XrpcClient
  defaultSite: AppGainforestOrganizationDefaultSiteRecord
  info: AppGainforestOrganizationInfoRecord
  layer: AppGainforestOrganizationLayerRecord
  observations: AppGainforestOrganizationObservationsNS
  predictions: AppGainforestOrganizationPredictionsNS
  recordings: AppGainforestOrganizationRecordingsNS

  constructor(client: XrpcClient) {
    this._client = client
    this.observations = new AppGainforestOrganizationObservationsNS(client)
    this.predictions = new AppGainforestOrganizationPredictionsNS(client)
    this.recordings = new AppGainforestOrganizationRecordingsNS(client)
    this.defaultSite = new AppGainforestOrganizationDefaultSiteRecord(client)
    this.info = new AppGainforestOrganizationInfoRecord(client)
    this.layer = new AppGainforestOrganizationLayerRecord(client)
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

export class AppGainforestOrganizationRecordingsNS {
  _client: XrpcClient
  audio: AppGainforestOrganizationRecordingsAudioRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.audio = new AppGainforestOrganizationRecordingsAudioRecord(client)
  }
}

export class AppGainforestOrganizationRecordingsAudioRecord {
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
      value: AppGainforestOrganizationRecordingsAudio.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.gainforest.organization.recordings.audio',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppGainforestOrganizationRecordingsAudio.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.gainforest.organization.recordings.audio',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<AppGainforestOrganizationRecordingsAudio.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.recordings.audio'
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
    record: Un$Typed<AppGainforestOrganizationRecordingsAudio.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'app.gainforest.organization.recordings.audio'
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
      { collection: 'app.gainforest.organization.recordings.audio', ...params },
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
}

export class OrgNS {
  _client: XrpcClient
  hypercerts: OrgHypercertsNS
  impactindexer: OrgImpactindexerNS

  constructor(client: XrpcClient) {
    this._client = client
    this.hypercerts = new OrgHypercertsNS(client)
    this.impactindexer = new OrgImpactindexerNS(client)
  }
}

export class OrgHypercertsNS {
  _client: XrpcClient
  claim: OrgHypercertsClaimNS
  funding: OrgHypercertsFundingNS
  helper: OrgHypercertsHelperNS

  constructor(client: XrpcClient) {
    this._client = client
    this.claim = new OrgHypercertsClaimNS(client)
    this.funding = new OrgHypercertsFundingNS(client)
    this.helper = new OrgHypercertsHelperNS(client)
  }
}

export class OrgHypercertsClaimNS {
  _client: XrpcClient
  activity: OrgHypercertsClaimActivityRecord
  attachment: OrgHypercertsClaimAttachmentRecord
  collection: OrgHypercertsClaimCollectionRecord
  contributionDetails: OrgHypercertsClaimContributionDetailsRecord
  contributorInformation: OrgHypercertsClaimContributorInformationRecord
  evaluation: OrgHypercertsClaimEvaluationRecord
  measurement: OrgHypercertsClaimMeasurementRecord
  rights: OrgHypercertsClaimRightsRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.activity = new OrgHypercertsClaimActivityRecord(client)
    this.attachment = new OrgHypercertsClaimAttachmentRecord(client)
    this.collection = new OrgHypercertsClaimCollectionRecord(client)
    this.contributionDetails = new OrgHypercertsClaimContributionDetailsRecord(
      client,
    )
    this.contributorInformation =
      new OrgHypercertsClaimContributorInformationRecord(client)
    this.evaluation = new OrgHypercertsClaimEvaluationRecord(client)
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

export class OrgHypercertsClaimAttachmentRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsClaimAttachment.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.attachment',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimAttachment.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.attachment',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimAttachment.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.attachment'
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
    record: Un$Typed<OrgHypercertsClaimAttachment.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.attachment'
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
      { collection: 'org.hypercerts.claim.attachment', ...params },
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

export class OrgHypercertsClaimContributionDetailsRecord {
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
      value: OrgHypercertsClaimContributionDetails.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.contributionDetails',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimContributionDetails.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.contributionDetails',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimContributionDetails.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.contributionDetails'
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
    record: Un$Typed<OrgHypercertsClaimContributionDetails.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.contributionDetails'
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
      { collection: 'org.hypercerts.claim.contributionDetails', ...params },
      { headers },
    )
  }
}

export class OrgHypercertsClaimContributorInformationRecord {
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
      value: OrgHypercertsClaimContributorInformation.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.claim.contributorInformation',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsClaimContributorInformation.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.claim.contributorInformation',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsClaimContributorInformation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.contributorInformation'
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
    record: Un$Typed<OrgHypercertsClaimContributorInformation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.claim.contributorInformation'
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
      { collection: 'org.hypercerts.claim.contributorInformation', ...params },
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

export class OrgHypercertsFundingNS {
  _client: XrpcClient
  receipt: OrgHypercertsFundingReceiptRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.receipt = new OrgHypercertsFundingReceiptRecord(client)
  }
}

export class OrgHypercertsFundingReceiptRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsFundingReceipt.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.funding.receipt',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsFundingReceipt.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.funding.receipt',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsFundingReceipt.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.funding.receipt'
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
    record: Un$Typed<OrgHypercertsFundingReceipt.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.funding.receipt'
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
      { collection: 'org.hypercerts.funding.receipt', ...params },
      { headers },
    )
  }
}

export class OrgHypercertsHelperNS {
  _client: XrpcClient
  workScopeTag: OrgHypercertsHelperWorkScopeTagRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.workScopeTag = new OrgHypercertsHelperWorkScopeTagRecord(client)
  }
}

export class OrgHypercertsHelperWorkScopeTagRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgHypercertsHelperWorkScopeTag.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.hypercerts.helper.workScopeTag',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgHypercertsHelperWorkScopeTag.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.hypercerts.helper.workScopeTag',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgHypercertsHelperWorkScopeTag.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.helper.workScopeTag'
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
    record: Un$Typed<OrgHypercertsHelperWorkScopeTag.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.hypercerts.helper.workScopeTag'
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
      { collection: 'org.hypercerts.helper.workScopeTag', ...params },
      { headers },
    )
  }
}

export class OrgImpactindexerNS {
  _client: XrpcClient
  link: OrgImpactindexerLinkNS
  review: OrgImpactindexerReviewNS

  constructor(client: XrpcClient) {
    this._client = client
    this.link = new OrgImpactindexerLinkNS(client)
    this.review = new OrgImpactindexerReviewNS(client)
  }
}

export class OrgImpactindexerLinkNS {
  _client: XrpcClient
  attestation: OrgImpactindexerLinkAttestationRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.attestation = new OrgImpactindexerLinkAttestationRecord(client)
  }
}

export class OrgImpactindexerLinkAttestationRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgImpactindexerLinkAttestation.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.impactindexer.link.attestation',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgImpactindexerLinkAttestation.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.impactindexer.link.attestation',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgImpactindexerLinkAttestation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.impactindexer.link.attestation'
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
    record: Un$Typed<OrgImpactindexerLinkAttestation.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.impactindexer.link.attestation'
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
      { collection: 'org.impactindexer.link.attestation', ...params },
      { headers },
    )
  }
}

export class OrgImpactindexerReviewNS {
  _client: XrpcClient
  comment: OrgImpactindexerReviewCommentRecord
  like: OrgImpactindexerReviewLikeRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.comment = new OrgImpactindexerReviewCommentRecord(client)
    this.like = new OrgImpactindexerReviewLikeRecord(client)
  }
}

export class OrgImpactindexerReviewCommentRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgImpactindexerReviewComment.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.impactindexer.review.comment',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgImpactindexerReviewComment.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.impactindexer.review.comment',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgImpactindexerReviewComment.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.impactindexer.review.comment'
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
    record: Un$Typed<OrgImpactindexerReviewComment.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.impactindexer.review.comment'
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
      { collection: 'org.impactindexer.review.comment', ...params },
      { headers },
    )
  }
}

export class OrgImpactindexerReviewLikeRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: OrgImpactindexerReviewLike.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'org.impactindexer.review.like',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: OrgImpactindexerReviewLike.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'org.impactindexer.review.like',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<OrgImpactindexerReviewLike.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.impactindexer.review.like'
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
    record: Un$Typed<OrgImpactindexerReviewLike.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'org.impactindexer.review.like'
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
      { collection: 'org.impactindexer.review.like', ...params },
      { headers },
    )
  }
}

export class PubNS {
  _client: XrpcClient
  leaflet: PubLeafletNS

  constructor(client: XrpcClient) {
    this._client = client
    this.leaflet = new PubLeafletNS(client)
  }
}

export class PubLeafletNS {
  _client: XrpcClient
  blocks: PubLeafletBlocksNS
  pages: PubLeafletPagesNS
  richtext: PubLeafletRichtextNS

  constructor(client: XrpcClient) {
    this._client = client
    this.blocks = new PubLeafletBlocksNS(client)
    this.pages = new PubLeafletPagesNS(client)
    this.richtext = new PubLeafletRichtextNS(client)
  }
}

export class PubLeafletBlocksNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}

export class PubLeafletPagesNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}

export class PubLeafletRichtextNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}
