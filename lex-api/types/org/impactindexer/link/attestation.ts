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
const id = 'org.impactindexer.link.attestation'

export interface Main {
  $type: 'org.impactindexer.link.attestation'
  /** The EVM wallet address (checksummed or lowercase, 0x-prefixed) */
  address: string
  /** The EVM chain ID where the signature was created */
  chainId: number
  /** The EIP-712 signature in hex format (0x-prefixed, 65 bytes for ECDSA, longer for smart contract sigs) */
  signature: string
  message: Eip712Message
  /** The type of signature: eoa (EOA/ECDSA), erc1271 (smart contract), erc6492 (counterfactual) */
  signatureType: 'eoa' | 'erc1271' | 'erc6492' | (string & {})
  /** Timestamp when the attestation was created */
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

/** The EIP-712 typed data message structure */
export interface Eip712Message {
  $type?: 'org.impactindexer.link.attestation#eip712Message'
  /** The ATProto DID being linked */
  did: string
  /** The EVM address being linked (0x-prefixed) */
  evmAddress: string
  /** The chain ID as a string (for bigint compatibility, max uint256) */
  chainId: string
  /** Unix timestamp as a string (for bigint compatibility) */
  timestamp: string
  /** Replay protection nonce as a string (for bigint compatibility) */
  nonce: string
}

const hashEip712Message = 'eip712Message'

export function isEip712Message<V>(v: V) {
  return is$typed(v, id, hashEip712Message)
}

export function validateEip712Message<V>(v: V) {
  return validate<Eip712Message & V>(v, id, hashEip712Message)
}
