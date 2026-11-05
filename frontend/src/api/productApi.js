import api from './client';
import { MOCK_PRODUCTS } from '../data/mockData';

export const productApi = {
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data && response.data.length > 0 ? response.data : MOCK_PRODUCTS;
    } catch (error) {
      console.warn('Backend unavailable, using mock products:', error);
      let list = [...MOCK_PRODUCTS];
      if (params.category) {
        list = list.filter(p => p.category === params.category);
      }
      if (params.style) {
        list = list.filter(p => p.style === params.style);
      }
      if (params.keyword) {
        const kw = params.keyword.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw));
      }
      return list;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return MOCK_PRODUCTS.find(p => p.id === Number(id)) || MOCK_PRODUCTS[0];
    }
  }
};

