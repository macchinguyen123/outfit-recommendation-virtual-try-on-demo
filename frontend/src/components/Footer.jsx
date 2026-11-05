import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-fashion-border/60 bg-fashion-card/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif text-lg font-bold luxury-text-gradient">AuraFit</span>
          <span className="text-xs text-slate-500">| Công nghệ Thử Đồ Ảo AI & Phối Đồ Thông Minh</span>
        </div>
        <p className="text-xs text-slate-400 flex items-center gap-1.5">
          Xây dựng với ReactJS + Spring Boot RESTful API + AI Diffusion Pipeline
          <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500 inline" />
        </p>
      </div>
    </footer>
  );
}

