import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw, Shirt } from 'lucide-react';
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
    { value: 'TOP', label: 'Áo (Tops & Blazers)' },
    { value: 'BOTTOM', label: 'Quần & Váy (Bottoms)' },
    { value: 'DRESS', label: 'Đầm Liền Thân (Dresses)' },
    { value: 'SHOES', label: 'Giày dép (Footwear)' }
  ];

  const styles = [
    { value: '', label: 'Mọi phong cách' },
    { value: 'FORMAL', label: 'Thanh lịch / Công sở' },
    { value: 'CASUAL', label: 'Năng động hàng ngày' },
    { value: 'STREETWEAR', label: 'Đường phố Streetwear' },
    { value: 'MINIMALIST', label: 'Tối giản Minimalist' },
    { value: 'PARTY', label: 'Tiệc tùng / Quyến rũ' }
  ];

  const genders = [
    { value: '', label: 'Tất cả giới tính' },
    { value: 'WOMEN', label: 'Nữ' },
    { value: 'MEN', label: 'Nam' },
    { value: 'UNISEX', label: 'Unisex' }
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
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">Bộ Sưu Tập Thời Trang</h1>
        <p className="text-sm text-slate-400 mt-1">
          Lựa chọn các món đồ yêu thích và đưa ngay vào buồng thử đồ ảo AI
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-6 rounded-3xl bg-fashion-card border border-fashion-border space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm theo tên áo, quần, blazer, màu sắc, phong cách..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-fashion-dark border border-fashion-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Tìm kiếm
          </button>
        </form>

        {/* Filter Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2 border-t border-fashion-border/50">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Danh mục
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-fashion-dark border border-fashion-border text-xs text-white focus:outline-none focus:border-brand-500"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Phong cách
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-fashion-dark border border-fashion-border text-xs text-white focus:outline-none focus:border-brand-500"
            >
              {styles.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Đối tượng
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-fashion-dark border border-fashion-border text-xs text-white focus:outline-none focus:border-brand-500"
            >
              {genders.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Đặt lại bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400 mt-3">Đang đồng bộ dữ liệu từ Spring Boot API...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-fashion-card border border-fashion-border">
          <Shirt className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Không tìm thấy sản phẩm phù hợp</h3>
          <p className="text-sm text-slate-400 mt-1">Hãy thử tìm với từ khóa khác hoặc bỏ bớt tiêu chí lọc.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}

