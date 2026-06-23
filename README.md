# 💒 Wedding E-Invitation Template

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://wedding-e-invitation-beta.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth+%2B+DB-3FCF8E)](https://supabase.com)

> **A fully-featured digital wedding invitation platform** with RSVP, guestbook, admin panel, and interactive map. Mobile-first, deployed on Vercel.

**[→ Try the live demo](https://wedding-e-invitation-beta.vercel.app)**

## ✨ Features

- **💌 RSVP System** — Guests confirm attendance, select party size, leave messages
- **💬 Guestbook** — Interactive comment wall with real-time updates
- **🎵 Music Player** — Background music with controls
- **🗺️ Interactive Map** — Leaflet-powered venue location with directions
- **📸 Photo Gallery** — Image grid with lightbox
- **👨‍💼 Admin Panel** — Manage RSVPs, guestbook entries, and content
- **📱 Mobile-First** — Responsive design, looks great on phones
- **🔐 Auth** — Supabase-powered admin authentication

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | Supabase (Auth + Database) |
| Maps | React Leaflet |
| Animations | Framer Motion |
| Deployment | Vercel |

## 🚀 Getting Started

```bash
git clone https://github.com/JessenReinhart/wedding-e-invitation.git
cd wedding-e-invitation
npm install
```

Set up environment:

```bash
cp .env.example .env.local
# Add your Supabase credentials
```

```bash
npm run dev        # → http://localhost:5173
npm run build
npm run preview
```

## 🎨 Customization

This is a **template** — fork it, replace content, deploy your own:

1. Update text/images in components
2. Replace venue details and map coordinates
3. Swap color palette in Tailwind config
4. Deploy to Vercel with one click

## 📄 License

MIT

---

*Planning a wedding? [Star this repo](https://github.com/JessenReinhart/wedding-e-invitation) to save it for later — and help other couples find it.*
