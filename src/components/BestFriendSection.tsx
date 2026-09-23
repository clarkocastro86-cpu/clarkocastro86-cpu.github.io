import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FRIENDSHIP_TRAITS } from '../data/initialData';
import { WashiTape, DoodleStar, DoodleSparkle, DoodleHeart, ScrapbookSticker } from './DoodleDecorations';
import { RotateCw, Sparkles } from 'lucide-react';

export const BestFriendSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="best-friend-traits" className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 mb-2">
          <ScrapbookSticker text="The Friendship Code" emoji="✨" bg="bg-[#FEF5E7] text-[#97601F]" rotation={-1} />
        </div>

        {/* Title requested in prompt */}
        <h2 className="font-handwriting text-4xl sm:text-6xl font-bold text-[#3B2D26]">
          Things That Make This Friendship... Us 😂
        </h2>
        <p className="mt-2 text-[#7F6B62] text-base sm:text-lg max-w-lg mx-auto">
          Tap each card to reveal the unvarnished, 100% accurate truth.
        </p>
      </div>

      {/* Grid of 6 interactive flip cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FRIENDSHIP_TRAITS.map((trait, idx) => {
          const isFlipped = !!flippedCards[trait.id];
          const rotations = [-1.5, 1.2, -0.8, 1.5, -1.2, 0.9];
          const tapeColors: ('pink' | 'blue' | 'lavender' | 'yellow')[] = ['pink', 'blue', 'yellow', 'lavender', 'pink', 'blue'];
          const currentRotation = rotations[idx % rotations.length];
          const currentTape = tapeColors[idx % tapeColors.length];

          return (
            <div
              key={trait.id}
              className="perspective-1000 h-64 sm:h-72 cursor-pointer select-none"
              onClick={() => toggleCard(trait.id)}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="relative w-full h-full transform-style-preserve-3d"
                style={{ transform: `rotate(${currentRotation}deg)` }}
              >
                {/* FRONT OF CARD */}
                <div className="absolute inset-0 backface-hidden bg-[#FFFDF9] border border-[#E8DFD5] rounded-2xl p-6 sm:p-7 polaroid-shadow flex flex-col justify-between overflow-hidden">
                  <WashiTape color={currentTape} rotation={-1} className="-top-3 left-1/2 -translate-x-1/2 w-24 z-10" />

                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl">{trait.emoji}</span>
                    <span className="font-doodle text-xs text-[#A8988B] uppercase tracking-wider font-bold">
                      Rule #{idx + 1}
                    </span>
                  </div>

                  <div className="my-auto text-center py-2">
                    <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-[#3B2D26] leading-snug">
                      {trait.frontText}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE4] text-xs text-[#A8988B]">
                    <span className="font-doodle">tap to flip</span>
                    <RotateCw size={13} className="text-[#A8988B] animate-spin-slow" />
                  </div>
                </div>

                {/* BACK OF CARD (Revealed when flipped) */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br ${trait.color} border border-[#E2D4C6] rounded-2xl p-6 sm:p-7 polaroid-shadow flex flex-col justify-between overflow-hidden`}
                >
                  <WashiTape color="lavender" rotation={2} className="-top-3 left-1/2 -translate-x-1/2 w-24 z-10" />

                  <div className="flex items-center justify-between">
                    <span className="font-doodle text-xs text-[#7A5B49] uppercase tracking-wider font-bold">
                      The Real Story
                    </span>
                    <span className="text-xl">{trait.emoji}</span>
                  </div>

                  <div className="my-auto py-2">
                    <p className="font-handwriting text-2xl sm:text-2xl font-bold text-[#423128] leading-relaxed">
                      “{trait.backText}”
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs text-[#7A5B49]">
                    <span className="font-doodle text-xs">tap to flip back</span>
                    <span className="text-sm">🫶</span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
