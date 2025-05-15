
import { toast } from 'sonner';

// Interface definitions
export interface ChatResponse {
  topic: string;
  subject: string;
  response: string;
}

export interface ComicData {
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

// Base API URL - configurable for different environments
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Error handling helper
const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  toast.error(message);
  return { success: false, error: message };
};

// API methods
export const api = {
  // Process chat message
  processChatMessage: async (message: string): Promise<{ success: boolean; data?: ChatResponse; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/process-chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
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

  // Generate comic
  generateComic: async (topic: string, subject: string): Promise<{ success: boolean; data?: ComicData; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/generate-comic/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  // Save comic (for the saved tab functionality)
  saveComic: async (comicData: ComicData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/save-comic/`, {
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
      const response = await fetch(`${API_URL}/saved-comics/`);

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
