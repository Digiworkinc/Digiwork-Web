import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  QrCode, 
  ArrowUpRight, 
  Layers, 
  Printer, 
  Package, 
  Shirt, 
  Layout, 
  Aperture, 
  ShoppingBag,
  Clock,
  ThumbsUp,
  MessageCircle,
  Award,
  Zap,
  MessageSquare,
  Star,
  Quote,
  ShieldCheck
} from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface HeroBentoProps {
  onOrderNow: () => void;
  onOpenAIConsult?: () => void;
}

export const HeroBento: React.FC<HeroBentoProps> = ({ onOrderNow }) => {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner Alert / Quick Action */}
      <div className="bg-[#18181E] border-l-4 border-l-[#D4A359] border border-stone-800 rounded-none p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-none bg-[#D4A359] text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-lg shadow-[#D4A359]/20">
            <Zap className="w-5 h-5 fill-stone-950" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-2">
              Layanan Cetak Express Kaos DTF, Sticker, & Merchandise Custom 1 Hari Jadi!
            </h3>
            <p className="text-xs text-stone-300">
              Kirim desain Anda atau konsultasi langsung via WhatsApp bersama tim desainer profesional Digiwork.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          <a
            href="https://wa.me/6287878224307?text=Halo%20Digiwork,%20saya%20ingin%20konsultasi%20pembuatan%20merchandise%20custom!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-none bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 hover:bg-emerald-900/80 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Konsultasi WA</span>
          </a>
          <button
            onClick={onOrderNow}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-none bg-[#D4A359] hover:bg-[#C89B50] text-stone-950 font-black text-xs transition-all shadow-lg shadow-[#D4A359]/20 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pesan Online Now</span>
          </button>
        </div>
      </div>

      {/* Main Bento Portfolio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LEFT COLUMN: Profile & Contact Card (Cols 4) */}
        <div className="lg:col-span-4 bg-[#18181E] border border-stone-800/90 rounded-none p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden group">

          <div>
            {/* Header Badge */}
            <div className="text-[11px] font-extrabold tracking-widest text-stone-400 uppercase mb-2">
              GRAPHIC DESIGNER & WEB DEVELOPER
            </div>

            {/* Profile Name Title */}
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wider leading-none mb-3 font-sans">
              DIGI<span className="text-[#E6C88B]">WORK</span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal mb-6">
              Creative professional specializing in branding, graphic design, packaging design, print media, web design, and digital marketing.
            </p>

            {/* Icons row */}
            <div className="grid grid-cols-5 gap-2 mb-6 text-stone-300">
              <div className="p-2 bg-[#121216] border border-stone-800 rounded-none text-center flex flex-col items-center gap-1 hover:border-[#D4A359]/40 transition-colors">
                <Layers className="w-4 h-4 text-[#E6C88B]" />
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Branding</span>
              </div>
              <div className="p-2 bg-[#121216] border border-stone-800 rounded-none text-center flex flex-col items-center gap-1 hover:border-[#D4A359]/40 transition-colors">
                <Printer className="w-4 h-4 text-[#E6C88B]" />
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Print</span>
              </div>
              <div className="p-2 bg-[#121216] border border-stone-800 rounded-none text-center flex flex-col items-center gap-1 hover:border-[#D4A359]/40 transition-colors">
                <Package className="w-4 h-4 text-[#E6C88B]" />
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Pack</span>
              </div>
              <div className="p-2 bg-[#121216] border border-stone-800 rounded-none text-center flex flex-col items-center gap-1 hover:border-[#D4A359]/40 transition-colors">
                <Globe className="w-4 h-4 text-[#E6C88B]" />
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Web</span>
              </div>
              <div className="p-2 bg-[#121216] border border-stone-800 rounded-none text-center flex flex-col items-center gap-1 hover:border-[#D4A359]/40 transition-colors">
                <Shirt className="w-4 h-4 text-[#E6C88B]" />
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Merch</span>
              </div>
            </div>

            {/* Expertise List */}
            <div className="space-y-3 mb-6 border-t border-b border-stone-800/80 py-4">
              <h4 className="text-xs font-black uppercase text-[#E6C88B] tracking-wider">
                EXPERTISE
              </h4>
              <ul className="text-xs text-stone-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E6C88B]"></span>
                  Logo & Brand Identity
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E6C88B]"></span>
                  Brochure & Flyer Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E6C88B]"></span>
                  Magazine & Editorial Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E6C88B]"></span>
                  Packaging & Label Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E6C88B]"></span>
                  T-Shirt & Merchandise Design (Sablon DTF)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E6C88B]"></span>
                  Social Media Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E6C88B]"></span>
                  Web Design & Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E6C88B]"></span>
                  Photo & Video Editing
                </li>
              </ul>
            </div>

            {/* Tools Icons */}
            <div className="space-y-2 mb-6">
              <h4 className="text-[11px] font-extrabold uppercase text-stone-400 tracking-wider">
                TOOLS & SOFTWARE
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 bg-blue-950/60 border border-blue-500/30 text-blue-300 font-extrabold text-[11px] rounded-none">Ps</span>
                <span className="px-2.5 py-1 bg-amber-950/60 border border-[#D4A359]/30 text-[#E6C88B] font-extrabold text-[11px] rounded-none">Ai</span>
                <span className="px-2.5 py-1 bg-pink-950/60 border border-pink-500/30 text-pink-300 font-extrabold text-[11px] rounded-none">Id</span>
                <span className="px-2.5 py-1 bg-purple-950/60 border border-purple-500/30 text-purple-300 font-extrabold text-[11px] rounded-none">Pr</span>
                <span className="px-2.5 py-1 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-extrabold text-[11px] rounded-none">Ae</span>
                <span className="px-2.5 py-1 bg-stone-900 border border-stone-700 text-stone-200 font-extrabold text-[11px] rounded-none">Sk</span>
                <span className="px-2.5 py-1 bg-orange-950/60 border border-orange-500/30 text-orange-300 font-extrabold text-[11px] rounded-none">HTML5</span>
                <span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-extrabold text-[11px] rounded-none">CSS3</span>
              </div>
            </div>
          </div>

          {/* Contact Details Block */}
          <div className="bg-[#121216] p-4 rounded-none border border-stone-800 space-y-2 text-xs">
            <p className="text-[11px] font-bold text-stone-400 tracking-wider">
              Let's create something meaningful together.
            </p>
            <div className="flex items-center gap-2 text-stone-300">
              <Phone className="w-3.5 h-3.5 text-[#E6C88B]" />
              <span>+62 878 7822 4307</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Mail className="w-3.5 h-3.5 text-[#E6C88B]" />
              <span>digiwork.inc@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-[#E6C88B]" />
              <span>Yogyakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300 pt-1">
              <Globe className="w-3.5 h-3.5 text-[#E6C88B]" />
              <a href="https://digiwork.web.id" target="_blank" rel="noopener noreferrer" className="text-[#E6C88B] hover:underline">
                https://digiwork.web.id
              </a>
            </div>
          </div>

        </div>

        {/* RIGHT AREA: Bento Visual Cards (Cols 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: BRANDING & LOGO DESIGN */}
          <div className="bg-[#18181E] border border-stone-800/90 rounded-none overflow-hidden flex flex-col group hover:border-[#D4A359]/40 transition-all">
            <div className="px-4 py-2 bg-[#141419] border-b border-stone-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E6C88B]">
                BRANDING & LOGO DESIGN
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#E6C88B] transition-colors" />
            </div>
            <div className="relative h-48 bg-stone-900 overflow-hidden flex items-center justify-center p-4">
              <img
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80"
                alt="Jemaat Immanuel Logo"
                className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white tracking-wide">
                  JEMAAT IMMANUEL YOGYAKARTA
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: PACKAGING DESIGN */}
          <div className="bg-[#18181E] border border-stone-800/90 rounded-none overflow-hidden flex flex-col group hover:border-[#D4A359]/40 transition-all">
            <div className="px-4 py-2 bg-[#141419] border-b border-stone-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E6C88B]">
                PACKAGING DESIGN
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#E6C88B] transition-colors" />
            </div>
            <div className="relative h-48 bg-stone-900 overflow-hidden flex items-center justify-center p-4">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
                alt="Kaliurang Coffee Packaging"
                className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white tracking-wide">
                  KALIURANG COFFEE POUCH & CUP
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: PRINT DESIGN */}
          <div className="bg-[#18181E] border border-stone-800/90 rounded-none overflow-hidden flex flex-col group hover:border-[#D4A359]/40 transition-all">
            <div className="px-4 py-2 bg-[#141419] border-b border-stone-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E6C88B]">
                PRINT DESIGN
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#E6C88B] transition-colors" />
            </div>
            <div className="relative h-48 bg-stone-900 overflow-hidden flex items-center justify-center p-4">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80"
                alt="Tri-Fold Print Brochure"
                className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white tracking-wide">
                  CATALOG & TRI-FOLD BROCHURE
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: SOCIAL MEDIA DESIGN */}
          <div className="bg-[#18181E] border border-stone-800/90 rounded-none overflow-hidden flex flex-col group hover:border-[#D4A359]/40 transition-all">
            <div className="px-4 py-2 bg-[#141419] border-b border-stone-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E6C88B]">
                SOCIAL MEDIA DESIGN
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#E6C88B] transition-colors" />
            </div>
            <div className="relative h-48 bg-stone-900 overflow-hidden flex items-center justify-center p-4">
              <img
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80"
                alt="Social Media Design Promo 30%"
                className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white tracking-wide">
                  PROMO CAMPAIGN & FEEDS
                </span>
              </div>
            </div>
          </div>

          {/* Card 5: WEB DESIGN */}
          <div className="bg-[#18181E] border border-stone-800/90 rounded-none overflow-hidden flex flex-col group hover:border-[#D4A359]/40 transition-all">
            <div className="px-4 py-2 bg-[#141419] border-b border-stone-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E6C88B]">
                WEB DESIGN
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#E6C88B] transition-colors" />
            </div>
            <div className="relative h-48 bg-stone-900 overflow-hidden flex items-center justify-center p-4">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
                alt="Web Design Mockup"
                className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white tracking-wide">
                  WE BUILD BRANDS THAT CONNECT
                </span>
              </div>
            </div>
          </div>

          {/* Card 6: T-SHIRT & DTF DESIGN */}
          <div className="bg-[#18181E] border border-stone-800/90 rounded-none overflow-hidden flex flex-col group hover:border-[#D4A359]/40 transition-all">
            <div className="px-4 py-2 bg-[#141419] border-b border-stone-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E6C88B]">
                T-SHIRT & DTF DESIGN
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#E6C88B] transition-colors" />
            </div>
            <div className="relative h-48 bg-stone-900 overflow-hidden flex items-center justify-center p-4">
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                alt="T-Shirt DTF Design Yogyakarta"
                className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white tracking-wide">
                  SABLON DTF KAOS YOGYAKARTA
                </span>
              </div>
            </div>
          </div>

          {/* Card 7: PHOTO & VIDEO EDITING (Interactive Slider) */}
          <div className="sm:col-span-2 lg:col-span-2 bg-[#18181E] border border-stone-800/90 rounded-none overflow-hidden flex flex-col group hover:border-[#D4A359]/40 transition-all">
            <div className="px-4 py-2 bg-[#141419] border-b border-stone-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E6C88B]">
                PHOTO & VIDEO EDITING (INTERACTIVE BEFORE / AFTER)
              </span>
              <span className="text-[10px] text-stone-400 font-bold">Geser Slider</span>
            </div>
            <div className="p-3">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                afterImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </div>

          {/* Card 8: MERCHANDISE DESIGN */}
          <div className="bg-[#18181E] border border-stone-800/90 rounded-none overflow-hidden flex flex-col group hover:border-[#D4A359]/40 transition-all">
            <div className="px-4 py-2 bg-[#141419] border-b border-stone-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E6C88B]">
                MERCHANDISE DESIGN
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#E6C88B] transition-colors" />
            </div>
            <div className="relative h-56 bg-stone-900 overflow-hidden flex items-center justify-center p-4">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                alt="Good Coffee Good Mood Merchandise"
                className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white tracking-wide">
                  TOTEBAG & MUG CUSTOM
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* CLIENT REVIEWS & TESTIMONIALS SECTION */}
      <div className="bg-[#18181E] border border-stone-800/90 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase text-[#E6C88B] tracking-wider mb-1">
              <Quote className="w-4 h-4 text-[#D4A359]" />
              <span>TESTIMONI & ULASAN KLIEN</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Apa Kata Mereka Tentang Layanan Digiwork?
            </h3>
          </div>
          
          <div className="flex items-center gap-3 bg-[#121216] border border-stone-800 px-4 py-2.5 rounded-none shrink-0">
            <div className="flex items-center text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-extrabold text-white">4.9 / 5.0</span>
              <span className="text-stone-400 text-[10px] block font-medium">(250+ Klien Puas)</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Testimonial 1 */}
          <div className="bg-[#121216] border border-stone-800/90 p-5 rounded-none flex flex-col justify-between space-y-4 hover:border-[#D4A359]/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Verified Order
                </span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                "Pesan 120 pcs kaos sablon DTF untuk event gathering kantor. Pengerjaannya super cepat, sablonnya rapi & warna tajam persis seperti mockup. Pelayanan WA juga sangat kooperatif!"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-white">Bagas Putra</h5>
                <p className="text-[10px] text-stone-400">Event Organizer • Yogyakarta</p>
              </div>
              <span className="text-[10px] font-bold text-[#E6C88B] bg-[#D4A359]/10 px-2 py-1">
                120 Pcs Kaos DTF
              </span>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-[#121216] border border-stone-800/90 p-5 rounded-none flex flex-col justify-between space-y-4 hover:border-[#D4A359]/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Verified Order
                </span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                "Desain packaging pouch kopi dan cup dari Digiwork bikin visual kedai kami naik kelas. Kualitas cetak warna doff-nya mewah, pesanan kedua langsung repeat order!"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-white">Siti Rahmawati</h5>
                <p className="text-[10px] text-stone-400">Owner Kopi Kaliurang • Sleman</p>
              </div>
              <span className="text-[10px] font-bold text-[#E6C88B] bg-[#D4A359]/10 px-2 py-1">
                Packaging Coffee
              </span>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-[#121216] border border-stone-800/90 p-5 rounded-none flex flex-col justify-between space-y-4 hover:border-[#D4A359]/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Verified Order
                </span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                "Cetak sticker vinyl waterproof batch ke-3 untuk merchandise komunitas otomotif. Daya rekat kuat, bahan tebal, dan kiss-cut kustomnya sangat presisi. Mantap Digiwork!"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-white">Rian Prasetyo</h5>
                <p className="text-[10px] text-stone-400">Ketua Komunitas Otomotif • Jogja</p>
              </div>
              <span className="text-[10px] font-bold text-[#E6C88B] bg-[#D4A359]/10 px-2 py-1">
                500+ Pcs Sticker
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Row Value Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
        <div className="bg-[#18181E] border border-stone-800/90 p-3.5 rounded-none flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#E6C88B] shrink-0" />
          <div>
            <h5 className="text-xs font-black text-white tracking-wider">CREATIVE & ORIGINAL</h5>
            <p className="text-[10px] text-stone-400">Desain kustom eksklusif</p>
          </div>
        </div>

        <div className="bg-[#18181E] border border-stone-800/90 p-3.5 rounded-none flex items-center gap-3">
          <Award className="w-5 h-5 text-[#E6C88B] shrink-0" />
          <div>
            <h5 className="text-xs font-black text-white tracking-wider">DETAIL ORIENTED</h5>
            <p className="text-[10px] text-stone-400">Cetak tajam & rapi</p>
          </div>
        </div>

        <div className="bg-[#18181E] border border-stone-800/90 p-3.5 rounded-none flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#E6C88B] shrink-0" />
          <div>
            <h5 className="text-xs font-black text-white tracking-wider">ON TIME DELIVERY</h5>
            <p className="text-[10px] text-stone-400">Garansi waktu pengerjaan</p>
          </div>
        </div>

        <div className="bg-[#18181E] border border-stone-800/90 p-3.5 rounded-none flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-[#E6C88B] shrink-0" />
          <div>
            <h5 className="text-xs font-black text-white tracking-wider">GOOD COMMUNICATION</h5>
            <p className="text-[10px] text-stone-400">Respon cepat via WA</p>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-[#18181E] border border-stone-800/90 p-3.5 rounded-none flex items-center gap-3">
          <ThumbsUp className="w-5 h-5 text-[#E6C88B] shrink-0" />
          <div>
            <h5 className="text-xs font-black text-white tracking-wider">CLIENT SATISFACTION</h5>
            <p className="text-[10px] text-stone-400">Revisi tak terbatas</p>
          </div>
        </div>
      </div>

    </div>
  );
};
