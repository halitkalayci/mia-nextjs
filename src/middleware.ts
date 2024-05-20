import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./libs/jwt";

// Authentication sayfalarının tanımı.
const AUTH_PAGES = ['/auth/login', '/auth/register']
// Bir url authentication sayfası mı değil mi kontrol eden function.
const isAuthPage = (url:string) => AUTH_PAGES.some(page => page.startsWith(url));

// Korumalı sayfaların tanımı.
const SECURED_PAGES = [
    {path: '/admin/dashboard', requiredRoles: ["admin"]},
    {path: '/homepage/index', requiredRoles: []},
]
// Gelen url korumalı sayfaların path'leriyle uyuşuyor mu kontrol eden function.
const isSecurePage = (url:string) => SECURED_PAGES.some(page => page.path.startsWith(url));

export async function middleware(request:NextRequest)
{   
    const { cookies, url, nextUrl } = request;

    const {value: token} = cookies.get('token') ?? {value:null};

    const hasVerifiedToken = token && await verifyJwtToken(token); // Kullanıcı token sahibi mi ve geçerli mi?
    const authPageRequested = isAuthPage(nextUrl.pathname); // Kullanıcı giriş sayfasına mı istek attı ?

    // VerifyJwtToken => Tokenin bizim secret keyimiz ile üretildiğini ve zamanının geçip geçmediğini kontrol eder.
    if(authPageRequested)
    {
        if(!hasVerifiedToken)  // Eğer auth sayfası ise ve token yok/invalid ise cookie temizle ve giriş sayfasına yönlendir.
        {
            const response = NextResponse.next();
            response.cookies.delete("token");
            return response;
        }

        // Eğer auth sayfasına gelmiş ama tokenı var ve geçerli ise ana sayfaya yönlendir.
        return NextResponse.redirect(new URL('/', url));
    }

    // Secure URL'ler
    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/login", "/admin/dashboard"]
}