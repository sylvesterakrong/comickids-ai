
export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    // Mock successful save response
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
