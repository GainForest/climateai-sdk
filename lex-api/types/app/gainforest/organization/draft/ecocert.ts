/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../../util'
import type * as AppGainforestCommonDefs from '../../common/defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'app.gainforest.organization.draft.ecocert'

export interface Main {
  $type: 'app.gainforest.organization.draft.ecocert'
  /** The title of the ecocert */
  title: string
  coverImage: AppGainforestCommonDefs.SmallImage | null
  /** The work scopes of the ecocert */
  workScopes: string[]
  /** The start date of the work */
  workStartDate: string
  /** The end date of the work */
  workEndDate: string
  /** The description of the ecocert in markdown */
  description: string
  /** The short description of the ecocert in markdown */
  shortDescription: string
  /** The contributors of the ecocert in markdown */
  contributors: string[]
  /** The reference to the site record in the PDS */
  site: string
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
