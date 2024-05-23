import prisma from "@/libs/prisma";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // route queryleri,pathler daima string.
) {
  const category = await prisma.category.findFirst({
    where: { id: parseInt(params.id) },
  });

  if (!category) return NextResponse.json({ success: false }, { status: 404 });

  return NextResponse.json({
    success: true,
    category: { ...category },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.update({
    where: { id: parseInt(params.id) },
    data: { deletedDate: new Date() },
  });

  return NextResponse.json(
    { success: true, message: "Category deleted." },
    { status: 200 }
  );
}
