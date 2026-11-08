import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Shirt } from 'lucide-react';
import { productApi } from '../api/productApi';
import ProductCard from '../components/ProductCard';

export default function CatalogPage({ setActiveTab }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [style, setStyle] = useState('');
  const [gender, setGender] = useState('');

  const categories = [
    { value: '', label: 'Tất cả danh mục' },
    { value: 'TOP', label: 'Áo (Tops)' },
    { value: 'BOTTOM', label: 'Quần & Váy (Bottoms)' },
    { value: 'SHOES', label: 'Giày dép (Footwear)' }
  ];

  const styles = [
    { value: '', label: 'Mọi phong cách' },
    { value: 'STREETWEAR', label: 'Streetwear' },
    { value: 'CASUAL', label: 'Casual' },
    { value: 'MINIMALIST', label: 'Minimalist' },
    { value: 'FORMAL', label: 'Formal Tailored' }
  ];

  const genders = [
    { value: '', label: 'Tất cả' },
    { value: 'MEN', label: 'Nam' },
    { value: 'WOMEN', label: 'Nữ' }
  ];

  const fetchProducts = async () => {
    setLoading(true);
    const params = {};
    if (keyword) params.keyword = keyword;
    if (category) params.category = category;
    if (style) params.style = style;
    if (gender) params.gender = gender;

    const res = await productApi.getProducts(params);
    setProducts(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, style, gender]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleReset = () => {
    setKeyword('');
    setCategory('');
    setStyle('');
    setGender('');
  };

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#EAEAEA] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#71717A] block">
            Polyvore Outfits Dataset
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#111111] mt-1">
            Product Collection<span className="text-[#71717A]">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-2">
            Danh mục sản phẩm thời trang được trích xuất và chuẩn hóa từ Polyvore Outfits dataset.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('look')}
          className="self-start md:self-auto px-4 py-2 rounded-full border border-[#D4D4D8] hover:border-black bg-white text-xs font-medium text-black transition-all"
        >
          Xem sàn diễn "Try the Look"
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-5 rounded-2xl bg-white border border-[#EAEAEA] studio-shadow space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm theo tên áo, quần jeans, blazer, sneaker..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FBFBFB] border border-[#EAEAEA] text-xs text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#111111] hover:bg-black text-white text-xs font-medium transition-all"
          >
            Tìm kiếm
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#EAEAEA]">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#FBFBFB] border border-[#EAEAEA] text-xs text-black focus:outline-none focus:border-black"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block mb-1">
              Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#FBFBFB] border border-[#EAEAEA] text-xs text-black focus:outline-none focus:border-black"
            >
              {styles.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#FBFBFB] border border-[#EAEAEA] text-xs text-black focus:outline-none focus:border-black"
            >
              {genders.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full py-2 px-3 rounded-lg border border-[#D4D4D8] hover:border-black bg-white text-xs font-medium text-[#71717A] hover:text-black flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[#71717A] mt-2 font-mono">Loading Polyvore items...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-white border border-[#EAEAEA]">
          <Shirt className="w-10 h-10 text-[#A1A1AA] mx-auto mb-2" />
          <h3 className="text-sm font-medium text-black">Không tìm thấy sản phẩm</h3>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
