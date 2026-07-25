import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div
      className="relative w-full h-56 sm:h-64 rounded-none overflow-hidden cursor-ew-resize select-none border border-stone-800 bg-stone-900 group"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After Retouching"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2 px-2.5 py-1 rounded-none bg-[#D4A359] text-stone-950 font-bold text-[10px] tracking-wider uppercase backdrop-blur-xs">
        AFTER (RETOUCHED)
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Retouching"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute top-2 left-2 px-2.5 py-1 rounded-none bg-stone-900/90 text-stone-300 font-bold text-[10px] tracking-wider uppercase border border-stone-700/50 backdrop-blur-xs">
          BEFORE
        </div>
      </div>

      {/* Divider Bar */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#D4A359] shadow-[0_0_10px_rgba(212,163,89,0.8)] cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-none bg-[#D4A359] text-stone-950 flex items-center justify-center shadow-lg border-2 border-stone-950 group-hover:scale-110 transition-transform">
          <Sliders className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
