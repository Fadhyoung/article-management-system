import {
  APP_ARTICLE_FORM,
  APP_ARTICLE_LIST_ARTICLE,
  APP_CATEGORY,
  APP_LIST_ARTICLE,
  APP_LOGIN,
} from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/register",
  "/api/auth/session",
  "/api/auth/csrf",
  "/api/auth/providers",
];

const PUBLIC_ROUTE_PREFIXES = [
  "/api/auth/signin",
  "/auth/social-register",
  "/images/",
];

const RESTRICTED_ROUTES = [
  APP_ARTICLE_LIST_ARTICLE,
  APP_CATEGORY,
  APP_ARTICLE_FORM,
];

function isPublicRoute(pathname: string): boolean {
  return (
    PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

function isRestrictedRoute(pathname: string): boolean {
  return RESTRICTED_ROUTES.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  if (process.env.DISABLE_AUTH_MIDDLEWARE === "true") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    const redirectPath = token ? userRole == 'Admin' ? APP_ARTICLE_LIST_ARTICLE :  APP_LIST_ARTICLE : APP_LOGIN;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (!token && !isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL(APP_LOGIN, request.url));
  }

  if (userRole && isRestrictedRoute(pathname) && userRole !== "Admin") {
    return NextResponse.redirect(new URL(APP_LIST_ARTICLE, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
