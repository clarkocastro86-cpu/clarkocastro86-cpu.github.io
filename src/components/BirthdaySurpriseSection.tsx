import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { ScrapbookPhoto } from '../types';
import { WashiTape, DoodleStar, DoodleHeart, DoodleSparkle, ScrapbookSticker } from './DoodleDecorations';
import { Sparkles, Heart } from 'lucide-react';

interface BirthdaySurpriseSectionProps {
  photos: ScrapbookPhoto[];
  onTriggerGlobalConfetti?: () => void;
}

export const BirthdaySurpriseSection: React.FC<BirthdaySurpriseSectionProps> = ({
  photos,
  onTriggerGlobalConfetti
}) => {
  const [candlesLit, setCandlesLit] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Slideshow timer
  useEffect(() => {
    let interval: number;
    if (showSlideshow) {
      interval = window.setInterval(() => {
        setActiveSlideIndex((prev) => {
          if (prev >= photos.length - 1) {
            // End slideshow after cycling through the 3 photos
            setTimeout(() => {
              setShowSlideshow(false);
              setRevealed(true);
            }, 1200);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [showSlideshow, photos.length]);

  const fireConfetti = () => {
    // Left burst
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 65,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#F9D6DC', '#D7E3FC', '#E2D9F3', '#FEF3C7', '#F472B6']
    });
    // Right burst
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 65,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#F9D6DC', '#D7E3FC', '#E2D9F3', '#FEF3C7', '#60A5FA']
    });
    // Center stars burst
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.6 },
      shapes: ['star', 'circle']
    });
    onTriggerGlobalConfetti?.();
  };

  const handleMakeWish = () => {
    // 1. Light the candles
    setCandlesLit(true);
    // 2. Trigger confetti
    fireConfetti();
    // 3. Start slideshow
    setActiveSlideIndex(0);
    setShowSlideshow(true);
  };

  return (
    <section id="birthday-surprise" className="py-12 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Intro text requested: "Okay... one last thing." */}
      <div className="mb-8">
        <ScrapbookSticker text="Grand Finale" emoji="✨" bg="bg-[#F3E8FF] text-[#6B21A8]" rotation={-2} />
        <h2 className="font-handwriting text-4xl sm:text-6xl font-bold text-[#3B2D26] mt-3">
          Okay... one last thing.
        </h2>
        <p className="mt-1 text-[#7F6B62] text-base sm:text-lg">
          Take a deep breath, make the biggest wish, and blow out the candles.
        </p>
      </div>

      {/* Birthday Cake Box Card */}
      <div className="relative bg-[#FFFDF9] border border-[#E9DFD5] rounded-3xl p-8 sm:p-14 polaroid-shadow max-w-2xl mx-auto overflow-hidden">
        <WashiTape color="pink" rotation={-2} className="-top-3 left-1/4 w-32 z-10" />
        <WashiTape color="blue" rotation={2} className="-top-3 right-1/4 w-32 z-10" />

        {/* The Illustrated Interactive Birthday Cake */}
        <div className="relative my-8 flex flex-col items-center justify-center">
          
          {/* Candle Flames */}
          <div className="flex gap-6 sm:gap-8 mb-1 z-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <AnimatePresence>
                  {candlesLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="candle-flame w-4 h-6 rounded-full bg-gradient-to-t from-[#F59E0B] via-[#FBBF24] to-[#FFFBEB] -mb-1 shadow-lg"
                    />
                  )}
                </AnimatePresence>
                {/* Candle Stick */}
                <div className="w-3 h-10 rounded-t-sm bg-gradient-to-r from-[#FDE8EC] via-[#F4A7B9] to-[#FDE8EC] border border-[#E5A1B0]" />
              </div>
            ))}
          </div>

          {/* Cake Top Layer */}
          <div className="relative w-48 sm:w-60 h-16 rounded-t-2xl bg-[#FFF5F7] border-2 border-[#F0D5DC] shadow-sm flex items-center justify-center">
            {/* Frosting drips */}
            <div className="absolute -bottom-2 inset-x-0 flex justify-around">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-5 h-4 bg-[#FFF5F7] rounded-b-full border-b-2 border-r-2 border-[#F0D5DC]" />
              ))}
            </div>
            <span className="font-doodle text-sm sm:text-base text-[#D46B7D] font-bold">
              Agatha's Special Day
            </span>
          </div>

          {/* Cake Bottom Layer */}
          <div className="relative w-60 sm:w-76 h-20 rounded-b-2xl bg-[#FBEFF2] border-2 border-t-0 border-[#F0D5DC] shadow-md flex items-center justify-center">
            <span className="text-xl">🌸 🍓 🌸 🍓 🌸</span>
          </div>

          {/* Cake Platter */}
          <div className="w-72 sm:w-92 h-4 rounded-full bg-[#E8DFD8] border border-[#D5C7BC] shadow-sm -mt-1" />
        </div>

        {/* Button requested: "Make a Wish 🎂✨" */}
        {!candlesLit && (
          <div className="mt-8">
            <motion.button
              id="make-a-wish-btn"
              onClick={handleMakeWish}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E07A8B] hover:bg-[#D46B7D] text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span>Make a Wish 🎂✨</span>
            </motion.button>
          </div>
        )}

        {/* When candles lit: celebration actions & reveals */}
        {candlesLit && (
          <div className="mt-6">
            <motion.button
              onClick={fireConfetti}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFF0F3] text-[#D46B7D] border border-[#F4A7B9] text-sm font-semibold hover:bg-[#FFE4E8] cursor-pointer"
            >
              <Sparkles size={16} /> More Confetti! 🎉
            </motion.button>
          </div>
        )}

        {/* Slideshow Modal / Animation of the Three Photos */}
        <AnimatePresence>
          {showSlideshow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <div className="relative bg-white p-4 sm:p-6 pb-8 rounded-sm max-w-lg w-full polaroid-shadow text-center">
                <WashiTape color="pink" rotation={-2} className="-top-3 left-1/2 -translate-x-1/2 w-32 z-10" />

                <div className="text-xs uppercase tracking-widest font-doodle text-[#A8988B] mb-2">
                  Memory Reel • {activeSlideIndex + 1} of {photos.length}
                </div>

                <div className="relative aspect-square overflow-hidden rounded-[2px] bg-[#F5EFE8]">
                  <motion.img
                    key={activeSlideIndex}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={photos[activeSlideIndex]?.url}
                    alt={photos[activeSlideIndex]?.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4">
                  <p className="font-handwriting text-2xl sm:text-3xl font-bold text-[#3B2D26]">
                    {photos[activeSlideIndex]?.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final revealed message requested in prompt */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 pt-8 border-t border-dashed border-[#E5DBCE]"
            >
              {/* "Happy Birthday, Agatha! 🥳" */}
              <h3 className="font-handwriting text-4xl sm:text-6xl font-bold text-[#D46B7D] leading-tight">
                Happy Birthday, Agatha! 🥳
              </h3>

              {/* "Here's to another year of memories, laughter, chaos, and being the amazing person you are." */}
              <p className="mt-3 font-handwriting text-2xl sm:text-3xl text-[#5B463C] max-w-xl mx-auto leading-relaxed">
                Here's to another year of memories, laughter, chaos, and being the amazing person you are.
              </p>

              <div className="mt-5 flex justify-center gap-2 text-pink-400">
                <Heart size={20} fill="currentColor" />
                <Heart size={24} fill="currentColor" />
                <Heart size={20} fill="currentColor" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
