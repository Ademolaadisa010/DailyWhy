# DailyWhy 🔬

> Discover the science behind everyday life.

DailyWhy is an AI-powered STEM learning platform that turns everyday curiosity into science lessons. Instead of starting with textbooks, it starts with questions students already have — and backs into the science from there.

---

## What it does

Students pick a curiosity card, type their own question, and instantly get:

- A plain-language explanation
- The core STEM concepts involved
- A fun fact
- A safe at-home experiment
- A mini quiz with instant feedback

No uploads. No accounts. Just curiosity.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with cycling curiosity card hero |
| `/explore` | Main app — card sidebar + AI answer panel |

---

## Tech Stack

- **Next.js 14** — App Router
- **TypeScript**
- **Tailwind CSS**
- **Gemini 2.0 Flash** — AI answers via Google Generative Language API
- **Google Fonts** — Syne (display) + Inter (body)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/dailywhy.git
cd dailywhy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your Gemini API key

Create a `.env.local` file in the root of the project:

Get a free key at [aistudio.google.com](https://aistudio.google.com).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

app/

├── layout.tsx          # Root layout, fonts, metadata

├── globals.css         # Tailwind base + scrollbar utility

├── page.tsx            # Landing page

└── explore/

└── page.tsx        # Main explore page

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Your Google Gemini API key |

---

## Features

- 🎴 **Curiosity Cards** — 18 pre-made questions filterable by STEM tag
- 🔍 **Ask Anything** — Free-type any why question
- 🧪 **Try It Yourself** — Safe at-home experiment per question
- ✨ **Fun Facts** — One surprising fact per topic
- 🎯 **Mini Quiz** — Multiple choice with instant feedback
- 🌅 **Daily Why** — New mystery every day (coming soon)
- 🏆 **Badges** — Earn points for exploring (coming soon)

---

## Roadmap

- [ ] Daily Why push notifications
- [ ] User accounts and progress tracking
- [ ] Badge and points system
- [ ] Mobile app (React Native)
- [ ] Snap & Learn — photo input via Gemini Vision

---

## Built for

This project was built as a hackathon submission. The goal was to show that curiosity-first learning is more engaging than curriculum-first learning — and that AI can power that experience in a simple, focused product.

---

## License

MIT