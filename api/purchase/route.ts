import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest) {
    if (req.method === 'POST') { 
    const { courseId, userId } = req.body;
    console.log("user",userId)
    console.log("course", courseId);
    try {
      await db.purchase.create({
        data: {
          courseId,
          userId,
        }
      });
      return new NextResponse(null, { status: 200 });
    } catch (error: any) {
      console.error('Error creating purchase:', error);
      return new NextResponse(` ${error.message}`, { status: 400 });
    }
} else {
    return new NextResponse(``, { status: 200 })
  }
}
