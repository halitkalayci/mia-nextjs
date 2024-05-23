import { NextRequest, NextResponse } from "next/server";
import { memoryUsage, uptime } from "process";
export async function GET(req: NextRequest) {
  const up: any = uptime();
  return NextResponse.json({
    status: "UP",
    memoryUsage: memoryUsage(),
    uptime: `${Math.floor(up / 60)} minutes and ${Math.floor(
      up % 60
    )} seconds.`,
  });
}
