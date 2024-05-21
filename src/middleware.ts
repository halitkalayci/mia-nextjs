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
];
// Gelen url korumalı sayfaların path'leriyle uyuşuyor mu kontrol eden function.
const isSecurePage = (url: string) =>
  SECURED_PAGES.find((page) => page.path.startsWith(url));

export async function middleware(request: NextRequest) {
  const { cookies, url, nextUrl } = request;

  const { value: token } = cookies.get("token") ?? { value: null };
  const jwtTokenResult = await verifyJwtToken(token!);
  const hasVerifiedToken = jwtTokenResult; // Kullanıcı token sahibi mi ve geçerli mi?
  const authPageRequested = isAuthPage(nextUrl.pathname); // Kullanıcı giriş sayfasına mı istek attı ?
  const roles:string[] = jwtTokenResult?.payload["roles"] as string[];
  // VerifyJwtToken => Tokenin bizim secret keyimiz ile üretildiğini ve zamanının geçip geçmediğini kontrol eder.
  if (authPageRequested) {
    if (!hasVerifiedToken) {
      // Eğer auth sayfası ise ve token yok/invalid ise cookie temizle ve giriş sayfasına yönlendir.
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }

    // Eğer auth sayfasına gelmiş ama tokenı var ve geçerli ise ana sayfaya yönlendir.
    return NextResponse.redirect(new URL("/", url));
  }
  let securedPath = isSecurePage(nextUrl.pathname);
  if (securedPath) {

    if (securedPath.requiredRoles.length > 0) {
        if(!hasVerifiedToken)
            return NextResponse.redirect(new URL('/auth/login', url));
        // Rol kontrolü gerekli.
        if(securedPath.requiredRoles.some((role) => roles.some(r => r.toLowerCase() == role.toLowerCase())))
            return NextResponse.next();

        return NextResponse.redirect(new URL('/auth/accessdenied', url));
    }else{
        // Rol kontrolü gereksiz, auth yeterli.
        if(hasVerifiedToken)
            return NextResponse.next();

        return NextResponse.redirect(new URL('/auth/login', url));
    }
  }
  // URL'De koruma yoktur. (Protected Route değildir..)
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/admin/dashboard", "/homepage/index"],
};

// Nextjs ile auth işlemleri (prisma => hashing,salting)
// RsPack ile microfrontend
// Nextjs ile full stack crud işlemleri olan bir uygulama (prisma, vs..)
