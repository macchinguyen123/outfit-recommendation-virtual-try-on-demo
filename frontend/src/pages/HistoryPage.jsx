import React, { useEffect, useState } from 'react';
import { Clock, ArrowRight, History } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';
import { tryonApi } from '../api/tryonApi';

export default function HistoryPage({ setActiveTab }) {
  const { history, setTryOnResult } = useTryOn();
  const [remoteHistory, setRemoteHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(false);
      const res = await tryonApi.getRecentSessions();
      if (res && res.length > 0) {
        setRemoteHistory(res);
      }
    };
    fetchHistory();
  }, []);

  const displayList = history.length > 0 ? history : remoteHistory;

  const handleReview = (session) => {
    setTryOnResult(session);
    setActiveTab('tryon');
  };

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-[#EAEAEA] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#71717A] block">
            CatVTON Sessions
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#111111] mt-1">
            Try-On History<span className="text-[#71717A]">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-2">
            Lịch sử các phiên thử đồ CatVTON đã thực hiện trên GPU.
          </p>
        </div>
      </div>

      {displayList.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-white border border-[#EAEAEA] studio-shadow">
          <History className="w-8 h-8 text-[#A1A1AA] mx-auto mb-2" />
          <h3 className="text-sm font-medium text-black">Chưa có phiên thử đồ nào</h3>
          <p className="text-xs text-[#71717A] mt-1 mb-4">
            Hãy bắt đầu bằng cách chọn một set đồ ở tab "Try the Look".
          </p>
          <button
            onClick={() => setActiveTab('look')}
            className="px-4 py-2 rounded-lg bg-[#111111] hover:bg-black text-white text-xs font-medium"
          >
            Đến "Try the Look"
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#EAEAEA] studio-shadow overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-[3/4] bg-[#F9F9F9] overflow-hidden">
                <img
                  src={item.resultImageUrl}
                  alt="Session Result"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#71717A] font-mono mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date().toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h4 className="text-xs font-medium text-black line-clamp-1">
                    {item.topProductName || item.dressProductName || 'CatVTON Session'}
                  </h4>
                  <span className="text-[10px] text-[#71717A] font-mono block">
                    Model: {item.aiModelUsed || 'CatVTON (Diffusion)'}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#EAEAEA] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-600 font-medium">SUCCESS</span>
                  <button
                    onClick={() => handleReview(item)}
                    className="px-3 py-1.5 rounded-md border border-[#D4D4D8] hover:border-black text-xs font-medium text-black flex items-center gap-1 transition-all"
                  >
                    <span>Xem lại</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
