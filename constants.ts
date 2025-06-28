import { WeddingDetails } from './types';

export const WEDDING_DETAILS: WeddingDetails = {
  brideName: "Angel",
  groomName: "Matthew",
  date: "Saturday, October 26, 2024",
  heroImage: "https://picsum.photos/seed/wedding_hero/1920/1080",
  storyTitle: "Our Love Story",
  story: "From a chance encounter to a lifetime of love, our journey has been filled with laughter, adventure, and unwavering support for one another. We discovered a connection that has grown deeper with each passing day, built on shared dreams and a profound understanding. We are incredibly excited to begin this new chapter as husband and wife, and we can't wait to celebrate our special day with you, our dearest family and friends, who have showered us with love and encouragement along the way.",
  ceremony: {
    title: "The Ceremony",
    time: "2:00 PM",
    venue: "The Enchanted Garden",
    address: "123 Blossom Lane, Dreamville, CA",
    details: "Join us as we exchange vows in a beautiful garden setting, surrounded by nature's tranquility.",
    latitude: 34.052235, // Example latitude for Los Angeles
    longitude: -118.243683 // Example longitude for Los Angeles
  },
  reception: {
    title: "The Reception",
    time: "6:00 PM",
    venue: "Starlight Ballroom",
    address: "456 Celebration Avenue, Dreamville, CA",
    details: "Celebrate with us! An evening of dinner, dancing, and making memories to last a lifetime awaits.",
    latitude: 34.052235, // Example latitude for Los Angeles
    longitude: -118.243683 // Example longitude for Los Angeles
  },
  rsvpByDate: "September 15, 2024",
  galleryImages: [
    { src: "https://picsum.photos/seed/gallery1/800/600", alt: "Couple smiling" },
    { src: "https://picsum.photos/seed/gallery2/800/600", alt: "Wedding venue detail" },
    { src: "https://picsum.photos/seed/gallery3/800/600", alt: "Engagement photo" },
    { src: "https://picsum.photos/seed/gallery4/800/600", alt: "Couple holding hands" },
    { src: "https://picsum.photos/seed/gallery5/800/600", alt: "Scenic view" },
    { src: "https://picsum.photos/seed/gallery6/800/600", alt: "Close-up detail" },
  ],
  comments: [
    {
      id: 1,
      author: "Aunt Carol",
      message: "So thrilled for you both! Wishing you a lifetime of happiness.",
      timestamp: "2024-06-25T10:00:00Z",
    },
    {
      id: 2,
      author: "John (from College)",
      message: "Can't wait to celebrate with you guys! It's going to be an epic party.",
      timestamp: "2024-06-24T15:30:00Z",
    },
    {
      id: 3,
      author: "Grandma Sue",
      message: "My heart is so full. Seeing you two together brings me so much joy. All my love.",
      timestamp: "2024-06-23T11:45:00Z",
    },
  ],
  footerMessage: "Made with love for our special day."
};