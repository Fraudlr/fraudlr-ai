/**
 * @fileoverview Authentication Library
 * 
 * This file contains authentication utilities for the Fraudlr platform.
 * We use JWT (JSON Web Tokens) for session management, which allows
 * stateless authentication across our API routes.
 * 
 * Security Notes:
 * - Passwords are hashed using bcrypt (never stored in plain text)
 * - JWTs are signed with a secret key and have expiration times
 * - Tokens are stored in HTTP-only cookies for security
 */

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

/**
 * Secret key for signing JWTs
 * IMPORTANT: In production, use a strong, randomly generated secret
 * stored in environment variables
 */
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

/**
 * Token expiration time (7 days in seconds)
 * Adjust based on your security requirements
 */
const TOKEN_EXPIRY = 60 * 60 * 24 * 7;

/**
 * User payload interface for JWT tokens
 * This data is encoded into the token and available on each request
 */
export interface UserPayload {
  userId: string;
  email: string;
}

/**
 * Creates a JWT token for an authenticated user
 * 
 * @param payload - User information to encode in the token
 * @returns Signed JWT token string
 * 
 * How JWT works:
 * 1. User logs in with email/password
 * 2. Server verifies credentials
 * 3. Server creates a signed token with user data
 * 4. Client stores token and sends it with future requests
 * 5. Server verifies token signature on each request
 */
export async function createToken(payload: UserPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Use HMAC-SHA256 algorithm
    .setIssuedAt() // Set token creation time
    .setExpirationTime(`${TOKEN_EXPIRY}s`) // Set expiration
    .sign(JWT_SECRET);
}

/**
 * Verifies a JWT token and extracts the payload
 * 
 * @param token - The JWT token string to verify
 * @returns User payload if valid, null if invalid or expired
 */
export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserPayload;
  } catch (error) {
    // Token is invalid, expired, or tampered with
    return null;
  }
}

/**
 * Hashes a password using bcrypt
 * 
 * @param password - Plain text password
 * @returns Hashed password string
 * 
 * Why bcrypt?
 * - Automatically generates a salt (random data added to password)
 * - Configurable work factor (cost) makes brute-force attacks slow
 * - Industry standard for password hashing
 */
export async function hashPassword(password: string): Promise<string> {
  // Salt rounds of 12 provides good security vs performance balance
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plain text password with a hashed password
 * 
 * @param password - Plain text password to check
 * @param hashedPassword - Stored hashed password
 * @returns True if passwords match
 */
export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Sets the authentication cookie with the JWT token
 * 
 * @param token - JWT token to store in cookie
 * 
 * Cookie Security:
 * - httpOnly: Prevents JavaScript access (XSS protection)
 * - secure: Only sent over HTTPS in production
 * - sameSite: Prevents CSRF attacks
 * - maxAge: Matches token expiration
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_EXPIRY,
    path: "/",
  });
}

/**
 * Gets the current user from the authentication cookie
 * 
 * @returns User payload if authenticated, null otherwise
 */
export async function getCurrentUser(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  
  if (!token) {
    return null;
  }
  
  return await verifyToken(token);
}

/**
 * Removes the authentication cookie (logs user out)
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
}
