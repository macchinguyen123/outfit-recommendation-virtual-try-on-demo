import React from 'react';
import { Sparkles, Shirt, Wand2, History, ShoppingBag } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { totalSelectedCount } = useTryOn();

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Sparkles },
    { id: 'catalog', label: 'Bộ Sưu Tập', icon: Shirt },
    { id: 'stylist', label: 'AI Stylist Tư Vấn', icon: Wand2 },
    { id: 'tryon', label: 'Phòng Thử Đồ Ảo', icon: Sparkles, badge: totalSelectedCount },
    { id: 'history', label: 'Lịch Sử Thử Đồ', icon: History }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-fashion-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold tracking-tight luxury-text-gradient">
              AuraFit
            </span>
            <span className="block text-[10px] tracking-widest text-slate-400 font-mono uppercase">
              AI Virtual Try-On
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-fashion-card/90 p-1.5 rounded-full border border-fashion-border">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-md shadow-brand-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
                {item.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-white text-brand-700 rounded-full shadow">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Go to Try-on Room */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('tryon')}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <Shirt className="w-4 h-4 text-brand-400" />
            <span className="hidden sm:inline">Buồng Thử:</span>
            <span className="px-2 py-0.5 rounded-full bg-brand-500 text-white text-xs font-bold">
              {totalSelectedCount} món
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}

