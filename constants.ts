import { WeddingDetails } from './types';

export const WEDDING_DETAILS: WeddingDetails = {
  brideName: "Angel",
  brideDob: "1 Januari 1995",
  brideImage: "https://picsum.photos/seed/bride/400/400",
  groomName: "Mathew",
  groomDob: "14 Februari 1993",
  groomImage: "https://picsum.photos/seed/groom/400/400",
  date: "Sabtu, 26 Oktober 2024",
  heroImage: "https://picsum.photos/seed/wedding_hero/1920/1080",
  storyTitle: "Kisah Cinta Kami",
  story: "Dari pertemuan yang tak terduga hingga cinta seumur hidup, perjalanan kami dipenuhi dengan tawa, petualangan, dan dukungan yang tak tergoyahkan satu sama lain. Kami menemukan ikatan yang semakin dalam setiap harinya, dibangun atas mimpi bersama dan pemahaman yang mendalam. Kami sangat bersemangat untuk memulai babak baru sebagai suami istri, dan kami tidak sabar untuk merayakan hari istimewa kami bersama Anda, keluarga dan sahabat tercinta, yang telah melimpahkan cinta dan dukungan sepanjang perjalanan kami.",
  ceremony: {
    title: "Upacara Pernikahan",
    time: "2:00 PM",
    venue: "The Enchanted Garden",
    address: "123 Blossom Lane, Dreamville, CA",
    details: "Bergabunglah dengan kami saat kami mengucapkan janji suci dalam suasana taman yang indah, dikelilingi ketenangan alam.",
    latitude: 34.052235, // Example latitude for Los Angeles
    longitude: -118.243683 // Example longitude for Los Angeles
  },
  reception: {
    title: "Resepsi",
    time: "6:00 PM",
    venue: "Starlight Ballroom",
    address: "456 Celebration Avenue, Dreamville, CA",
    details: "Rayakan bersama kami! Malam yang penuh dengan makan malam, tarian, dan kenangan indah yang akan bertahan seumur hidup menanti Anda.",
    latitude: 34.052235, // Example latitude for Los Angeles
    longitude: -118.243683 // Example longitude for Los Angeles
  },
  rsvpByDate: "15 September 2024",
  galleryImages: [
    { src: "https://picsum.photos/seed/gallery1/800/600", alt: "Pasangan tersenyum" },
    { src: "https://picsum.photos/seed/gallery2/800/600", alt: "Detail tempat pernikahan" },
    { src: "https://picsum.photos/seed/gallery3/800/600", alt: "Foto pertunangan" },
    { src: "https://picsum.photos/seed/gallery4/800/600", alt: "Pasangan bergandengan tangan" },
    { src: "https://picsum.photos/seed/gallery5/800/600", alt: "Pemandangan indah" },
    { src: "https://picsum.photos/seed/gallery6/800/600", alt: "Detail close-up" },
  ],
  footerMessage: "Dibuat dengan cinta untuk hari istimewa kami.",
  groomDetails: {
    fullName: "Mathew Agape Sitorus",
    parentInfo: "Putra dari Bapak Mangapul Sitorus & Ibu Yiendertivita Damanik",
    image: "https://picsum.photos/seed/groom-full/1920/1080",
    instagramHandle: "mathewsitorus"
  },
  brideDetails: {
    fullName: "Anjelia Septriani Siahaan",
    parentInfo: "Putri dari Bapak Israel Siahaan (Alm) & Ibu Mariana Nursita Hasibuan",
    image: "https://picsum.photos/seed/bride-full/1920/1080",
    instagramHandle: "angeliaashn"
  }
};