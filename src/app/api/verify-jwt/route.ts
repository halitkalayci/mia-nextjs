import { getSecretKey } from "@/libs/jwt";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = cookies();

  // Tokeni geçerli ise decode edip dönüyorum değil ise hata veriyorum.
  try {
    // next/headers'daki cookies kullanımı daha doğru.
    if (!cookieStore.has("token")) throw new Error();
    // Manual text search yerine bu method daha sağlıklı sonuçlar verir.
    let jwt = cookieStore.get("token");

    // ...
    const token = await jwtVerify(jwt?.value!, getSecretKey());
    if (!token) throw new Error();

    return NextResponse.json({ success: true, ...token }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Invalid or expired jwt" },
      { status: 401 }
    );
  }
}
