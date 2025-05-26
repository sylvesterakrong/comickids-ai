import React, { useState, useRef, useEffect } from 'react';
import SampleComicStrip from './SampleComicStrip';
import ComicGenerator from './ComicGenerator';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { api } from '@/services/api';
import { cn } from '@/lib/utils';

const HomeTab: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Math');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([
    { 
      role: 'bot', 
      content: 'Hello! Please tell me which topic you want to understand and which subject it belongs to (Math, Science, or Citizenship).' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleTopics = [
    { title: 'Understanding Fractions', subject: 'Math' },
    { title: 'Plant Life Cycle', subject: 'Science' },
    { title: 'Community Helper Roles', subject: 'Citizenship' }
  ];



  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isProcessing) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: userInput }];
    setMessages(newMessages);
    
    // Process the message to extract topic and subject
    await processUserInput(userInput);
    
    // Clear input field
    setUserInput('');
  };
  
  const processUserInput = async (input: string) => {
    setIsProcessing(true);
    
    try {
      // Call Django API to process the chat message
      const result = await api.processChatMessage(input);
      
      if (result.success && result.data) {
        // Set the detected subject and topic from API response
        setSubject(result.data.subject);
        setTopic(result.data.topic);
        
        // Add bot response
        setMessages(prev => [...prev, { 
          role: 'bot' as const, 
          content: result.data.response 
        }]);
        
        // Show the generator
        setShowGenerator(true);
      } else {
        throw new Error(result.error || 'Failed to process message');
      }
    } catch (error) {
      console.error('Error processing message:', error);
      // Add error message
      setMessages(prev => [...prev, { 
        role: 'bot' as const, 
        content: "Sorry, I'm having trouble processing your request. Please try again." 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGenerateClick = () => {
    if (!topic) {
      toast.error("Please describe your topic first");
      return;
    }
    
    // Add a message indicating generation is starting
    setMessages(prev => [...prev, { 
      role: 'bot' as const, 
      content: `Starting to generate your comic about "${topic}" for ${subject} class...` 
    }]);
  };

  return (
    <div  className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ghana-brown">Do you need help? 🐼</h1>
        <p className="text-ghana-brown">Making learning fun through comics</p>
      </div>

      {/* chat box */}

      <div className="mb-8 rounded-xl border border-ghana-lightBrown bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-ghana-green">Chat with Teacher Amma</h2>
        
        {/* Chat messages area */}
        <div className="mb-4 h-80 overflow-y-auto rounded-lg border border-ghana-lightBrown bg-ghana-cream/30 p-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex max-w-[80%] items-start gap-2 rounded-lg px-3 py-2 ${
                  msg.role === 'user' 
                    ? 'bg-ghana-green text-white' 
                    : 'bg-white text-ghana-brown shadow-sm'
                }`}
              >
                {msg.role === 'bot' && (
                  <Bot className="mt-1 h-4 w-4 flex-shrink-0" />
                )}
                <p className="text-sm">{msg.content}</p>
                {msg.role === 'user' && (
                  <User className="mt-1 h-4 w-4 flex-shrink-0" />
                )}
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
            className="min-h-[60px] flex-grow resize-none border border-ghana-lightBrown text-ghana-brown placeholder:text-ghana-brown/50 focus:border-ghana-green"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!userInput.trim() || isProcessing}
            className={cn(
              "h-auto bg-ghana-green text-white hover:bg-ghana-lightGreen",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        
        {showGenerator && (
          <div className="mt-4 text-center">
            <Button
              onClick={handleGenerateClick}
              className="bg-ghana-orange text-white hover:bg-ghana-lightOrange"
            >
              Generate Comic
            </Button>
          </div>
        )}
      
      </div>
      
      {showGenerator ? (
        <ComicGenerator subject={subject} topic={topic} />
      ) : (
        <div className="mt-10">
          <h2 className="mb-6 text-xl font-bold text-ghana-green">Sample Comics</h2>
          <div className="space-y-4">
            {sampleTopics.map((sample) => (
              <SampleComicStrip 
                key={sample.title} 
                title={sample.title} 
                subject={sample.subject} 
              />
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default HomeTab;
