import { getSecretKey } from "@/libs/jwt";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let { username, password } = await request.json();
    if (!username || !password)
      return NextResponse.json(
        { success: false, message: "Validation error." },
        { status: 400 }
      );

    if (username == "admin" && password == "admin") {
      const token:string = await new SignJWT({ username: "admin", roles: ["admin"] })
      .setIssuedAt()
      .setExpirationTime("10min")
      .setProtectedHeader({alg:'HS256'})
      .sign(getSecretKey());

      let response = NextResponse.json({success:true});

      response.cookies.set({
        name:'token',
        value: token,
        path:'/',
        secure: process.env.NODE_ENV == "production", // Production'da https kullan, developmentta kullanma.
        maxAge: 60 * 60 * 24, // Saniye cinsinden maksimum kullanım süresi. ( 60 saniye * 60 ) => 1 dakika * 24 => 1 gün
        httpOnly:true // Javascript tarafından erişelemez. (Client sidedan)
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Username or password incorrect.' }, {status:400});
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 }
    );
  }
}
