/**
 * @fileoverview Current User API Route
 * 
 * GET /api/auth/me
 * 
 * Returns the currently authenticated user's information.
 * Used by the client to check authentication status.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

/**
 * GET handler for current user info
 * Returns user data if authenticated, 401 if not
 */
export async function GET() {
  try {
    // Get current user from JWT token in cookie
    const authUser = await getCurrentUser();

    if (!authUser) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Fetch full user data from database
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        subscription: {
          select: {
            tier: true,
            csvUploadsThisMonth: true,
            isActive: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get user error:", error);

    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
