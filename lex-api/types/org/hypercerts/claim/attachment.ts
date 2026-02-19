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
import type * as AppBskyRichtextFacet from '../../../app/bsky/richtext/facet.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.hypercerts.claim.attachment'

export interface Main {
  $type: 'org.hypercerts.claim.attachment'
  /** References to the subject(s) the attachment is connected to—this may be an activity claim, outcome claim, measurement, evaluation, or even another attachment. This is optional as the attachment can exist before the claim is recorded. */
  subjects?: ComAtprotoRepoStrongRef.Main[]
  /** The type of attachment, e.g. report, audit, evidence, testimonial, methodology, etc. */
  contentType?: string
  /** The files, documents, or external references included in this attachment record. */
  content: (
    | $Typed<OrgHypercertsDefs.Uri>
    | $Typed<OrgHypercertsDefs.SmallBlob>
    | { $type: string }
  )[]
  /** Title of this attachment. */
  title: string
  /** Short summary of this attachment, suitable for previews and list views. Rich text annotations may be provided via `shortDescriptionFacets`. */
  shortDescription?: string
  /** Rich text annotations for `shortDescription` (mentions, URLs, hashtags, etc). */
  shortDescriptionFacets?: AppBskyRichtextFacet.Main[]
  /** Optional longer description of this attachment, including context or interpretation. Rich text annotations may be provided via `descriptionFacets`. */
  description?: string
  /** Rich text annotations for `description` (mentions, URLs, hashtags, etc). */
  descriptionFacets?: AppBskyRichtextFacet.Main[]
  location?: ComAtprotoRepoStrongRef.Main
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
