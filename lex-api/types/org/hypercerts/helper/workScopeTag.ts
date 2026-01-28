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
import type * as OrgHypercertsDefs from '../defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.hypercerts.helper.workScopeTag'

export interface Main {
  $type: 'org.hypercerts.helper.workScopeTag'
  /** Client-declared timestamp when this record was originally created */
  createdAt: string
  /** Lowercase, hyphenated machine-readable key for this scope (e.g., 'ipfs', 'go-lang', 'filecoin'). */
  key: string
  /** Human-readable label for this scope. */
  label: string
  /** Category type of this scope. Recommended values: topic, language, domain, method, tag. */
  kind?: string
  /** Optional longer description of this scope. */
  description?: string
  parent?: ComAtprotoRepoStrongRef.Main
  /** Optional array of alternative names or identifiers for this scope. */
  aliases?: string[]
  externalReference?:
    | $Typed<OrgHypercertsDefs.Uri>
    | $Typed<OrgHypercertsDefs.SmallBlob>
    | { $type: string }
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
