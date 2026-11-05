import React, { useState } from 'react';
import { Columns, ArrowLeftRight, Download, Check } from 'lucide-react';

export default function BeforeAfterSlider({ originalImage, resultImage, title = "Kết Quả AI Virtual Try-On" }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isCopied, setIsCopied] = useState(false);

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.target = '_blank';
    link.download = 'aurafit-virtual-tryon-result.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-3xl bg-fashion-card border border-fashion-border overflow-hidden shadow-2xl flex flex-col">
      {/* Header bar */}
      <div className="p-4 px-6 border-b border-fashion-border flex items-center justify-between bg-fashion-dark/50">
        <div className="flex items-center gap-2">
          <Columns className="w-5 h-5 text-brand-400" />
          <h3 className="font-semibold text-white text-sm sm:text-base">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Tải ảnh kết quả
          </button>
        </div>
      </div>

      {/* Comparison Viewport */}
      <div className="relative aspect-[3/4] w-full max-w-lg mx-auto overflow-hidden select-none bg-slate-950">
        
        {/* Result Image (After - Full Width Background) */}
        <img
          src={resultImage}
          alt="AI Try-On Result"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Original Image (Before - Clipped by Slider) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={originalImage}
            alt="Original Model"
            className="absolute inset-y-0 left-0 h-full object-cover max-w-none"
            style={{ width: '100%', minWidth: '100%', height: '100%' }}
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center border-2 border-brand-500 pointer-events-auto">
            <ArrowLeftRight className="w-4 h-4 text-brand-600" />
          </div>
        </div>

        {/* Floating Labels */}
        <div className="absolute bottom-4 left-4 pointer-events-none px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/10 uppercase tracking-wider">
          Mẫu gốc
        </div>
        <div className="absolute bottom-4 right-4 pointer-events-none px-3 py-1 rounded-lg bg-brand-600/90 backdrop-blur-md text-[11px] font-bold text-white shadow-lg uppercase tracking-wider">
          Đã ghép AI
        </div>

        {/* Native Range Input Controller for Smooth Dragging */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={handleSliderChange}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
        />
      </div>

      {/* Control instructions */}
      <div className="p-4 bg-fashion-dark/80 text-center border-t border-fashion-border/50">
        <p className="text-xs text-slate-400">
          Kéo thanh trượt qua trái/phải để so sánh độ tương thích form dáng và ánh sáng vải
        </p>
      </div>
    </div>
  );
}

