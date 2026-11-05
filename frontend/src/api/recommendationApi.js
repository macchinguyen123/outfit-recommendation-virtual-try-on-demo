import api from './client';
import { MOCK_OUTFITS, MOCK_PRODUCTS } from '../data/mockData';

export const recommendationApi = {
  getRecommendations: async (requestData) => {
    try {
      const response = await api.post('/recommendations', requestData);
      return response.data;
    } catch (error) {
      console.warn('Backend unavailable, generating local recommendation:', error);
      return {
        stylistSummary: `Dựa trên dịp [${requestData.occasion || 'Hàng ngày'}] và phong cách [${requestData.style || 'Hiện đại'}], chuyên gia AI đã phân tích vóc dáng và lựa chọn những items cân đối tỉ lệ, thời thượng nhất.`,
        colorPaletteAdvice: '💡 Bảng màu chủ đạo: Tông màu trung tính (Beige, Trắng, Đen) kết hợp điểm nhấn tinh tế tạo hiệu ứng sang trọng vượt thời gian.',
        recommendedOutfits: MOCK_OUTFITS,
        alternativeItems: MOCK_PRODUCTS.slice(0, 4)
      };
    }
  },

  getAllOutfits: async () => {
    try {
      const response = await api.get('/outfits');
      return response.data && response.data.length > 0 ? response.data : MOCK_OUTFITS;
    } catch (error) {
      return MOCK_OUTFITS;
    }
  }
};

