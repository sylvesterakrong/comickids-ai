
import React, { useState, useRef, useEffect } from 'react';
import SampleComicStrip from './SampleComicStrip';
import ComicGenerator from './ComicGenerator';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const HomeTab: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Math');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([
    { 
      role: 'bot', 
      content: 'Hello! I can help you create an educational comic. Tell me what topic you want to teach and which subject it belongs to (Math, Science, or Citizenship).' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);
  
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

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    
    // Process the message to extract topic and subject
    processUserInput(userInput);
    
    // Clear input field
    setUserInput('');
  };
  
  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Check if message contains subject indicators
    let detectedSubject = 'Math'; // Default
    if (lowerInput.includes('science') || lowerInput.includes('biology') || 
        lowerInput.includes('chemistry') || lowerInput.includes('physics') ||
        lowerInput.includes('plant') || lowerInput.includes('animal')) {
      detectedSubject = 'Science';
    } else if (lowerInput.includes('citizenship') || lowerInput.includes('community') || 
              lowerInput.includes('society') || lowerInput.includes('culture') ||
              lowerInput.includes('helper') || lowerInput.includes('profession')) {
      detectedSubject = 'Citizenship';
    }
    
    // Extract potential topic (simply take the whole input as the topic for now)
    const potentialTopic = input;
    
    // Set the detected subject
    setSubject(detectedSubject);
    
    // Set the topic
    setTopic(potentialTopic);
    
    // Generate bot response
    setTimeout(() => {
      const botResponse = `I'll create a comic about "${potentialTopic}" for ${detectedSubject} class. Is that correct? If yes, click "Generate Comic" below, or you can provide more details.`;
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      
      // Show the generator
      setShowGenerator(true);
    }, 500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGenerateClick = () => {
    if (!topic) {
      toast.error("Please describe your comic topic first");
      return;
    }
    
    // Add a message indicating generation is starting
    setMessages(prev => [...prev, { 
      role: 'bot', 
      content: `Starting to generate your comic about "${topic}" for ${subject} class...` 
    }]);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ghana-brown">Educational Comics Generator</h1>
        <p className="text-ghana-brown">Create engaging visual lessons for your classroom</p>
      </div>

      <div className="mb-8 rounded-xl border border-ghana-lightBrown bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-ghana-green">Chat with Comic Creator</h2>
        
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
            placeholder="Describe the comic you want to create..."
            className="min-h-[60px] flex-grow resize-none border border-ghana-lightBrown text-ghana-brown placeholder:text-ghana-brown/50 focus:border-ghana-green"
          />
          <Button
            onClick={handleSendMessage}
            className="h-auto bg-ghana-green text-white hover:bg-ghana-lightGreen"
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
