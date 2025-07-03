import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    if (!accessToken) {
      if (refreshToken) {
        return NextResponse.redirect(new URL("/refresh-token", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET || "your_jwt_secret_key"
      );

      if (typeof decoded === "object" && "role" in decoded) {
        if (decoded.role !== "admin") {
          return NextResponse.redirect(new URL("/login", request.url));
        }
      } else {
        // If the decoded token is a string or doesn't have a role field
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      if (refreshToken) {
        return NextResponse.redirect(new URL("/refresh-token", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
