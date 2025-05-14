
import React from 'react';

interface SampleComicStripProps {
  title: string;
  subject: string;
}

const SampleComicStrip: React.FC<SampleComicStripProps> = ({ title, subject }) => {
  const renderPanels = () => {
    const panelCount = 3;
    const panels = [];
    
    for (let i = 0; i < panelCount; i++) {
      panels.push(
        <div key={i} className="comic-panel">
          <div className="flex h-full flex-col">
            <div className="h-3/4 w-full bg-ghana-lightOrange/20">
              {/* Placeholder for comic image */}
              <div className="flex h-full flex-col items-center justify-center p-2">
                {i === 0 && (
                  <div className="rounded-full bg-ghana-lightGreen/30 p-5">
                    <svg className="h-12 w-12 text-ghana-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      {subject === 'Math' && (
                        <path d="M7 20l10-10m0 10L7 10M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                      {subject === 'Science' && (
                        <path d="M17.5 12a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z m-11 0h11 m-5.5-5.5v11" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                      {subject === 'Citizenship' && (
                        <path d="M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-9 13.5 7-11 7 11M3 17.5h18" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                    </svg>
                  </div>
                )}
                {i === 1 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {[...Array(5)].map((_, idx) => (
                      <div 
                        key={idx}
                        className="h-8 w-8 rounded-md bg-ghana-orange/40"
                      />
                    ))}
                  </div>
                )}
                {i === 2 && (
                  <div className="rounded-lg bg-ghana-green/30 p-4">
                    <svg className="h-10 w-10 text-ghana-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 3 v4 m14 0 V3 M5 21v-2 m14 0v2 M3 7h18 M9 11h6 m-6 4h6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="flex h-1/4 items-center justify-center bg-white p-1 text-center text-xs">
              {i === 0 && <p>Introducing the concept of {title}</p>}
              {i === 1 && <p>Showing examples with local items</p>}
              {i === 2 && <p>Student practicing the new skill</p>}
            </div>
          </div>
        </div>
      );
    }
    
    return panels;
  };

  return (
    <div className="mb-4 rounded-xl border border-ghana-lightBrown bg-white p-3 shadow-md">
      <h3 className="mb-2 font-semibold text-ghana-brown">{title} <span className="text-xs text-ghana-orange">({subject})</span></h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {renderPanels()}
      </div>
    </div>
  );
};

export default SampleComicStrip;
