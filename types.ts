export interface EventInfo {
  title: string;
  time: string;
  venue: string;
  address: string;
  details?: string;
  latitude: number;
  longitude: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Comment {
  id: number;
  author: string;
  message: string;
  timestamp: string;
}

export interface WeddingDetails {
  brideName: string;
  groomName: string;
  date: string;
  heroImage: string;
  storyTitle: string;
  story: string;
  ceremony: EventInfo;
  reception: EventInfo;
  rsvpByDate: string;
  galleryImages: GalleryImage[];
  footerMessage: string;
  comments: Comment[];
}

export interface Guest {
  id: number;
  name: string;
  status: 'Attending' | 'Not Attending' | 'Pending';
  email: string;
}
