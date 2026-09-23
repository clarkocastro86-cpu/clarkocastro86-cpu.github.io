import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrapbookPhoto } from '../types';
import { X, Upload, RotateCcw, Image, Check } from 'lucide-react';
import { DEFAULT_PHOTOS } from '../data/initialData';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: ScrapbookPhoto[];
  onUpdatePhotos: (photos: ScrapbookPhoto[]) => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  photos,
  onUpdatePhotos
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [urlInputs, setUrlInputs] = useState<string[]>(photos.map(p => p.url));
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const updated = [...photos];
          updated[index] = { ...updated[index], url: result };
          onUpdatePhotos(updated);

          const newUrls = [...urlInputs];
          newUrls[index] = result;
          setUrlInputs(newUrls);

          setSuccessMsg(`Photo ${index + 1} updated!`);
          setTimeout(() => setSuccessMsg(''), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (index: number, val: string) => {
    const newUrls = [...urlInputs];
    newUrls[index] = val;
    setUrlInputs(newUrls);

    const updated = [...photos];
    updated[index] = { ...updated[index], url: val };
    onUpdatePhotos(updated);
  };

  const handleResetDefaults = () => {
    onUpdatePhotos(DEFAULT_PHOTOS);
    setUrlInputs(DEFAULT_PHOTOS.map(p => p.url));
    setSuccessMsg('Restored default photos!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          className="relative bg-[#FFFDF9] border border-[#E9DFD5] rounded-3xl p-6 sm:p-8 max-w-xl w-full polaroid-shadow overflow-hidden"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#EFE8DF]">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📸</span>
              <h3 className="font-handwriting text-3xl font-bold text-[#3B2D26]">
                Replace or Upload Photos
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-[#7F6B62]">
            You can drop new photos or provide custom image URLs for Agatha's 3 featured scrapbook memories.
          </p>

          {successMsg && (
            <div className="mt-3 p-2 bg-emerald-50 text-emerald-700 text-xs rounded-lg flex items-center gap-1.5">
              <Check size={14} /> {successMsg}
            </div>
          )}

          {/* Photo slots */}
          <div className="mt-5 space-y-4">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#FAF6F0] border border-[#E9E2D8]"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                  <img
                    src={photo.url}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-doodle text-xs uppercase tracking-wider font-bold text-[#7E57C2]">
                      Photo 0{i + 1}
                    </span>
                    <span className="text-[11px] text-[#A8988B] truncate max-w-[140px]">
                      {photo.caption}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#DDD3C7] rounded-full text-xs font-semibold text-[#5B463C] hover:bg-gray-50 cursor-pointer shadow-2xs">
                      <Upload size={12} />
                      <span>Upload file</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(i, e)}
                      />
                    </label>

                    <input
                      type="text"
                      placeholder="Or paste image URL"
                      value={urlInputs[i]}
                      onChange={(e) => handleUrlChange(i, e.target.value)}
                      className="flex-1 text-xs px-3 py-1 bg-white border border-[#DDD3C7] rounded-full text-[#3B2D26] focus:outline-none focus:border-[#E07A8B]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer actions */}
          <div className="mt-6 pt-4 border-t border-[#EFE8DF] flex items-center justify-between">
            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 text-xs text-[#8E7E75] hover:text-[#3B2D26] font-medium cursor-pointer"
            >
              <RotateCcw size={13} /> Reset to defaults
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#E07A8B] hover:bg-[#D46B7D] text-white text-sm font-semibold rounded-full shadow-sm cursor-pointer"
            >
              Done ✨
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
