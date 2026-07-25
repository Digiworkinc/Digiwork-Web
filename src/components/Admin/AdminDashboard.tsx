import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Mail, 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Send, 
  RefreshCw, 
  Eye, 
  Check, 
  X,
  FileSpreadsheet,
  AlertCircle,
  Calendar,
  Lock,
  Sparkles
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Product, Order, OrderStatus, DailyVisit, DailySale, WeeklyEmailReport } from '../../types';
import { formatRupiah, formatDate, getOrderStatusLabel, generateWAMessage, createWALink } from '../../utils/formatters';
import { 
  saveProduct, 
  deleteProduct, 
  updateOrderStatus, 
  generateWeeklyReport, 
  getDailyVisits, 
  getDailySales, 
  getWeeklyReports 
} from '../../utils/storage';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onRefreshData: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  onExitAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  onRefreshData,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  onExitAdmin,
}) => {
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [adminTab, setAdminTab] = useState<'overview' | 'orders' | 'products' | 'analytics' | 'reports'>('overview');

  // Product modal state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Email report state
  const [recipientEmail, setRecipientEmail] = useState('digiwork.inc@gmail.com');
  const [recentReports, setRecentReports] = useState<WeeklyEmailReport[]>(getWeeklyReports());
  const [reportSentSuccess, setReportSentSuccess] = useState(false);

  // Status Filter for Orders
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');

  const dailyVisits = getDailyVisits();
  const dailySales = getDailySales();

  // Passcode verification
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === 'admin' || passcode === 'digiwork') {
      setIsAdminLoggedIn(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Password Admin salah. Silakan coba lagi.');
    }
  };

  // Save/Edit Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.basePrice) return;

    const fullProduct: Product = {
      id: editingProduct.id || `prod-${Date.now()}`,
      name: editingProduct.name,
      category: editingProduct.category || 'Kaos DTF',
      description: editingProduct.description || '',
      basePrice: Number(editingProduct.basePrice),
      unit: editingProduct.unit || 'pcs',
      minOrder: Number(editingProduct.minOrder) || 1,
      imageUrl: editingProduct.imageUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      materials: editingProduct.materials || ['Standard Material'],
      sizes: editingProduct.sizes || ['Standard Size'],
      leadTime: editingProduct.leadTime || '1 - 2 Hari Kerja',
      active: editingProduct.active ?? true,
      salesCount: editingProduct.salesCount || 0,
    };

    saveProduct(fullProduct);
    onRefreshData();
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini dari katalog?')) {
      deleteProduct(id);
      onRefreshData();
    }
  };

  // Change Order Status
  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    onRefreshData();
  };

  // Generate Weekly Email Report
  const handleTriggerWeeklyReport = () => {
    const report = generateWeeklyReport(recipientEmail);
    setRecentReports(getWeeklyReports());
    setReportSentSuccess(true);
    setTimeout(() => setReportSentSuccess(false), 4000);
  };

  // Calculate totals
  const totalOmzet = orders.reduce((sum, o) => sum + (o.paymentStatus === 'PAID' ? o.totalAmount : 0), 0);
  const totalOrdersCount = orders.length;
  const totalVisitsToday = dailyVisits[dailyVisits.length - 1]?.visits || 365;

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 bg-[#18181E] border border-stone-800 p-8 rounded-none shadow-2xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-none bg-[#D4A359]/10 border border-[#D4A359]/30 text-[#E6C88B] flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">Login Dashboard Admin</h3>
          <p className="text-xs text-stone-400 mt-1">
            Masuk untuk mengelola produk, pesanan, notifikasi WhatsApp & laporan email mingguan.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Masukkan Password Admin"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-[#141419] border border-stone-800 rounded-none p-3 text-center text-sm font-bold text-white tracking-widest focus:outline-none focus:border-[#D4A359]"
            />
            {passcodeError && (
              <p className="text-xs text-rose-400 font-bold mt-2">{passcodeError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D4A359] hover:bg-[#C89B50] text-stone-950 font-black text-xs rounded-none transition-all shadow-lg shadow-[#D4A359]/20"
          >
            Masuk Dashboard Studio
          </button>
        </form>
      </div>
    );
  }

  const filteredOrders = orders.filter((o) =>
    orderStatusFilter === 'ALL' ? true : o.orderStatus === orderStatusFilter
  );

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-none bg-emerald-500 animate-ping"></span>
            REAL-TIME ADMIN PANEL ACTIVE
          </span>
          <h2 className="text-2xl font-black text-white">Dashboard Owner - Digiwork</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onExitAdmin && (
            <button
              onClick={onExitAdmin}
              className="px-3.5 py-2 rounded-none bg-[#D4A359] text-stone-950 hover:bg-[#C89B50] text-xs font-black flex items-center gap-1.5 shadow-md"
            >
              <span>← Kembali ke Website</span>
            </button>
          )}

          <button
            onClick={onRefreshData}
            className="px-3.5 py-2 rounded-none bg-stone-800 text-stone-300 hover:text-white text-xs font-bold flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Data</span>
          </button>

          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="px-3.5 py-2 rounded-none bg-rose-950/60 border border-rose-800/50 text-rose-300 hover:bg-rose-900 text-xs font-bold"
          >
            Keluar PIN
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 overflow-x-auto pb-2">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2.5 rounded-none text-xs font-bold transition-all border shrink-0 ${
            adminTab === 'overview'
              ? 'bg-[#D4A359] text-stone-950 border-[#D4A359]'
              : 'bg-[#18181E] text-stone-300 border-stone-800 hover:border-stone-700'
          }`}
        >
          Overview & KPI
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`px-4 py-2.5 rounded-none text-xs font-bold transition-all border shrink-0 relative ${
            adminTab === 'orders'
              ? 'bg-[#D4A359] text-stone-950 border-[#D4A359]'
              : 'bg-[#18181E] text-stone-300 border-stone-800 hover:border-stone-700'
          }`}
        >
          Kelola Pesanan Real-Time
          <span className="ml-2 px-1.5 py-0.5 rounded-none bg-stone-900 text-[#E6C88B] text-[10px] font-extrabold">
            {orders.length}
          </span>
        </button>

        <button
          onClick={() => setAdminTab('products')}
          className={`px-4 py-2.5 rounded-none text-xs font-bold transition-all border shrink-0 ${
            adminTab === 'products'
              ? 'bg-[#D4A359] text-stone-950 border-[#D4A359]'
              : 'bg-[#18181E] text-stone-300 border-stone-800 hover:border-stone-700'
          }`}
        >
          Kelola Produk & Harga
        </button>

        <button
          onClick={() => setAdminTab('analytics')}
          className={`px-4 py-2.5 rounded-none text-xs font-bold transition-all border shrink-0 ${
            adminTab === 'analytics'
              ? 'bg-[#D4A359] text-stone-950 border-[#D4A359]'
              : 'bg-[#18181E] text-stone-300 border-stone-800 hover:border-stone-700'
          }`}
        >
          Statistik Penjualan & Traffic
        </button>

        <button
          onClick={() => setAdminTab('reports')}
          className={`px-4 py-2.5 rounded-none text-xs font-bold transition-all border shrink-0 ${
            adminTab === 'reports'
              ? 'bg-[#D4A359] text-stone-950 border-[#D4A359]'
              : 'bg-[#18181E] text-stone-300 border-stone-800 hover:border-stone-700'
          }`}
        >
          Laporan Otomatis Email Mingguan
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#18181E] border border-stone-800 p-5 rounded-none space-y-2">
              <span className="text-[10px] font-black uppercase text-stone-500 tracking-wider">
                Total Omzet Terverifikasi
              </span>
              <div className="text-2xl font-black text-[#E6C88B]">
                {formatRupiah(totalOmzet)}
              </div>
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +24.5% dibanding minggu lalu
              </span>
            </div>

            <div className="bg-[#18181E] border border-stone-800 p-5 rounded-none space-y-2">
              <span className="text-[10px] font-black uppercase text-stone-500 tracking-wider">
                Total Pesanan Masuk
              </span>
              <div className="text-2xl font-black text-white">
                {totalOrdersCount} Transaksi
              </div>
              <span className="text-[11px] text-stone-400">
                Sablon DTF, Sticker & Merchandise
              </span>
            </div>

            <div className="bg-[#18181E] border border-stone-800 p-5 rounded-none space-y-2">
              <span className="text-[10px] font-black uppercase text-stone-500 tracking-wider">
                Kunjungan Web Hari Ini
              </span>
              <div className="text-2xl font-black text-emerald-400 flex items-center gap-2">
                <Users className="w-6 h-6" />
                {totalVisitsToday} Visitors
              </div>
              <span className="text-[11px] text-stone-400">
                Traffic realtime pengunjung toko
              </span>
            </div>

            <div className="bg-[#18181E] border border-stone-800 p-5 rounded-none space-y-2">
              <span className="text-[10px] font-black uppercase text-stone-500 tracking-wider">
                Laporan Akhir Pekan Email
              </span>
              <div className="text-xs font-extrabold text-[#E6C88B] flex items-center gap-1.5 pt-1">
                <Mail className="w-4 h-4 text-[#E6C88B]" />
                <span>{recipientEmail}</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">
                ✓ Auto-Scheduled Setiap Sabtu
              </span>
            </div>
          </div>

          {/* Quick Chart */}
          <div className="bg-[#18181E] border border-stone-800 rounded-none p-6 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Grafik Penjualan Harian (7 Hari Terakhir)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailySales}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4A359" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#D4A359" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A32" />
                  <XAxis dataKey="date" stroke="#78716C" fontSize={11} />
                  <YAxis stroke="#78716C" fontSize={11} tickFormatter={(val) => `Rp${val/1000}k`} />
                  <Tooltip formatter={(value: number) => [formatRupiah(value), 'Omzet']} />
                  <Area type="monotone" dataKey="revenue" stroke="#D4A359" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* ORDERS TAB */}
      {adminTab === 'orders' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              Kelola Status Pesanan Pelanggan (Real-Time)
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-[#18181E] p-1 rounded-none border border-stone-800 overflow-x-auto">
              {(['ALL', 'PENDING', 'IN_PRODUCTION', 'SHIPPED', 'COMPLETED'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-none text-xs font-bold ${
                    orderStatusFilter === st ? 'bg-[#D4A359] text-stone-950' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.map((ord) => {
              const { label, color, bg } = getOrderStatusLabel(ord.orderStatus);
              const waText = generateWAMessage(ord, 'STATUS_UPDATE');
              const waLink = createWALink(ord.customerPhone, waText);

              return (
                <div key={ord.id} className="bg-[#18181E] border border-stone-800 rounded-none p-5 space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-[#E6C88B]">#{ord.id}</span>
                        <span className="text-xs text-stone-400">• {formatDate(ord.createdAt)}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{ord.customerName} ({ord.customerPhone})</h4>
                      <p className="text-xs text-stone-400">{ord.shippingAddress}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-none border ${bg} text-xs font-bold ${color}`}>
                        {label}
                      </span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="bg-[#1B1B22] p-3 rounded-none border border-stone-800 text-xs flex justify-between items-center">
                        <div>
                          <p className="font-bold text-white">{item.productName}</p>
                          <p className="text-stone-400">
                            {item.material} ({item.size}) - {item.quantity} pcs
                          </p>
                          {item.customNotes && (
                            <p className="text-[#E6C88B] text-[11px] mt-0.5">Catatan: {item.customNotes}</p>
                          )}
                        </div>
                        <span className="font-extrabold text-[#E6C88B] text-sm">
                          {formatRupiah(item.totalPrice)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-400">Ubah Status:</span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-[#141419] border border-stone-800 text-[#E6C88B] text-xs font-bold rounded-none px-2.5 py-1.5 focus:outline-none"
                      >
                        <option value="PENDING">Menunggu Pembayaran</option>
                        <option value="CONFIRMED">Pembayaran Dikonfirmasi</option>
                        <option value="IN_PRODUCTION">Proses Produksi / Sablon</option>
                        <option value="SHIPPED">Dalam Pengiriman / Siap Diambil</option>
                        <option value="COMPLETED">Pesanan Selesai</option>
                        <option value="CANCELLED">Dibatalkan</option>
                      </select>
                    </div>

                    {/* WA Trigger */}
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Kirim Update Otomatis WhatsApp ke Pelanggan</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* PRODUCTS TAB */}
      {adminTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              Katalog Produk & Pengaturan Harga
            </h3>
            <button
              onClick={() => {
                setEditingProduct({
                  id: `prod-${Date.now()}`,
                  name: '',
                  category: 'Kaos DTF',
                  basePrice: 50000,
                  unit: 'pcs',
                  minOrder: 1,
                  materials: ['Material 1'],
                  sizes: ['Size 1'],
                  active: true,
                });
                setIsProductModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-none bg-[#D4A359] hover:bg-[#C89B50] text-stone-950 font-black text-xs flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-[#181820] border border-stone-800 p-4 rounded-none flex gap-4 items-center">
                <img src={p.imageUrl} alt={p.name} className="w-20 h-20 object-cover rounded-none shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#E6C88B] uppercase">{p.category}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-none ${p.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {p.active ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-white text-sm">{p.name}</h4>
                  <p className="text-xs font-black text-[#E6C88B]">{formatRupiah(p.basePrice)} / {p.unit}</p>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }}
                      className="px-3 py-1 rounded-none bg-stone-800 text-[#E6C88B] hover:bg-stone-700 font-bold text-xs flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="px-3 py-1 rounded-none bg-rose-950/60 text-rose-400 hover:bg-rose-900 font-bold text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANALYTICS TAB */}
      {adminTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-[#18181E] border border-stone-800 p-6 rounded-none space-y-4">
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              Statistik Kunjungan Pengunjung Web (Per Hari)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyVisits}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A32" />
                  <XAxis dataKey="date" stroke="#78716C" fontSize={11} />
                  <YAxis stroke="#78716C" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="visits" name="Jumlah Kunjungan" fill="#10B981" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* REPORTS TAB */}
      {adminTab === 'reports' && (
        <div className="bg-[#18181E] border border-stone-800 p-6 rounded-none space-y-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#E6C88B]">
              LAPORAN OTOMATIS AKHIR PEKAN (WEEKLY EMAIL)
            </span>
            <h3 className="text-xl font-black text-white">Konfigurasi Email Pemilik</h3>
            <p className="text-xs text-stone-400 mt-1">
              Sistem akan mengirimkan rangkuman omzet harian, jumlah transaksi, dan jumlah pengunjung web secara otomatis setiap akhir pekan ke email Anda.
            </p>
          </div>

          <div className="bg-[#1B1B22] border border-stone-800 p-4 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto flex-1">
              <label className="text-xs font-bold text-stone-300 block mb-1">
                Email Penerima Laporan Pemilik:
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full bg-[#141419] border border-stone-800 rounded-none p-2.5 text-xs text-[#E6C88B] font-bold focus:outline-none"
              />
            </div>

            <button
              onClick={handleTriggerWeeklyReport}
              className="w-full sm:w-auto px-6 py-3 rounded-none bg-[#D4A359] hover:bg-[#C89B50] text-stone-950 font-black text-xs transition-all shadow-lg shadow-[#D4A359]/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Laporan Akhir Pekan Sekarang</span>
            </button>
          </div>

          {reportSentSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-none flex items-center gap-2">
              <Check className="w-4 h-4" />
              Laporan Mingguan Berhasil Digenerate & Dikirimkan ke {recipientEmail}!
            </div>
          )}

          {/* History log */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-stone-400">Riwayat Laporan Email Terkirim</h4>
            <div className="space-y-2">
              {recentReports.map((rep) => (
                <div key={rep.id} className="bg-[#1B1B22] p-4 rounded-none border border-stone-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#E6C88B]">{rep.period}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-none border border-emerald-500/20">
                      DELIVERED ({formatDate(rep.sentAt)})
                    </span>
                  </div>
                  <p className="text-stone-300">{rep.summaryNote}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Edit Product Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161C] border border-stone-800 p-6 rounded-none w-full max-w-lg space-y-4">
            <h3 className="text-base font-bold text-white">Form Edit / Tambah Produk</h3>
            
            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-300 block mb-1">Nama Produk:</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#1B1B22] border border-stone-800 rounded-none p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-300 block mb-1">Harga Base (Rp):</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.basePrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#1B1B22] border border-stone-800 rounded-none p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-stone-300 block mb-1">Satuan (unit):</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.unit || 'pcs'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                    className="w-full bg-[#1B1B22] border border-stone-800 rounded-none p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-300 block mb-1">URL Gambar (Unsplash/Direct):</label>
                <input
                  type="text"
                  value={editingProduct.imageUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  className="w-full bg-[#1B1B22] border border-stone-800 rounded-none p-2.5 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-none bg-stone-800 text-stone-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-none bg-[#D4A359] text-stone-950 font-extrabold"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
