/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../util'
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js'
import type * as AppCertifiedDefs from '../../../app/certified/defs.js'
import type * as AppBskyRichtextFacet from '../../../app/bsky/richtext/facet.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.hypercerts.claim.measurement'

export interface Main {
  $type: 'org.hypercerts.claim.measurement'
  subject?: ComAtprotoRepoStrongRef.Main
  /** The metric being measured, e.g. forest area restored, number of users, etc. */
  metric: string
  /** The unit of the measured value (e.g. kg CO₂e, hectares, %, index score). */
  unit: string
  /** The measured numeric value. */
  value: string
  /** The start date and time when the measurement began. */
  startDate?: string
  /** The end date and time when the measurement ended. If it was a one time measurement, the endDate should be equal to the startDate. */
  endDate?: string
  /** Optional geographic references related to where the measurement was taken. Each referenced record must conform with the app.certified.location lexicon. */
  locations?: ComAtprotoRepoStrongRef.Main[]
  /** Short identifier for the measurement methodology */
  methodType?: string
  /** URI to methodology documentation, standard protocol, or measurement procedure */
  methodURI?: string
  /** URIs to related evidence or underlying data (e.g. org.hypercerts.claim.evidence records or raw datasets) */
  evidenceURI?: string[]
  /** DIDs of the entity (or entities) that measured this data */
  measurers?: AppCertifiedDefs.Did[]
  /** Short comment of this measurement, suitable for previews and list views. Rich text annotations may be provided via `commentFacets`. */
  comment?: string
  /** Rich text annotations for `comment` (mentions, URLs, hashtags, etc). */
  commentFacets?: AppBskyRichtextFacet.Main[]
  /** Client-declared timestamp when this record was originally created */
  createdAt: string
  [k: string]: unknown
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain, true)
}

export {
  type Main as Record,
  isMain as isRecord,
  validateMain as validateRecord,
}
