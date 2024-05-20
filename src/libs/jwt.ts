import { JWTVerifyResult, jwtVerify } from "jose";

export function getSecretKey(): Uint8Array {
  let key: string|undefined = process.env.JWT_SECRET;

  if(!key)
    throw new Error("JWT secret key must be provided.");

  return new TextEncoder().encode(key);
}

export async function verifyJwtToken(token: string): Promise<JWTVerifyResult | null> {
  try {
    let result: JWTVerifyResult = await jwtVerify(token, getSecretKey());
    return result;
  } catch (error) {
    return null;
  }
}

