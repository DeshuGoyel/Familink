export async function generateHash(vaultStateData: object): Promise<string> {
  // Use Web Crypto API to generate SHA-256 of stringified JSON
  const stateString = JSON.stringify(vaultStateData);
  const encoder = new TextEncoder();
  const data = encoder.encode(stateString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2,'0')).join('');
}
