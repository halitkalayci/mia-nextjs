import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prisma";


export async function POST(request: Request) {
    // Username,password al
    // password'i şifreleme (hashing&salting)
    // veritabanına kaydet.
    let {username,password} = await request.json();

    if(!username || !password)
        return NextResponse.json({success:false, message: 'Validation error'}, {status:400});

    // Veritabanında bu username ile bir kullanıcı var mı?

    // bodyden gelen username ile veritabandaki username eşleşeen veriyi ara
    const existingUser = await prisma.user.findUnique({where: {username: username}});

    if(existingUser)
        return NextResponse.json({success:false, message: "Username already taken"}, {status:400});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    })

    const {password:pw, ...userWithoutPw} = user;


    return NextResponse.json({success:true, message: 'User created.', userWithoutPw}, {status:201})
}