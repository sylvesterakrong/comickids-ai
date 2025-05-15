
import { NextApiRequest, NextApiResponse } from '../../types/next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Mock response for development
    const mockResponse = {
      id: Math.floor(Math.random() * 1000),
      topic: req.body.topic,
      subject: req.body.subject,
      generated_at: new Date().toISOString(),
      comic_data: {
        panels: [
          {
            type: 'introduction',
            caption: `Introduction to ${req.body.topic}`
          },
          {
            type: 'example',
            caption: `Example of ${req.body.topic} in action`
          },
          {
            type: 'practice',
            caption: `Practice exercise for ${req.body.topic}`
          }
        ]
      }
    };
    
    // In production, this would proxy to your Django backend
    res.status(200).json(mockResponse);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
