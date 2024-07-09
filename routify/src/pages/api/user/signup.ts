import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/hooks/hashPassword";
import { Role } from "@prisma/client";
import { User } from "@/types/data-type";

export type Data = {
  username: string;
  password: string;
  phonenumber: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
  user?: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password, phonenumber }: Data = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { phonenumber },
    });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        password: hashedPassword,
        phonenumber,
        name: username,
        role: Role.CLIENT,
      },
    });

    return res.status(201).json({ success: true, message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
