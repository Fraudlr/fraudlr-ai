/**
 * @fileoverview User Registration API Route
 * 
 * POST /api/auth/signup
 * 
 * Creates a new user account in the database.
 * - Validates email uniqueness
 * - Hashes password securely
 * - Creates user with FREE subscription tier
 * - Returns JWT token in HTTP-only cookie
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createToken, setAuthCookie } from "@/lib/auth";

/**
 * POST handler for user registration
 * 
 * Request body:
 * - name: string (optional)
 * - email: string (required)
 * - password: string (required, min 8 characters)
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password for secure storage
    const hashedPassword = await hashPassword(password);

    // Create user and subscription in a transaction
    // This ensures both are created together or neither
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || null,
        // Create a FREE tier subscription for new users
        subscription: {
          create: {
            tier: "FREE",
            csvUploadsThisMonth: 0,
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // Create JWT token for authentication
    const token = await createToken({
      userId: user.id,
      email: user.email,
    });

    // Set the auth cookie
    await setAuthCookie(token);

    // Return success response (without sensitive data)
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging)
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
