import React, { useRef } from 'react';
import { Upload, X, Shirt, Check, ArrowRight, Layers, SlidersHorizontal } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';
import { PRESET_MODELS } from '../data/mockData';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function TryOnPage({ setActiveTab }) {
  const {
    selectedModel,
    setSelectedModel,
    customModelUrl,
    setCustomModelUrl,
    selectedTop,
    selectedBottom,
    selectedDress,
    removeGarment,
    runVirtualTryOn,
    isGenerating,
    processingStep,
    tryOnResult,
  } = useTryOn();

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomModelUrl(url);
    }
  };

  const handleClearCustomModel = () => {
    setCustomModelUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const currentPersonImage = customModelUrl || selectedModel.imageUrl;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const calculateTotal = () => {
    let sum = 0;
    if (selectedTop?.price) sum += Number(selectedTop.price);
    if (selectedBottom?.price) sum += Number(selectedBottom.price);
    if (selectedDress?.price) sum += Number(selectedDress.price);
    return sum;
  };

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAEAEA] pb-6">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#71717A] block">
            CatVTON • Latent Diffusion Model (Chong et al., 2024)
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#111111] mt-1">
            Virtual Try-On Studio<span className="text-[#71717A]">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-2">
            Chọn người mẫu hoặc tải ảnh chân dung của bạn lên để ghép trang phục trực tiếp bằng mô hình CatVTON.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('look')}
          className="self-start md:self-auto px-4 py-2 rounded-full border border-[#D4D4D8] hover:border-black bg-white text-xs font-medium text-black transition-all"
        >
          Trở về "Try the Look"
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Model & Wardrobe Selection (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Step 1: Chọn Người Mẫu */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAEAEA] studio-shadow space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-mono">1</span>
                Người Mẫu / Tải Ảnh
              </h2>
              {customModelUrl && (
                <button
                  onClick={handleClearCustomModel}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Dùng lại mẫu
                </button>
              )}
            </div>

            {/* Custom Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-xl border border-dashed border-[#D4D4D8] hover:border-black bg-[#FBFBFB] text-xs font-medium text-[#111111] flex items-center justify-center gap-2 transition-all"
            >
              <Upload className="w-3.5 h-3.5 text-[#71717A]" />
              {customModelUrl ? "Thay đổi ảnh đã tải lên" : "Tải ảnh chân dung của bạn lên"}
            </button>

            {/* Preset Models */}
            {!customModelUrl && (
              <div className="grid grid-cols-5 gap-2 pt-1">
                {PRESET_MODELS.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer border transition-all ${
                      selectedModel.id === model.id
                        ? 'border-black ring-1 ring-black scale-102'
                        : 'border-[#EAEAEA] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={model.imageUrl}
                      alt={model.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Selected Model Preview Card */}
            <div className="p-3 rounded-xl bg-[#FBFBFB] border border-[#EAEAEA] flex items-center gap-3">
              <img
                src={currentPersonImage}
                alt="Selected"
                className="w-12 h-16 rounded-md object-cover object-top"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-black truncate block">
                  {customModelUrl ? "Ảnh của bạn (Custom Upload)" : selectedModel.name}
                </span>
                <span className="text-[11px] text-[#71717A] block font-mono">
                  {customModelUrl ? "Ready for CatVTON Pipeline" : selectedModel.stats}
                </span>
              </div>
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            </div>
          </div>

          {/* Step 2: Trang Phục Đang Thử */}
          <div className="p-6 rounded-2xl bg-white border border-[#EAEAEA] studio-shadow space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-mono">2</span>
              Trang Phục Thử (Garments)
            </h2>

            <div className="space-y-3">
              {/* TOP SLOT */}
              <div className="p-3 rounded-xl bg-[#FBFBFB] border border-[#EAEAEA] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {selectedTop ? (
                    <img src={selectedTop.imageUrl} alt="" className="w-12 h-14 rounded-md object-cover bg-white border border-[#EAEAEA]" />
                  ) : (
                    <div className="w-12 h-14 rounded-md bg-white border border-dashed border-[#D4D4D8] flex items-center justify-center text-[#A1A1AA]">
                      <Shirt className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block">Áo (Top)</span>
                    <span className="text-xs font-medium text-black block line-clamp-1">
                      {selectedTop ? selectedTop.name : "Chưa chọn áo"}
                    </span>
                    {selectedTop && (
                      <span className="text-xs font-semibold text-black block font-mono">{formatPrice(selectedTop.price)}</span>
                    )}
                  </div>
                </div>

                {selectedTop ? (
                  <button
                    onClick={() => removeGarment('TOP')}
                    className="p-1.5 rounded-md hover:bg-[#E4E4E7] text-[#71717A] hover:text-black transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="text-xs text-black hover:underline font-medium"
                  >
                    + Chọn
                  </button>
                )}
              </div>

              {/* BOTTOM SLOT */}
              <div className="p-3 rounded-xl bg-[#FBFBFB] border border-[#EAEAEA] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {selectedBottom ? (
                    <img src={selectedBottom.imageUrl} alt="" className="w-12 h-14 rounded-md object-cover bg-white border border-[#EAEAEA]" />
                  ) : (
                    <div className="w-12 h-14 rounded-md bg-white border border-dashed border-[#D4D4D8] flex items-center justify-center text-[#A1A1AA]">
                      <Layers className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block">Quần / Váy (Bottom)</span>
                    <span className="text-xs font-medium text-black block line-clamp-1">
                      {selectedBottom ? selectedBottom.name : "Chưa chọn quần"}
                    </span>
                    {selectedBottom && (
                      <span className="text-xs font-semibold text-black block font-mono">{formatPrice(selectedBottom.price)}</span>
                    )}
                  </div>
                </div>

                {selectedBottom ? (
                  <button
                    onClick={() => removeGarment('BOTTOM')}
                    className="p-1.5 rounded-md hover:bg-[#E4E4E7] text-[#71717A] hover:text-black transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="text-xs text-black hover:underline font-medium"
                  >
                    + Chọn
                  </button>
                )}
              </div>
            </div>

            {/* Total price */}
            {calculateTotal() > 0 && (
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[#71717A]">Tổng tiền đồ thử:</span>
                <span className="font-bold text-black font-mono text-sm">{formatPrice(calculateTotal())}</span>
              </div>
            )}

            {/* Big Run Button */}
            <button
              onClick={runVirtualTryOn}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-[#111111] hover:bg-black text-white font-medium text-xs tracking-wider uppercase shadow flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>CatVTON đang khử nhiễu...</span>
                </>
              ) : (
                <>
                  <span>Bắt đầu thử đồ CatVTON</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Progress Step Note */}
            {isGenerating && (
              <div className="p-3 rounded-lg bg-[#F4F4F5] border border-[#E4E4E7] text-[11px] text-[#111111] text-center font-mono">
                {processingStep}
              </div>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: Viewport & Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {tryOnResult ? (
            <div className="space-y-4">
              <BeforeAfterSlider
                originalImage={currentPersonImage}
                resultImage={tryOnResult.resultImageUrl}
                title="CatVTON Studio Result"
              />

              <div className="p-4 rounded-xl bg-white border border-[#EAEAEA] grid grid-cols-3 gap-4 text-center studio-card-shadow">
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Status</span>
                  <span className="text-xs font-semibold text-emerald-600">Completed (200 OK)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Model</span>
                  <span className="text-xs font-semibold text-black font-mono">CatVTON 40 Steps</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase font-mono block">Hardware</span>
                  <span className="text-xs font-semibold text-black font-mono">Kaggle T4 GPU</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white border border-dashed border-[#D4D4D8] text-center flex flex-col items-center justify-center min-h-[520px]">
              <div className="w-16 h-16 rounded-full bg-[#F4F4F5] flex items-center justify-center text-black mb-4">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-1">
                Phòng thử đồ đang sẵn sàng
              </h3>
              <p className="text-xs text-[#71717A] max-w-sm leading-relaxed mb-6">
                Chọn người mẫu ở cột bên trái, chọn một món đồ (Áo hoặc Quần) rồi bấm <strong className="text-black">"Bắt đầu thử đồ CatVTON"</strong>.
              </p>
              <button
                onClick={() => setActiveTab('look')}
                className="px-5 py-2.5 rounded-lg border border-[#D4D4D8] hover:border-black bg-white text-xs font-medium text-black transition-all"
              >
                Xem các set mẫu ở "Try the Look"
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
