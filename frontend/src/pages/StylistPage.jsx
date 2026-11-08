import React, { useState } from 'react';
import { ArrowRight, SlidersHorizontal, Check } from 'lucide-react';
import { recommendationApi } from '../api/recommendationApi';
import { useTryOn } from '../context/TryOnContext';

export default function StylistPage({ setActiveTab }) {
  const { applyOutfit } = useTryOn();

  const [gender, setGender] = useState('MEN');
  const [occasion, setOccasion] = useState('STREET');
  const [style, setStyle] = useState('STREETWEAR');
  const [weather, setWeather] = useState('Mát mẻ');

  const [isLoading, setIsLoading] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState(null);

  const occasions = [
    { value: 'STREET', label: 'Dạo phố / Cafe' },
    { value: 'WORK', label: 'Đi làm / Công sở' },
    { value: 'DATE', label: 'Hẹn hò' },
    { value: 'PARTY', label: 'Dự tiệc' }
  ];

  const styles = [
    { value: 'STREETWEAR', label: 'Streetwear' },
    { value: 'MINIMALIST', label: 'Minimalist' },
    { value: 'CASUAL', label: 'Casual' },
    { value: 'FORMAL', label: 'Formal' }
  ];

  const weathers = ['Nắng ấm', 'Mát mẻ', 'Se lạnh', 'Mưa nhẹ'];

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
    <div className="py-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#EAEAEA] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#71717A] block">
            Outfit Recommendation Algorithm
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#111111] mt-1">
            Outfit Advisory<span className="text-[#71717A]">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-2">
            Thuật toán phân tích mức độ tương thích trang phục (Fashion Compatibility) dựa trên dữ liệu Polyvore Outfits.
          </p>
        </div>
      </div>

      {/* Questionnaire Form */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EAEAEA] studio-shadow space-y-6">
        
        {/* Gender */}
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] block mb-2">
            1. Phối đồ cho:
          </label>
          <div className="flex gap-2 max-w-sm">
            {[
              { id: 'MEN', label: 'Nam' },
              { id: 'WOMEN', label: 'Nữ' },
              { id: 'UNISEX', label: 'Unisex' }
            ].map(g => (
              <button
                key={g.id}
                onClick={() => setGender(g.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                  gender === g.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-[#71717A] border-[#D4D4D8] hover:border-black'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Occasion */}
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] block mb-2">
            2. Ngữ cảnh sử dụng:
          </label>
          <div className="flex flex-wrap gap-2">
            {occasions.map(o => (
              <button
                key={o.value}
                onClick={() => setOccasion(o.value)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                  occasion === o.value
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-[#71717A] border-[#D4D4D8] hover:border-black'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Style & Weather */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#EAEAEA]">
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] block mb-2">
              3. Phong cách:
            </label>
            <div className="flex flex-wrap gap-2">
              {styles.map(s => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    style === s.value
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-[#71717A] border-[#D4D4D8] hover:border-black'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] block mb-2">
              4. Thời tiết:
            </label>
            <div className="flex flex-wrap gap-2">
              {weathers.map(w => (
                <button
                  key={w}
                  onClick={() => setWeather(w)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    weather === w
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-[#71717A] border-[#D4D4D8] hover:border-black'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGetAdvice}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl bg-[#111111] hover:bg-black text-white font-medium text-xs tracking-wider uppercase flex items-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang phân tích tương thích...</span>
              </>
            ) : (
              <>
                <span>Tìm set phối phù hợp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Results */}
      {recommendationResult && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#F4F4F5] border border-[#E4E4E7]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] block mb-1">
              Phân tích thẩm mỹ Polyvore
            </span>
            <p className="text-xs text-[#111111] leading-relaxed">
              {recommendationResult.stylistSummary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendationResult.recommendedOutfits?.map((outfit, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white border border-[#EAEAEA] studio-shadow overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-[#F9F9F9] overflow-hidden">
                  <img src={outfit.previewImageUrl} alt={outfit.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-black">{outfit.name}</h4>
                      <span className="text-xs font-mono font-medium text-emerald-600">
                        {outfit.harmonyScore || 96}% Match
                      </span>
                    </div>
                    <p className="text-xs text-[#71717A] leading-relaxed">{outfit.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#EAEAEA] flex items-center justify-between">
                    <span className="text-sm font-bold text-black font-mono">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(outfit.totalPrice || 1800000)}
                    </span>
                    <button
                      onClick={() => handleTryOutfit(outfit)}
                      className="px-4 py-2 rounded-lg bg-[#111111] hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                    >
                      <span>Thử set đồ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
