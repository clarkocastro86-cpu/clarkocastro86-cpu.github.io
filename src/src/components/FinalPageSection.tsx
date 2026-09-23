import React from 'react';
import { motion } from 'motion/react';
import { ScrapbookPhoto } from '../types';
import { WashiTape, DoodleHeart, DoodleStar, DoodleSparkle, ScrapbookSticker } from './DoodleDecorations';

interface FinalPageSectionProps {
  photo: ScrapbookPhoto;
}

export const FinalPageSection: React.FC<FinalPageSectionProps> = ({ photo }) => {
  return (
    <section id="final-tribute" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      <div className="relative bg-[#FFFDF9] border border-[#E9DFD5] rounded-3xl p-6 sm:p-12 lg:p-16 polaroid-shadow overflow-hidden">
        {/* Washi tapes on top and corners */}
        <WashiTape color="pink" rotation={-2} className="-top-3 left-10 w-36 z-10" />
        <WashiTape color="yellow" rotation={2} className="-top-3 right-10 w-36 z-10" />

        {/* Large featured photo (Best of the three photos) */}
        <div className="max-w-2xl mx-auto mb-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white p-4 sm:p-6 pb-8 sm:pb-10 rounded-sm polaroid-shadow-hover transition-all duration-300"
            style={{ transform: 'rotate(-1deg)' }}
          >
            <WashiTape color="lavender" rotation={1} className="-top-3 left-1/2 -translate-x-1/2 w-32 z-10" />

            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[2px] bg-[#F5EFE8]">
              <img
                src={photo?.url}
                alt="Agatha - Best Friend Final Portrait"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>

            <div className="mt-4 text-center">
              <span className="font-doodle text-xs uppercase tracking-widest text-[#A8988B] font-bold">
                Agatha • My Best Friend Forever
              </span>
            </div>
          </motion.div>
        </div>

        {/* Display requested: # "Happy Birthday, Agatha! 🎂🫶" */}
        <h1 className="font-handwriting text-4xl sm:text-6xl md:text-7xl font-bold text-[#3B2D26] tracking-tight leading-tight">
          Happy Birthday, Agatha! 🎂🫶
        </h1>

        {/* Underneath */}
        <p className="mt-4 sm:mt-6 font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#5B463C] max-w-2xl mx-auto leading-snug">
          Thank you for being my best friend and for being part of so many memories I'll always remember.
        </p>

        <p className="mt-3 sm:mt-4 font-handwriting text-2xl sm:text-3xl text-[#7F675A] max-w-xl mx-auto">
          Here's to more memories and more laughs. 😂
        </p>

        {/* Divider with doodles */}
        <div className="my-8 flex items-center justify-center gap-3 text-[#D6C7B8]">
          <span className="w-16 h-px bg-[#E5DCD1]" />
          <DoodleHeart size={20} className="text-[#F4A7B9]" />
          <DoodleStar size={20} className="text-[#FBBF24]" />
          <DoodleHeart size={20} className="text-[#F4A7B9]" />
          <span className="w-16 h-px bg-[#E5DCD1]" />
        </div>

        {/* Final handwritten text requested: "Made with ❤️ for my dear best friend." */}
        <div className="pt-2">
          <p className="font-handwriting text-3xl sm:text-4xl font-bold text-[#E07A8B]">
            Made with ❤️ for my dear best friend.
          </p>
          <p className="text-xs text-[#A8988B] font-doodle mt-2 uppercase tracking-wider">
            October 3, 2026 • Forever grateful for you
          </p>
        </div>
      </div>
    </section>
  );
};
