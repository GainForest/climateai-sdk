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
import type * as AppGainforestCommonDefs from '../common/defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'app.gainforest.organization.info'

export interface Main {
  $type: 'app.gainforest.organization.info'
  /** The name of the organization or project */
  displayName: string
  /** The description of the organization or project */
  shortDescription: string
  /** The long description of the organization or project in richtext */
  longDescription: string
  coverImage?: AppGainforestCommonDefs.SmallImage
  logo?: AppGainforestCommonDefs.SmallImage
  /** The objectives of the organization or project */
  objectives: (
    | 'Conservation'
    | 'Research'
    | 'Education'
    | 'Community'
    | 'Other'
  )[]
  /** The start date of the organization or project */
  startDate?: string
  /** The website of the organization or project */
  website?: string
  /** The country of the organization or project in two letter code (ISO 3166-1 alpha-2) */
  country: string
  /** The visibility of the organization or project in the Green Globe */
  visibility: 'Public' | 'Hidden'
  /** The date and time of the creation of the record */
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
