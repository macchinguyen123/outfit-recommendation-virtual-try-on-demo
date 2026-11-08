import React, { useState } from 'react';
import { ArrowLeftRight, Download } from 'lucide-react';

export default function BeforeAfterSlider({ originalImage, resultImage, title = "CatVTON Result" }) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.target = '_blank';
    link.download = 'catvton-virtual-tryon-result.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-2xl bg-white border border-[#EAEAEA] overflow-hidden studio-shadow flex flex-col">
      {/* Header bar */}
      <div className="p-4 px-6 border-b border-[#EAEAEA] flex items-center justify-between bg-white">
        <div>
          <h3 className="font-medium text-[#111111] text-sm sm:text-base tracking-tight">{title}</h3>
          <span className="text-[11px] text-[#71717A] block">Trực quan hóa kết quả thử đồ CatVTON</span>
        </div>
        <button
          onClick={handleDownload}
          className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[#D4D4D8] hover:border-black text-[#111111] bg-white flex items-center gap-1.5 transition-all"
        >
          <Download className="w-3.5 h-3.5" /> Tải ảnh
        </button>
      </div>

      {/* Comparison Viewport */}
      <div className="relative aspect-[3/4] w-full max-w-lg mx-auto overflow-hidden select-none bg-[#F9F9F9]">
        
        {/* Result Image (After) */}
        <img
          src={resultImage}
          alt="CatVTON Result"
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
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black shadow-lg flex items-center justify-center border border-[#D4D4D8] pointer-events-auto">
            <ArrowLeftRight className="w-3.5 h-3.5 text-black" />
          </div>
        </div>

        {/* Floating Minimalist Labels */}
        <div className="absolute bottom-3 left-3 pointer-events-none px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono uppercase text-white tracking-wider">
          Mẫu gốc
        </div>
        <div className="absolute bottom-3 right-3 pointer-events-none px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono uppercase text-white tracking-wider">
          CatVTON
        </div>

        {/* Range Controller */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={handleSliderChange}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
        />
      </div>

      <div className="p-3 text-center border-t border-[#EAEAEA] bg-[#FBFBFB]">
        <p className="text-[11px] text-[#71717A]">
          Kéo thanh trượt để so sánh độ tương thích form dáng và nếp gấp vải
        </p>
      </div>
    </div>
  );
}
