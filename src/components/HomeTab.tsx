import React, { useState, useRef, useEffect } from 'react';
import SampleComicStrip from './SampleComicStrip';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';

const HomeTab: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'bot'; content: string; comic?: { image_url: string; title: string } | null; loading?: boolean }>
  >([
    {
      role: 'bot',
      content: 'Hello! Please tell me which topic you want to understand and which subject it belongs to (Math, Science, or Citizenship).'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [
      ...prev,
      { role: 'user', content: userInput }
    ]);
    setIsLoading(true);

    // Add loading bot message
    setMessages(prev => [
      ...prev,
      { role: 'bot', content: 'Generating your comic...', loading: true }
    ]);
    try {
      const { success, data, error } = await api.generateComic(userInput, 'General');

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
            content: 'Sorry, there was an error generating your comic. Please try again.'
          }
        ];
      });
    } finally {
      setIsLoading(false);
      setUserInput('');
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
        <h1 className="mb-2 text-3xl font-bold text-foreground">Educational Comics Generator</h1>
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
                <div>
                  <p className="text-sm">
                    {msg.loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-4 w-4" /> {msg.content}
                      </span>
                    ) : (
                      msg.content
                    )}
                  </p>
                  {msg.comic && (
                    <div className="mt-2">
                      <h3 className="font-semibold mb-1">{msg.comic.title}</h3>
                      <img
                        src={msg.comic.image_url}
                        alt={msg.comic.title}
                        className="w-full max-w-xs rounded-lg border"
                      />
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