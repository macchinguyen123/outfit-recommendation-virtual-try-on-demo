import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { totalSelectedCount } = useTryOn();

  const navItems = [
    { id: 'look', label: 'Try the Look' },
    { id: 'catalog', label: 'Polyvore Collection' },
    { id: 'stylist', label: 'Outfit Advisory' },
    { id: 'tryon', label: 'CatVTON Studio', badge: totalSelectedCount },
    { id: 'history', label: 'History' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FBFBFB]/90 backdrop-blur-md border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo - High Fashion Minimalist */}
        <div 
          onClick={() => setActiveTab('look')}
          className="cursor-pointer group flex items-baseline gap-2"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-black font-sans">
            AURAFIT
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#71717A] font-mono hidden sm:inline">
            STUDIO
          </span>
        </div>

        {/* Minimalist Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1 text-xs uppercase tracking-wider font-medium transition-colors ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-[#71717A] hover:text-black'
                }`}
              >
                {item.label}
                {item.badge > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-bold bg-black text-white rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Fitting Room CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('tryon')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4D4D8] hover:border-black bg-white text-black text-xs font-medium transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline">Fitting Room</span>
            <span className="px-1.5 py-0.2 text-[10px] font-bold bg-black text-white rounded-full">
              {totalSelectedCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
