import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Sparkles, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      if (onOpenAdmin) {
        onOpenAdmin();
      }
      setClickCount(0);
    }
  };

  return (
    <footer className="bg-[#0D0D11] border-t border-stone-800/80 text-stone-400 py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div 
                onClick={handleSecretClick}
                className="w-9 h-9 rounded-none bg-[#D4A359] text-stone-950 flex items-center justify-center font-black text-sm cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                title="Digiwork Studio"
              >
                DW
              </div>
              <h3 className="text-lg font-black text-white tracking-wider">DIGIWORK</h3>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Studio Jasa Pembuatan Merchandise Custom, Sablon Kaos DTF High Density, Stiker Vinyl Waterproof, Brosur, Packaging, & Desain Grafis Profesional berlokasi di Yogyakarta, Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-[#E6C88B]">
              Layanan Produksi
            </h4>
            <ul className="space-y-1.5 font-medium text-stone-300">
              <li>• Sablon Kaos DTF Express</li>
              <li>• Sticker Vinyl + Kiss Cut</li>
              <li>• Cetak Brosur & Leaflet</li>
              <li>• Packaging Box & Coffee Bag</li>
              <li>• Merchandise Totebag & Mug</li>
              <li>• Desain Logo & Brand Identity</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-[#E6C88B]">
              Kontak & Lokasi
            </h4>
            <div className="space-y-1.5 text-stone-300">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E6C88B] shrink-0" />
                <span>+62 878 7822 4307</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E6C88B] shrink-0" />
                <span>digiwork.inc@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E6C88B] shrink-0" />
                <span>Yogyakarta, Indonesia</span>
              </p>
              <p className="flex items-center gap-2 pt-1">
                <Globe className="w-3.5 h-3.5 text-[#E6C88B] shrink-0" />
                <a href="https://digiwork.web.id" target="_blank" rel="noopener noreferrer" className="text-[#E6C88B] hover:underline">
                  https://digiwork.web.id
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p 
            onClick={handleSecretClick}
            className="cursor-pointer hover:text-stone-400 transition-colors"
          >
            © {new Date().getFullYear()} Digiwork - Merchandise & Graphic Design Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span>Powered by Real-Time WhatsApp Gateway & Order Tracker</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="opacity-20 hover:opacity-100 transition-opacity p-1 text-stone-500 hover:text-[#E6C88B]"
                title="Akses Sistem Admin Studio"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
