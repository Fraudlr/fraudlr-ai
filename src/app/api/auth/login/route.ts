/**
 * @fileoverview User Login API Route
 * 
 * POST /api/auth/login
 * 
 * Authenticates a user with email and password.
 * - Verifies credentials against database
 * - Returns JWT token in HTTP-only cookie
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePasswords, createToken, setAuthCookie } from "@/lib/auth";

/**
 * POST handler for user login
 * 
 * Request body:
 * - email: string (required)
 * - password: string (required)
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    // Check if user exists
    if (!user) {
      // Use generic error to prevent email enumeration
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.email,
    });

    // Set the auth cookie
    await setAuthCookie(token);

    // Return success response
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
