import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Plus, ShoppingBag, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { POLYVORE_LOOKS } from '../data/mockData';
import { useTryOn } from '../context/TryOnContext';

export default function TryTheLookPage({ setActiveTab }) {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const { setSelectedModel, selectGarment, selectedTop, selectedBottom } = useTryOn();

  const activeLook = POLYVORE_LOOKS[activeLookIndex];

  const handlePrev = () => {
    setActiveLookIndex((prev) => (prev === 0 ? POLYVORE_LOOKS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveLookIndex((prev) => (prev === POLYVORE_LOOKS.length - 1 ? 0 : prev + 1));
  };

  const handleTryEntireLookWithCatVTON = () => {
    // 1. Áp dụng người mẫu tương ứng
    setSelectedModel({
      id: `polyvore-model-${activeLookIndex}`,
      name: activeLook.model.name,
      gender: activeLook.model.gender,
      imageUrl: activeLook.model.fullBodyUrl,
      stats: `${activeLook.name} • Polyvore Runway`
    });

    // 2. Nạp toàn bộ các món đồ (Áo, Quần) vào buồng thử
    activeLook.items.forEach((item) => {
      selectGarment({
        ...item,
        description: `Polyvore Outfit: ${activeLook.name}`,
        gender: activeLook.model.gender,
        style: activeLook.style,
        size: "M"
      });
    });

    // 3. Chuyển thẳng sang Buồng Thử Đồ CatVTON
    setActiveTab('tryon');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const totalPrice = activeLook.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Studio Header (Exact match to reference photo) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAEAEA] pb-6">
        <div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#111111]">
            Try the Look<span className="text-[#71717A]">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-2 max-w-xl font-normal leading-relaxed">
            Our models. Choose a look to view the items. This is part of our Virtual Try-on experience.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#71717A]">
          <span>DATASET: POLYVORE OUTFITS</span>
          <span>•</span>
          <span className="text-black font-semibold">{POLYVORE_LOOKS.length} LOOKS</span>
        </div>
      </div>

      {/* Main Studio Showcase (Center Runway + Right "In this look" Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CENTER STAGE: Model Runway Lineup (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-2xl bg-white border border-[#EAEAEA] min-h-[660px] p-6 sm:p-10 relative studio-shadow">
          
          {/* Top Look Info */}
          <div className="flex items-center justify-between z-10">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#71717A] block">
                Look {String(activeLookIndex + 1).padStart(2, '0')} — {activeLook.style}
              </span>
              <h2 className="text-xl sm:text-2xl font-medium text-[#111111] mt-0.5">
                {activeLook.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-[#F4F4F5] text-[#111111] border border-[#E4E4E7]">
                {activeLook.harmonyScore}% Match
              </span>
            </div>
          </div>

          {/* Runway Lineup (5 Models Side-by-Side as in the Photo) */}
          <div className="my-6 flex items-end justify-center gap-3 sm:gap-6 overflow-x-auto py-4 select-none">
            {POLYVORE_LOOKS.map((look, idx) => {
              const isActive = idx === activeLookIndex;
              return (
                <div
                  key={look.id}
                  onClick={() => setActiveLookIndex(idx)}
                  className={`group relative flex-shrink-0 cursor-pointer transition-all duration-500 flex flex-col items-center ${
                    isActive
                      ? 'scale-105 z-20 opacity-100'
                      : 'scale-90 z-10 opacity-35 hover:opacity-70'
                  }`}
                  style={{ width: isActive ? '210px' : '145px' }}
                >
                  {/* Model Card Frame */}
                  <div className={`relative aspect-[9/16] w-full rounded-xl overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'ring-1 ring-black shadow-xl bg-[#F4F4F5]'
                      : 'bg-[#F9F9F9] border border-[#EAEAEA]'
                  }`}>
                    <img
                      src={look.model.fullBodyUrl}
                      alt={look.name}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Subtle bottom shadow on model */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Active Indicator dot */}
                    {isActive && (
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black" />
                    )}
                  </div>

                  {/* Floor Shadow */}
                  <div className="w-4/5 h-3 mt-1 model-ground-shadow rounded-full pointer-events-none" />

                  {/* Name label */}
                  <span className={`text-[11px] mt-1.5 font-medium tracking-tight text-center truncate w-full ${
                    isActive ? 'text-black font-semibold' : 'text-[#A1A1AA]'
                  }`}>
                    {look.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Navigation Slider Bar */}
          <div className="pt-4 border-t border-[#EAEAEA] flex items-center justify-between z-10">
            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-[#D4D4D8] hover:border-black bg-white text-black flex items-center justify-center transition-all active:scale-95"
                title="Previous look"
              >
                <ArrowLeft className="w-4 h-4 text-black" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-[#D4D4D8] hover:border-black bg-white text-black flex items-center justify-center transition-all active:scale-95"
                title="Next look"
              >
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {POLYVORE_LOOKS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveLookIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeLookIndex ? 'w-6 bg-black' : 'w-2 bg-[#D4D4D8] hover:bg-black/40'
                  }`}
                />
              ))}
            </div>

            {/* Look count */}
            <span className="text-xs font-mono text-[#71717A]">
              {activeLookIndex + 1} of {POLYVORE_LOOKS.length}
            </span>
          </div>

        </div>

        {/* RIGHT SIDEBAR: "In this look" (4 Cols - Exact copy of reference image) */}
        <div className="lg:col-span-4 rounded-2xl bg-white border border-[#EAEAEA] p-6 sm:p-7 flex flex-col justify-between space-y-6 studio-shadow">
          
          <div>
            {/* Title: "In this look" */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
              <div>
                <h3 className="text-lg font-medium text-[#111111] tracking-tight">In this look</h3>
                <span className="text-[11px] text-[#71717A] block">Selected pieces worn by model</span>
              </div>
              <span className="text-xs font-mono text-[#71717A]">
                {activeLook.items.length} items
              </span>
            </div>

            {/* Garments List in this look */}
            <div className="mt-5 space-y-3">
              {activeLook.items.map((item) => {
                const isSelectedInFittingRoom =
                  (item.category === 'TOP' && selectedTop?.id === item.id) ||
                  (item.category === 'BOTTOM' && selectedBottom?.id === item.id);

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white border border-[#EAEAEA] hover:border-[#A1A1AA] transition-all flex items-center justify-between gap-3 group"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#FBFBFB] flex-shrink-0 border border-[#EAEAEA] p-1">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block">
                        {item.brand}
                      </span>
                      <h4 className="text-xs font-medium text-[#111111] truncate">
                        {item.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#111111] mt-0.5 block">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    {/* Toggle Button */}
                    <button
                      onClick={() => selectGarment(item)}
                      title="Select for fitting room"
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                        isSelectedInFittingRoom
                          ? 'bg-black text-white'
                          : 'border border-[#D4D4D8] hover:border-black text-[#71717A] hover:text-black'
                      }`}
                    >
                      {isSelectedInFittingRoom ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom: "Complete the look" + Big Action Button */}
          <div className="pt-5 border-t border-[#EAEAEA] space-y-4">
            
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-[#111111] font-medium block">Complete the look</span>
                <span className="text-[11px] text-[#71717A]">Bundle of {activeLook.items.length} products</span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-[#111111] font-mono">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Primary Action Button (Sleek Pure Black) */}
            <button
              onClick={handleTryEntireLookWithCatVTON}
              className="w-full py-3.5 rounded-xl bg-[#111111] hover:bg-black text-white font-medium text-xs tracking-wide uppercase shadow-sm flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-[0.99]"
            >
              <span>Try this look with CatVTON</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <p className="text-[10px] text-center text-[#71717A]">
              Applies model & full outfit to CatVTON Diffusion Studio
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
