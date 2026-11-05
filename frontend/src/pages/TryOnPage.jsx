import React, { useRef } from 'react';
import { Sparkles, Upload, X, Shirt, CheckCircle2, ArrowRight, Layers, Sliders, Image as ImageIcon } from 'lucide-react';
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
    <div className="space-y-10 py-6">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> High-Fidelity Diffusion Studio
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Phòng Thử Đồ Ảo (Virtual Try-On)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Chọn người mẫu hoặc tải ảnh bạn lên, ghép các món đồ và xem kết quả tức thì
          </p>
        </div>

        <button
          onClick={() => setActiveTab('catalog')}
          className="self-start md:self-auto px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 flex items-center gap-2 transition-all"
        >
          <Shirt className="w-4 h-4 text-brand-400" /> Chọn thêm đồ từ Bộ Sưu Tập <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Model & Wardrobe Selection (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Step 1: Chọn Người Mẫu */}
          <div className="p-6 rounded-3xl bg-fashion-card border border-fashion-border space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-mono">1</span>
                Chọn Dáng Người Mẫu / Tải Ảnh
              </h2>
              {customModelUrl && (
                <button
                  onClick={handleClearCustomModel}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Dùng lại mẫu có sẵn
                </button>
              )}
            </div>

            {/* Custom Upload Button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all hover:border-brand-500"
            >
              <Upload className="w-4 h-4 text-brand-400" />
              {customModelUrl ? "Thay đổi ảnh cá nhân đã tải lên" : "Tải ảnh chân dung của chính bạn lên"}
            </button>

            {/* Preset Models Grid */}
            {!customModelUrl && (
              <div className="grid grid-cols-4 gap-2.5 pt-2">
                {PRESET_MODELS.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedModel.id === model.id
                        ? 'border-brand-500 scale-105 shadow-md shadow-brand-500/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={model.imageUrl}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-1 bg-black/70 backdrop-blur-xs text-[9px] text-white text-center truncate">
                      {model.gender === 'WOMEN' ? 'Nữ' : 'Nam'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected Model Preview Card */}
            <div className="p-3 rounded-2xl bg-fashion-dark border border-fashion-border/60 flex items-center gap-3">
              <img
                src={currentPersonImage}
                alt="Selected"
                className="w-12 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-white truncate block">
                  {customModelUrl ? "Ảnh của bạn (Custom Upload)" : selectedModel.name}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {customModelUrl ? "Sẵn sàng phân tích khung xương AI" : selectedModel.stats}
                </span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>

          </div>

          {/* Step 2: Trang Phục Đang Thử */}
          <div className="p-6 rounded-3xl bg-fashion-card border border-fashion-border space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-mono">2</span>
              Trang Phục Thử Đồ (Garments)
            </h2>

            <div className="space-y-3">
              {/* TOP SLOT */}
              <div className="p-3.5 rounded-2xl bg-fashion-dark border border-fashion-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {selectedTop ? (
                    <img src={selectedTop.imageUrl} alt="" className="w-12 h-14 rounded-lg object-cover bg-slate-900" />
                  ) : (
                    <div className="w-12 h-14 rounded-lg bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-slate-500">
                      <Shirt className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider block">Áo (Top)</span>
                    <span className="text-xs font-medium text-white block line-clamp-1">
                      {selectedTop ? selectedTop.name : "Chưa chọn áo"}
                    </span>
                    {selectedTop && (
                      <span className="text-xs font-mono text-slate-400 block">{formatPrice(selectedTop.price)}</span>
                    )}
                  </div>
                </div>

                {selectedTop ? (
                  <button
                    onClick={() => removeGarment('TOP')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="text-xs text-brand-400 hover:underline font-semibold"
                  >
                    + Chọn
                  </button>
                )}
              </div>

              {/* BOTTOM SLOT */}
              <div className="p-3.5 rounded-2xl bg-fashion-dark border border-fashion-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {selectedBottom ? (
                    <img src={selectedBottom.imageUrl} alt="" className="w-12 h-14 rounded-lg object-cover bg-slate-900" />
                  ) : (
                    <div className="w-12 h-14 rounded-lg bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-slate-500">
                      <Layers className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider block">Quần / Váy (Bottom)</span>
                    <span className="text-xs font-medium text-white block line-clamp-1">
                      {selectedBottom ? selectedBottom.name : "Chưa chọn quần/váy"}
                    </span>
                    {selectedBottom && (
                      <span className="text-xs font-mono text-slate-400 block">{formatPrice(selectedBottom.price)}</span>
                    )}
                  </div>
                </div>

                {selectedBottom ? (
                  <button
                    onClick={() => removeGarment('BOTTOM')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="text-xs text-brand-400 hover:underline font-semibold"
                  >
                    + Chọn
                  </button>
                )}
              </div>

              {/* DRESS SLOT */}
              <div className="p-3.5 rounded-2xl bg-fashion-dark border border-fashion-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {selectedDress ? (
                    <img src={selectedDress.imageUrl} alt="" className="w-12 h-14 rounded-lg object-cover bg-slate-900" />
                  ) : (
                    <div className="w-12 h-14 rounded-lg bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-slate-500">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider block">Đầm Liền Thân (Dress)</span>
                    <span className="text-xs font-medium text-white block line-clamp-1">
                      {selectedDress ? selectedDress.name : "Chưa chọn đầm"}
                    </span>
                    {selectedDress && (
                      <span className="text-xs font-mono text-slate-400 block">{formatPrice(selectedDress.price)}</span>
                    )}
                  </div>
                </div>

                {selectedDress ? (
                  <button
                    onClick={() => removeGarment('DRESS')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="text-xs text-brand-400 hover:underline font-semibold"
                  >
                    + Chọn
                  </button>
                )}
              </div>

            </div>

            {/* Total price for selected combo */}
            {calculateTotal() > 0 && (
              <div className="pt-3 border-t border-fashion-border/50 flex items-center justify-between text-xs">
                <span className="text-slate-400">Tổng tiền combo:</span>
                <span className="font-bold text-white font-mono text-sm">{formatPrice(calculateTotal())}</span>
              </div>
            )}

            {/* Big Trigger Button */}
            <button
              onClick={runVirtualTryOn}
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2.5 transition-all active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang khởi chạy AI Virtual Try-On...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Bắt Đầu Thử Đồ Ảo (AI Try-On)
                </>
              )}
            </button>

            {/* Step progress details */}
            {isGenerating && (
              <div className="p-3 rounded-xl bg-brand-950/40 border border-brand-500/30 text-[11px] text-brand-300 animate-pulse text-center">
                {processingStep}
              </div>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: Studio Viewport & Result (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {tryOnResult ? (
            <div className="space-y-6 animate-fadeIn">
              <BeforeAfterSlider
                originalImage={currentPersonImage}
                resultImage={tryOnResult.resultImageUrl}
                title="Buồng Thử Đồ Ảo: Kết Quả AI Render"
              />

              {/* AI Details card */}
              <div className="p-5 rounded-2xl bg-fashion-card border border-fashion-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Trạng thái</span>
                  <span className="text-xs font-bold text-emerald-400">Thành công 100%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Mô hình AI</span>
                  <span className="text-xs font-bold text-white font-mono">{tryOnResult.aiModelUsed}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Thời gian xử lý</span>
                  <span className="text-xs font-bold text-brand-400 font-mono">{tryOnResult.executionTimeMs} ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Độ phân giải</span>
                  <span className="text-xs font-bold text-purple-400 font-mono">1024 x 1536 HD</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-fashion-card border border-dashed border-fashion-border text-center flex flex-col items-center justify-center min-h-[480px]">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-400 mb-6 shadow-inner">
                <Sparkles className="w-10 h-10 animate-pulse" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Buồng Thử Đồ Đang Trống
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
                Hãy chọn người mẫu ở cột bên trái, gán ít nhất một chiếc Áo, Quần hoặc Váy đầm rồi nhấn nút <span className="text-brand-400 font-semibold">"Bắt Đầu Thử Đồ Ảo"</span>.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30 flex items-center gap-2 transition-all"
                >
                  <Shirt className="w-4 h-4" /> Khám phá các món đồ hot
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

