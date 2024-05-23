import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: { deletedDate: new Date() },
    });

    return NextResponse.json(
      { success: true, message: "product deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "error in product delete operation.",
      },
      { status: 400 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) return NextResponse.json({ success: false }, { status: 404 });

  return NextResponse.json(
    { success: true, product: { ...product } },
    { status: 200 }
  );
}
