import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { auth } from "../auth";

export const config = {
  matcher: [
    "/",
    "/catalog/:path*",
    "/dashboard/:path*",
    "/my-cart/:path*",
    "/my-profile/:path*",
    "/my-favorite/:path*",
    "/login",
    "/register",
    "/reset-password",
    "/reset-password-request",
    "/set-password",
  ],
};

export default auth(async (request: NextRequest) => {
  const reqUrl = new URL(request.url);
  const path = reqUrl.pathname;

  const session = await auth();
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/catalog",
    "/reset-password",
    "/reset-password-request",
    "/set-password",
  ];
  const noSessionRoutes = [
    "/login",
    "/register",
    "/reset-password",
    "/reset-password-request",
    "/set-password",
  ];
  const superAdminRoutes = ["/dashboard/stores"];

  if (session && noSessionRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (publicRoutes.includes(path) || path.startsWith("/catalog")) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // @ts-ignore
  const userRole = session.user?.role;

  if (userRole === "ADMIN") {
    if (path.startsWith("/my-profile")) {
      return NextResponse.next();
    }

    if (superAdminRoutes.includes(path) || !path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (userRole === "SUPER") {
    if (path.startsWith("/my-profile")) {
      return NextResponse.next();
    }

    if (!path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (userRole === "CUSTOMER") {
    if (!path.match(/^\/my-/)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (path === "/dashboard")
    return NextResponse.redirect(new URL("/dashboard/orders", request.url));

  return NextResponse.next();
});
