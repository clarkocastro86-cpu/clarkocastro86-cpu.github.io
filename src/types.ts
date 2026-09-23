export interface ScrapbookPhoto {
  id: string;
  url: string;
  caption: string;
  subtitle?: string;
  rotation: number;
  tapeColor?: 'pink' | 'blue' | 'lavender' | 'yellow';
}

export interface MemoryTimelineItem {
  id: string;
  title: string;
  quote: string;
  photoId: string;
  dateTag?: string;
  sticker?: string;
}

export interface FriendshipTrait {
  id: string;
  title: string;
  emoji: string;
  frontText: string;
  backText: string;
  color: string;
}
