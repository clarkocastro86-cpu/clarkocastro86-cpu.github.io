import { ScrapbookPhoto, MemoryTimelineItem, FriendshipTrait } from '../types';
import { resolveAssetUrl } from '../utils/assetHelper';

export const DEFAULT_PHOTOS: ScrapbookPhoto[] = [
  {
    id: 'photo-1',
    // Photo 1: Agatha with glasses, golden lighting, cute aesthetic pout
    url: resolveAssetUrl('photos/photo-1.jpg'),
    caption: 'pa pogi ka dito pre ah',
    subtitle: 'Golden hour perfection ✨',
    rotation: -3,
    tapeColor: 'pink'
  },
  {
    id: 'photo-2',
    // Photo 2: Agatha outdoor candid moment with cap & iced drink
    url: resolveAssetUrl('photos/photo-2.jpg'),
    caption: 'dito pa-cute yan siya',
    subtitle: 'Mid-laugh as usual 📸',
    rotation: 4,
    tapeColor: 'blue'
  },
  {
    id: 'photo-3',
    // Photo 3: Agatha aesthetic portrait
    url: resolveAssetUrl('photos/photo-3.jpg'),
    caption: 'One of those little moments worth remembering.',
    subtitle: 'A day we will never forget ☁️',
    rotation: -1,
    tapeColor: 'lavender'
  }
];

export const TIMELINE_MEMORIES: MemoryTimelineItem[] = [
  {
    id: 'mem-1',
    title: 'The Random Moments',
    quote: 'The moments that weren\'t supposed to be memorable somehow became the ones we remember.',
    photoId: 'photo-1',
    dateTag: 'Chapter One',
    sticker: '✨'
  },
  {
    id: 'mem-2',
    title: 'The Laughs',
    quote: 'Because apparently, we can turn almost anything into something funny.',
    photoId: 'photo-2',
    dateTag: 'Chapter Two',
    sticker: '😂'
  },
  {
    id: 'mem-3',
    title: 'The Memories',
    quote: 'Hopefully, these are only the beginning of many more.',
    photoId: 'photo-3',
    dateTag: 'Chapter Three',
    sticker: '☁️'
  }
];

export const FRIENDSHIP_TRAITS: FriendshipTrait[] = [
  {
    id: 'trait-1',
    title: 'Random conversations at the most unnecessary times',
    emoji: '⏰',
    frontText: 'Random conversations at the most unnecessary times',
    backText: 'Like deep existential debates or complete nonsense at 2:47 AM on a Tuesday when we both have work early.',
    color: 'from-[#FFE8EC] to-[#FFF0F3]'
  },
  {
    id: 'trait-2',
    title: 'Inside jokes nobody else understands',
    emoji: '🤫',
    frontText: 'Inside jokes nobody else understands',
    backText: 'We literally just exchange one glance in a crowded room and immediately lose our composure.',
    color: 'from-[#EAF2FA] to-[#F2F7FD]'
  },
  {
    id: 'trait-3',
    title: 'Taking too many time in pubg',
    emoji: '🎮',
    frontText: 'taking too many time in pubg',
    backText: '“Last game na promise” then suddenly it’s 3 AM, chasing air drops, getting knocked down in the open field, and screaming for a revive.',
    color: 'from-[#F3EDF9] to-[#FAF6FD]'
  },
  {
    id: 'trait-4',
    title: 'Making ordinary days memorable',
    emoji: '☕',
    frontText: 'Making ordinary days memorable',
    backText: 'A simple grocery run or grabbing iced coffee somehow turns into a 4-hour legendary quest.',
    color: 'from-[#FEF7E6] to-[#FFFBF0]'
  },
  {
    id: 'trait-5',
    title: 'Laughing at things that probably aren\'t even funny',
    emoji: '🤣',
    frontText: 'Laughing at things that probably aren\'t even funny',
    backText: 'Someone simply drops a spoon or says a word weirdly and we are gasping for air on the floor.',
    color: 'from-[#E8F8F5] to-[#F2FBF9]'
  },
  {
    id: 'trait-6',
    title: 'The amount of nonsense we\'ve somehow survived',
    emoji: '🎢',
    frontText: 'The amount of nonsense we\'ve somehow survived',
    backText: 'Chaotic plans, bad decisions, awkward moments... through it all, we\'ve got each other\'s backs forever.',
    color: 'from-[#FCEFE6] to-[#FEF7F2]'
  }
];

export const HEARTFELT_LETTER = {
  title: 'Dear Agatha, 💌',
  paragraphs: [
    "Happy birthday to one of the people I'm genuinely grateful to have in my life. We've shared so many random moments, conversations, laughs, and memories, and honestly, I wouldn't trade them for anything.",
    "Thank you for being someone I can talk to, laugh with, and be myself around. Life can get pretty chaotic sometimes, but having a friend like you makes things a little better.",
    "I hope this new year of your life brings you happiness, success, good memories, and plenty of reasons to smile.",
    "Here's to more random conversations, more unforgettable moments, more pictures, and more nonsense that we'll probably laugh about years from now."
  ],
  signOff: 'Happy birthday dood. 🫶🎂'
};
