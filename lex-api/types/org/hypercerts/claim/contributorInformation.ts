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
import type * as OrgHypercertsDefs from '../defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.hypercerts.claim.contributorInformation'

export interface Main {
  $type: 'org.hypercerts.claim.contributorInformation'
  /** DID or a URI to a social profile of the contributor. */
  identifier?: string
  /** Display name of the contributor. */
  displayName?: string
  image?:
    | $Typed<OrgHypercertsDefs.Uri>
    | $Typed<OrgHypercertsDefs.SmallImage>
    | { $type: string }
  /** Client-declared timestamp when this record was originally created. */
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
