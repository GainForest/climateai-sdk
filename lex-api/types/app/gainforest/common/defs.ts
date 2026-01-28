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
const id = 'app.gainforest.common.defs'

/** Reference to external data via URI */
export interface Uri {
  $type?: 'app.gainforest.common.defs#uri'
  /** URI to external resource */
  uri: string
}

const hashUri = 'uri'

export function isUri<V>(v: V) {
  return is$typed(v, id, hashUri)
}

export function validateUri<V>(v: V) {
  return validate<Uri & V>(v, id, hashUri)
}

/** Image file for photos, camera traps, drone stills, scanned documents */
export interface Image {
  $type?: 'app.gainforest.common.defs#image'
  /** Image up to 20MB. Supports JPEG, PNG, WebP, HEIC (phones), TIFF (scientific), GIF, BMP, SVG. */
  file: BlobRef
}

const hashImage = 'image'

export function isImage<V>(v: V) {
  return is$typed(v, id, hashImage)
}

export function validateImage<V>(v: V) {
  return validate<Image & V>(v, id, hashImage)
}

/** Small image for thumbnails and previews */
export interface ImageThumbnail {
  $type?: 'app.gainforest.common.defs#imageThumbnail'
  /** Thumbnail image up to 1MB */
  file: BlobRef
}

const hashImageThumbnail = 'imageThumbnail'

export function isImageThumbnail<V>(v: V) {
  return is$typed(v, id, hashImageThumbnail)
}

export function validateImageThumbnail<V>(v: V) {
  return validate<ImageThumbnail & V>(v, id, hashImageThumbnail)
}

/** Video file for camera traps, drone footage, underwater video, behavioral observations */
export interface Video {
  $type?: 'app.gainforest.common.defs#video'
  /** Video up to 100MB. Supports MP4, MOV, AVI, WebM, MKV, MPEG, 3GP. */
  file: BlobRef
}

const hashVideo = 'video'

export function isVideo<V>(v: V) {
  return is$typed(v, id, hashVideo)
}

export function validateVideo<V>(v: V) {
  return validate<Video & V>(v, id, hashVideo)
}

/** Audio file for bioacoustics, soundscapes, field recordings, species calls */
export interface Audio {
  $type?: 'app.gainforest.common.defs#audio'
  /** Audio up to 100MB. Supports WAV, MP3, M4A, AAC, FLAC, OGG, Opus, WebM, AIFF. */
  file: BlobRef
}

const hashAudio = 'audio'

export function isAudio<V>(v: V) {
  return is$typed(v, id, hashAudio)
}

export function validateAudio<V>(v: V) {
  return validate<Audio & V>(v, id, hashAudio)
}

/** Spectrogram image - visual representation of audio frequency content */
export interface Spectrogram {
  $type?: 'app.gainforest.common.defs#spectrogram'
  /** Spectrogram image up to 5MB */
  file: BlobRef
}

const hashSpectrogram = 'spectrogram'

export function isSpectrogram<V>(v: V) {
  return is$typed(v, id, hashSpectrogram)
}

export function validateSpectrogram<V>(v: V) {
  return validate<Spectrogram & V>(v, id, hashSpectrogram)
}

/** Document file for reports, field notes, permits, publications */
export interface Document {
  $type?: 'app.gainforest.common.defs#document'
  /** Document up to 20MB. Supports PDF, TXT, Markdown, HTML, RTF, DOC, DOCX. */
  file: BlobRef
}

const hashDocument = 'document'

export function isDocument<V>(v: V) {
  return is$typed(v, id, hashDocument)
}

export function validateDocument<V>(v: V) {
  return validate<Document & V>(v, id, hashDocument)
}

/** Structured data file for observations, measurements, exports */
export interface DataFile {
  $type?: 'app.gainforest.common.defs#dataFile'
  /** Data file up to 50MB. Supports CSV, TSV, JSON, JSON-LD, XML, XLS, XLSX, ODS. */
  file: BlobRef
}

const hashDataFile = 'dataFile'

export function isDataFile<V>(v: V) {
  return is$typed(v, id, hashDataFile)
}

export function validateDataFile<V>(v: V) {
  return validate<DataFile & V>(v, id, hashDataFile)
}

/** GPS track file for transects, survey routes, patrol paths */
export interface GpsTrack {
  $type?: 'app.gainforest.common.defs#gpsTrack'
  /** GPS track up to 10MB. Supports GPX, KML, KMZ, GeoJSON. */
  file: BlobRef
}

const hashGpsTrack = 'gpsTrack'

export function isGpsTrack<V>(v: V) {
  return is$typed(v, id, hashGpsTrack)
}

export function validateGpsTrack<V>(v: V) {
  return validate<GpsTrack & V>(v, id, hashGpsTrack)
}

/** Geospatial data file for maps, boundaries, habitat layers */
export interface Geospatial {
  $type?: 'app.gainforest.common.defs#geospatial'
  /** Geospatial data up to 100MB. Supports GeoJSON, KML, KMZ, GeoPackage, Shapefile (zipped), GeoTIFF. */
  file: BlobRef
}

const hashGeospatial = 'geospatial'

export function isGeospatial<V>(v: V) {
  return is$typed(v, id, hashGeospatial)
}

export function validateGeospatial<V>(v: V) {
  return validate<Geospatial & V>(v, id, hashGeospatial)
}

/** Sensor data file for environmental monitoring (temperature, humidity, light, etc.) */
export interface SensorData {
  $type?: 'app.gainforest.common.defs#sensorData'
  /** Sensor data up to 50MB. Supports CSV, JSON, TXT, NetCDF, HDF5. */
  file: BlobRef
}

const hashSensorData = 'sensorData'

export function isSensorData<V>(v: V) {
  return is$typed(v, id, hashSensorData)
}

export function validateSensorData<V>(v: V) {
  return validate<SensorData & V>(v, id, hashSensorData)
}

/** Genetic/genomic data file for eDNA, barcoding, sequencing results */
export interface GeneticData {
  $type?: 'app.gainforest.common.defs#geneticData'
  /** Genetic data up to 100MB. Supports FASTA, FASTQ, CSV, JSON. */
  file: BlobRef
}

const hashGeneticData = 'geneticData'

export function isGeneticData<V>(v: V) {
  return is$typed(v, id, hashGeneticData)
}

export function validateGeneticData<V>(v: V) {
  return validate<GeneticData & V>(v, id, hashGeneticData)
}

/** Reference to an indexed organization */
export interface IndexedOrganization {
  $type?: 'app.gainforest.common.defs#indexedOrganization'
  /** The URI of the organization */
  id: string
  /** The name of the organization */
  name: string
}

const hashIndexedOrganization = 'indexedOrganization'

export function isIndexedOrganization<V>(v: V) {
  return is$typed(v, id, hashIndexedOrganization)
}

export function validateIndexedOrganization<V>(v: V) {
  return validate<IndexedOrganization & V>(v, id, hashIndexedOrganization)
}
