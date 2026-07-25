import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  CreditCard, 
  Wallet, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  MessageSquare, 
  Clock, 
  Sparkles,
  Building,
  Upload
} from 'lucide-react';
import { OrderItem, PaymentMethod, Order } from '../types';
import { formatRupiah, createWALink, generateWAMessage } from '../utils/formatters';
import { createOrder } from '../utils/storage';

interface CheckoutModalProps {
  orderItem: OrderItem;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  orderItem,
  onClose,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [copiedBank, setCopiedBank] = useState(false);
  const [qrisPaid, setQrisPaid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !shippingAddress) {
      alert('Mohon lengkapi Nama, No. WhatsApp, dan Alamat Pengiriman!');
      return;
    }

    setIsSubmitting(true);

    const createdOrder = createOrder({
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'pelanggan@gmail.com',
      shippingAddress,
      items: [orderItem],
      totalAmount: orderItem.totalPrice,
      paymentMethod,
      paymentStatus: qrisPaid ? 'PAID' : 'PENDING',
      orderStatus: qrisPaid ? 'CONFIRMED' : 'PENDING',
    });

    setIsSubmitting(false);

    // Open WhatsApp automatically
    const waText = generateWAMessage(createdOrder, 'NEW_ORDER');
    const waUrl = createWALink('6287878224307', waText);
    window.open(waUrl, '_blank');

    onOrderSuccess(createdOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-[#16161C] border border-stone-800/90 rounded-none w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl my-6">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#18181E] px-6 py-4 border-b border-stone-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-[#E6C88B] tracking-widest flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              DIGITAL PAYMENT & CHECKOUT
            </span>
            <h3 className="text-lg font-extrabold text-white">Konfirmasi Pemesanan & Pembayaran</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-none bg-stone-800/80 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          
          {/* Order Summary Box */}
          <div className="bg-[#1B1B22] border border-[#D4A359]/25 rounded-none p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Ringkasan Item:
              </span>
              <h4 className="font-extrabold text-white text-sm">
                {orderItem.productName} ({orderItem.quantity} {orderItem.size ? orderItem.size : ''})
              </h4>
              <p className="text-xs text-stone-400">
                Bahan: <span className="text-[#E6C88B] font-medium">{orderItem.material}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Total Tagihan:
              </span>
              <span className="text-2xl font-black text-[#E6C88B]">
                {formatRupiah(orderItem.totalPrice)}
              </span>
            </div>
          </div>

          {/* Section 1: Customer Contact Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#E6C88B] border-b border-stone-800 pb-1">
              1. Data Pemesan & Alamat Pengiriman
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-300 block mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#1B1B22] border border-stone-800 rounded-none p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-300 block mb-1">
                  No. WhatsApp / HP *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 087878224307"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#1B1B22] border border-stone-800 rounded-none p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-stone-300 block mb-1">
                  Email (Untuk Laporan Struk Pembayaran)
                </label>
                <input
                  type="email"
                  placeholder="e.g. pemesan@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-[#1B1B22] border border-stone-800 rounded-none p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-stone-300 block mb-1">
                  Alamat Lengkap Pengiriman *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Nama Jalan, Nomor Rumah, Kecamatan, Kota / Kab, Kode Pos..."
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-[#1B1B22] border border-stone-800 rounded-none p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4A359]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Select Digital Payment Method */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#E6C88B] border-b border-stone-800 pb-1">
              2. Metode Pembayaran Digital Aman & Cepat
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('qris')}
                className={`p-3 rounded-none border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'qris'
                    ? 'bg-[#D4A359]/20 border-[#D4A359] text-[#E6C88B] font-bold'
                    : 'bg-[#1B1B22] border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <QrCode className="w-5 h-5 text-[#E6C88B]" />
                <span className="text-xs">QRIS All Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bca')}
                className={`p-3 rounded-none border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'bca'
                    ? 'bg-[#D4A359]/20 border-[#D4A359] text-[#E6C88B] font-bold'
                    : 'bg-[#1B1B22] border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <Building className="w-5 h-5 text-[#E6C88B]" />
                <span className="text-xs">Bank BCA</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('mandiri')}
                className={`p-3 rounded-none border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'mandiri'
                    ? 'bg-[#D4A359]/20 border-[#D4A359] text-[#E6C88B] font-bold'
                    : 'bg-[#1B1B22] border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#E6C88B]" />
                <span className="text-xs">Bank Mandiri</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('gopay')}
                className={`p-3 rounded-none border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'gopay'
                    ? 'bg-[#D4A359]/20 border-[#D4A359] text-[#E6C88B] font-bold'
                    : 'bg-[#1B1B22] border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <Wallet className="w-5 h-5 text-[#E6C88B]" />
                <span className="text-xs">GoPay / OVO / Dana</span>
              </button>
            </div>

            {/* Dynamic Payment Instruction Panel */}
            <div className="bg-[#1B1B22] border border-stone-800 rounded-none p-4 space-y-3">
              
              {/* QRIS Display */}
              {paymentMethod === 'qris' && (
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#D4A359]/10 text-[#E6C88B] text-xs font-bold border border-[#D4A359]/20">
                    <Clock className="w-3.5 h-3.5" />
                    Batas Pembayaran: {formatTimer(timeLeft)}
                  </div>

                  <div className="w-48 h-48 bg-white p-3 mx-auto rounded-none shadow-lg border border-stone-700 flex flex-col items-center justify-center">
                    {/* Simulated QRIS Code SVG */}
                    <div className="text-stone-900 text-center">
                      <QrCode className="w-32 h-32 mx-auto text-stone-950" />
                      <span className="text-[10px] font-black tracking-widest text-stone-700 block mt-1">
                        NMID: ID102938475612
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-stone-300 space-y-1">
                    <p className="font-bold">Scan QRIS menggunakan GoPay, OVO, Dana, ShopeePay, BCA Mobile, Livin, dll.</p>
                    <p className="text-stone-400">Atas Nama: <strong className="text-[#E6C88B]">Digiwork Merchandise</strong></p>
                  </div>

                  {!qrisPaid ? (
                    <button
                      type="button"
                      onClick={() => setQrisPaid(true)}
                      className="px-4 py-2 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 inline-flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Simulasi Pembayaran QRIS Selesai</span>
                    </button>
                  ) : (
                    <div className="p-2.5 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs inline-flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Pembayaran QRIS Terverifikasi Otomatis!
                    </div>
                  )}
                </div>
              )}

              {/* Bank Transfer BCA / Mandiri */}
              {(paymentMethod === 'bca' || paymentMethod === 'mandiri') && (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-none bg-stone-900 border border-stone-800">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">
                        Nomor Rekening {paymentMethod.toUpperCase()}
                      </span>
                      <span className="text-base font-black text-[#E6C88B] tracking-wider">
                        {paymentMethod === 'bca' ? '884-012-3482' : '137-00-1829-4820'}
                      </span>
                      <span className="text-[11px] text-stone-400 block">a.n. Digiwork</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(paymentMethod === 'bca' ? '8840123482' : '1370018294820')}
                      className="px-3 py-1.5 rounded-none bg-stone-800 hover:bg-stone-700 text-[#E6C88B] font-bold text-xs flex items-center gap-1"
                    >
                      {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBank ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <p className="text-stone-400 text-[11px]">
                    Transfer tepat sejumlah <strong className="text-[#E6C88B]">{formatRupiah(orderItem.totalPrice)}</strong> untuk verifikasi cepat.
                  </p>
                </div>
              )}

              {/* GoPay / E-Wallet */}
              {paymentMethod === 'gopay' && (
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-none bg-stone-900 border border-stone-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">Nomor E-Wallet GoPay / Dana / OVO</span>
                      <span className="text-base font-black text-[#E6C88B] tracking-wider">0878-7822-4307</span>
                      <span className="text-[11px] text-stone-400 block">a.n. Digiwork</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('087878224307')}
                      className="px-3 py-1.5 rounded-none bg-stone-800 hover:bg-stone-700 text-[#E6C88B] font-bold text-xs flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin No. HP</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-stone-400">
              *Setelah mengklik tombol, Anda akan terhubung ke WhatsApp otomatis untuk pengiriman invoice.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Kirim Pesanan via WhatsApp (+62 878 7822 4307)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
