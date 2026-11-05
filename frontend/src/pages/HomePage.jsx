import React from 'react';
import { Sparkles, Wand2, Shirt, ArrowRight, ShieldCheck, Cpu, RefreshCw } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';
import { MOCK_OUTFITS } from '../data/mockData';

export default function HomePage({ setActiveTab }) {
  const { applyOutfit } = useTryOn();

  const handleTryOutfit = (outfit) => {
    applyOutfit(outfit);
    setActiveTab('tryon');
  };

  return (
    <div className="space-y-24 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-fashion-border bg-gradient-to-br from-fashion-card via-slate-900 to-fashion-dark p-8 md:p-16">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-brand-300 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            AI Virtual Try-On & Smart Outfit Recommendation 2.0
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
            Trải Nghiệm Thử Đồ Ảo & <br />
            <span className="luxury-text-gradient">Tư Vấn Phối Đồ Thông Minh</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Tự tin lựa chọn trang phục vừa vặn hoàn hảo mà không cần đến cửa hàng. Ứng dụng mô hình AI Diffusion thế hệ mới để ướm thử trang phục lên người mẫu hoặc ảnh chính bạn với độ chân thực từng nếp gấp vải.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('tryon')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-semibold shadow-xl shadow-brand-500/30 flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5" /> Vào Buồng Thử Đồ Ảo Ngay
            </button>

            <button
              onClick={() => setActiveTab('stylist')}
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold flex items-center gap-2.5 transition-all"
            >
              <Wand2 className="w-5 h-5 text-brand-400" /> Hỏi AI Stylist
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 pt-8 border-t border-fashion-border/50 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="text-2xl font-bold font-mono text-white">99.2%</div>
              <div className="text-xs text-slate-400">Chuẩn phom dáng</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-brand-400">&lt; 1.5s</div>
              <div className="text-xs text-slate-400">Tốc độ AI Render</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-purple-400">Ultra HD</div>
              <div className="text-xs text-slate-400">Độ phân giải nếp vải</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white">
            Quy Trình Hoạt Động Của Hệ Thống AI
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Sự kết hợp giữa Spring Boot RESTful API tốc độ cao và mạng nơ-ron AI Diffusion tân tiến
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-fashion-card border border-fashion-border hover:border-brand-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-6">
              <Shirt className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Lựa chọn trang phục</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Duyệt qua danh mục thời trang đa dạng: Áo, Quần, Váy đầm hoặc yêu cầu AI Stylist đề xuất set đồ theo dịp sự kiện và thời tiết.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-fashion-card border border-fashion-border hover:border-brand-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Xử lý AI Warping & Inpainting</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Mô hình tính toán cấu trúc xương người (Pose Estimation), uốn vải 3D theo chuyển động và xử lý ánh sáng đổ bóng tự nhiên.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-fashion-card border border-fashion-border hover:border-brand-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Xem Before / After & Đặt hàng</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Trải nghiệm thanh trượt Before/After trực quan, tải ảnh độ phân giải cao hoặc thêm ngay set đồ ưng ý vào giỏ hàng.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Outfits Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">Outfits Nổi Bật Được AI Phối Sẵn</h2>
            <p className="text-sm text-slate-400">Các set đồ đạt điểm hài hòa màu sắc trên 94%</p>
          </div>
          <button
            onClick={() => setActiveTab('stylist')}
            className="text-sm font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1.5"
          >
            Xem thêm gợi ý <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_OUTFITS.map((outfit) => (
            <div
              key={outfit.id}
              className="rounded-3xl bg-fashion-card border border-fashion-border overflow-hidden hover:border-brand-500/50 transition-all flex flex-col sm:flex-row group"
            >
              <div className="sm:w-1/2 aspect-[3/4] overflow-hidden bg-slate-900">
                <img
                  src={outfit.previewImageUrl}
                  alt={outfit.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 uppercase">
                      {outfit.occasion}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      Tương thích {outfit.harmonyScore}%
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">{outfit.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{outfit.description}</p>
                  
                  <div className="mt-4 p-3 rounded-xl bg-fashion-dark/60 border border-fashion-border/50 text-[11px] text-slate-300">
                    <span className="font-semibold text-brand-400 block mb-0.5">Stylist Note:</span>
                    {outfit.aiStylistAdvice}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-fashion-border/50 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Tổng set đồ</span>
                    <span className="text-base font-bold text-white font-mono">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(outfit.totalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTryOutfit(outfit)}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Thử set này
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

