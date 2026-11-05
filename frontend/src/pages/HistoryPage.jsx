import React, { useEffect, useState } from 'react';
import { History, Sparkles, Clock, ArrowRight, ExternalLink } from 'lucide-react';
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
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">Lịch Sử Thử Đồ Ảo</h1>
        <p className="text-sm text-slate-400 mt-1">
          Xem lại các bức ảnh phối đồ AI đã tạo và so sánh phong cách
        </p>
      </div>

      {displayList.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-fashion-card border border-fashion-border">
          <History className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Chưa có phiên thử đồ nào</h3>
          <p className="text-sm text-slate-400 mt-1 mb-6">
            Hãy vào buồng thử đồ và khởi chạy AI Virtual Try-On lần đầu tiên.
          </p>
          <button
            onClick={() => setActiveTab('tryon')}
            className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg"
          >
            Vào Buồng Thử Đồ Ảo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-fashion-card border border-fashion-border overflow-hidden hover:border-brand-500/50 transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] bg-slate-900 overflow-hidden">
                <img
                  src={item.resultImageUrl}
                  alt="Session Result"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono font-bold text-brand-300">
                  {item.executionTimeMs || 1400}ms
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date().toLocaleDateString('vi-VN')}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white line-clamp-1">
                    {item.topProductName || item.dressProductName || 'Phiên Thử Đồ AI'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    Mô hình: {item.aiModelUsed || 'IDM-VTON'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-fashion-border/50 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-emerald-400">Hoàn tất</span>
                  <button
                    onClick={() => handleReview(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    Xem lại kết quả <ArrowRight className="w-3 h-3" />
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

