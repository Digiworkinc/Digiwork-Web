import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Search, 
  LayoutDashboard, 
  MessageSquare, 
  Eye, 
  Menu, 
  X, 
  CheckCircle2, 
  ShieldCheck,
  Palette
} from 'lucide-react';
import { VisitorInfo } from '../types';

interface HeaderProps {
  activeTab: 'portfolio' | 'catalog' | 'tracker' | 'admin';
  setActiveTab: (tab: 'portfolio' | 'catalog' | 'tracker' | 'admin') => void;
  onOpenAIConsult?: () => void;
  visitorInfo: VisitorInfo;
  cartCount: number;
  onOpenCart: () => void;
  isAdminLoggedIn: boolean;
  onAdminLoginToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  visitorInfo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (activeTab === 'admin') {
      setActiveTab('portfolio');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#16161C]/95 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-11 h-11 rounded-none bg-gradient-to-br from-[#E6C88B] via-[#D4A359] to-[#B8863B] p-0.5 shadow-lg shadow-[#D4A359]/20 group-hover:shadow-[#D4A359]/35 transition-all">
              <div className="w-full h-full bg-[#18181E] rounded-none flex items-center justify-center border border-[#D4A359]/30">
                <span className="font-extrabold text-lg text-[#E6C88B] tracking-tighter">DW</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl text-stone-100 tracking-wider font-sans group-hover:text-[#E6C88B] transition-colors">
                  DIGIWORK
                </h1>
              </div>
              <p className="text-xs text-stone-400 font-medium">
                Graphic Designer & Custom Merchandise Studio
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#1A1A22] p-1.5 rounded-none border border-stone-800">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 px-3 py-2 rounded-none text-xs font-bold tracking-wide text-stone-300 hover:text-white hover:bg-stone-800/60 transition-all"
            >
              <Palette className="w-4 h-4 text-[#E6C88B]" />
              Beranda
            </button>

            <button
              onClick={() => scrollToSection('katalog')}
              className="flex items-center gap-2 px-3 py-2 rounded-none text-xs font-bold tracking-wide text-stone-300 hover:text-white hover:bg-stone-800/60 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#E6C88B]" />
              Katalog & Price List
            </button>

            <button
              onClick={() => scrollToSection('portofolio')}
              className="flex items-center gap-2 px-3 py-2 rounded-none text-xs font-bold tracking-wide text-stone-300 hover:text-white hover:bg-stone-800/60 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#E6C88B]" />
              Portofolio & Showcase
            </button>

            <button
              onClick={() => scrollToSection('alur-order')}
              className="flex items-center gap-2 px-3 py-2 rounded-none text-xs font-bold tracking-wide text-stone-300 hover:text-white hover:bg-stone-800/60 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-[#E6C88B]" />
              Alur Order
            </button>

            <button
              onClick={() => scrollToSection('cek-order')}
              className="flex items-center gap-2 px-3 py-2 rounded-none text-xs font-bold tracking-wide text-stone-300 hover:text-white hover:bg-stone-800/60 transition-all"
            >
              <Search className="w-4 h-4 text-[#E6C88B]" />
              Cek Order
            </button>

            <button
              onClick={() => scrollToSection('faq')}
              className="flex items-center gap-2 px-3 py-2 rounded-none text-xs font-bold tracking-wide text-stone-300 hover:text-white hover:bg-stone-800/60 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#E6C88B]" />
              FAQ
            </button>
          </nav>

          {/* Header Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Live Visitor Counter Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-none h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{visitorInfo.totalVisitorsToday} Visitor/Hari</span>
            </div>

            {/* Direct WA Button */}
            <a
              href="https://wa.me/6287878224307?text=Halo%20Digiwork,%20saya%20ingin%20konsultasi%20pembuatan%20merchandise%20custom!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WA Admin</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => scrollToSection('katalog')}
              className="p-2 rounded-none bg-stone-800 text-stone-200 hover:text-white"
            >
              <ShoppingBag className="w-5 h-5 text-[#E6C88B]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-none bg-stone-800 text-stone-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-800 bg-[#18181E] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-stone-800 text-xs text-stone-400 font-medium">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse"></span>
              {visitorInfo.totalVisitorsToday} Pengunjung Hari Ini
            </div>
            <span>Yogyakarta, Indonesia</span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-none text-sm font-bold bg-stone-800/60 text-stone-200 hover:bg-stone-700"
            >
              <Palette className="w-5 h-5 text-[#E6C88B]" />
              Beranda Utama
            </button>

            <button
              onClick={() => scrollToSection('katalog')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-none text-sm font-bold bg-[#D4A359] text-stone-950"
            >
              <ShoppingBag className="w-5 h-5" />
              Katalog Produk & Price List
            </button>

            <button
              onClick={() => scrollToSection('portofolio')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-none text-sm font-bold bg-stone-800/60 text-stone-200 hover:bg-stone-700"
            >
              <Sparkles className="w-5 h-5 text-[#E6C88B]" />
              Portofolio & Showcase Vektor
            </button>

            <button
              onClick={() => scrollToSection('alur-order')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-none text-sm font-bold bg-stone-800/60 text-stone-200 hover:bg-stone-700"
            >
              <CheckCircle2 className="w-5 h-5 text-[#E6C88B]" />
              Cara & Alur Order
            </button>

            <button
              onClick={() => scrollToSection('cek-order')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-none text-sm font-bold bg-stone-800/60 text-stone-200 hover:bg-stone-700"
            >
              <Search className="w-5 h-5 text-[#E6C88B]" />
              Cek Status Order
            </button>

            <button
              onClick={() => scrollToSection('faq')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-none text-sm font-bold bg-stone-800/60 text-stone-200 hover:bg-stone-700"
            >
              <ShieldCheck className="w-5 h-5 text-[#E6C88B]" />
              FAQ & Kontak
            </button>

            <a
              href="https://wa.me/6287878224307?text=Halo%20Digiwork,%20saya%20ingin%20konsultasi%20pembuatan%20merchandise%20custom!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-none bg-emerald-600 text-white font-bold text-sm mt-2 shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              Hubungi via WhatsApp (+62 878 7822 4307)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
