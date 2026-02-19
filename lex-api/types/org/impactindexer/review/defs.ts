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

const is$typed = _is$typed,
  validate = _validate
const id = 'org.impactindexer.review.defs'

/** The type of subject being reviewed. */
export type SubjectType = 'record' | 'user' | 'pds' | 'lexicon' | (string & {})

/** Reference to the subject being reviewed. */
export interface SubjectRef {
  $type?: 'org.impactindexer.review.defs#subjectRef'
  /** The subject identifier. For records: AT-URI (at://did/collection/rkey). For users: DID (did:plc:xxx). For PDSes: hostname (example.com). For lexicons: NSID (app.bsky.feed.post). */
  uri: string
  type: SubjectType
  /** Optional CID for record subjects to pin to a specific version. */
  cid?: string
}

const hashSubjectRef = 'subjectRef'

export function isSubjectRef<V>(v: V) {
  return is$typed(v, id, hashSubjectRef)
}

export function validateSubjectRef<V>(v: V) {
  return validate<SubjectRef & V>(v, id, hashSubjectRef)
}
