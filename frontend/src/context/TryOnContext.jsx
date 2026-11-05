import React, { createContext, useContext, useState } from 'react';
import { PRESET_MODELS } from '../data/mockData';
import { tryonApi } from '../api/tryonApi';

const TryOnContext = createContext();

export const TryOnProvider = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState(PRESET_MODELS[0]);
  const [customModelUrl, setCustomModelUrl] = useState(null);

  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedDress, setSelectedDress] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [tryOnResult, setTryOnResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Thêm trang phục vào buồng thử
  const selectGarment = (product) => {
    if (product.category === 'TOP') {
      setSelectedTop(product);
      setSelectedDress(null); // Bỏ đầm nếu chọn áo riêng
    } else if (product.category === 'BOTTOM') {
      setSelectedBottom(product);
      setSelectedDress(null); // Bỏ đầm nếu chọn quần riêng
    } else if (product.category === 'DRESS') {
      setSelectedDress(product);
      setSelectedTop(null);
      setSelectedBottom(null);
    }
  };

  const removeGarment = (category) => {
    if (category === 'TOP') setSelectedTop(null);
    if (category === 'BOTTOM') setSelectedBottom(null);
    if (category === 'DRESS') setSelectedDress(null);
  };

  // Áp dụng nguyên một set outfit mẫu vào buồng thử
  const applyOutfit = (outfit) => {
    outfit.products.forEach(p => {
      selectGarment(p);
    });
  };

  // Khởi chạy AI Virtual Try-On
  const runVirtualTryOn = async () => {
    const activePersonImage = customModelUrl || selectedModel.imageUrl;

    if (!selectedTop && !selectedBottom && !selectedDress) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm (Áo, Quần hoặc Đầm) để bắt đầu thử đồ ảo!");
      return;
    }

    setIsGenerating(true);
    setProcessingStep('1/3: Phân tích khung xương và góc chụp (Human Pose Estimation)...');

    const stepTimer1 = setTimeout(() => {
      setProcessingStep('2/3: Bóc tách nếp vải và uốn phối 3D (Geometric Cloth Warping)...');
    }, 600);

    const stepTimer2 = setTimeout(() => {
      setProcessingStep('3/3: Mô hình Diffusion tạo ánh sáng chân thực (IDM-VTON Rendering)...');
    }, 1200);

    try {
      const payload = {
        personImageUrl: activePersonImage,
        topProductId: selectedTop?.id,
        bottomProductId: selectedBottom?.id,
        dressProductId: selectedDress?.id,
      };

      const result = await tryonApi.executeTryOn(payload);
      setTryOnResult(result);

      // Lưu vào lịch sử phiên
      setHistory(prev => [result, ...prev]);

    } catch (error) {
      console.error("Lỗi thử đồ ảo:", error);
      alert("Đã xảy ra lỗi khi kết nối buồng thử AI.");
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsGenerating(false);
      setProcessingStep('');
    }
  };

  const totalSelectedCount = (selectedTop ? 1 : 0) + (selectedBottom ? 1 : 0) + (selectedDress ? 1 : 0);

  return (
    <TryOnContext.Provider value={{
      selectedModel,
      setSelectedModel,
      customModelUrl,
      setCustomModelUrl,
      selectedTop,
      selectedBottom,
      selectedDress,
      selectGarment,
      removeGarment,
      applyOutfit,
      runVirtualTryOn,
      isGenerating,
      processingStep,
      tryOnResult,
      setTryOnResult,
      history,
      totalSelectedCount
    }}>
      {children}
    </TryOnContext.Provider>
  );
};

export const useTryOn = () => useContext(TryOnContext);

