// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/hooks/hashPassword";

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
)  {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
    //return NextResponse.json({ success: false, message: "Method Not Allowed" }, { status: 405 });
  }

  const {   phonenumber, password } = await req.body;
  console.log( "phoneNumber",phonenumber)

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        phonenumber:  phonenumber
      },
    });
    console.log("user",user)

    // If no user is found or the password is incorrect, return an error
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
      //return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

    // Return the user object without the password
    const { password: _, ...userWithoutPassword } = user;
    console.log("user without password",userWithoutPassword)
    
    return res.status(200).json({ success: true, data: userWithoutPassword });
    //return NextResponse.json({ success: true, data: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Error signing in:", error);
    //alert(error)
    return res.status(500).json({ success: false, message: "Internal Server Error" });
    //return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}