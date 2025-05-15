
import { NextApiRequest, NextApiResponse } from '../../types/next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Mock empty response for now
    res.status(200).json([]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
