import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./libs/jwt";
// DB PW: 2580
// Authentication sayfalarının tanımı.
const AUTH_PAGES = ["/auth/login", "/auth/register"];
// Bir url authentication sayfası mı değil mi kontrol eden function.
const isAuthPage = (url: string) =>
  AUTH_PAGES.some((page) => page.startsWith(url));

// Korumalı sayfaların tanımı.
const SECURED_PAGES = [
  { path: "/admin/dashboard", requiredRoles: ["moderator", "admin"] }, // RequiredRoles varsa Authorization, yoksa Authentication
  { path: "/homepage/index", requiredRoles: [] },
  { path: "/", requiredRoles: [] },
];
// Gelen url korumalı sayfaların path'leriyle uyuşuyor mu kontrol eden function.
const isSecurePage = (url: string) =>
  SECURED_PAGES.find((page) => page.path.startsWith(url));

const getVerifiedToken = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || null;
  if (token) {
    try {
      const jwtVerifyResult = await verifyJwtToken(token);
      return {
        hasVerifiedToken: true,
        roles: jwtVerifyResult?.payload["roles"] as string[],
      };
    } catch (error) {
      return { hasVerifiedToken: false, roles: [] };
    }
  }
  return { hasVerifiedToken: false, roles: [] };
};

const processAuthPage = (request: NextRequest, tokenResult: any) => {
  if (tokenResult.hasVerifiedToken)
    return NextResponse.redirect(new URL("/", request.url));

  const response = NextResponse.next();
  response.cookies.delete("token");
  return response;
};

const processSecuredRoute = (
  request: NextRequest,
  securedPathConfig: any,
  tokenResult: any
) => {
  if (!tokenResult.hasVerifiedToken)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  if (securedPathConfig.requiredRoles.length <= 0) return NextResponse.next();

  let userHasRole: boolean = securedPathConfig.requiredRoles.some((role: any) =>
    tokenResult.roles.some((r: any) => r == role)
  );

  if (userHasRole) return NextResponse.next();

  return NextResponse.redirect(new URL("/auth/accessdenied", request.url));
};

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const authPageRequested = isAuthPage(nextUrl.pathname);
  let securedPath = isSecurePage(nextUrl.pathname);

  if (authPageRequested || securedPath) {
    const tokenResult = await getVerifiedToken(request);
    if (authPageRequested) return processAuthPage(request, tokenResult);
    else return processSecuredRoute(request, securedPath, tokenResult);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/admin/dashboard", "/homepage/index", "/"],
};
