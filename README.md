# Puneet Singh Portfolio

A modern, responsive portfolio website built with React, TailwindCSS, and Express.

## 🚀 Features

- **Modern UI** - Clean design inspired by Vercel, Notion, and Linear
- **Dark Mode** - Toggle between light and dark themes
- **Animations** - Smooth page transitions and micro-interactions with Framer Motion
- **Responsive** - Mobile-first design that works on all devices
- **Fast** - Optimized for performance with Vite
- **API Backend** - Express server serving static JSON data

## 📁 Project Structure

```
puneet-portfolio/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context (Theme)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── server/                 # Express backend
    ├── data/              # JSON data files
    │   ├── profile.json
    │   ├── projects.json
    │   ├── blogs.json
    │   └── achievements.json
    ├── index.js           # Express server
    └── package.json
```

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router 6
- TailwindCSS 3
- Framer Motion
- Lucide React (icons)
- Vite

### Backend
- Node.js
- Express
- Static JSON data

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   cd "Puneet Website"
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## 🚀 Running Locally

### Option 1: Run both servers (recommended for development)

**Terminal 1 - Start the backend server:**
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

**Terminal 2 - Start the frontend:**
```bash
cd client
npm run dev
```
Client runs on http://localhost:3000

### Option 2: Production build

```bash
# Build the client
cd client
npm run build

# The built files will be in client/dist
# You can serve them with any static file server
```

## 🔗 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/profile` | Get profile information |
| `GET /api/projects` | Get all projects |
| `GET /api/projects/:id` | Get single project by ID |
| `GET /api/blogs` | Get all blog posts |
| `GET /api/blogs/:slug` | Get single blog by slug |
| `GET /api/achievements` | Get all achievements |
| `GET /api/health` | Health check |

## 🎨 Design Features

- **Typography**: Plus Jakarta Sans (display), Inter (body), JetBrains Mono (code)
- **Colors**: Primary indigo (#6366F1), Accent rose (#F83A5C)
- **Animations**: Page transitions, hover effects, floating elements
- **Components**: Glass cards, gradient buttons, status badges
- **Layout**: Grid-based responsive design with generous spacing

## 📱 Pages

1. **Home** - Hero section, featured projects, latest blogs, achievements preview
2. **About** - Profile details, education, expertise, personal note
3. **Projects** - Filterable project grid with search
4. **Project Detail** - Full case study with metrics and details
5. **Blog** - Searchable blog listing with categories
6. **Blog Post** - Full article with sharing options
7. **Achievements** - Achievement cards grouped by category

## 🔧 Customization

### Updating Content
Edit the JSON files in `/server/data/`:
- `profile.json` - Personal information
- `projects.json` - Project case studies
- `blogs.json` - Blog posts
- `achievements.json` - Achievements and credentials

### Changing Colors
Edit `tailwind.config.js` to update the color palette:
```js
colors: {
  primary: { ... },
  accent: { ... },
}
```

### Adding Pages
1. Create a new page component in `/client/src/pages/`
2. Add the route in `/client/src/App.jsx`
3. Update navigation in `/client/src/components/Navbar.jsx`

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Puneet Singh**
- Product & Platform Strategy Executive
- IIT Roorkee | IIM Lucknow
