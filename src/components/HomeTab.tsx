import React, { useState, useRef, useEffect } from 'react';
import SampleComicStrip from './SampleComicStrip';
import { Send, Bot, User, Loader2, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';
import AutoRetryImage from '@/hooks/AutoRetryImageProps';

interface Message {
  role: 'user' | 'bot';
  content: string;
  comic?: { image_url: string; title: string } | null;
  loading?: boolean;
  error?: boolean;
  originalPrompt?: string;
}

const HomeTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(
    [
      {
        role: 'bot',
        content: 'Hello! Please tell me which topic you want to understand and subject.🙂'
      }
    ]
  );
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const loadingMessages = [
    "Generating your comic...😉",
    "Hold on tight, creating something special...🥹",
    "Almost there, adding final touches...🙂‍↔️",
    "Just a bit longer, making it perfect...🥶",
    "Your comic is coming to life...🫡❤️"
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Rotate loading messages every 10 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 10000);
    }
    return () => {
      if (interval) clearInterval(interval);
      setLoadingMessageIndex(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const sampleTopics = [
    {
      title: 'Social Studies',
      subject: 'History of Cocoa',
      imageUrl: '/assets/comic-samples/comic5.png'
    },
    {
      title: 'Integrated Science',
      subject: 'Colours of the Rainbow',
      imageUrl: '/assets/comic-samples/comic1.png'
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const isGreeting = (text: string) => {
    // We will now check for whole words to avoid partial matches like "hi" in "history".
    const greetings = ['hello', 'hi', 'good morning', 'good afternoon', 'good evening', 'hey', 'wossop', 'waguan', 'sup', 'yo', 'howdy', 'greetings'];

    // Create a regular expression from the greetings array.
    // The `\b` is a "word boundary". It ensures we match whole words only.
    // The 'i' flag makes the search case-insensitive.
    const greetingRegex = new RegExp(`\\b(${greetings.join('|')})\\b`, 'i');

    return greetingRegex.test(text);
  };

  const isThanking = (text: string) => {
    const thankYouPhrases = ['thank you', 'thanks', 'thank', 'appreciate', 'grateful', 'preciate', 'much obliged', 'many thanks', 'ta', 'cheers'];
    return thankYouPhrases.some(phrase => text.toLowerCase().includes(phrase));
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [
      ...prev,
      { role: 'user', content: userInput }
    ]);

    // Check for greetings or thank you
    if (isGreeting(userInput)) {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: 'Charley, how are you doing? 🙂 Please tell me what topic you want me to help you understand.'
        }
      ]);
      setUserInput('');
      return;
    }

    if (isThanking(userInput)) {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: 'You\'re welcome! 😊 Is there anything else you\'d like to learn about?'
        }
      ]);
      setUserInput('');
      return;
    }

    setIsLoading(true);

    // Add loading bot message
    setMessages(prev => [
      ...prev,
      { role: 'bot', content: 'Generating your comic...', loading: true }
    ]);
    try {
      const { success, data, error } = await api.generateComic(userInput);

      setMessages(prev => {
        const updated = prev.slice(0, -1); // Remove loading message
        return [
          ...updated,
          {
            role: 'bot',
            content: success ? (data?.title || 'Here is your comic!') : (error || 'Failed to generate comic'),
            comic: success && data ? {
              image_url: data.image_url,
              title: data.title
            } : null
          }
        ];
      });
    } catch (err) {
      setMessages(prev => {
        const updated = prev.slice(0, -1);
        return [
          ...updated,
          {
            role: 'bot',
            content: 'Sorry, there was an error generating your comic. Click the retry button below to try again.',
            error: true,
            originalPrompt: userInput
          }
        ];
      });
    } finally {
      setIsLoading(false);
      setUserInput('');
    }
  };

  const handleRetry = async (originalPrompt: string) => {
    if (isLoading) return;

    setIsLoading(true);
    // Update the error message to show loading state
    setMessages(prev => prev.map(msg =>
      msg.originalPrompt === originalPrompt ?
        { ...msg, content: 'Retrying...', loading: true, error: false } :
        msg
    ));

    try {
      const { success, data, error } = await api.generateComic(originalPrompt);

      setMessages(prev => prev.map(msg =>
        msg.originalPrompt === originalPrompt ?
          {
            role: 'bot',
            content: success ? (data?.title || 'Here is your comic!') : (error || 'Failed to generate comic'),
            comic: success && data ? {
              image_url: data.image_url,
              title: data.title
            } : null,
            loading: false,
            error: !success
          } :
          msg
      ));
    } catch (err) {
      setMessages(prev => prev.map(msg =>
        msg.originalPrompt === originalPrompt ?
          {
            role: 'bot',
            content: 'Sorry, there was an error generating your comic. Click the retry button to try again.',
            loading: false,
            error: true,
            originalPrompt
          } :
          msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Educational Comics Generator🐣</h1>
        <p className="text-muted-foreground">Create engaging visual lessons for your classroom</p>
      </div>

      <div className="mb-8 rounded-xl border bg-card p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-primary">Chat with Teacher Amma</h2>
        {/* Chat messages area */}
        <div className="mb-4 h-80 overflow-y-auto rounded-lg border bg-muted/30 p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={cn(
                  "flex max-w-[80%] items-start gap-2 rounded-lg px-3 py-2",
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-card-foreground shadow-sm'
                )}
              >
                {msg.role === 'bot' && <Bot className="mt-1 h-4 w-4 flex-shrink-0" />}
                <div>                  <p className="text-sm flex items-center gap-2">
                  {msg.loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-4 w-4" />
                      <span className="transition-opacity duration-500">
                        {loadingMessages[loadingMessageIndex]}
                      </span>
                    </span>
                  ) : (
                    <>
                      {msg.content}
                      {msg.error && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-100/50"
                          onClick={() => msg.originalPrompt && handleRetry(msg.originalPrompt)}
                          title="Retry"
                        >
                          <RotateCw className="h-4 w-4" />
                        </Button>
                      )}
                    </>
                  )}
                </p>
                  {msg.loading ? (
                    <div className="mt-4 flex flex-col items-center w-full">
                      <div className="animate-pulse bg-muted aspect-[4/3] w-full max-w-lg rounded-xl h-48" />
                      {/* <p className="mt-2 text-sm text-muted-foreground">Creating your educational comic...</p> */}
                    </div>
                  ) : msg.comic && (
                    <div className="mt-4">
                      <div className="rounded-xl overflow-hidden shadow-lg">
                        <AutoRetryImage
                          src={msg.comic.image_url}
                          alt={msg.comic.title}
                          className="w-full max-w-md rounded-lg"
                          maxRetries={3}
                          initialDelay={1000}
                          onError={(error) => {
                            console.error('Comic image failed to load:', error);
                            // Optional: Add toast notification
                            // toast.error('Failed to load comic image');
                          }}
                          onSuccess={() => {
                            console.log('Comic image loaded successfully');
                          }}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-primary"
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = msg.comic!.image_url;
                              link.download = `${msg.comic!.title || "comic-kids-panel"}.jpg`;
                              link.click();
                            }}
                            title="Download Comic"
                          >
                            {/* Download icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-primary"
                            onClick={async () => {
                              if (navigator.share) {
                                try {
                                  await navigator.share({
                                    title: msg.comic!.title,
                                    text: "Check out this comic I made with ComicKids AI!",
                                    url: msg.comic!.image_url,
                                  });
                                } catch (err) {
                                  console.error("Sharing failed:", err);
                                }
                              }
                            }}
                            title="Share Comic"
                          >
                            {/* Share icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && <User className="mt-1 h-4 w-4 flex-shrink-0" />}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input area */}
        <div className="flex gap-2">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the topic you do not understand..."
            className="min-h-[60px] flex-grow resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!userInput.trim() || isLoading}
            className="h-auto"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <h4 className="mt-2 text-xs font-light text-primary text-center">**ComicKids-AI can make mistakes. Always check important info.</h4>
      </div>

      {/* Sample Comics */}
      <div className="mt-10">
        <h2 className="mb-6 text-xl font-bold text-primary">Sample Comics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Grid layout */}
          {sampleTopics.map((sample) => (
            <SampleComicStrip
              key={sample.title}
              title={sample.title}
              subject={sample.subject}
              imageUrl={sample.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;