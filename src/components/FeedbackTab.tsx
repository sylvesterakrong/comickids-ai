
import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

const FeedbackTab: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }
    
    toast.success("Feedback submitted successfully!");
    setFeedback('');
  };
  
  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ghana-brown">Feedback</h1>
        <p className="text-ghana-brown">Help us improve the comic generator for your classroom</p>
      </div>

      <div className="rounded-xl border border-ghana-lightBrown bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-ghana-orange/20 p-2">
            <MessageSquare className="h-8 w-8 text-ghana-orange" />
          </div>
          <h2 className="text-xl font-bold text-ghana-orange">Share Your Thoughts</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block font-medium text-ghana-brown">
                Your Name (Optional)
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-ghana-lightBrown bg-white px-4 py-2 text-ghana-brown focus:border-ghana-orange focus:outline-none focus:ring-2 focus:ring-ghana-orange/20"
                placeholder="John Mensah"
              />
            </div>
            
            <div>
              <label htmlFor="school" className="mb-1 block font-medium text-ghana-brown">
                School (Optional)
              </label>
              <input
                id="school"
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full rounded-lg border border-ghana-lightBrown bg-white px-4 py-2 text-ghana-brown focus:border-ghana-orange focus:outline-none focus:ring-2 focus:ring-ghana-orange/20"
                placeholder="Accra Primary School"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="feedback" className="mb-1 block font-medium text-ghana-brown">
              Your Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="h-32 w-full rounded-lg border border-ghana-lightBrown bg-white px-4 py-2 text-ghana-brown focus:border-ghana-orange focus:outline-none focus:ring-2 focus:ring-ghana-orange/20"
              placeholder="Please share how we can improve this tool for your classroom..."
              required
            />
          </div>
          
          <div className="flex justify-between pt-2">
            <div className="text-sm text-ghana-brown/70">
              <span className="text-red-500">*</span> Required fields
            </div>
            
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-ghana-orange px-5 py-2 font-medium text-white transition-colors hover:bg-ghana-lightOrange focus:outline-none focus:ring-2 focus:ring-ghana-orange focus:ring-offset-2"
            >
              Submit Feedback
              <Send className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 rounded-xl border border-ghana-lightBrown bg-white p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-ghana-brown">Contact Information</h3>
        
        <div className="rounded-lg bg-ghana-cream/50 p-4">
          <p className="mb-2 text-ghana-brown">
            If you need immediate assistance or have questions about using the comic generator:
          </p>
          
          <ul className="space-y-2 text-ghana-brown">
            <li>Email: support@ghanacomics.edu.gh</li>
            <li>WhatsApp: +233 20 123 4567</li>
            <li>Visit: Teacher Resource Centers in Accra, Kumasi, or Tamale</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTab;
