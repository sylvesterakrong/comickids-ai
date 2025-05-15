
import { NextApiRequest, NextApiResponse } from '../../types/next';

// Emulated Next.js API handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Mock response for development
    const mockResponse = {
      topic: req.body.message.includes('fraction') ? 'Understanding Fractions' : 'Basic Topic',
      subject: req.body.message.includes('math') ? 'Math' : 
               req.body.message.includes('science') ? 'Science' : 'Citizenship',
      response: `I'll help you create a comic about ${req.body.message}. This will be a great educational resource!`
    };
    
    // In production, this would proxy to your Django backend
    res.status(200).json(mockResponse);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
