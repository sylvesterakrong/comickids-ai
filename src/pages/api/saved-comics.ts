
export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    // Mock empty response for now
    res.status(200).json([]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
