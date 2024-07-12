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

  const { user_id } = req.query;

  if (!user_id || typeof user_id !== 'string') {
    return res.status(400).json({ success: false, message: 'User ID is required and must be a string' });
  }

  try {
    const pendingGigs = await prisma.gig.findMany({
      where: {
        status: 'PENDING',
        userId: user_id,
      },
    });

    return res.status(200).json({ success: true, data: pendingGigs });
  } catch (error) {
    console.error('Error fetching pending gigs:', error);
    return res.status(500).json({ success: false, message: 'Error fetching pending gigs' });
  }
}
