/**
 * @fileoverview User Logout API Route
 * 
 * POST /api/auth/logout
 * 
 * Logs out the current user by clearing the authentication cookie.
 */

import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

/**
 * POST handler for user logout
 * Clears the auth cookie and returns success response
 */
export async function POST() {
  try {
    // Clear the authentication cookie
    await clearAuthCookie();

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { error: "An error occurred during logout" },
      { status: 500 }
    );
  }
}
