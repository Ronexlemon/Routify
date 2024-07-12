import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export type Data = {
  user_id: string;
  title: string;
  price: number;
  duration:number;
  source: {
    latitude: string | null | undefined ;
    longitude: string | null | undefined ;
  };
  destination: {
    latitude: string;
    longitude: string;
  };
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { user_id, title, price, source,duration }: Data = req.body;

  if (!source) {

    return res.status(400).json({ success: false, message: "Source and destination are required." });
  }

  if (!source.latitude || !source.longitude) {
    return res.status(400).json({ success: false, message: "Source latitude and longitude are required." });
  }

  

  try {
    const newGig = await prisma.gig.create({
      data: {
        title,
        price: parseInt(price.toString(), 10),
        duration: duration,
        user: {
          connect: {
            userid: user_id,
          },
        },
        status: 'PENDING',
        direction: {
          create: {
            source: {
              create: {
                latitude: parseFloat(source.latitude.toString()),
                longitude: parseFloat(source.longitude.toString()),
              },
            },
            // destination: {
            //   create: {
            //     latitude: destination.latitude,
            //     longitude: destination.longitude,
            //   },
            // },
          },
        },
      },
    });

    return res.status(201).json({ success: true, message: "Gig created successfully", data: newGig });
  } catch (error) {
    console.error("Error creating gig:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
