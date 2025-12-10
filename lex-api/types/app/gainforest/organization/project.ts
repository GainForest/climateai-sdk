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
const id = 'app.gainforest.organization.project'

export interface Main {
  $type: 'app.gainforest.organization.project'
  /** The name of the site */
  name: string
  /** The description of the project in markdown */
  description?: string
  /** The short description of the project */
  shortDescription: string
  /** An array of at-uris pointing to the records of the ecocerts related to the project */
  ecocerts: string[]
  /** An array of at-uris pointing to the records of the layers related to the project */
  layers: string[]
  /** An array of at-uris pointing to the records of the sites related to the project */
  sites: string[]
  /** An array of at-uris pointing to the records of the measured trees clusters related to the project */
  measuredTreesClusters: string[]
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
