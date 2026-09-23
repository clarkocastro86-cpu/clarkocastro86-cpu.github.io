import React from 'react';
import { motion } from 'motion/react';
import { ScrapbookPhoto } from '../types';
import { TIMELINE_MEMORIES } from '../data/initialData';
import { WashiTape, DoodleStar, DoodleSparkle, DoodleHeart, ScrapbookSticker } from './DoodleDecorations';

interface MemoriesTimelineProps {
  photos: ScrapbookPhoto[];
  onSelectPhoto: (photo: ScrapbookPhoto) => void;
}

export const MemoriesTimeline: React.FC<MemoriesTimelineProps> = ({ photos, onSelectPhoto }) => {
  return (
    <section id="memories-timeline" className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <ScrapbookSticker text="Timeline of Us" emoji="🕰️" bg="bg-[#E9F3FD] text-[#285A88]" rotation={-2} />
        <h2 className="font-handwriting text-4xl sm:text-6xl font-bold text-[#3B2D26] mt-2">
          A Few Memories Along the Way 📸
        </h2>
        <p className="mt-2 text-[#7F6B62] text-base sm:text-lg max-w-md mx-auto">
          From completely unplanned chaos to unforgettable days.
        </p>
      </div>

      {/* Timeline items */}
      <div className="relative">
        {/* Central connecting dashed thread line on desktop */}
        <div className="hidden md:block absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-[#D6C7B8] pointer-events-none" />

        <div className="space-y-12 sm:space-y-16">
          {TIMELINE_MEMORIES.map((item, index) => {
            const photo = photos[index] || photos[0];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-6 sm:gap-10`}
              >
                {/* Timeline node badge in center */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FFFDF9] border-2 border-[#E07A8B] items-center justify-center text-sm shadow-sm z-20">
                  <span>{item.sticker}</span>
                </div>

                {/* Photo Polaroid Card */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.03, rotate: 0 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => photo && onSelectPhoto(photo)}
                    className="relative bg-white p-3.5 sm:p-4 pb-6 sm:pb-7 rounded-sm polaroid-shadow hover:polaroid-shadow-hover transition-all duration-300 cursor-pointer w-full max-w-sm group"
                    style={{ transform: `rotate(${isEven ? -2 : 2.5}deg)` }}
                  >
                    <WashiTape
                      color={isEven ? 'pink' : 'blue'}
                      rotation={isEven ? -1 : 2}
                      className="-top-3 left-1/2 -translate-x-1/2 w-28 z-10"
                    />

                    <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-[2px] bg-[#F3EFE9]">
                      <img
                        src={photo?.url}
                        alt={`Memory - ${item.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white/95 text-[#3B2D26] px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                          🔍 View Photo
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <span className="text-xs uppercase tracking-wider font-doodle text-[#A8988B] font-bold">
                        {item.dateTag}
                      </span>
                      <p className="font-handwriting text-lg sm:text-xl font-bold text-[#3B2D26]">
                        {photo?.caption || item.title}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Narrative Card */}
                <div className="w-full md:w-1/2">
                  <div
                    className={`relative bg-[#FFFDF9] border border-[#E9DFD5] rounded-2xl p-6 sm:p-8 polaroid-shadow max-w-md mx-auto ${
                      isEven ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                    }`}
                  >
                    {/* Corner doodle */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-doodle text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FAF3EC] text-[#865F4A] font-bold">
                        {item.dateTag}
                      </span>
                      <span className="text-lg">{item.sticker}</span>
                    </div>

                    {/* Card Title requested in prompt */}
                    <h3 className="font-handwriting text-3xl sm:text-4xl font-bold text-[#3B2D26]">
                      {item.title}
                    </h3>

                    {/* Quote text requested in prompt */}
                    <p className="mt-3 font-handwriting text-2xl sm:text-2xl text-[#6B574C] leading-relaxed italic">
                      “{item.quote}”
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#F2ECE4] flex items-center justify-between text-xs text-[#A8988B] font-doodle">
                      <span>Agatha & bestie memories</span>
                      <span className="text-pink-400">♥ 100% real</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
