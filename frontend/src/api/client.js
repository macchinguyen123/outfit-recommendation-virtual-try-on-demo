import axios from 'axios';

// Mô hình AI Diffusion (CatVTON) cần từ 40s - 120s để xử lý trên GPU
// Nên timeout cần đặt đủ dài (5 phút = 300,000ms) để đợi GPU trả ảnh thật về
const api = axios.create({
  baseURL: '/api',
  timeout: 300000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
