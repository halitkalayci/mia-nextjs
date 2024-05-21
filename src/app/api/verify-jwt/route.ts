import { getSecretKey } from "@/libs/jwt";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function POST(req:Request)
{
    // Req'in cookielerini oku.
    const cookieHeader=req.headers.get('cookie');
    if(!cookieHeader)
        return NextResponse.json({success:false, message:'No jwt found.'});
    // Cookie yok ise, hata döndür.

    // Cookieden token= kısmını atıp saf jwtyi almak için split işlemi yapıyorum.
    const jwt = cookieHeader.split("=")[1];

    // Tokeni geçerli ise decode edip dönüyorum değil ise hata veriyorum.
    try{
       const token = await jwtVerify(jwt, getSecretKey());
       if(!token)
        throw new Error();

       return NextResponse.json({success:true, ...token})
    }catch(error)
    {
        console.log(error);
        return NextResponse.json({success:false, message:'Invalid or expired jwt'}, {status:401});
    }
}