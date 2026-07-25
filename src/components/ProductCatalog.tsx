import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Shirt, 
  Tag, 
  Package, 
  Printer, 
  PenTool, 
  MessageSquare,
  Zap
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenAIConsult?: () => void;
}

const CATEGORIES: { label: string; value: ProductCategory | 'ALL' }[] = [
  { label: 'Semua Produk', value: 'ALL' },
  { label: 'Kaos DTF', value: 'Kaos DTF' },
  { label: 'Sticker', value: 'Sticker' },
  { label: 'Brosur & Print', value: 'Brosur & Print' },
  { label: 'Packaging', value: 'Packaging' },
  { label: 'Merchandise', value: 'Merchandise' },
  { label: 'Jasa Desain', value: 'Jasa Desain' },
  { label: 'Logo & Branding', value: 'Logo & Branding' },
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onOpenAIConsult,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');

  const activeProducts = products.filter((p) => p.active);

  const filteredProducts = activeProducts
    .filter((p) => {
      const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.basePrice - b.basePrice;
      if (sortBy === 'price-high') return b.basePrice - a.basePrice;
      return b.salesCount - a.salesCount;
    });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#D4A359]/10 text-[#E6C88B] border border-[#D4A359]/20 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Katalog Desain & Custom Production
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wider font-sans">
            PEMESANAN ONLINE MERCHANDISE & DESIGN
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Pilih produk custom Anda, tentukan bahan & ukuran, upload desain, dan dapatkan harga instan!
          </p>
        </div>

        <a
          href="https://wa.me/6287878224307?text=Halo%20Digiwork,%20saya%20ingin%20konsultasi%20desain%20dan%20estimasi%20biaya%20merchandise!"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 hover:text-white font-bold text-xs hover:bg-emerald-900/80 transition-all shadow-md"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Konsultasi Desain & Harga via WA</span>
        </a>
      </div>

      {/* Category Pills & Filter Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-none text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                selectedCategory === cat.value
                  ? 'bg-[#D4A359] text-stone-950 border-[#D4A359] shadow-lg shadow-[#D4A359]/20'
                  : 'bg-[#18181E] text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Cari kaos DTF, stiker vinyl, brosur, mug, packaging..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181E] border border-stone-800 rounded-none pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4A359] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-stone-400 whitespace-nowrap">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#18181E] border border-stone-800 text-stone-200 text-xs font-medium rounded-none px-3 py-2.5 focus:outline-none focus:border-[#D4A359]"
            >
              <option value="popular">Terlaris & Populer</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#18181E] border border-stone-800 rounded-none p-12 text-center space-y-3">
          <Package className="w-12 h-12 text-stone-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Produk Tidak Ditemukan</h3>
          <p className="text-xs text-stone-400">
            Coba gunakan kata kunci pencarian lain atau pilih kategori lain.
          </p>
          <button
            onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
            className="px-4 py-2 bg-stone-800 text-[#E6C88B] font-bold text-xs rounded-none hover:bg-stone-700 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#18181E] border border-stone-800/90 rounded-none overflow-hidden flex flex-col justify-between group hover:border-[#D4A359]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4A359]/5"
            >
              {/* Product Image Header */}
              <div className="relative h-56 overflow-hidden bg-stone-900">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="px-2.5 py-1 rounded-none bg-stone-950/85 backdrop-blur-xs text-[#E6C88B] font-extrabold text-[10px] tracking-wider uppercase border border-[#D4A359]/30">
                    {product.category}
                  </span>
                  {product.isPopular && (
                    <span className="px-2.5 py-1 rounded-none bg-[#D4A359] text-stone-950 font-black text-[10px] tracking-wider uppercase shadow-md">
                      ★ BEST SELLER
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-none bg-stone-950/90 text-emerald-300 font-bold text-[10px] flex items-center gap-1 border border-emerald-500/30">
                  <Clock className="w-3 h-3" />
                  <span>{product.leadTime}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-white text-base tracking-wide group-hover:text-[#E6C88B] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Material & Size Tags */}
                <div className="space-y-2 pt-2 border-t border-stone-800/80">
                  <div className="flex flex-wrap gap-1">
                    {product.materials.slice(0, 2).map((mat, i) => (
                      <span key={i} className="text-[10px] font-medium bg-stone-900 border border-stone-800 text-stone-300 px-2 py-0.5 rounded-none">
                        {mat}
                      </span>
                    ))}
                    {product.materials.length > 2 && (
                      <span className="text-[10px] font-medium bg-stone-900 text-stone-500 px-1.5 py-0.5 rounded-none">
                        +{product.materials.length - 2} bahan
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block">
                      Mulai Dari
                    </span>
                    <span className="text-lg font-black text-[#E6C88B]">
                      {formatRupiah(product.basePrice)}
                    </span>
                    <span className="text-[10px] text-stone-400 ml-1">/ {product.unit}</span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="px-4 py-2.5 rounded-none bg-[#D4A359] hover:bg-[#C89B50] text-stone-950 font-extrabold text-xs transition-all shadow-md shadow-[#D4A359]/10 flex items-center gap-1.5"
                  >
                    <span>Pesan Custom</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
