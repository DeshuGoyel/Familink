/**
 * Shamir's Secret Sharing Scheme over GF(256)
 */

// Exponential and logarithm tables for GF(256) multiplication
const GF256_EXP = new Uint8Array(256);
const GF256_LOG = new Uint8Array(256);

// Initialize tables
let x = 1;
for (let i = 0; i < 255; i++) {
  GF256_EXP[i] = x;
  GF256_LOG[x] = i;
  x <<= 1;
  if (x & 0x100) {
    x ^= 0x11d; // generator polynomial x^8 + x^4 + x^3 + x^2 + 1
  }
}
// Set exp[255] to exp[0] to allow modulo 255 arithmetic
GF256_EXP[255] = GF256_EXP[0];

// GF(256) Addition (XOR)
function add(a: number, b: number): number {
  return a ^ b;
}

// GF(256) Multiplication
function mul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF256_EXP[(GF256_LOG[a] + GF256_LOG[b]) % 255];
}

// GF(256) Division (a / b)
function div(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero in GF(256)");
  if (a === 0) return 0;
  return GF256_EXP[(GF256_LOG[a] - GF256_LOG[b] + 255) % 255];
}

// Evaluate polynomial P(x) at x using Horner's method
function evaluatePolynomial(poly: number[], xVal: number): number {
  let result = 0;
  for (let i = poly.length - 1; i >= 0; i--) {
    result = add(mul(result, xVal), poly[i]);
  }
  return result;
}

export interface Share {
  x: number;
  y: Uint8Array;
}

/**
 * Splits a secret Uint8Array into n shares, requiring threshold t to reconstruct.
 */
export function splitSecret(secret: Uint8Array, t: number, n: number): Share[] {
  if (t < 1 || t > n || n > 255) {
    throw new Error("Invalid threshold or share count");
  }

  // Create shares
  const shares: Share[] = [];
  for (let i = 1; i <= n; i++) {
    shares.push({
      x: i,
      y: new Uint8Array(secret.length),
    });
  }

  // For each byte of the secret, create a random polynomial and evaluate at x = 1...n
  const poly = new Array(t);
  for (let byteIndex = 0; byteIndex < secret.length; byteIndex++) {
    // poly[0] is the secret byte
    poly[0] = secret[byteIndex];
    // poly[1...t-1] are random coefficients
    for (let c = 1; c < t; c++) {
      poly[c] = Math.floor(Math.random() * 256);
    }

    // Evaluate for each share x = 1...n
    for (let shareIndex = 0; shareIndex < n; shareIndex++) {
      const xVal = shares[shareIndex].x;
      shares[shareIndex].y[byteIndex] = evaluatePolynomial(poly, xVal);
    }
  }

  return shares;
}

/**
 * Reconstructs a secret Uint8Array from a set of shares using Lagrange interpolation at x = 0.
 */
export function combineShares(shares: Share[]): Uint8Array {
  if (shares.length === 0) {
    throw new Error("No shares provided");
  }

  const secretLength = shares[0].y.length;
  const secret = new Uint8Array(secretLength);

  for (let byteIndex = 0; byteIndex < secretLength; byteIndex++) {
    let secretByte = 0;

    for (let i = 0; i < shares.length; i++) {
      const xi = shares[i].x;
      const yi = shares[i].y[byteIndex];

      // Compute Lagrange coefficient L_i(0)
      let li = 1;
      for (let j = 0; j < shares.length; j++) {
        if (i === j) continue;
        const xj = shares[j].x;
        // li = li * (0 - xj) / (xi - xj) = li * xj / (xi ^ xj)
        li = mul(li, div(xj, add(xi, xj)));
      }

      secretByte = add(secretByte, mul(yi, li));
    }

    secret[byteIndex] = secretByte;
  }

  return secret;
}
