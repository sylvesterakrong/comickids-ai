
/**
 * Type definitions to emulate Next.js API handlers in Vite
 */

// Request type for API handlers
export interface NextApiRequest {
  query: {
    [key: string]: string | string[];
  };
  cookies: {
    [key: string]: string;
  };
  body: any;
  method: string;
  headers: {
    [key: string]: string | string[];
  };
}

// Response type for API handlers
export interface NextApiResponse {
  status: (code: number) => NextApiResponse;
  json: (data: any) => void;
  send: (data: any) => void;
  end: () => void;
  setHeader: (name: string, value: string) => void;
}
