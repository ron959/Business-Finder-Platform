import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Generates a JWT token for a given payload.
 * 
 * @param payload - The data to encode in the JWT
 * @returns A signed JWT as a string
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_EXPIRES || "1h", // Default expiration of 1 hour
  });
};

/**
 * Verifies a JWT token and decodes the payload.
 * 
 * @param token - The JWT to verify
 * @returns The decoded payload if valid, or null if invalid
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    if (typeof decoded === "object" && decoded !== null) {
      return decoded as JwtPayload; // Explicitly cast to JwtPayload
    }
    return null; // Return null if the payload is not an object
  } catch (err) {
    console.error("Invalid token:", err);
    return null; // Return null if the token is invalid
  }
};
