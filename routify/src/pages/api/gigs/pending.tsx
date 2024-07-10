// pages/api/gigs/pending.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
type ApiResponse = {
    success: boolean;
    message?: string;
    data?: any;
  };
export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const pendingGigs = await prisma.gig.findMany({
      where: {
        status: 'PENDING',
      },
      // Optionally include other fields or relations as needed
    });

    return res.status(200).json({ success: true, data: pendingGigs });
  } catch (error) {
    console.error('Error fetching pending gigs:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
