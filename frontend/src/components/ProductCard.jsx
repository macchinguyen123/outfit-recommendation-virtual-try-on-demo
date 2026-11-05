import React from 'react';
import { Sparkles, Check, Plus, Star } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function ProductCard({ product, onTryNowClick }) {
  const { selectGarment, removeGarment, selectedTop, selectedBottom, selectedDress } = useTryOn();

  const isSelected =
    (product.category === 'TOP' && selectedTop?.id === product.id) ||
    (product.category === 'BOTTOM' && selectedBottom?.id === product.id) ||
    (product.category === 'DRESS' && selectedDress?.id === product.id);

  const handleToggleTryOn = (e) => {
    e.stopPropagation();
    if (isSelected) {
      removeGarment(product.category);
    } else {
      selectGarment(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="group rounded-2xl bg-fashion-card border border-fashion-border overflow-hidden flex flex-col hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300">
      
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category & Style Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase">
            {product.category}
          </span>
          {product.style && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-brand-500/80 backdrop-blur-md text-white">
              {product.style}
            </span>
          )}
        </div>

        {/* Star Rating Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold bg-black/60 backdrop-blur-md text-amber-300 flex items-center gap-1 border border-white/10">
          <Star className="w-3.5 h-3.5 fill-amber-300" />
          <span>{product.rating || 4.8}</span>
        </div>

        {/* Selected Overlay Indicator */}
        {isSelected && (
          <div className="absolute inset-0 bg-brand-950/40 border-2 border-brand-500 flex items-center justify-center">
            <div className="px-4 py-2 rounded-full bg-brand-600 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 animate-bounce">
              <Check className="w-4 h-4" /> Đã chọn thử
            </div>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs text-slate-400 font-medium">
              {product.subCategory || product.gender}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                style={{ backgroundColor: product.colorHex || '#ccc' }}
                title={product.color}
              />
              <span className="text-xs text-slate-400">{product.color}</span>
            </div>
          </div>

          <h3 className="font-semibold text-sm sm:text-base text-slate-100 line-clamp-1 group-hover:text-brand-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-fashion-border/50 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-400 block">Giá niêm yết</span>
            <span className="text-base font-bold text-white font-mono">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleToggleTryOn}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
              isSelected
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5" /> Bỏ chọn
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> Thử đồ ảo
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

