import React from 'react';
import { Mail, MessageSquare, Phone } from 'lucide-react';

const FeedbackTab: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold text-ghana-brown">Feedback</h1>
        <p className="text-lg text-ghana-brown/80">Help us improve ComicKids AI</p>
      </div>

      <div className="rounded-xl border border-ghana-lightBrown bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-8">
          {/* Contact Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Email Card */}
            <div className="rounded-lg bg-ghana-cream/30 p-6 transition-all hover:bg-ghana-cream/40">
              <div className="mb-4 flex items-center gap-3">
                <Mail className="h-6 w-6 text-ghana-brown" />
                <h3 className="text-xl font-semibold text-ghana-brown">Email Us</h3>
              </div>
              <div className="space-y-2 text-ghana-brown/80">
                <p>akrongsylvester@gmail.com</p>
                <p>tortoremmanuel60@gmail.com</p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="rounded-lg bg-ghana-cream/30 p-6 transition-all hover:bg-ghana-cream/40">
              <div className="mb-4 flex items-center gap-3">
                <Phone className="h-6 w-6 text-ghana-brown" />
                <h3 className="text-xl font-semibold text-ghana-brown">WhatsApp</h3>
              </div>
              <p className="text-ghana-brown/80">0240207132</p>
            </div>
          </div>

          {/* Business Inquiry */}
          <div className="mt-4 rounded-lg bg-ghana-cream/20 p-6">
            <div className="mb-3 flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-ghana-brown" />
              <h3 className="text-xl font-semibold text-ghana-brown">Business Inquiries</h3>
            </div>
            <p className="text-ghana-brown/80">
              Interested in ComicKids AI? Send us an email to schedule a call.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTab;
