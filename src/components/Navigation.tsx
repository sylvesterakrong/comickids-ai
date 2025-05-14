
import React from 'react';
import { Book, Home, Save, Wifi, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'saved', label: 'Saved Comics', icon: <Save size={20} /> },
    { id: 'offline', label: 'Offline Mode', icon: <Wifi size={20} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="w-full border-b border-ghana-lightBrown bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Book size={24} className="text-ghana-green" />
            <h1 className="text-xl font-bold text-ghana-green">GhanaComics</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-ghana-green text-white"
                        : "text-gray-600 hover:bg-ghana-lightGreen/20 hover:text-ghana-green"
                    )}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="rounded-md border border-ghana-lightBrown bg-white px-3 py-2 text-sm font-medium"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
