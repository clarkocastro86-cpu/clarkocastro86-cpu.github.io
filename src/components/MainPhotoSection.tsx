import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrapbookPhoto } from '../types';
import { WashiTape, DoodleStar, DoodleHeart, DoodleSparkle, ScrapbookSticker } from './DoodleDecorations';
import { X, ZoomIn } from 'lucide-react';

interface MainPhotoSectionProps {
  photos: ScrapbookPhoto[];
}

export const MainPhotoSection: React.FC<MainPhotoSectionProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ScrapbookPhoto | null>(null);

  const photo1 = photos[0];
  const photo2 = photos[1];
  const photo3 = photos[2];

  return (
    <section id="scrapbook-gallery" className="relative py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-2">
          <ScrapbookSticker text="The Photo Album" emoji="📸" bg="bg-[#F8E7EA] text-[#863D50]" rotation={-2} />
        </div>
        <h2 className="font-handwriting text-4xl sm:text-6xl font-bold text-[#3B2D26]">
          Our Favorite Snaps 🎞️
        </h2>
        <p className="mt-2 text-[#7F6B62] text-base sm:text-lg max-w-lg mx-auto">
          Candid, unhinged, and completely us.
        </p>
      </div>

      {/* Scrapbook Board Container */}
      <div className="relative bg-[#FFFDF9]/90 border border-[#E9DFD5] rounded-3xl p-3.5 sm:p-10 lg:p-12 polaroid-shadow overflow-hidden">
        {/* Background grid paper subtlety */}
        <div className="absolute inset-0 bg-[radial-gradient(#E8DFD8_1px,transparent_1px)] [background-size:20px_20px] opacity-40 rounded-3xl pointer-events-none" />

        {/* Decorative corner stickers */}
        <div className="absolute -top-3 left-8 hidden sm:block">
          <ScrapbookSticker text="Treasured moments" emoji="🌸" bg="bg-[#EAF2FA] text-[#2F587D]" rotation={-4} />
        </div>
        <div className="absolute -top-3 right-8 hidden sm:block">
          <ScrapbookSticker text="100% candid" emoji="✨" bg="bg-[#FEF6E8] text-[#855823]" rotation={3} />
        </div>

        {/* Floating corner doodles */}
        <div className="absolute -left-3 top-1/2 text-[#F4A7B9] pointer-events-none hidden sm:block">
          <DoodleHeart size={28} />
        </div>
        <div className="absolute -right-3 top-1/3 text-[#F59E0B] pointer-events-none hidden sm:block">
          <DoodleStar size={30} />
        </div>

        {/* Top arrangement: Photo 1 (large central polaroid) & Photo 2 (smaller polaroid beside it) + handwritten note */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* PHOTO 1: Large central Polaroid with slight rotation */}
          <div className="lg:col-span-7 flex justify-center">
            {photo1 && (
              <motion.div
                whileHover={{ scale: 1.025, rotate: 0, zIndex: 20 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-white p-4 sm:p-5 pb-7 sm:pb-9 rounded-sm polaroid-shadow hover:polaroid-shadow-hover transition-all duration-300 cursor-pointer w-full max-w-md group"
                style={{ transform: `rotate(${photo1.rotation || -3}deg)` }}
                onClick={() => setSelectedPhoto(photo1)}
              >
                {/* Washi tape at top */}
                <WashiTape color="pink" rotation={-1} className="-top-3 left-1/2 -translate-x-1/2 w-28 sm:w-36 z-10" />

                {/* Photo Image container */}
                <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2px] bg-[#F3EFE9]">
                  <img
                    src={photo1.url}
                    alt="Agatha - Featured Best Friend Photograph"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-[#3B2D26] px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
                      <ZoomIn size={14} /> Tap to zoom
                    </span>
                  </div>
                </div>

                {/* Caption requested for Photo 1 */}
                <div className="mt-4 sm:mt-5 text-center px-2">
                  <p className="font-handwriting text-2xl sm:text-3xl font-bold text-[#382B24] leading-snug">
                    {photo1.caption}
                  </p>
                  <p className="text-xs text-[#A8988B] mt-1 font-doodle tracking-wide">
                    photo 01 / certified iconic
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Photo 2 (Smaller Polaroid) + Handwritten Note */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-8">
            
            {/* PHOTO 2: Smaller Polaroid beside it with slight rotation */}
            {photo2 && (
              <motion.div
                whileHover={{ scale: 1.03, rotate: 0, zIndex: 20 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-white p-3.5 sm:p-4 pb-6 sm:pb-8 rounded-sm polaroid-shadow hover:polaroid-shadow-hover transition-all duration-300 cursor-pointer w-full max-w-xs group self-center lg:self-start"
                style={{ transform: `rotate(${photo2.rotation || 4}deg)` }}
                onClick={() => setSelectedPhoto(photo2)}
              >
                {/* Washi tape */}
                <WashiTape color="blue" rotation={2} className="-top-3 left-1/2 -translate-x-1/2 w-24 sm:w-32 z-10" />

                <div className="relative aspect-square overflow-hidden rounded-[2px] bg-[#F3EFE9]">
                  <img
                    src={photo2.url}
                    alt="Agatha - Candid laughing snapshot"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-[#3B2D26] px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
                      <ZoomIn size={13} /> View
                    </span>
                  </div>
                </div>

                {/* Caption requested for Photo 2 */}
                <div className="mt-3 text-center px-1">
                  <p className="font-handwriting text-xl sm:text-2xl font-bold text-[#382B24] leading-snug">
                    {photo2.caption}
                  </p>
                  <p className="text-xs text-[#A8988B] mt-0.5 font-doodle">
                    photo 02 / purely candid
                  </p>
                </div>
              </motion.div>
            )}

            {/* Handwritten note beside the photos */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-[#FFFCE8] border border-[#E8DFC2] p-5 sm:p-6 rounded-2xl shadow-sm max-w-sm transform -rotate-1 self-center lg:self-start cursor-pointer group"
              onClick={() => {
                const el = document.getElementById('best-friend-letter');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Pushpin at top center */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#E05252] border border-white shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>

              <div className="flex items-center gap-1.5 text-[#C49B3E] mb-2">
                <DoodleSparkle size={18} />
                <span className="text-xs uppercase tracking-wider font-bold font-doodle text-[#947225]">
                  From Clarky 💌
                </span>
              </div>

              {/* Exact note requested by user */}
              <p className="font-handwriting text-2xl sm:text-3xl text-[#4A3B32] font-bold leading-relaxed">
                “Now, it's my turn to give you a letter”
              </p>

              <div className="mt-3 flex items-center justify-between text-xs text-[#947225] font-doodle">
                <span className="group-hover:underline">tap to read letter ↓</span>
                <span>♡ always & forever</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* PHOTO 3: Large photo underneath with caption */}
        <div className="mt-12 pt-8 border-t border-[#EFE8DF]">
          {photo3 && (
            <motion.div
              whileHover={{ scale: 1.015, rotate: 0 }}
              whileTap={{ scale: 0.99 }}
              className="relative bg-white p-4 sm:p-6 pb-7 sm:pb-9 rounded-sm polaroid-shadow hover:polaroid-shadow-hover transition-all duration-300 max-w-3xl mx-auto cursor-pointer group"
              style={{ transform: `rotate(${photo3.rotation || -1}deg)` }}
              onClick={() => setSelectedPhoto(photo3)}
            >
              {/* Tape on both top corners */}
              <WashiTape color="lavender" rotation={-3} className="-top-3 left-6 w-24 sm:w-32 z-10" />
              <WashiTape color="yellow" rotation={2} className="-top-3 right-6 w-24 sm:w-32 z-10" />

              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-[2px] bg-[#F3EFE9]">
                <img
                  src={photo3.url}
                  alt="Agatha - Memorable scenery moment"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-[#3B2D26] px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
                    <ZoomIn size={14} /> Click to expand
                  </span>
                </div>
              </div>

              {/* Caption requested for Photo 3 */}
              <div className="mt-4 sm:mt-5 text-center px-4">
                <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-[#382B24] leading-snug">
                  {photo3.caption}
                </p>
                <p className="text-xs text-[#A8988B] mt-1 font-doodle tracking-wide">
                  photo 03 / framed in time
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Full Photograph Zoom */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-3xl w-full bg-white p-4 sm:p-6 pb-8 rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 bg-white text-[#3B2D26] p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-20 cursor-pointer"
                aria-label="Close photo preview"
              >
                <X size={20} />
              </button>

              <div className="relative max-h-[70vh] overflow-hidden rounded-[2px] bg-black/5 flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                />
              </div>

              <div className="mt-5 text-center px-2">
                <p className="font-handwriting text-2xl sm:text-3xl font-bold text-[#382B24]">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
