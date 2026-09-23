import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Music } from 'lucide-react';
import { birthdayAudio } from '../utils/audioPlayer';

export const MusicPlayerBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = birthdayAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    birthdayAudio.toggle();
  };

  return (
    <aside
      id="birthday-music-player"
      aria-label="Birthday background music player"
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 select-none max-w-[calc(100vw-1.5rem)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleToggle}
        className="flex items-center gap-2.5 sm:gap-3 bg-[#FFFDF9]/95 backdrop-blur-md border border-[#E8DFD5] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg text-[#3B2D26] cursor-pointer touch-manipulation hover:bg-white transition-colors"
      >
        {/* Cute spinning music icon */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm shadow-inner flex-shrink-0 ${
            isPlaying ? 'bg-[#FFE8EC] text-[#D46B7D]' : 'bg-[#F2ECE4] text-[#86736A]'
          }`}
        >
          <Music size={17} />
        </motion.div>

        {/* Player label requested: "A song for your birthday 🎧" */}
        <div className="flex flex-col pr-1 min-w-0">
          <span className="text-xs sm:text-sm font-bold font-handwriting text-[#3B2D26] truncate">
            A song for your birthday 🎧
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-[11px] text-[#A8988B] font-doodle truncate">
              {isPlaying ? '♪ Playing sweet chime melody' : 'Tap to play music'}
            </span>
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-2.5 flex-shrink-0" aria-hidden="true">
                <span className="w-0.5 h-1.5 bg-[#E07A8B] animate-pulse rounded-full" />
                <span className="w-0.5 h-2.5 bg-[#E07A8B] animate-pulse rounded-full delay-75" />
                <span className="w-0.5 h-2 bg-[#E07A8B] animate-pulse rounded-full delay-150" />
              </div>
            )}
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          id="music-play-pause-btn"
          onClick={handleToggle}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E07A8B] hover:bg-[#D46B7D] active:scale-95 text-white flex items-center justify-center shadow-md transition-all cursor-pointer flex-shrink-0 ml-0.5"
          aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
      </motion.div>
    </aside>
  );
};
