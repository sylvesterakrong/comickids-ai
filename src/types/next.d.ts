
// Mock Next.js type definitions for compatibility
export interface NextApiRequest {
  body: any;
  query: any;
  cookies: any;
  headers: any;
  method: string;
}

export interface NextApiResponse {
  status: (code: number) => NextApiResponse;
  json: (data: any) => void;
  send: (data: any) => void;
  end: () => void;
}
