// src/middleware.ts

import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import type { Session } from "next-auth";
import { UserRole } from "./models/enumType";

const { auth } = NextAuth(authConfig);

export default auth(async (req: NextRequest & { auth: Session | null }) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;

 
  if (!session?.user) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("authjs.session-token", "", { maxAge: 0 });
    response.cookies.set("authjs.callback-url", "", { maxAge: 0 });
    return response;
  }

  const userRole = session.user.role as UserRole;


  if (userRole === UserRole.ADMIN) {
    return NextResponse.next();
  }

  // If user is not an admin and trying to access admin route
  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if not admin
  }

  // If user is a regular user
  if (userRole === UserRole.USER) {
    return NextResponse.next(); // Or you can redirect to user-specific pages
  }

  // If any other cases (role is not USER or ADMIN), redirect to login
  return NextResponse.redirect(new URL("/login", req.url));
});

export const config = {
  matcher: [ "/admin", "/profile"],
};
