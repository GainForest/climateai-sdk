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
const id = 'app.gainforest.organization.layer'

export interface Main {
  $type: 'app.gainforest.organization.layer'
  /** The name of the site */
  name: string
  /** The type of the layer */
  type:
    | 'geojson_points'
    | 'geojson_points_trees'
    | 'geojson_line'
    | 'choropleth'
    | 'choropleth_shannon'
    | 'raster_tif'
    | 'tms_tile'
  /** The URI of the layer */
  uri: string
  /** The description of the layer */
  description?: string
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
