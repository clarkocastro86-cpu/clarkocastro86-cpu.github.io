import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ScrapbookPhoto } from '../types';
import { DoodleStar, DoodleHeart, DoodleSparkle, WashiTape, ScrapbookSticker } from './DoodleDecorations';
import { Calendar, Sparkles } from 'lucide-react';

interface CountdownCardProps {
  photos: ScrapbookPhoto[];
  onCelebrateClick: () => void;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ photos, onCelebrateClick }) => {
  // Target: October 3, 2026 (Month is 0-indexed: 9 = October)
  const targetDate = new Date(2026, 9, 3, 0, 0, 0);

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 22,
    minutes: 17,
    seconds: 38
  });
  const [isCelebrationTime, setIsCelebrationTime] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsCelebrationTime(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown-banner" className="py-8 sm:py-14 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="relative bg-[#FFFDF9] border border-[#E9DFD5] rounded-3xl p-6 sm:p-10 polaroid-shadow overflow-hidden">
        {/* Soft watercolor pastel wash background accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#F2EBF9] via-[#FAF5FF] to-transparent rounded-full blur-2xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#FFEAF0] via-[#FFF5F8] to-transparent rounded-full blur-2xl opacity-70 pointer-events-none" />

        {/* Decorative Washi Tapes */}
        <WashiTape color="lavender" rotation={-2} className="-top-3 left-12 w-32 z-10" />
        <WashiTape color="pink" rotation={2} className="-top-3 right-12 w-32 z-10" />

        {/* Small floating handwritten doodles like counter.png */}
        <div className="flex justify-between items-start text-xs sm:text-sm text-[#8B7569] font-handwriting px-2 sm:px-8">
          <div className="flex items-center gap-1 -rotate-3 text-lg sm:text-xl">
            <span>✨ good things take time</span>
            <span className="text-red-400">♥</span>
          </div>
          <div className="flex items-center gap-1 rotate-2 text-lg sm:text-xl text-right">
            <span>Same girl, more dreams, more birthdays to come.</span>
            <span className="text-red-400">♥</span>
          </div>
        </div>

        {/* Header matching counter.png */}
        <div className="text-center mt-4 sm:mt-6 mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <DoodleSparkle size={20} />
            <span className="font-doodle text-sm sm:text-base tracking-wider uppercase text-[#7E57C2] font-bold">
              Countdown to October 3
            </span>
            <DoodleSparkle size={20} />
          </div>

          <h2 className="font-handwriting text-4xl sm:text-6xl font-bold text-[#432C7A] tracking-tight">
            Before We Celebrate You...
          </h2>
          <p className="mt-2 text-[#7F6B62] text-base sm:text-xl font-medium">
            Just a little longer until we celebrate the birthday girl! <span className="text-purple-600">♥</span>
          </p>
        </div>

        {/* Countdown Grid (Aesthetic Lavender Pills matching counter.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto my-6">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -3, scale: 1.02 }}
              className="bg-gradient-to-b from-[#EDE7F6] to-[#F3E5F5] border border-[#DDD4EA] rounded-2xl p-4 sm:p-5 text-center shadow-sm"
            >
              <span className="block text-3xl sm:text-4xl font-bold text-[#4A148C] tracking-tight font-sans">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="block text-[11px] sm:text-xs font-bold tracking-widest text-[#7E57C2] mt-1">
                {item.label}
              </span>
              <span className="block text-purple-400 text-xs mt-1">♥</span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-3 mb-6 text-sm text-[#8E7E75] flex items-center justify-center gap-2 font-medium">
          <Calendar size={15} className="text-[#7E57C2]" />
          <span>Birthday: October 3, 2026</span>
        </div>

        {/* IT'S TIME / Celebrate Banner (from bottom of counter.png) */}
        <div className="mt-8 pt-6 border-t border-dashed border-[#E5DBCE] text-center">
          <div className="relative inline-block bg-[#FFFBF2] border border-[#ECDCC7] rounded-3xl px-6 sm:px-12 py-5 shadow-sm max-w-lg mx-auto">
            {/* Washi tape on celebratory badge */}
            <WashiTape color="yellow" rotation={1} className="-top-3 left-1/2 -translate-x-1/2 w-28 z-10" />

            <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold font-handwriting text-[#3D2C24]">
              <span>✨ IT'S TIME! 🎂 ✨</span>
            </div>
            <p className="text-sm sm:text-base text-[#7A6458] mt-1 font-medium">
              Today and always, we celebrate YOU, Agatha! <span className="text-red-400">♥</span>
            </p>

            <div className="mt-4">
              <motion.button
                id="lets-celebrate-btn"
                onClick={onCelebrateClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7E57C2] to-[#673AB7] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Let's Celebrate! 🥳</span>
                <span>→</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom decorative scribble note */}
        <div className="mt-6 text-center">
          <p className="font-handwriting text-xl sm:text-2xl text-[#7E57C2]">
            The best is yet to come. ♡
          </p>
        </div>
      </div>
    </section>
  );
};
