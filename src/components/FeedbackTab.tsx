
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
        <p className="text-ghana-brown">Help us improve the comic generator</p>
      </div>

      
      
      <div className="mt-8 rounded-xl border border-ghana-lightBrown bg-white p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-ghana-brown">Contact Information</h3>
        
        <div className="rounded-lg bg-ghana-cream/50 p-4">
          <p className="mb-2 text-ghana-brown">
            To give us a feedback on this comic generator kindly Contact;
          </p>
          
          <ul className="space-y-2 text-ghana-brown">
            <li>Email: tortoremmanuel60@gmail.com / akrongsylvester@gmail.com </li>
            <li>WhatsApp: 0505910623</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTab;
