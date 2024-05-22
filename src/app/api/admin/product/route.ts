import cloudinary from "@/libs/cloudinary";
import formidable from "formidable";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file: File = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const fileUrl = await uploadImage(buffer);

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

const uploadImage = async (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "mia", eager: { width: 500, height: 500, crop: "crop" } },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};
