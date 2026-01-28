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
const id = 'app.gainforest.dwc.defs'

/** A geographic point with uncertainty, following Darwin Core Location class */
export interface Geolocation {
  $type?: 'app.gainforest.dwc.defs#geolocation'
  /** Geographic latitude in decimal degrees (WGS84). Positive values north of the Equator, negative south. Range: -90 to 90. */
  decimalLatitude: string
  /** Geographic longitude in decimal degrees (WGS84). Positive values east of the Greenwich Meridian, negative west. Range: -180 to 180. */
  decimalLongitude: string
  /** Horizontal distance from the coordinates describing the smallest circle containing the whole location. Zero is not valid. */
  coordinateUncertaintyInMeters?: number
  /** The ellipsoid, geodetic datum, or spatial reference system. Recommended: 'EPSG:4326' (WGS84) */
  geodeticDatum?: string
}

const hashGeolocation = 'geolocation'

export function isGeolocation<V>(v: V) {
  return is$typed(v, id, hashGeolocation)
}

export function validateGeolocation<V>(v: V) {
  return validate<Geolocation & V>(v, id, hashGeolocation)
}

/** A taxonomic identification with provenance metadata */
export interface TaxonIdentification {
  $type?: 'app.gainforest.dwc.defs#taxonIdentification'
  /** The full scientific name including authorship and date */
  scientificName: string
  /** GBIF backbone taxonomy key for the identified taxon */
  gbifTaxonKey?: string
  /** Person(s) who made the identification (pipe-delimited for multiple) */
  identifiedBy?: string
  /** ORCID or other persistent identifier for the person(s) who identified (pipe-delimited) */
  identifiedByID?: string
  /** Date the identification was made (ISO 8601) */
  dateIdentified?: string
  /** Uncertainty qualifier applied to the taxon name (e.g., 'cf. agrestis', 'aff. agrestis') */
  identificationQualifier?: string
  /** Notes or comments about the identification */
  identificationRemarks?: string
}

const hashTaxonIdentification = 'taxonIdentification'

export function isTaxonIdentification<V>(v: V) {
  return is$typed(v, id, hashTaxonIdentification)
}

export function validateTaxonIdentification<V>(v: V) {
  return validate<TaxonIdentification & V>(v, id, hashTaxonIdentification)
}

/** The specific nature of the data record. Controlled vocabulary per Darwin Core. */
export type BasisOfRecordEnum =
  | 'HumanObservation'
  | 'MachineObservation'
  | 'PreservedSpecimen'
  | 'LivingSpecimen'
  | 'FossilSpecimen'
  | 'MaterialSample'
  | 'MaterialEntity'
  | 'MaterialCitation'
  | (string & {})
/** Statement about the presence or absence of a taxon at a location. */
export type OccurrenceStatusEnum = 'present' | 'absent' | (string & {})
/** Dublin Core type vocabulary for the nature of the resource. */
export type DublinCoreTypeEnum =
  | 'PhysicalObject'
  | 'StillImage'
  | 'MovingImage'
  | 'Sound'
  | 'Text'
  | 'Event'
  | 'Dataset'
  | (string & {})
/** The nomenclatural code under which the scientific name is constructed. */
export type NomenclaturalCodeEnum =
  | 'ICZN'
  | 'ICN'
  | 'ICNP'
  | 'ICTV'
  | 'BioCode'
  | (string & {})
/** The sex of the biological individual(s) represented in the occurrence. */
export type SexEnum = 'male' | 'female' | 'hermaphrodite' | (string & {})
/** The taxonomic rank of the most specific name in the scientificName. */
export type TaxonRankEnum =
  | 'kingdom'
  | 'phylum'
  | 'class'
  | 'order'
  | 'family'
  | 'subfamily'
  | 'genus'
  | 'subgenus'
  | 'species'
  | 'subspecies'
  | 'variety'
  | 'form'
  | (string & {})
