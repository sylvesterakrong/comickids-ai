import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import _App from './pages/_app';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"
import LandingPage from './pages/LandingPage';
import HomeTab from './components/HomeTab';
import FeedbackTab from './components/FeedbackTab';
import NotFound from './pages/NotFound';
import React, { useState } from 'react';

// Create a wrapper component to conditionally render Navigation
const AppContent = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>('home');

    // Only show Navigation if we're not on the landing page
    const showNavigation = location.pathname !== '/';

    return (
        <>
            {showNavigation && <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomeTab />} />
                <Route path="/feedback" element={<FeedbackTab />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
};

const App = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Analytics />
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </div>
    );
};

export default App;
