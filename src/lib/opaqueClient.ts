import * as opaque from '@serenity-kit/opaque';
import sodium from 'libsodium-wrappers-sumo';
import { toBase64Url, fromBase64Url } from './aeadClient';

export interface OpaqueRegInitResult {
  userId: string;
  registrationRequest: string;
  blindFactor: string; // Stores clientRegistrationState (base64url)
}

export async function initOpaqueRegistration(password: string): Promise<OpaqueRegInitResult> {
  await opaque.ready;
  const { clientRegistrationState, registrationRequest } = opaque.client.startRegistration({ password });
  
  const userId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
  
  return {
    userId,
    registrationRequest,
    blindFactor: clientRegistrationState
  };
}

export interface OpaqueRegFinishData {
  registrationUpload: string;
  ed25519Pubkey: string;
  x25519Pubkey: string;
  kyber768Pubkey: string;
  emkBlob: string;
  argon2Params: unknown;
  encLegalName: string;
  encEmail: string;
}

export async function finishOpaqueRegistration(
  password: string,
  blindFactor: string,
  serverResponseB64: string,
  legalName: string,
  email: string
): Promise<OpaqueRegFinishData> {
  await opaque.ready;
  await sodium.ready;
  
  // 1. Finish OPAQUE registration using serenity-kit/opaque
  const { registrationRecord, exportKey } = opaque.client.finishRegistration({
    clientRegistrationState: blindFactor,
    registrationResponse: serverResponseB64, // Already base64url from backend
    password
  });
  
  // 2. Decode and hash the exportKey (64 bytes) to derive a 32-byte KEK
  const kek = sodium.crypto_generichash(32, fromBase64Url(exportKey));
  
  // 3. Generate randomized client keys (Zero-Knowledge)
  const edKeyPair = sodium.crypto_sign_keypair();
  const xKeyPair = sodium.crypto_box_keypair();
  const kyberKeyPair = sodium.randombytes_buf(32); // Mock placeholder for Kyber-768
  
  // 4. Encrypt master key (MK) with derived KEK
  const mk = sodium.randombytes_buf(32);
  const emkNonce = sodium.randombytes_buf(24);
  const emkCiphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
    mk,
    new Uint8Array(),
    null,
    emkNonce,
    kek
  );
  
  const emkBlob = JSON.stringify({
    nonce: toBase64Url(emkNonce),
    ciphertext: toBase64Url(emkCiphertext)
  });
  
  // 5. Encrypt legal name and email with MK
  const profileNonce = sodium.randombytes_buf(24);
  const encLegalName = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
    new TextEncoder().encode(legalName),
    null,
    null,
    profileNonce,
    mk
  );
  const encEmail = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
    new TextEncoder().encode(email),
    null,
    null,
    profileNonce,
    mk
  );
  
  return {
    registrationUpload: registrationRecord,
    ed25519Pubkey: toBase64Url(edKeyPair.publicKey),
    x25519Pubkey: toBase64Url(xKeyPair.publicKey),
    kyber768Pubkey: toBase64Url(kyberKeyPair),
    emkBlob: toBase64Url(new TextEncoder().encode(emkBlob)),
    argon2Params: {
      m: sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
      t: sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
      p: 1
    },
    encLegalName: toBase64Url(encLegalName),
    encEmail: toBase64Url(encEmail)
  };
}

export interface OpaqueLoginInitResult {
  credentialRequest: string;
  blindFactor: string; // Stores clientLoginState (base64url)
}

export async function initOpaqueLogin(password: string): Promise<OpaqueLoginInitResult> {
  await opaque.ready;
  const { clientLoginState, startLoginRequest } = opaque.client.startLogin({ password });
  
  return {
    credentialRequest: startLoginRequest,
    blindFactor: clientLoginState
  };
}

export interface OpaqueLoginFinishData {
  registrationUpload: string; // mapped to finalization field
  sessionKey: string;
}

export async function finishOpaqueLogin(
  password: string,
  clientLoginState: string,
  serverResponseB64: string
): Promise<OpaqueLoginFinishData> {
  await opaque.ready;
  
  const { finishLoginRequest, sessionKey } = opaque.client.finishLogin({
    clientLoginState,
    loginResponse: serverResponseB64, // Already base64url from backend
    password
  });
  
  return {
    registrationUpload: finishLoginRequest,
    sessionKey
  };
}
