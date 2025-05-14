
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomeTab from '@/components/HomeTab';
import SavedTab from '@/components/SavedTab';
import OfflineTab from '@/components/OfflineTab';
import FeedbackTab from '@/components/FeedbackTab';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'saved':
        return <SavedTab />;
      case 'offline':
        return <OfflineTab />;
      case 'feedback':
        return <FeedbackTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-ghana-cream">
      <Toaster position="top-center" />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>{renderTabContent()}</main>
    </div>
  );
};

export default Index;
