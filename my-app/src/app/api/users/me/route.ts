import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db"
import { withAuth } from "@/lib/with-auth"

export const GET = withAuth({
  mode: "no-error",
  callback: async (request, userId) => {
    console.log(userId, "why?")

    return NextResponse.json(null)
  },
})
