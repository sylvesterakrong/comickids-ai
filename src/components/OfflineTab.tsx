
import React from 'react';
import { Download } from 'lucide-react';

const OfflineTab: React.FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ghana-brown">Offline Mode</h1>
        <p className="text-ghana-brown">Access comics when you don't have an internet connection</p>
      </div>

      <div className="rounded-xl border border-ghana-lightBrown bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-ghana-green/20 p-2">
            <svg className="h-8 w-8 text-ghana-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 13.381h20M8.66 19.05V22m6.84-2.95V22m-8.955-9.5-1.414 1.414M20.01 16 l-2-2m-1.414-7.96 2.475-2.475M5.636 5.05 8.107 7.525m4.243 5.99 2.12-2.122m-9.193-.747 7.071-7.071"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-ghana-green">How Offline Mode Works</h2>
        </div>
        
        <div className="mb-8 rounded-lg border border-ghana-lightBrown/50 bg-ghana-cream/50 p-4">
          <ol className="ml-5 list-decimal space-y-3 text-ghana-brown">
            <li>Download comics while connected to the internet</li>
            <li>Access them later without needing connectivity</li>
            <li>Perfect for classrooms with limited internet access</li>
            <li>Up to 20 comics can be saved for offline use</li>
          </ol>
        </div>
        
        <div className="text-center">
          <button className="inline-flex items-center rounded-lg bg-ghana-orange px-5 py-3 font-semibold text-white transition-colors hover:bg-ghana-lightOrange focus:outline-none focus:ring-2 focus:ring-ghana-orange focus:ring-offset-2">
            <Download className="mr-2 h-5 w-5" />
            Download Comics for Offline Use
          </button>
        </div>
      </div>
      
      <div className="mt-8 rounded-xl border border-ghana-lightBrown bg-white p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-ghana-brown">Offline Resources</h3>
        
        <div className="divide-y divide-ghana-lightBrown/30">
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-ghana-brown">Teaching Guides</h4>
              <p className="text-sm text-ghana-brown/70">PDF worksheets to accompany comics</p>
            </div>
            <button className="rounded-md bg-ghana-green/10 px-3 py-1.5 text-sm font-medium text-ghana-green hover:bg-ghana-green/20">
              Download
            </button>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-ghana-brown">Comic Templates</h4>
              <p className="text-sm text-ghana-brown/70">Blank templates for student activities</p>
            </div>
            <button className="rounded-md bg-ghana-green/10 px-3 py-1.5 text-sm font-medium text-ghana-green hover:bg-ghana-green/20">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineTab;
