/**
 * Dữ liệu thời trang chuẩn hóa theo cấu trúc Polyvore Outfits Dataset
 * Nguồn: https://www.kaggle.com/datasets/nguynmcch/polyvore-outfits-data
 */

export const POLYVORE_LOOKS = [
  {
    id: 'polyvore-look-1',
    outfitId: '194201_polyvore',
    name: "Urban Baggy Minimalist",
    style: "STREETWEAR",
    occasion: "STREET",
    season: "All Season",
    harmonyScore: 98.2,
    model: {
      name: "Marcus - 1m82 (Size L)",
      gender: "MEN",
      // Model full body standing in studio (center guy in white tee + baggy jeans)
      fullBodyUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
      transparentModelUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80"
    },
    items: [
      {
        id: 101,
        polyvoreId: "pv_top_101",
        name: "Heavyweight Boxy Tee Pure White",
        category: "TOP",
        subCategory: "Áo Thun Oversized",
        price: 450000,
        color: "Trắng",
        colorHex: "#FFFFFF",
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        brand: "Acne Studios Inspired"
      },
      {
        id: 102,
        polyvoreId: "pv_bottom_102",
        name: "Vintage Light-Wash Baggy Denim",
        category: "BOTTOM",
        subCategory: "Quần Jeans Ống Suông",
        price: 780000,
        color: "Xanh Denim Nhạt",
        colorHex: "#7FA2C7",
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
        brand: "Balenciaga Style"
      },
      {
        id: 103,
        polyvoreId: "pv_shoes_103",
        name: "Retro Runner Chunky Sneaker Low",
        category: "SHOES",
        subCategory: "Giày Thể Thao",
        price: 1250000,
        color: "Xám / Trắng",
        colorHex: "#D1D5DB",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
        brand: "New Balance 550"
      },
      {
        id: 104,
        polyvoreId: "pv_acc_104",
        name: "Minimalist Silver Chain & Ring",
        category: "ACCESSORY",
        subCategory: "Phụ Kiện Kim Loại",
        price: 290000,
        color: "Bạc",
        colorHex: "#E5E7EB",
        imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        brand: "Polyvore Accessories"
      }
    ]
  },
  {
    id: 'polyvore-look-2',
    outfitId: '194202_polyvore',
    name: "Classic Grey Sweatshirt & Denim",
    style: "CASUAL",
    occasion: "STREET",
    season: "Thu - Đông",
    harmonyScore: 96.5,
    model: {
      name: "Daniel - 1m78 (Size M)",
      gender: "MEN",
      fullBodyUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
      transparentModelUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80"
    },
    items: [
      {
        id: 105,
        polyvoreId: "pv_top_105",
        name: "Washed French Terry Sweatshirt Heather Grey",
        category: "TOP",
        subCategory: "Áo Nỉ Chui Đầu",
        price: 620000,
        color: "Xám Tiêu",
        colorHex: "#9CA3AF",
        imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
        brand: "Fear of God Essentials"
      },
      {
        id: 106,
        polyvoreId: "pv_bottom_106",
        name: "Relaxed Straight-Leg Indigo Jeans",
        category: "BOTTOM",
        subCategory: "Quần Jeans Indigo",
        price: 720000,
        color: "Xanh Indigo",
        colorHex: "#2563EB",
        imageUrl: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80",
        brand: "Levi's 501 Vintage"
      },
      {
        id: 107,
        polyvoreId: "pv_shoes_107",
        name: "Vintage Canvas High-Top Sneaker",
        category: "SHOES",
        subCategory: "Giày Canvas",
        price: 950000,
        color: "Đen",
        colorHex: "#111827",
        imageUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80",
        brand: "Converse Chuck 70"
      }
    ]
  },
  {
    id: 'polyvore-look-3',
    outfitId: '194203_polyvore',
    name: "Earth Tone Knit & Khaki Trousers",
    style: "MINIMALIST",
    occasion: "WORK",
    season: "Thu - Đông",
    harmonyScore: 97.4,
    model: {
      name: "Ethan - 1m80 (Size L)",
      gender: "MEN",
      fullBodyUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80",
      transparentModelUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80"
    },
    items: [
      {
        id: 108,
        polyvoreId: "pv_top_108",
        name: "Relaxed Olive Green Crewneck Sweater",
        category: "TOP",
        subCategory: "Áo Len Dệt Kim",
        price: 690000,
        color: "Xanh Rêu",
        colorHex: "#556B2F",
        imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
        brand: "COS Minimalist"
      },
      {
        id: 109,
        polyvoreId: "pv_bottom_109",
        name: "Pleated Wide-Leg Camel Trousers",
        category: "BOTTOM",
        subCategory: "Quần Tây Ống Rộng",
        price: 850000,
        color: "Nâu Camel",
        colorHex: "#C19A6B",
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80",
        brand: "Lemaire Inspired"
      },
      {
        id: 110,
        polyvoreId: "pv_shoes_110",
        name: "Suede Leather Penny Loafers Caramel",
        category: "SHOES",
        subCategory: "Giày Loafer Da Lộn",
        price: 1390000,
        color: "Caramel",
        colorHex: "#8B5A2B",
        imageUrl: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
        brand: "Bespoke Collection"
      }
    ]
  },
  {
    id: 'polyvore-look-4',
    outfitId: '194204_polyvore',
    name: "Parisian Tailored Chic Blazer",
    style: "FORMAL",
    occasion: "WORK",
    season: "Thu - Đông",
    harmonyScore: 99.1,
    model: {
      name: "Camille - 1m70 (Size S)",
      gender: "WOMEN",
      fullBodyUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      transparentModelUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
    },
    items: [
      {
        id: 111,
        polyvoreId: "pv_top_111",
        name: "Double-Breasted Wool Blazer Beige",
        category: "TOP",
        subCategory: "Áo Blazer Dạ",
        price: 1150000,
        color: "Beige Sữa",
        colorHex: "#E6D5B8",
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
        brand: "The Frankie Shop"
      },
      {
        id: 112,
        polyvoreId: "pv_bottom_112",
        name: "High-Waist Tailored Trousers Noir",
        category: "BOTTOM",
        subCategory: "Quần Suông Cao Cấp",
        price: 680000,
        color: "Đen",
        colorHex: "#0F172A",
        imageUrl: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80",
        brand: "Polyvore Tailoring"
      },
      {
        id: 113,
        polyvoreId: "pv_shoes_113",
        name: "Pointed-Toe Leather Pumps Nude",
        category: "SHOES",
        subCategory: "Giày Cao Gót",
        price: 890000,
        color: "Nude",
        colorHex: "#E2C4B1",
        imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
        brand: "Jimmy Choo Style"
      }
    ]
  },
  {
    id: 'polyvore-look-5',
    outfitId: '194205_polyvore',
    name: "Total Black Street Boxy",
    style: "STREETWEAR",
    occasion: "STREET",
    season: "Xuân - Hè",
    harmonyScore: 95.8,
    model: {
      name: "Leo - 1m84 (Size XL)",
      gender: "MEN",
      fullBodyUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
      transparentModelUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
    },
    items: [
      {
        id: 114,
        polyvoreId: "pv_top_114",
        name: "Heavy Heavyweight Boxy Tee Washed Black",
        category: "TOP",
        subCategory: "Áo Thun Đen Washed",
        price: 490000,
        color: "Đen Washed",
        colorHex: "#1C1917",
        imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
        brand: "Yeezy Season Style"
      },
      {
        id: 115,
        polyvoreId: "pv_bottom_115",
        name: "Wide Skater Denim Bleached Blue",
        category: "BOTTOM",
        subCategory: "Quần Jeans Skater",
        price: 820000,
        color: "Xanh Bleached",
        colorHex: "#60A5FA",
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
        brand: "Stüssy Inspired"
      },
      {
        id: 116,
        polyvoreId: "pv_shoes_116",
        name: "Low Skate Sneaker Black & White",
        category: "SHOES",
        subCategory: "Giày Trượt Ván",
        price: 1190000,
        color: "Đen / Trắng",
        colorHex: "#000000",
        imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
        brand: "Vans Knu Skool"
      }
    ]
  }
];

// Trích xuất toàn bộ sản phẩm từ các Look Polyvore để làm danh mục sản phẩm chung
export const MOCK_PRODUCTS = POLYVORE_LOOKS.flatMap(look => 
  look.items.map(item => ({
    ...item,
    description: `Sản phẩm chuẩn hóa từ Polyvore Outfits Dataset (${item.brand}). Chất liệu cao cấp, độ rủ tự nhiên chuẩn phom dáng runway.`,
    gender: look.model.gender,
    style: look.style,
    occasion: look.occasion,
    size: "S, M, L, XL",
    modelImageUrl: look.model.fullBodyUrl,
    rating: 4.9,
    reviewCount: 38,
    inStock: true
  }))
);

export const MOCK_OUTFITS = POLYVORE_LOOKS.map(look => ({
  id: look.id,
  name: look.name,
  description: `Set đồ phong cách ${look.style} chuẩn hóa từ bộ dữ liệu Polyvore Outfits, tương thích màu sắc và tỉ lệ cơ thể đạt ${look.harmonyScore}%.`,
  occasion: look.occasion,
  style: look.style,
  gender: look.model.gender,
  season: look.season,
  harmonyScore: look.harmonyScore,
  aiStylistAdvice: `Bản phối này sử dụng tỉ lệ đối nghịch phom dáng (Relaxed/Boxy) kết hợp bảng màu trung tính, tạo ấn tượng hiện đại phóng khoáng.`,
  previewImageUrl: look.model.fullBodyUrl,
  products: look.items,
  totalPrice: look.items.reduce((sum, item) => sum + item.price, 0)
}));

export const PRESET_MODELS = POLYVORE_LOOKS.map((look, idx) => ({
  id: `model-${idx + 1}`,
  name: look.model.name,
  gender: look.model.gender,
  imageUrl: look.model.fullBodyUrl,
  stats: `${look.name} • Polyvore Runway Model`
}));
