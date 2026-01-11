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
import type * as PubLeafletPagesLinearDocument from '../../../pub/leaflet/pages/linearDocument.js'
import type * as OrgHypercertsClaimActivity from './activity.js'
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.hypercerts.claim.project'

export interface Main {
  $type: 'org.hypercerts.claim.project'
  /** Title of this project */
  title: string
  /** Short summary of this project, suitable for previews and list views. */
  shortDescription: string
  description?: PubLeafletPagesLinearDocument.Main
  /** Primary avatar image representing this project across apps and views; typically a square logo or project identity image. */
  avatar?: BlobRef
  /** The cover photo of this project. */
  coverPhoto?: BlobRef
  /** Array of activities with their associated weights in this project */
  activities?: OrgHypercertsClaimActivity.ActivityWeight[]
  location?: ComAtprotoRepoStrongRef.Main
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
