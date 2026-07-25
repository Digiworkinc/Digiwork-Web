import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  MessageSquare, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { getOrderStatusLabel, formatRupiah, formatDate, createWALink } from '../utils/formatters';

interface OrderTrackerProps {
  orders: Order[];
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orders }) => {
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const cleanInput = searchId.trim().toUpperCase();
    const found = orders.find(
      (o) => o.id.toUpperCase() === cleanInput ||
        o.id.toUpperCase() === `EA-${cleanInput}` ||
        o.customerPhone.includes(cleanInput)
    );
    setSearchedOrder(found || null);
  };

  const getStepProgress = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 1;
      case 'CONFIRMED':
        return 2;
      case 'IN_PRODUCTION':
        return 3;
      case 'SHIPPED':
        return 4;
      case 'COMPLETED':
        return 5;
      case 'CANCELLED':
        return 0;
    }
  };

  const currentStep = searchedOrder ? getStepProgress(searchedOrder.orderStatus) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#D4A359]/10 text-[#E6C88B] border border-[#D4A359]/20 text-xs font-bold uppercase tracking-widest">
          <Search className="w-3.5 h-3.5" />
          Real-Time Order Tracking
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wider">
          PELACAKAN STATUS PESANAN MERCHANDISE
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
          Masukkan ID Pesanan (contoh: <strong className="text-[#E6C88B]">EA-88492</strong>) atau Nomor WhatsApp Anda untuk melihat progress produksi sablon DTF & pengiriman.
        </p>
      </div>

      {/* Search Input Card */}
      <form onSubmit={handleSearch} className="bg-[#18181E] border border-stone-800 p-4 sm:p-6 rounded-none shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Masukkan ID Pesanan e.g. EA-88492 atau No HP..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full bg-[#141419] border border-stone-800 rounded-none pl-11 pr-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#D4A359] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#D4A359] hover:bg-[#C89B50] text-stone-950 font-extrabold text-xs rounded-none shadow-lg shadow-[#D4A359]/20 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Lacak Pesanan</span>
          </button>
        </div>

        {/* Quick Example IDs */}
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span>Contoh ID Aktif:</span>
          {orders.slice(0, 3).map((ord) => (
            <button
              key={ord.id}
              type="button"
              onClick={() => { setSearchId(ord.id); setSearchedOrder(ord); setHasSearched(true); }}
              className="px-2.5 py-1 rounded-none bg-stone-800 text-[#E6C88B] font-bold hover:bg-stone-700"
            >
              #{ord.id}
            </button>
          ))}
        </div>
      </form>

      {/* Results Section */}
      {hasSearched && (
        searchedOrder ? (
          <div className="bg-[#18181E] border border-stone-800 rounded-none p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                  Detail Pesanan #{searchedOrder.id}
                </span>
                <h3 className="text-xl font-black text-white">{searchedOrder.customerName}</h3>
                <span className="text-xs text-stone-400">
                  Dibuat pada: {formatDate(searchedOrder.createdAt)}
                </span>
              </div>

              {/* Status Badge */}
              {(() => {
                const { label, color, bg } = getOrderStatusLabel(searchedOrder.orderStatus);
                return (
                  <div className={`px-4 py-2 rounded-none border ${bg} text-xs font-black ${color} tracking-wider uppercase`}>
                    {label}
                  </div>
                );
              })()}
            </div>

            {/* Visual Step Timeline */}
            <div className="py-4">
              <div className="grid grid-cols-5 gap-2 relative">
                
                {/* Connector Line */}
                <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-stone-800 -z-0">
                  <div
                    className="h-full bg-[#D4A359] transition-all duration-500"
                    style={{ width: `${Math.max(0, (currentStep - 1) * 25)}%` }}
                  ></div>
                </div>

                {/* Steps */}
                {[
                  { title: 'Menunggu', desc: 'Pembayaran', step: 1 },
                  { title: 'Dikonfirmasi', desc: 'Terverifikasi', step: 2 },
                  { title: 'Produksi', desc: 'Sablon / Cetak', step: 3 },
                  { title: 'Pengiriman', desc: 'Siap Diambil', step: 4 },
                  { title: 'Selesai', desc: 'Diterima', step: 5 },
                ].map((s) => {
                  const isDone = currentStep >= s.step;
                  const isCurrent = currentStep === s.step;
                  return (
                    <div key={s.step} className="flex flex-col items-center text-center z-10 space-y-2">
                      <div
                        className={`w-9 h-9 rounded-none flex items-center justify-center font-bold text-xs transition-all ${
                          isDone
                            ? 'bg-[#D4A359] text-stone-950 shadow-lg shadow-[#D4A359]/30'
                            : 'bg-stone-800 text-stone-500 border border-stone-700'
                        } ${isCurrent ? 'ring-4 ring-[#D4A359]/20 scale-110' : ''}`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : s.step}
                      </div>
                      <div className="hidden sm:block">
                        <span className={`text-[11px] font-bold block ${isDone ? 'text-[#E6C88B]' : 'text-stone-500'}`}>
                          {s.title}
                        </span>
                        <span className="text-[9px] text-stone-500">{s.desc}</span>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* Items & Shipping Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-800">
              
              <div className="bg-[#1B1B22] p-4 rounded-none border border-stone-800 space-y-2">
                <h4 className="text-xs font-bold text-[#E6C88B] uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-4 h-4" />
                  Item Pesanan
                </h4>
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} className="text-xs space-y-1 border-b border-stone-800/80 pb-2 last:border-0">
                    <p className="font-extrabold text-white">{item.productName}</p>
                    <p className="text-stone-400">
                      Bahan: {item.material} | Ukuran: {item.size}
                    </p>
                    <p className="text-stone-400">
                      Jumlah: <strong className="text-[#E6C88B]">{item.quantity} pcs</strong> | Total: {formatRupiah(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#1B1B22] p-4 rounded-none border border-stone-800 space-y-2">
                <h4 className="text-xs font-bold text-[#E6C88B] uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  Alamat Pengiriman & Catatan
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {searchedOrder.shippingAddress}
                </p>
                {searchedOrder.adminNotes && (
                  <div className="p-2 bg-[#D4A359]/10 border border-[#D4A359]/20 rounded-none text-[11px] text-[#E6C88B] mt-2">
                    <strong>Catatan Studio:</strong> {searchedOrder.adminNotes}
                  </div>
                )}
              </div>

            </div>

            {/* WA Inquiry Button */}
            <div className="pt-2 flex justify-end">
              <a
                href={createWALink(
                  '6287878224307',
                  `Halo Digiwork, saya ingin menanyakan progress pesanan saya dengan ID #${searchedOrder.id}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tanyakan Progress via WhatsApp</span>
              </a>
            </div>

          </div>
        ) : (
          <div className="bg-[#18181E] border border-stone-800 rounded-none p-10 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-[#E6C88B] mx-auto" />
            <h3 className="text-base font-bold text-white">Pesanan Tidak Ditemukan</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              ID Pesanan atau Nomor HP tidak terdaftar. Periksa kembali penulisan ID Anda (misal: EA-88492).
            </p>
          </div>
        )
      )}

    </div>
  );
};
