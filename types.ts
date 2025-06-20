
export interface EventInfo {
  title: string;
  time: string;
  venue: string;
  address: string;
  details?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
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
  rsvpLink: string;
  rsvpByDate: string;
  galleryImages: GalleryImage[];
  footerMessage: string;
}
