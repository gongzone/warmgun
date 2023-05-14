import { NextResponse } from "next/server"

import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  return NextResponse.json({})
}
