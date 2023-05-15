import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  return NextResponse.json(null)
}
