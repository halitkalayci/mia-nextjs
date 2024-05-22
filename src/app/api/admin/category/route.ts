import prisma from "@/libs/prisma";
import { addCategoryValidationSchema } from "@/libs/validation/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "yup";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const category = await addCategoryValidationSchema.validate(body);

    const addedCategory = await prisma.category.create({ data: category });

    return NextResponse.json(
      { success: true, category: { ...addedCategory } },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ method: "GET" });
}
