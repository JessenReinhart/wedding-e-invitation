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
  id: string;
  author: string;
  message: string;
  timestamp: string;
  isOptimistic?: boolean;
}

export interface PartnerDetails {
  fullName: string;
  parentInfo: string;
  image: string;
  instagramHandle: string;
}

export interface WeddingDetails {
  brideName: string;
  brideDob: string;
  brideImage: string;
  groomName: string;
  groomDob: string;
  groomImage: string;
  date: string;
  heroImage: string;
  storyTitle: string;
  story: string;
  ceremony: EventInfo;
  reception: EventInfo;
  rsvpByDate: string;
  galleryImages: GalleryImage[];
  footerMessage: string;
  groomDetails: PartnerDetails;
  brideDetails: PartnerDetails;
}

export interface Guest {
  id: string;
  name: string;
  status: 'attending' | 'not_attending' | 'pending';
  email: string;
  plusoneqty?: number;
  plusonename?: string;
}
