import bcrypt from "bcrypt";
import { getSecretKey } from "@/libs/jwt";
import prisma from "@/libs/prisma";
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

    const user = await prisma.user.findUnique({
      where: { username: username },
      include: { roles: { include: { role: true } } },
    });

    if (!user)
      return NextResponse.json(
        { success: false, message: "Username or password is incorrect." },
        { status: 400 }
      );

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return NextResponse.json(
        { success: false, message: "Username or password is incorrect." },
        { status: 400 }
      );

    const roles = user.roles.map((userRole: any) =>
      userRole.role.name.toLowerCase()
    );

    const token: string = await new SignJWT({
      username: user.username,
      roles: roles,
      createdAt: user.createdAt,
      id: user.id,
    })
      .setIssuedAt()
      .setExpirationTime("10min")
      .setProtectedHeader({ alg: "HS256" })
      .sign(getSecretKey());

    let response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
      secure: process.env.NODE_ENV == "production", // Production'da https kullan, developmentta kullanma.
      maxAge: 60 * 60 * 24, // Saniye cinsinden maksimum kullanım süresi. ( 60 saniye * 60 ) => 1 dakika * 24 => 1 gün
      httpOnly: true, // Javascript tarafından erişelemez. (Client sidedan)
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 }
    );
  }
}
