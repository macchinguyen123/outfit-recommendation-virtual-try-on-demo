import React, { useState } from 'react';
import { TryOnProvider } from './context/TryOnContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import StylistPage from './pages/StylistPage';
import TryOnPage from './pages/TryOnPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'catalog':
        return <CatalogPage setActiveTab={setActiveTab} />;
      case 'stylist':
        return <StylistPage setActiveTab={setActiveTab} />;
      case 'tryon':
        return <TryOnPage setActiveTab={setActiveTab} />;
      case 'history':
        return <HistoryPage setActiveTab={setActiveTab} />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <TryOnProvider>
      <div className="min-h-screen flex flex-col bg-fashion-dark text-slate-100 font-sans">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </TryOnProvider>
  );
}

