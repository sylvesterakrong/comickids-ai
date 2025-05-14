
import React, { useState, useEffect } from 'react';
import { DownloadIcon, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

interface ComicGeneratorProps {
  subject: string;
  topic: string;
}

const ComicGenerator: React.FC<ComicGeneratorProps> = ({ subject, topic }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  
  // Auto-generate when component mounts with valid props
  useEffect(() => {
    if (topic) {
      handleGenerateComic();
    }
  }, [topic]);
  
  const handleGenerateComic = () => {
    if (!topic) {
      toast.error("Please enter a lesson topic");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsGenerated(true);
      toast.success("Comic generated successfully!");
    }, 3000);
  };
  
  const handleDownload = () => {
    toast.success("Comic downloaded successfully!");
  };
  
  return (
    <div className="rounded-xl border border-ghana-lightBrown bg-white p-6 shadow-md">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-ghana-green">Your Comic</h2>
        <p className="text-ghana-brown">Visual learning materials for your classroom</p>
      </div>
      
      {!isGenerated ? (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            {/* Loading state */}
            <div className="inline-flex items-center justify-center rounded-lg bg-ghana-green px-6 py-3 font-semibold text-white">
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin-slow" />
              <span className="loading-dots">Generating your comic</span>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="mb-2 h-4 w-full animate-pulse rounded-full bg-ghana-lightBrown/30"></div>
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-ghana-lightBrown/30"></div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-ghana-lightBrown/30"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-ghana-brown">
            {topic} <span className="text-sm text-ghana-orange">({subject})</span>
          </h3>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="comic-panel">
                <div className="flex h-full flex-col">
                  <div className="h-3/4 bg-ghana-lightOrange/10 p-2">
                    <div className="flex h-full flex-col items-center justify-center rounded-md border-2 border-dashed border-ghana-lightBrown/40">
                      {i === 0 && (
                        <div className="text-center">
                          <div className="mx-auto mb-2 rounded-full bg-ghana-green/20 p-3">
                            <svg className="h-10 w-10 text-ghana-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M12 8v8m-4-4h8"/>
                            </svg>
                          </div>
                          <p className="text-xs font-medium text-ghana-brown">Introduction Panel</p>
                        </div>
                      )}
                      {i === 1 && (
                        <div className="text-center">
                          <div className="mx-auto mb-2 flex justify-center gap-1">
                            {[...Array(3)].map((_, idx) => (
                              <div 
                                key={idx}
                                className="h-10 w-6 rounded-md bg-ghana-orange/30"
                              />
                            ))}
                          </div>
                          <p className="text-xs font-medium text-ghana-brown">Example Panel</p>
                        </div>
                      )}
                      {i === 2 && (
                        <div className="text-center">
                          <div className="mx-auto mb-2 rounded-lg bg-ghana-green/20 p-3">
                            <svg className="h-10 w-10 text-ghana-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 3v4M19 3v4M5 21v-2m14 0v2M3 7h18M9 11h6m-6 4h6"/>
                            </svg>
                          </div>
                          <p className="text-xs font-medium text-ghana-brown">Practice Panel</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex h-1/4 items-center justify-center bg-white p-2">
                    <p className="text-center text-xs">
                      {i === 0 && `Understanding ${topic.split(' ').slice(0, 2).join(' ')}: First we learn what it means`}
                      {i === 1 && `Using this concept in daily activities at the market`}
                      {i === 2 && `Practice: Students try it themselves`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setIsGenerated(false)}
              className="inline-flex items-center rounded-lg border border-ghana-green bg-white px-4 py-2 text-sm font-medium text-ghana-green transition-colors hover:bg-ghana-green/10 focus:outline-none focus:ring-2 focus:ring-ghana-green focus:ring-offset-2"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Generate New Comic
            </button>
            
            <button
              onClick={handleDownload}
              className="inline-flex items-center rounded-lg bg-ghana-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ghana-lightOrange focus:outline-none focus:ring-2 focus:ring-ghana-orange focus:ring-offset-2"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download Comic
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicGenerator;
