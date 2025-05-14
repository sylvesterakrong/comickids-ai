
import React from 'react';
import { DownloadIcon } from 'lucide-react';

const SavedTab: React.FC = () => {
  // In a real app, this would be loaded from local storage or a database
  const savedComics = [];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ghana-brown">Saved Comics</h1>
        <p className="text-ghana-brown">Access your previously generated comics</p>
      </div>

      {savedComics.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {savedComics.map((comic, index) => (
            <div key={index} className="rounded-lg border border-ghana-lightBrown bg-white p-4 shadow-md">
              {/* Comic content would go here */}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-ghana-lightBrown bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ghana-orange/10">
            <svg className="h-8 w-8 text-ghana-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 4v16" />
            </svg>
          </div>
          <h3 className="mb-1 text-lg font-semibold text-ghana-brown">No saved comics yet</h3>
          <p className="mb-4 text-sm text-ghana-brown/80">Generate and save comics to see them here</p>
          <button className="inline-flex items-center rounded-lg bg-ghana-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ghana-lightGreen focus:outline-none focus:ring-2 focus:ring-ghana-green focus:ring-offset-2">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Create Your First Comic
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedTab;
