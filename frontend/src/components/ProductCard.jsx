import React from 'react';
import { Check, Plus, Star } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function ProductCard({ product }) {
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
    <div className="group rounded-xl bg-white border border-[#EAEAEA] hover:border-[#71717A] overflow-hidden flex flex-col transition-all duration-300 studio-card-shadow">
      
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FBFBFB] p-2">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-102 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/90 text-black border border-[#EAEAEA] uppercase">
            {product.category}
          </span>
        </div>

        {/* Selected Status */}
        {isSelected && (
          <div className="absolute top-4 right-4">
            <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs shadow">
              <Check className="w-3.5 h-3.5" />
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block">
            {product.brand || product.subCategory}
          </span>
          <h3 className="font-medium text-xs sm:text-sm text-[#111111] line-clamp-1 mt-0.5">
            {product.name}
          </h3>
          <span className="text-xs font-semibold text-[#111111] mt-1 block font-mono">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          onClick={handleToggleTryOn}
          className={`w-full py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
            isSelected
              ? 'bg-[#F4F4F5] text-black border border-[#D4D4D8] hover:bg-[#E4E4E7]'
              : 'bg-[#111111] hover:bg-black text-white'
          }`}
        >
          {isSelected ? 'Bỏ chọn' : 'Thử đồ vào buồng'}
        </button>
      </div>

    </div>
  );
}
