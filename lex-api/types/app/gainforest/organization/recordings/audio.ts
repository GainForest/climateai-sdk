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
const id = 'app.gainforest.organization.recordings.audio'

export interface Main {
  $type: 'app.gainforest.organization.recordings.audio'
  /** A short name for the audio recording */
  name?: string
  description?: AppGainforestCommonDefs.Richtext
  audioBlob: AppGainforestCommonDefs.Audio
  metadata: Metadata
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

export interface Metadata {
  $type?: 'app.gainforest.organization.recordings.audio#metadata'
  /** The codec of the audio recording */
  codec: string
  /** The format of the audio recording */
  format:
    | 'wav'
    | 'mp3'
    | 'm4a'
    | 'aac'
    | 'flac'
    | 'ogg'
    | 'opus'
    | 'webm'
    | 'aiff'
  /** The number of channels of the audio recording */
  channels: number
  /** The duration of the audio recording in seconds */
  duration: string
  /** The date and time of the recording */
  recordedAt: string
  /** The sample rate of the audio recording */
  sampleRate: number
  /** The coordinates at which the audio was recorded in the format 'latitude,longitude' OR 'latitude,longitude,altitude' */
  coordinates?: string
}

const hashMetadata = 'metadata'

export function isMetadata<V>(v: V) {
  return is$typed(v, id, hashMetadata)
}

export function validateMetadata<V>(v: V) {
  return validate<Metadata & V>(v, id, hashMetadata)
}
