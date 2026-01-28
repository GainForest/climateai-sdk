/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons'
import { type $Typed, is$typed as _is$typed, type OmitKey } from '../../../util'

const is$typed = _is$typed,
  validate = _validate
const id = 'app.certified.defs'

/** A Decentralized Identifier (DID) string. */
export interface Did {
  $type?: 'app.certified.defs#did'
  /** The DID string value. */
  did: string
}

const hashDid = 'did'

export function isDid<V>(v: V) {
  return is$typed(v, id, hashDid)
}

export function validateDid<V>(v: V) {
  return validate<Did & V>(v, id, hashDid)
}
