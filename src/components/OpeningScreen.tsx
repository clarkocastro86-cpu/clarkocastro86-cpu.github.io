import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DoodleStar, DoodleHeart, DoodleSparkle, WashiTape, ScrapbookSticker } from './DoodleDecorations';

interface OpeningScreenProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ isOpen, onOpen }) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-cover"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(8px)',
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0] p-4 sm:p-6 overflow-hidden select-none"
        >
          {/* Subtle background scrapbook textures */}
          <div className="absolute inset-0 bg-[radial-gradient(#E8DFD8_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

          {/* Floating cute doodles in the background */}
          <div className="absolute top-10 left-8 sm:left-24 animate-gentle-float">
            <DoodleStar size={28} />
          </div>
          <div className="absolute top-20 right-12 sm:right-28 animate-gentle-float-delayed">
            <DoodleHeart size={26} />
          </div>
          <div className="absolute bottom-16 left-12 sm:left-32 animate-gentle-float-delayed">
            <DoodleSparkle size={26} />
          </div>
          <div className="absolute bottom-20 right-10 sm:right-32 animate-gentle-float">
            <DoodleStar size={32} />
          </div>

          {/* Book / Journal Cover container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#FFFDF9] border border-[#E9DFD5] rounded-3xl p-6 sm:p-12 polaroid-shadow text-center"
          >
            {/* Top washi tape accent */}
            <WashiTape
              color="pink"
              rotation={-2}
              className="top-[-10px] left-1/2 -translate-x-1/2 w-32 sm:w-44 z-10"
            />

            {/* Ribbon / bookmark line */}
            <div className="absolute top-0 right-6 sm:right-10 w-3.5 sm:w-4 h-12 sm:h-16 bg-[#F8B4C0] rounded-b-md shadow-sm" />

            {/* Cute stickers on cover */}
            <div className="absolute top-6 left-6 hidden sm:block">
              <ScrapbookSticker text="Besties Edition" emoji="⭐" bg="bg-[#FFF1D6] text-[#7A562B]" rotation={-6} />
            </div>
            <div className="absolute top-6 right-16 hidden sm:block">
              <ScrapbookSticker text="Special Delivery" emoji="🌸" bg="bg-[#E9F4FF] text-[#2C5282]" rotation={4} />
            </div>

            {/* Main scrapbook icon / gift graphic */}
            <div className="mt-2 sm:mt-4 mb-4 sm:mb-6 flex justify-center">
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#FFE8EC] via-[#FFF3F6] to-[#EAE6F8] p-3 border-2 border-white shadow-inner flex items-center justify-center text-4xl sm:text-5xl"
              >
                🎂
                <span className="absolute -top-2 -right-2 text-xl">✨</span>
                <span className="absolute -bottom-1 -left-2 text-xl">💌</span>
              </motion.div>
            </div>

            {/* Large text requested */}
            <h1 className="font-handwriting text-4xl sm:text-6xl md:text-7xl font-bold text-[#3B2D26] tracking-tight leading-tight">
              Happy Birthday, Agatha! 🎂
            </h1>

            {/* Subtitle requested */}
            <p className="mt-2 sm:mt-4 text-[#735E55] text-base sm:text-xl font-medium">
              A little something for my dear best friend.
            </p>

            <div className="my-4 sm:my-5 flex items-center justify-center gap-2 text-[#C4B5A5]">
              <span>——</span>
              <span className="text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#A8988B] font-doodle">
                Open to turn page
              </span>
              <span>——</span>
            </div>

            {/* Button requested */}
            <motion.button
              id="open-surprise-btn"
              onClick={onOpen}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#E07A8B] hover:bg-[#D46B7D] active:bg-[#c9596c] text-white font-semibold text-base sm:text-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer touch-manipulation w-full sm:w-auto"
            >
              <span>Open Your Surprise 💌</span>
              <span className="text-lg sm:text-xl">✨</span>
            </motion.button>

            {/* Footer tiny text */}
            <p className="mt-4 text-xs sm:text-sm text-[#A8988B] font-handwriting text-base sm:text-lg">
              music plays automatically • turn volume up 🎶
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
