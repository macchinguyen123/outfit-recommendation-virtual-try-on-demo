import React, { useState } from 'react';
import { Wand2, Sparkles, Compass, Sun, CloudRain, Heart, ArrowRight } from 'lucide-react';
import { recommendationApi } from '../api/recommendationApi';
import { useTryOn } from '../context/TryOnContext';

export default function StylistPage({ setActiveTab }) {
  const { applyOutfit } = useTryOn();

  const [gender, setGender] = useState('WOMEN');
  const [occasion, setOccasion] = useState('WORK');
  const [style, setStyle] = useState('FORMAL');
  const [weather, setWeather] = useState('Mát mẻ');

  const [isLoading, setIsLoading] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState(null);

  const occasions = [
    { value: 'WORK', label: '💼 Đi làm / Công sở' },
    { value: 'DATE', label: '🌹 Hẹn hò lãng mạn' },
    { value: 'PARTY', label: '🍸 Dự tiệc sang trọng' },
    { value: 'STREET', label: '☕ Dạo phố / Cafe cuối tuần' },
    { value: 'TRAVEL', label: '✈️ Du lịch dã ngoại' }
  ];

  const styles = [
    { value: 'FORMAL', label: 'Thanh lịch (Formal)' },
    { value: 'MINIMALIST', label: 'Tối giản (Minimalist)' },
    { value: 'STREETWEAR', label: 'Cá tính (Streetwear)' },
    { value: 'PARTY', label: 'Quyến rũ (Glamour)' },
    { value: 'CASUAL', label: 'Thoải mái (Casual)' }
  ];

  const weathers = ['Nắng ấm', 'Mát mẻ', 'Se lạnh thu đông', 'Mưa nhẹ'];

  const handleGetAdvice = async () => {
    setIsLoading(true);
    const res = await recommendationApi.getRecommendations({
      gender,
      occasion,
      style,
      weather
    });
    setRecommendationResult(res);
    setIsLoading(false);
  };

  const handleTryOutfit = (outfit) => {
    applyOutfit(outfit);
    setActiveTab('tryon');
  };

  return (
    <div className="space-y-12 py-6">
      
      {/* Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold mb-3">
          <Wand2 className="w-3.5 h-3.5" /> AI Fashion Consultant
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Tư Vấn Phối Đồ Thông Minh
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Chọn ngữ cảnh của bạn hôm nay, Stylist AI sẽ phân tích bánh xe màu sắc và phom dáng để phối ra những set đồ hoàn hảo nhất.
        </p>
      </div>

      {/* Interactive Questionnaire */}
      <div className="p-8 rounded-3xl bg-fashion-card border border-fashion-border space-y-8">
        
        {/* 1. Giới tính */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            1. Bạn đang phối đồ cho:
          </label>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[
              { id: 'WOMEN', label: 'Nữ giới' },
              { id: 'MEN', label: 'Nam giới' },
              { id: 'UNISEX', label: 'Unisex' }
            ].map(g => (
              <button
                key={g.id}
                onClick={() => setGender(g.id)}
                className={`py-3 px-4 rounded-2xl text-xs font-semibold border transition-all ${
                  gender === g.id
                    ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-600/30'
                    : 'bg-fashion-dark border-fashion-border text-slate-300 hover:border-slate-600'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Dịp / Mục đích */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            2. Bạn sắp đi đâu? (Dịp sự kiện)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {occasions.map(o => (
              <button
                key={o.value}
                onClick={() => setOccasion(o.value)}
                className={`p-3.5 rounded-2xl text-xs font-semibold text-left border transition-all ${
                  occasion === o.value
                    ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-600/30'
                    : 'bg-fashion-dark border-fashion-border text-slate-300 hover:border-slate-600'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Phong cách & Thời tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-fashion-border/50">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              3. Phong cách bạn hướng tới:
            </label>
            <div className="flex flex-wrap gap-2">
              {styles.map(s => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    style === s.value
                      ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                      : 'bg-fashion-dark border-fashion-border text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              4. Thời tiết dự kiến:
            </label>
            <div className="flex flex-wrap gap-2">
              {weathers.map(w => (
                <button
                  key={w}
                  onClick={() => setWeather(w)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    weather === w
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                      : 'bg-fashion-dark border-fashion-border text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleGetAdvice}
            disabled={isLoading}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-brand-600/30 flex items-center gap-2.5 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                AI đang tính toán bảng màu & phối đồ...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" /> Nhận Tư Vấn Phối Đồ Ngay
              </>
            )}
          </button>
        </div>

      </div>

      {/* AI Recommendation Result Section */}
      {recommendationResult && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Advice Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-950/60 via-purple-950/40 to-slate-900 border border-brand-500/40 shadow-2xl">
            <h3 className="text-lg font-serif font-bold text-brand-300 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" /> Nhận định của Stylist AI
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {recommendationResult.stylistSummary}
            </p>
            <div className="mt-4 pt-3 border-t border-brand-500/20 text-xs font-medium text-purple-300">
              {recommendationResult.colorPaletteAdvice}
            </div>
          </div>

          {/* Outfits List */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-6">
              Các Set Đồ Được Đề Xuất
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recommendationResult.recommendedOutfits?.map((outfit, index) => (
                <div
                  key={index}
                  className="rounded-3xl bg-fashion-card border border-fashion-border overflow-hidden hover:border-brand-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img
                      src={outfit.previewImageUrl}
                      alt={outfit.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-400 text-xs font-bold font-mono">
                      {outfit.harmonyScore || 96}% Hài hòa
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{outfit.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{outfit.description}</p>
                      
                      {/* Products inside this outfit */}
                      <div className="space-y-2 mb-4">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                          Gồm {outfit.products?.length || 0} món đồ:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {outfit.products?.map((item) => (
                            <span key={item.id} className="px-2.5 py-1 rounded-lg bg-fashion-dark border border-fashion-border text-[11px] text-slate-300">
                              • {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-fashion-border/50 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Tổng giá trị</span>
                        <span className="text-base font-bold text-white font-mono">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(outfit.totalPrice || 1800000)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleTryOutfit(outfit)}
                        className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30 flex items-center gap-2 transition-all active:scale-95"
                      >
                        <Sparkles className="w-4 h-4" /> Đưa vào Buồng Thử Ảo <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

