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
import type * as AppBskyRichtextFacet from '../../../app/bsky/richtext/facet.js'
import type * as OrgHypercertsDefs from '../defs.js'
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'org.hypercerts.claim.activity'

export interface Main {
  $type: 'org.hypercerts.claim.activity'
  /** Title of the hypercert. */
  title: string
  /** Short summary of this activity claim, suitable for previews and list views. Rich text annotations may be provided via `shortDescriptionFacets`. */
  shortDescription: string
  /** Rich text annotations for `shortDescription` (mentions, URLs, hashtags, etc). */
  shortDescriptionFacets?: AppBskyRichtextFacet.Main[]
  /** Optional longer description of this activity claim, including context or interpretation. Rich text annotations may be provided via `descriptionFacets`. */
  description?: string
  /** Rich text annotations for `description` (mentions, URLs, hashtags, etc). */
  descriptionFacets?: AppBskyRichtextFacet.Main[]
  image?:
    | $Typed<OrgHypercertsDefs.Uri>
    | $Typed<OrgHypercertsDefs.SmallImage>
    | { $type: string }
  workScope?:
    | $Typed<ComAtprotoRepoStrongRef.Main>
    | $Typed<WorkScopeString>
    | { $type: string }
  /** When the work began */
  startDate?: string
  /** When the work ended */
  endDate?: string
  /** An array of contributor objects, each containing contributor information, weight, and contribution details. */
  contributors?: Contributor[]
  rights?: ComAtprotoRepoStrongRef.Main
  /** An array of strong references to the location where activity was performed. The record referenced must conform with the lexicon app.certified.location. */
  locations?: ComAtprotoRepoStrongRef.Main[]
  /** Client-declared timestamp when this record was originally created */
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

export interface Contributor {
  $type?: 'org.hypercerts.claim.activity#contributor'
  contributorIdentity:
    | $Typed<ContributorIdentity>
    | $Typed<ComAtprotoRepoStrongRef.Main>
    | { $type: string }
  /** The relative weight/importance of this contribution (stored as a string to avoid float precision issues). Must be a positive numeric value. Weights do not need to sum to a specific total; normalization can be performed by the consuming application as needed. */
  contributionWeight?: string
  contributionDetails?:
    | $Typed<ContributorRole>
    | $Typed<ComAtprotoRepoStrongRef.Main>
    | { $type: string }
}

const hashContributor = 'contributor'

export function isContributor<V>(v: V) {
  return is$typed(v, id, hashContributor)
}

export function validateContributor<V>(v: V) {
  return validate<Contributor & V>(v, id, hashContributor)
}

/** Contributor information as a string (DID or identifier). */
export interface ContributorIdentity {
  $type?: 'org.hypercerts.claim.activity#contributorIdentity'
  /** The contributor identity string (DID or identifier). */
  identity: string
}

const hashContributorIdentity = 'contributorIdentity'

export function isContributorIdentity<V>(v: V) {
  return is$typed(v, id, hashContributorIdentity)
}

export function validateContributorIdentity<V>(v: V) {
  return validate<ContributorIdentity & V>(v, id, hashContributorIdentity)
}

/** Contribution details as a string. */
export interface ContributorRole {
  $type?: 'org.hypercerts.claim.activity#contributorRole'
  /** The contribution role or details. */
  role: string
}

const hashContributorRole = 'contributorRole'

export function isContributorRole<V>(v: V) {
  return is$typed(v, id, hashContributorRole)
}

export function validateContributorRole<V>(v: V) {
  return validate<ContributorRole & V>(v, id, hashContributorRole)
}

/** A free-form string describing the work scope for simple or legacy scopes. */
export interface WorkScopeString {
  $type?: 'org.hypercerts.claim.activity#workScopeString'
  /** The work scope description string. */
  scope: string
}

const hashWorkScopeString = 'workScopeString'

export function isWorkScopeString<V>(v: V) {
  return is$typed(v, id, hashWorkScopeString)
}

export function validateWorkScopeString<V>(v: V) {
  return validate<WorkScopeString & V>(v, id, hashWorkScopeString)
}
