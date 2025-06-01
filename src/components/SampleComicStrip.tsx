
import React from 'react';

interface SampleComicStripProps {
  title: string;
  subject: string;
  imageUrl: string;
}

const SampleComicStrip: React.FC<SampleComicStripProps> = ({ title, subject, imageUrl }) => {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="mb-2 font-semibold text-foreground">
        {title} <span className="text-xs text-muted-foreground ml-1">({subject})</span>
      </h3>
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={`${title} comic strip`}
          className="w-full h-[500px] object-contain rounded-lg" // Fixed height
        />
      </div>
    </div>
  );
};

export default SampleComicStrip;
