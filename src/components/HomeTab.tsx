
import React, { useState } from 'react';
import SampleComicStrip from './SampleComicStrip';
import ComicGenerator from './ComicGenerator';

const HomeTab: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Math');

  const sampleTopics = [
    { title: 'Understanding Fractions', subject: 'Math' },
    { title: 'Plant Life Cycle', subject: 'Science' },
    { title: 'Community Helper Roles', subject: 'Citizenship' }
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-ghana-brown">Educational Comics Generator</h1>
        <p className="text-ghana-brown">Create engaging visual lessons for your classroom</p>
      </div>

      <div className="mb-8 rounded-xl border border-ghana-lightBrown bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-ghana-green">Create Your Comic</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="topic" className="mb-1 block font-medium text-ghana-brown">
              Enter Lesson Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Understanding Fractions"
              className="w-full rounded-lg border border-ghana-lightBrown bg-white px-4 py-3 text-ghana-brown placeholder:text-ghana-brown/50 focus:border-ghana-green focus:outline-none focus:ring-2 focus:ring-ghana-green/20"
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-1 block font-medium text-ghana-brown">
              Select Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-ghana-lightBrown bg-white px-4 py-3 text-ghana-brown focus:border-ghana-green focus:outline-none focus:ring-2 focus:ring-ghana-green/20"
            >
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="Citizenship">Citizenship</option>
            </select>
          </div>
        </div>
      </div>

      <ComicGenerator subject={subject} topic={topic} />

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
    </div>
  );
};

export default HomeTab;
