/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ScrapbookPhoto } from './types';
import { DEFAULT_PHOTOS } from './data/initialData';
import { FloatingParticles } from './components/FloatingParticles';
import { OpeningScreen } from './components/OpeningScreen';
import { CountdownCard } from './components/CountdownCard';
import { MainPhotoSection } from './components/MainPhotoSection';
import { LetterSection } from './components/LetterSection';
import { MemoriesTimeline } from './components/MemoriesTimeline';
import { BestFriendSection } from './components/BestFriendSection';
import { BirthdaySurpriseSection } from './components/BirthdaySurpriseSection';
import { FinalPageSection } from './components/FinalPageSection';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { WashiTape, DoodleHeart, DoodleStar, DoodleSparkle, ScrapbookSticker } from './components/DoodleDecorations';
import { Images, Sparkles, X, ChevronDown, BookOpen } from 'lucide-react';
import { birthdayAudio } from './utils/audioPlayer';
import { resolveAssetUrl } from './utils/assetHelper';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState<ScrapbookPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('agatha_bday_photos_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          return parsed.map((item: ScrapbookPhoto) => ({
            ...item,
            url: resolveAssetUrl(item.url),
          }));
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_PHOTOS.map((p) => ({ ...p, url: resolveAssetUrl(p.url) }));
  });

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<ScrapbookPhoto | null>(null);

  // Attempt automatic audio playback on initial access and first interaction
  useEffect(() => {
    // Try to auto-play immediately if browser permits (desktop or returning visitor)
    birthdayAudio.play();

    // Phones require a touch/click gesture to unlock the Web Audio context:
    const handleFirstInteraction = () => {
      birthdayAudio.initContext();
      if (!birthdayAudio.getIsPlaying()) {
        birthdayAudio.play();
      }
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Save photos if updated
  const handleUpdatePhotos = (newPhotos: ScrapbookPhoto[]) => {
    setPhotos(newPhotos);
    try {
      localStorage.setItem('agatha_bday_photos_v2', JSON.stringify(newPhotos));
    } catch {
      // ignore
    }
  };

  const handleOpenBook = () => {
    setIsOpen(true);
    // Guarantee audio plays when user unlocks the scrapbook
    birthdayAudio.initContext();
    birthdayAudio.play();

    // Subtle initial celebration burst
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F9D6DC', '#D7E3FC', '#E2D9F3', '#FEF3C7']
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#42352F] relative selection:bg-[#F9D6DC] selection:text-[#5B303B] overflow-x-hidden">
      {/* Floating stars, hearts & doodle particles */}
      <FloatingParticles />

      {/* Opening Fullscreen Screen Cover */}
      <OpeningScreen isOpen={isOpen} onOpen={handleOpenBook} />

      {/* Main Scrapbook Content (Visible when book is open) */}
      <div className={`transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Top Floating App Bar */}
        <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EADFD5] px-4 sm:px-8 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎂</span>
              <span className="font-handwriting text-2xl sm:text-3xl font-bold text-[#3B2D26]">
                Agatha's Scrapbook
              </span>
              <span className="hidden sm:inline text-xs font-doodle text-[#8E7E75] bg-[#FFF3F6] px-2 py-0.5 rounded-full border border-pink-100">
                bestie edition
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFDF9] border border-[#DDD3C7] text-xs font-semibold text-[#664F43] hover:bg-white shadow-2xs transition-all cursor-pointer"
                title="Replace or upload photos"
              >
                <Images size={14} className="text-[#E07A8B]" />
                <span className="hidden sm:inline">Change Photos</span>
              </button>

              <button
                onClick={() => scrollToSection('birthday-surprise')}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#E07A8B] hover:bg-[#D46B7D] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Make a Wish</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Scrapbook Banner */}
        <div className="relative pt-8 pb-4 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block relative">
            <WashiTape color="pink" rotation={-1.5} className="-top-3 left-1/2 -translate-x-1/2 w-36 sm:w-44 z-10" />
            <h1 className="font-handwriting text-5xl sm:text-7xl font-bold text-[#382821] tracking-tight pt-4">
              Happy Birthday, Agatha! 🎂
            </h1>
          </div>
          <p className="font-handwriting text-2xl sm:text-3xl text-[#7A6458] mt-2">
            A little something for my dear best friend. 🫶
          </p>

          {/* Quick jump navigation chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { label: 'Photos 📸', id: 'scrapbook-gallery' },
              { label: 'Dear Agatha 💌', id: 'best-friend-letter' },
              { label: 'Memories 🕰️', id: 'memories-timeline' },
              { label: 'Us 😂', id: 'best-friend-traits' },
              { label: 'Countdown ⏰', id: 'countdown-banner' },
              { label: 'Surprise 🎂✨', id: 'birthday-surprise' }
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => scrollToSection(chip.id)}
                className="text-xs sm:text-sm font-doodle px-3 py-1 rounded-full bg-white/80 hover:bg-white border border-[#E8DFD5] text-[#5C483D] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Main Photo Section (With the 3 Photos arranged as polaroids + note) */}
        <MainPhotoSection photos={photos} />

        {/* 2. Letter to My Best Friend (Handwritten on lined paper) */}
        <LetterSection />

        {/* 3. Our Friendship Memories (Timeline featuring the 3 photos) */}
        <MemoriesTimeline
          photos={photos}
          onSelectPhoto={(photo) => setLightboxPhoto(photo)}
        />

        {/* 4. Best Friend Section (6 3D interactive flip cards) */}
        <BestFriendSection />

        {/* 5. Countdown Banner (Inspired by user's uploaded counter.png) */}
        <CountdownCard
          photos={photos}
          onCelebrateClick={() => scrollToSection('birthday-surprise')}
        />

        {/* 6. Birthday Surprise (Cake, candles, confetti, slideshow reel & reveal) */}
        <BirthdaySurpriseSection
          photos={photos}
          onTriggerGlobalConfetti={() => {
            confetti({
              particleCount: 100,
              spread: 100,
              origin: { y: 0.5 }
            });
          }}
        />

        {/* 7. Final Page Tribute (Best photo + large display + sign-off) */}
        <FinalPageSection photo={photos[0]} />

        {/* Bottom footer credit */}
        <footer className="py-8 text-center border-t border-[#EAE0D6] text-xs text-[#A8988B] font-doodle">
          <p>Handcrafted with love for Agatha's Birthday • Best Friends Forever</p>
        </footer>
      </div>

      {/* Floating Music Player ("A song for your birthday 🎧") */}
      <MusicPlayerBar />

      {/* Photo Customizer Modal */}
      <PhotoManagerModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        photos={photos}
        onUpdatePhotos={handleUpdatePhotos}
      />

      {/* Photo Lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white p-4 pb-8 rounded-sm polaroid-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-3 -right-3 bg-white text-[#3B2D26] p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-20 cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="max-h-[75vh] overflow-hidden rounded-[2px] bg-black/5 flex items-center justify-center">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.caption}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>
            <p className="mt-4 text-center font-handwriting text-3xl font-bold text-[#3B2D26]">
              {lightboxPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
