import sodium from 'libsodium-wrappers-sumo';
import { fromBase64Url } from './aeadClient';

export interface DecryptEnvelopeParams {
  envelopeJson: string;
  xPrivateKey: string;
  kyberPrivateKey: string;
}

export async function decryptShareEnvelope(params: DecryptEnvelopeParams): Promise<Uint8Array> {
  await sodium.ready;
  const env = JSON.parse(params.envelopeJson);

  // 1. Classical Shared Secret (X25519 scalarmult)
  const ssClassical = sodium.crypto_scalarmult(
    fromBase64Url(params.xPrivateKey),
    fromBase64Url(env.eph_x25519_pub)
  );

  // 2. PQ Shared Secret (ML-KEM-768/Kyber decapsulation)
  let ssPq: Uint8Array;
  try {
    ssPq = sodium.crypto_kem_mlkem768_dec(
      fromBase64Url(env.kyber_ct),
      fromBase64Url(params.kyberPrivateKey)
    );
  } catch (kemErr) {
    console.error("MLKEM-768 Decapsulation failed:", kemErr);
    throw new Error("ML-KEM-768 decapsulation failed: invalid ciphertext or private key");
  }

  // Combine shared secrets
  const ss = new Uint8Array(ssClassical.length + ssPq.length);
  ss.set(ssClassical);
  ss.set(ssPq, ssClassical.length);

  // Wrap Key derivation via simple generichash acting as KDF
  const salt = sodium.crypto_generichash(
    32,
    new TextEncoder().encode(`hybrid-wrap-v1|${env.owner_id}|${env.item_id}`),
    null
  );
  const wrapKey = sodium.crypto_generichash(32, ss, salt);

  // Decrypt SSS share payload via AEAD XChaCha20-Poly1305
  const decrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
    null,
    fromBase64Url(env.payload),
    null,
    fromBase64Url(env.nonce),
    wrapKey
  );

  return decrypted;
}
