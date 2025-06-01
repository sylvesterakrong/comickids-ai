
import { toast } from 'sonner';

// Interface definitions
export interface ChatResponse {
  topic: string;
  subject: string;
  response: string;
}

export interface ComicData {
  title: string;
  image_url: string;
  id: number;
  topic: string;
  subject: string;
  generated_at: string;
  comic_data: {
    panels: Array<{
      type: string;
      caption: string;
    }>;
  };
}

// Utility to get CSRF token from cookies
function getCSRFToken(): string | null {
  const match = document.cookie.match(/csrftoken=([\w-]+)/);
  return match ? match[1] : null;
}
// Error handling helper
const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  toast.error(message);
  return { success: false, error: message };
};

// API methods
export const api = {

  // Generate comic
  generateComic: async (topic: string, subject: string): Promise<{ success: boolean; data?: ComicData; error?: string }> => {
    try {
      const csrftoken = getCSRFToken();

      const response = await fetch('https://comickids-backend-server.onrender.com/api/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken || '',
        },
        credentials: 'include', // Required to include cookies for CSRF
        body: JSON.stringify({ topic, subject }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return handleApiError(error);
    }
  },


  // // Process chat message
  // processChatMessage: async (message: string): Promise<{ success: boolean; data?: ChatResponse; error?: string }> => {
  //   try {
  //     const response = await fetch('/api/process-chat', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ message }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`API error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     return { success: true, data };
  //   } catch (error) {
  //     return handleApiError(error);
  //   }
  // },


  // Save comic (for the saved tab functionality)
  saveComic: async (comicData: ComicData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/save-comic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comicData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get saved comics
  getSavedComics: async (): Promise<{ success: boolean; data?: ComicData[]; error?: string }> => {
    try {
      const response = await fetch('/api/saved-comics');

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
