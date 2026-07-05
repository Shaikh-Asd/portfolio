# Asad Shaikh — Portfolio

Premium portfolio built with **React**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Project Structure

```
src/
├── App.jsx                 # Page layout — lists all sections
├── main.jsx                # React entry point
├── index.css               # Global styles & themes
├── components/
│   ├── Section.jsx         # Reusable section wrapper + AnimatedGrid
│   ├── ThemeProvider.jsx   # Dark/light theme
│   ├── layout/             # Navbar, Footer, ThemeToggle
│   ├── sections/           # Hero, About, Services, etc.
│   └── ui/                 # Button, GlassCard, SectionHeader, etc.
└── lib/
    ├── data.js             # All site content (edit this)
    ├── icons.js            # Lucide icon maps
    └── animations.js       # Framer Motion variants
```

## Customize Content

Edit `src/lib/data.js` for personal info, projects, services, testimonials, and contact links.

## Contact Form Email (Free)

Uses [FormSubmit](https://formsubmit.co/) — **no account, no API keys**. Only your email in `.env`.

```bash
cp .env.example .env
```

```env
VITE_CONTACT_EMAIL=service.codechain@gmail.com
```

Restart: `npm run dev`

**First time only:** FormSubmit sends a confirmation link to that email. Click it once to activate the form. After that, every submission arrives in the same inbox and you can reply directly to the visitor.

## Deploy

Build and deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.).
