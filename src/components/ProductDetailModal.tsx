import React, { useState } from 'react';
import { X, Upload, Check, AlertCircle, ShoppingBag, ShieldAlert, Sparkles, Layers, Ruler } from 'lucide-react';
import { Product, OrderItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onProceedToCheckout: (item: OrderItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onProceedToCheckout,
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.materials[0] || 'Standard');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(product.minOrder || 1);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string>('');

  // Tier discount logic
  let discountRate = 0;
  if (quantity >= 50) {
    discountRate = 0.20; // 20% discount
  } else if (quantity >= 12) {
    discountRate = 0.10; // 10% discount
  }

  const rawTotal = product.basePrice * quantity;
  const discountAmount = rawTotal * discountRate;
  const finalTotal = rawTotal - discountAmount;
  const pricePerUnitAfterDiscount = Math.round(finalTotal / quantity);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedFilePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setUploadedFilePreview('');
      }
    }
  };

  const handleCheckoutClick = () => {
    const orderItem: OrderItem = {
      productId: product.id,
      productName: product.name,
      category: product.category,
      material: selectedMaterial,
      size: selectedSize,
      quantity,
      pricePerUnit: pricePerUnitAfterDiscount,
      totalPrice: finalTotal,
      customNotes,
      uploadedDesignUrl: uploadedFilePreview || undefined,
    };
    onProceedToCheckout(orderItem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-[#16161C] border border-stone-800/90 rounded-none w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl my-8">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#18181E] px-6 py-4 border-b border-stone-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-[#E6C88B] tracking-widest">
              CUSTOM ORDER FORM
            </span>
            <h3 className="text-lg font-extrabold text-white">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-none bg-stone-800/80 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          
          {/* Product Overview Row */}
          <div className="flex gap-4 p-4 rounded-none bg-[#1B1B22] border border-stone-800">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-none shrink-0"
            />
            <div className="text-xs space-y-1">
              <span className="text-[10px] font-bold text-[#E6C88B] bg-[#D4A359]/10 px-2 py-0.5 rounded-none border border-[#D4A359]/20">
                {product.category}
              </span>
              <p className="text-stone-300 line-clamp-2 mt-1">{product.description}</p>
              <div className="text-stone-400 font-medium">
                Estimasi Pengerjaan: <span className="text-emerald-300 font-bold">{product.leadTime}</span>
              </div>
            </div>
          </div>

          {/* Step 1: Select Material */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#E6C88B]" />
              1. Pilih Bahan / Material:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.materials.map((mat) => (
                <button
                  key={mat}
                  type="button"
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-3.5 py-2.5 rounded-none text-xs font-medium text-left transition-all border ${
                    selectedMaterial === mat
                      ? 'bg-[#D4A359]/20 border-[#D4A359] text-[#E6C88B] font-bold'
                      : 'bg-[#1B1B22] border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{mat}</span>
                    {selectedMaterial === mat && <Check className="w-4 h-4 text-[#E6C88B]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Size / Dimension */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-[#E6C88B]" />
              2. Pilih Ukuran / Dimensi:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2 rounded-none text-xs font-bold transition-all border ${
                    selectedSize === sz
                      ? 'bg-[#D4A359] text-stone-950 border-[#D4A359]'
                      : 'bg-[#1B1B22] border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Quantity & Tier Discount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                3. Jumlah Pesanan ({product.unit}):
              </label>
              <span className="text-xs text-[#E6C88B] font-bold">
                Min. Order: {product.minOrder} {product.unit}
              </span>
            </div>

            <div className="flex items-center gap-4 bg-[#1B1B22] p-3 rounded-none border border-stone-800">
              <div className="flex items-center border border-stone-700 rounded-none overflow-hidden bg-stone-900">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                  className="px-3 py-1.5 text-stone-300 hover:text-white hover:bg-stone-800 font-black"
                >
                  -
                </button>
                <input
                  type="number"
                  min={product.minOrder}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
                  className="w-16 text-center text-xs font-extrabold text-[#E6C88B] bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-stone-300 hover:text-white hover:bg-stone-800 font-black"
                >
                  +
                </button>
              </div>

              <div className="flex-1 text-xs">
                {discountRate > 0 ? (
                  <span className="inline-flex items-center gap-1 text-emerald-300 font-bold bg-emerald-500/10 px-2 py-1 rounded-none border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    Hemat {discountRate * 100}% (Grosir Bulk)
                  </span>
                ) : (
                  <span className="text-stone-400">
                    Order ≥12 {product.unit} diskon 10%, ≥50 {product.unit} diskon 20%!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Step 4: Upload Artwork / Logo (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider">
              4. Upload File Desain / Logo (PNG/PDF/JPG/Ai):
            </label>
            <div className="relative border-2 border-dashed border-stone-800 hover:border-[#D4A359]/50 rounded-none p-4 text-center bg-[#1B1B22] transition-colors">
              <input
                type="file"
                accept="image/*,.pdf,.ai,.psd"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-6 h-6 text-[#E6C88B] mx-auto mb-1" />
              {uploadedFileName ? (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> {uploadedFileName}
                  </span>
                  {uploadedFilePreview && (
                    <img src={uploadedFilePreview} alt="Preview" className="w-16 h-16 object-cover mx-auto rounded-none border border-stone-700 mt-2" />
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-xs font-medium text-stone-300">
                    Klik atau Drag & Drop file desain Anda di sini
                  </p>
                  <p className="text-[10px] text-stone-500 mt-0.5">
                    Belum punya desain? Kosongkan saja dan sebutkan di catatan!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Step 5: Custom Notes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider">
              5. Catatan Khusus / Instruksi Desain:
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Tolong posisi sablon di dada kiri ukuran 10x10 cm, tambahkan tulisan 'Yogyakarta' di bawah logo..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full bg-[#1B1B22] border border-stone-800 rounded-none p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4A359]"
            />
          </div>

          {/* Dynamic Price Calculation Footer */}
          <div className="bg-[#1B1B22] border border-[#D4A359]/30 rounded-none p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Total Estimasi Harga ({quantity} {product.unit})
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#E6C88B]">
                  {formatRupiah(finalTotal)}
                </span>
                {discountRate > 0 && (
                  <span className="text-xs text-stone-500 line-through">
                    {formatRupiah(rawTotal)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-400">
                (~{formatRupiah(pricePerUnitAfterDiscount)} / {product.unit})
              </span>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full sm:w-auto px-6 py-3 rounded-none bg-[#D4A359] hover:bg-[#C89B50] text-stone-950 font-black text-xs transition-all shadow-lg shadow-[#D4A359]/20 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Lanjut ke Pembayaran Digital</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
