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
import type * as OrgHypercertsDefs from '../defs.js'
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.hypercerts.claim.collection'

export interface Main {
  $type: 'org.hypercerts.claim.collection'
  /** The type of this collection. Possible fields can be 'favorites', 'project', or any other type of collection. */
  type?: string
  /** The title of this collection */
  title: string
  /** Short summary of this collection, suitable for previews and list views */
  shortDescription?: string
  description?: PubLeafletPagesLinearDocument.Main
  avatar?:
    | $Typed<OrgHypercertsDefs.Uri>
    | $Typed<OrgHypercertsDefs.SmallImage>
    | { $type: string }
  banner?:
    | $Typed<OrgHypercertsDefs.Uri>
    | $Typed<OrgHypercertsDefs.LargeImage>
    | { $type: string }
  /** Array of items in this collection with optional weights. */
  items: Item[]
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

export interface Item {
  $type?: 'org.hypercerts.claim.collection#item'
  itemIdentifier: ComAtprotoRepoStrongRef.Main
  /** Optional weight for this item (positive numeric value stored as string). Weights do not need to sum to a specific total; normalization can be performed by the consuming application as needed. */
  itemWeight?: string
}

const hashItem = 'item'

export function isItem<V>(v: V) {
  return is$typed(v, id, hashItem)
}

export function validateItem<V>(v: V) {
  return validate<Item & V>(v, id, hashItem)
}
