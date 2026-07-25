import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBento } from './components/HeroBento';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Footer } from './components/Footer';
import { Product, Order, OrderItem, VisitorInfo } from './types';
import { getProducts, getOrders, trackDailyVisit, getVisitorInfo } from './utils/storage';
import { 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  ShoppingBag, 
  Search, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { formatRupiah, createWALink, generateWAMessage } from './utils/formatters';

export default function App() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'catalog' | 'tracker' | 'admin'>('portfolio');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo>({
    totalVisitorsToday: 365,
    activeOnlineUsers: 6,
    totalAllTimeVisits: 14850,
  });

  // Modal states
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedOrderItemForCheckout, setSelectedOrderItemForCheckout] = useState<OrderItem | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);

  // Success Notification banner
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Initialize and track visit on mount + setup hidden admin shortcuts
  useEffect(() => {
    const info = trackDailyVisit();
    setVisitorInfo(info);
    setProducts(getProducts());
    setOrders(getOrders());

    // Check URL hash or query for admin access
    const checkHashOrQuery = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setActiveTab('admin');
      }
    };
    checkHashOrQuery();
    window.addEventListener('hashchange', checkHashOrQuery);

    // Keyboard shortcut: Ctrl + Shift + A or Cmd + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActiveTab((prev) => (prev === 'admin' ? 'portfolio' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHashOrQuery);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const refreshData = () => {
    setProducts(getProducts());
    setOrders(getOrders());
    setVisitorInfo(getVisitorInfo());
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setLastCreatedOrder(newOrder);
    setSelectedOrderItemForCheckout(null);
    setSelectedProductForDetail(null);
    refreshData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToKatalog = () => {
    const el = document.getElementById('katalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCekOrder = () => {
    const el = document.getElementById('cek-order');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#121216] text-stone-100 font-sans selection:bg-[#D4A359] selection:text-stone-950 flex flex-col justify-between relative">
      
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        visitorInfo={visitorInfo}
        cartCount={0}
        onOpenCart={scrollToKatalog}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLoginToggle={() => setIsAdminLoggedIn(!isAdminLoggedIn)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full space-y-16">
        
        {/* Success Banner if Order Created */}
        {lastCreatedOrder && (
          <div className="p-6 bg-[#16161C] border-l-4 border-l-emerald-500 border border-stone-800 rounded-none shadow-2xl space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-emerald-500 text-stone-950 font-black flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    Pesanan Berhasil Dibuat! ID: <span className="text-[#E6C88B]">#{lastCreatedOrder.id}</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    Detail pesanan Anda senilai <strong className="text-white">{formatRupiah(lastCreatedOrder.totalAmount)}</strong> telah dicatat ke database & siap diproses.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setLastCreatedOrder(null)}
                className="text-xs text-stone-400 hover:text-white px-2.5 py-1 rounded-none bg-stone-900 border border-stone-800"
              >
                Tutup
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-stone-800">
              <a
                href={createWALink('6287878224307', generateWAMessage(lastCreatedOrder, 'NEW_ORDER'))}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Buka WhatsApp & Kirim Struk Pesanan</span>
              </a>

              <button
                onClick={scrollToCekOrder}
                className="px-4 py-2 rounded-none bg-stone-900 hover:bg-stone-800 text-[#E6C88B] font-bold text-xs border border-[#D4A359]/30 inline-flex items-center gap-1.5"
              >
                <span>Lacak Progress Pesanan Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ADMIN DASHBOARD VIEW (If activeTab === 'admin') */}
        {activeTab === 'admin' ? (
          <AdminDashboard
            products={products}
            orders={orders}
            onRefreshData={refreshData}
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
            onExitAdmin={() => setActiveTab('portfolio')}
          />
        ) : (
          /* UNIFIED LANDING PAGE FLOW */
          <>
            {/* 1. HERO BENTO SECTION */}
            <section id="hero" className="scroll-mt-24">
              <HeroBento onOrderNow={scrollToKatalog} />
            </section>

            {/* 2. PRODUCT CATALOG & PRICE LIST SECTION */}
            <section id="katalog" className="scroll-mt-24 pt-4 border-t border-stone-800/80">
              <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4A359]/10 border border-[#D4A359]/30 text-[#E6C88B] text-xs font-bold uppercase tracking-wider mb-2">
                    <ShoppingBag className="w-3.5 h-3.5" /> Price List & Live Ordering
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    Katalog Merchandise & Layanan Cetak
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Pilih kategori, atur jumlah & spesifikasi untuk menghitung estimasi harga transparan.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-600/30 px-3 py-2">
                  <Zap className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Bisa Tanpa Minimum Order & Siap Kirim Se-Indonesia</span>
                </div>
              </div>

              <ProductCatalog
                products={products}
                onSelectProduct={(product) => setSelectedProductForDetail(product)}
              />
            </section>

            {/* 3. ALUR PEMESANAN (4 EASY STEPS) */}
            <section id="alur-order" className="scroll-mt-24 pt-8 border-t border-stone-800/80">
              <div className="bg-[#16161C] border border-stone-800 p-6 sm:p-10 relative overflow-hidden">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4A359]/10 border border-[#D4A359]/30 text-[#E6C88B] text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Process Workflow
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    4 Langkah Mudah Pesan di Digiwork
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Proses pemesanan praktis, cepat, dan transparan dari awal hingga barang tiba di lokasi Anda.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Step 1 */}
                  <div className="bg-[#1C1C24] border border-stone-800 p-5 space-y-3 relative group hover:border-[#D4A359]/50 transition-all">
                    <div className="w-10 h-10 bg-[#D4A359] text-stone-950 font-black text-lg flex items-center justify-center">
                      01
                    </div>
                    <h3 className="font-extrabold text-white text-base">Konsultasi & Kirim Desain</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Pilih produk di katalog atau hubungi tim WhatsApp kami. Kirim file desain vector (AI/CDR/PDF/PNG HD).
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-[#1C1C24] border border-stone-800 p-5 space-y-3 relative group hover:border-[#D4A359]/50 transition-all">
                    <div className="w-10 h-10 bg-[#D4A359] text-stone-950 font-black text-lg flex items-center justify-center">
                      02
                    </div>
                    <h3 className="font-extrabold text-white text-base">Estimasi & Digital Mockup</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Tim kami memberikan kalkulasi harga resmi dan pratinjau mockup digital sebelum produksi berjalan.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-[#1C1C24] border border-stone-800 p-5 space-y-3 relative group hover:border-[#D4A359]/50 transition-all">
                    <div className="w-10 h-10 bg-[#D4A359] text-stone-950 font-black text-lg flex items-center justify-center">
                      03
                    </div>
                    <h3 className="font-extrabold text-white text-base">Cetak Presisi High Resolution</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Produksi dicetak menggunakan mesin profesional DTF / UV / Sublimasi dengan QC warna ketat.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-[#1C1C24] border border-stone-800 p-5 space-y-3 relative group hover:border-[#D4A359]/50 transition-all">
                    <div className="w-10 h-10 bg-[#D4A359] text-stone-950 font-black text-lg flex items-center justify-center">
                      04
                    </div>
                    <h3 className="font-extrabold text-white text-base">Packing Safe & Pengiriman</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Pesanan dikemas rapi & dikirim via ekspedisi terpercaya dengan nomor resi terintegrasi.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#E6C88B] shrink-0" />
                    <span className="text-xs font-semibold text-stone-300">
                      Garansi 100% Cetak Ulang atau Retur Jika Terdapat Cacat Produksi.
                    </span>
                  </div>
                  <a
                    href="https://wa.me/6287878224307?text=Halo%20Digiwork,%20saya%20ingin%20konsultasi%20order%20merchandise!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Mulai Konsultasi Gratis</span>
                  </a>
                </div>
              </div>
            </section>

            {/* 4. CEK STATUS ORDER / RESI SECTION */}
            <section id="cek-order" className="scroll-mt-24 pt-8 border-t border-stone-800/80">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4A359]/10 border border-[#D4A359]/30 text-[#E6C88B] text-xs font-bold uppercase tracking-wider mb-2">
                  <Search className="w-3.5 h-3.5" /> Order Tracking Engine
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Lacak Status Progress Pesanan
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Masukkan ID Pesanan atau Nomor WhatsApp Anda untuk melihat progress cetak, nomor resi, dan estimasi selesai.
                </p>
              </div>

              <OrderTracker orders={orders} />
            </section>
          </>
        )}

      </main>

      {/* Product Detail Modal */}
      {selectedProductForDetail && (
        <ProductDetailModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
          onProceedToCheckout={(orderItem) => {
            setSelectedProductForDetail(null);
            setSelectedOrderItemForCheckout(orderItem);
          }}
        />
      )}

      {/* Checkout Payment Modal */}
      {selectedOrderItemForCheckout && (
        <CheckoutModal
          orderItem={selectedOrderItemForCheckout}
          onClose={() => setSelectedOrderItemForCheckout(null)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6287878224307?text=Halo%20Digiwork,%20saya%20ingin%20tanya%20layanan%20desain%20dan%20cetak%20merchandise!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-2xl rounded-none border border-emerald-400/30 transition-all hover:scale-105 active:scale-95"
        title="Chat WhatsApp Digiwork"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-none h-3 w-3 bg-emerald-400"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">Konsultasi WA Fast Response</span>
      </a>

      {/* Footer */}
      <Footer onOpenAdmin={() => setActiveTab('admin')} />

    </div>
  );
}
