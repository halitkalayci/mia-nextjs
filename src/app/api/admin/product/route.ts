import cloudinary from "@/libs/cloudinary";
import prisma from "@/libs/prisma";
import { addProductValidationSchema } from "@/libs/validation/validationSchemas";
import formidable from "formidable";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file: File = formData.get("file") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl: string = await uploadImage(buffer);
    const obj = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
      categoryId: formData.get("categoryId"),
    };

    const product = await addProductValidationSchema.validate(obj);

    const category = await prisma.category.findUnique({
      where: { id: product.categoryId },
    });

    if (!category)
      return NextResponse.json(
        { success: false, message: "No category with given id found." },
        { status: 400 }
      );

    const addedProduct = await prisma.product.create({
      data: { ...product, imageUrl: fileUrl },
    });

    return NextResponse.json({ success: true, product: { ...addedProduct } });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

const uploadImage = async (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "mia", eager: { width: 500, height: 500, crop: "crop" } },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url ?? "");
      }
    );
    uploadStream.end(buffer);
  });
};

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();

  return NextResponse.json({ success: true, products: products });
}
