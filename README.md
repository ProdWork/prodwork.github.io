# Puneet Singh Portfolio

A modern, responsive portfolio website built with React and TailwindCSS.

## 🚀 Features

- **Modern UI** - Clean design inspired by Vercel, Notion, and Linear
- **Dark Mode** - Toggle between light and dark themes
- **Animations** - Smooth page transitions and micro-interactions with Framer Motion
- **Responsive** - Mobile-first design that works on all devices
- **Fast** - Optimized for performance with Vite
- **Client-Only** - Static JSON data served from public folder

## 📁 Project Structure

```
prodwork.github.io/
├── public/                # Static assets
│   ├── data/             # JSON data files
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── blogs.json
│   │   ├── achievements.json
│   │   └── social.json
│   └── favicon.svg
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React context (Theme)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API service functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router 6
- TailwindCSS 3
- Framer Motion
- Lucide React (icons)
- Vite

### Data
- Static JSON files

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Development server runs on http://localhost:3000

## 🏗️ Building & Deployment

### Development
```bash
npm run dev
```
Hot reload enabled for development

### Production Build
```bash
npm run build
```
Outputs optimized build to `/dist`

### Deploy to GitHub Pages
The site is configured to deploy to GitHub Pages. The `gh-pages` branch contains the built artifacts.

```bash
npm run build
git add dist/
git commit -m "Build update"
git push origin gh-pages
```

## 🎨 Design System

- **Theme Colors**: Slate Blue (#3b82f6), Teal (#14b8a6)
- **Dark Mode**: Automatic light/dark theme toggle
- **Animations**: Framer Motion for smooth transitions
- **Typography**: Inter, Plus Jakarta Sans
- **Layout**: TailwindCSS responsive grid system

## 📄 Data Structure

All data is stored as static JSON in `/public/data/`:

- **profile.json** - Personal information, skills, education
- **projects.json** - Project portfolio with details
- **blogs.json** - Blog posts and articles
- **achievements.json** - Achievements, certifications, statistics
- **social.json** - Social media links

## 📱 Pages

1. **Home** - Hero section with CTA buttons
2. **About** - Profile info + integrated achievements
3. **Projects** - Project grid with search/filter
4. **Project Detail** - Full project case study
5. **Blog** - Blog listing with filtering
6. **Blog Post** - Individual article view
7. **Admin** - Content management dashboard

## 🔧 Customization

### Update Content
Edit JSON files in `/public/data/` to update:
- Profile information
- Projects
- Blog posts
- Achievements
- Social links

### Change Theme
Edit `tailwind.config.js` to modify colors:
```js
theme: {
  extend: {
    colors: {
      primary: '#3b82f6', // Slate Blue
      accent: '#14b8a6',   // Teal
    }
  }
}
```

### Add New Pages
1. Create component in `/src/pages/`
2. Add route in `/src/App.jsx`
3. Update `/src/components/Navbar.jsx` navigation

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Puneet Singh**
- Product & Platform Strategy Executive
- IIT Roorkee | IIM Lucknow
