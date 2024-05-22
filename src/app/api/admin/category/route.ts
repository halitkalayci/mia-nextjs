import prisma from "@/libs/prisma";
import {
  addCategoryValidationSchema,
  updateCategoryValidationSchema,
} from "@/libs/validation/validationSchemas";
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
  const categories = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });

  return NextResponse.json({ success: true, categories: categories });
}

export async function PUT(request: Request) {
  const body = await request.json();

  try {
    const categoryToUpdate = await updateCategoryValidationSchema.validate(
      body
    );

    const category = await prisma.category.update({
      where: { id: categoryToUpdate.id },
      data: { ...categoryToUpdate },
    });
    return NextResponse.json(
      { success: true, category: { ...category } },
      { status: 200 }
    );
  } catch (error) {
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

// /api/categories PUT
// api/categories/updateName PUT

// api/categories GET => Tüm kategoriler
// api/categories/{id} => idsi {id} olan Kategori
