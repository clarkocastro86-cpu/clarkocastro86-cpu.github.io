import React from 'react';
import { motion } from 'motion/react';
import { WashiTape, DoodleHeart, DoodleStar, ScrapbookSticker } from './DoodleDecorations';
import { HEARTFELT_LETTER } from '../data/initialData';

export const LetterSection: React.FC = () => {
  return (
    <section id="best-friend-letter" className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <ScrapbookSticker text="From the heart" emoji="💌" bg="bg-[#FDE8EC] text-[#863D50]" rotation={2} />
        <h2 className="font-handwriting text-4xl sm:text-6xl font-bold text-[#3B2D26] mt-2">
          A Letter For You
        </h2>
        <p className="text-[#86736A] text-sm sm:text-base mt-1">
          Some things are best said in ink.
        </p>
      </div>

      {/* Lined Paper Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#FFFDF9] border border-[#E5DCD1] rounded-2xl sm:rounded-3xl p-6 sm:p-12 sm:pb-16 polaroid-shadow overflow-hidden"
      >
        {/* Washi tapes on top and corner */}
        <WashiTape color="pink" rotation={-1} className="-top-3 left-10 sm:left-16 w-32 sm:w-40 z-10" />
        <WashiTape color="lavender" rotation={3} className="-top-3 right-10 sm:right-16 w-28 sm:w-36 z-10" />

        {/* Vintage postal stamp in top right */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 w-16 h-20 border-2 border-dashed border-[#D9C4B7] rounded-md p-1 bg-[#FBF7F2] rotate-3 hidden sm:flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <span className="text-xl">🎂</span>
          <span className="text-[9px] font-bold text-[#9C8274] uppercase tracking-wider mt-1">Air Mail</span>
          <span className="text-[8px] text-[#BCA598]">Oct 2026</span>
        </div>

        {/* Lined paper texture background */}
        <div className="lined-paper px-3 sm:px-8 py-4 sm:py-6 rounded-xl">
          {/* Header Title requested: "Dear Agatha, 💌" */}
          <h3 className="font-handwriting text-3xl sm:text-5xl font-bold text-[#3B2D26] mb-6 flex items-center gap-2">
            {HEARTFELT_LETTER.title}
          </h3>

          {/* Letter Body Paragraphs requested in prompt */}
          <div className="space-y-6 text-[#4A3B32] font-handwriting text-2xl sm:text-3xl leading-relaxed">
            {HEARTFELT_LETTER.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="indent-4 sm:indent-8">
                {paragraph}
              </p>
            ))}

            {/* Bold sign-off requested */}
            <div className="pt-6 text-right">
              <p className="font-handwriting text-3xl sm:text-4xl font-bold text-[#E07A8B]">
                {HEARTFELT_LETTER.signOff}
              </p>
              <p className="text-sm font-doodle text-[#A38F84] mt-1">
                ♡ your best friend forever & always
              </p>
            </div>
          </div>
        </div>

        {/* Decorative corner stickers & doodles */}
        <div className="absolute bottom-4 left-6 flex items-center gap-2 text-[#F4A7B9]">
          <DoodleHeart size={20} />
          <span className="font-doodle text-sm text-[#8D766A]">written with infinite appreciation</span>
        </div>

        <div className="absolute bottom-4 right-8">
          <DoodleStar size={24} className="text-[#FBBF24]" />
        </div>
      </motion.div>
    </section>
  );
};
