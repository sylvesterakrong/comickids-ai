import React, { useRef, useEffect, useState } from 'react';
import { TextQuote, Home, Save, Wifi, MessageSquare, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'saved', label: 'Saved Comics', icon: <Save size={20} /> },
    { id: 'offline', label: 'Offline Mode', icon: <Wifi size={20} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={20} /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        menuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="relative">
      <div ref={chatContainerRef} className="w-full bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-.5">
              <img
                src="/assets/favicon.jpg"
                alt="ComicKids AI Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <h1 className="text-xl font-bold text-ghana-green">ComicKids AI</h1>
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
              <button
                ref={menuButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-ghana-lightGreen/20"
              >
                {isOpen ? (
                  <X size={24} className="text-ghana-green" />
                ) : (
                  <Menu size={24} className="text-ghana-green" />
                )}
              </button>

              {/* Mobile Menu Dropdown */}
              {isOpen && (
                <div 
                  ref={mobileMenuRef}
                  className="absolute top-full right-0 w-56 mt-2 py-2 bg-white rounded-lg shadow-lg border border-ghana-lightBrown"
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-2 w-full px-4 py-2 text-left text-sm transition-colors",
                        activeTab === tab.id
                          ? "bg-ghana-lightGreen/20 text-ghana-green"
                          : "text-gray-600 hover:bg-ghana-lightGreen/10 hover:text-ghana-green"
                      )}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[15px] bg-center" style={{
        backgroundImage: 'url("/assets/africabg.jpeg")',
        backgroundSize: '100% 100%'  // This will make the image stretch fully
      }} />
    </div>
  );
};

export default Navigation;
