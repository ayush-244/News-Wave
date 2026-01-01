# News Wave — Modern News Aggregator

A React-based news aggregator with full CRUD, favorites, search, and category filtering. Frontend runs on Vite; data is served via JSON Server.

## Overview

News Wave lets users:
- Browse articles by category (Technology, Sports, Business, Entertainment, Science, Health)
- Search and filter articles
- Save favorites (client-side)
- View detailed article pages
- Manage articles via an Admin panel (create, update, delete)

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Dev server and build tool
- **React Router v6** — Routing
- **TanStack React Query v5** — Fetching/caching
- **JSON Server** — REST API backend
- **shadcn/ui + Radix** — UI primitives/components
- **Tailwind CSS** — Styling
- **Axios** — HTTP client
- **date-fns**, **Sonner** — Utilities/notifications

## Data & API

- **Base URL**: `http://localhost:4000`
- **Database**: `db.json` (root)
- **Service Layer**: `src/services/api.js`
- **Endpoints**:
  - `GET /articles` — list
  - `GET /articles/:id` — detail
  - `GET /articles?category=...` — filter
  - `POST /articles` — create
  - `PATCH /articles/:id` — update
  - `DELETE /articles/:id` — delete
  - `GET /categories` — list categories

## Project Structure

```
news-wave/
├── db.json
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── ArticleCard.jsx
│   │   ├── ArticleForm.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ui/            # shadcn/ui components
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ArticlePage.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── Favorites.jsx
│   │   ├── Admin.jsx
│   │   └── ...
│   ├── services/
│   │   └── api.js
│   └── utils/
│       └── favorites.js
├── vite.config.js
└── package.json
```

## Setup

### Prerequisites
- Node.js v18+

### Install
```bash
npm install
```

## Run

The app uses two processes:
1) **Frontend (Vite)** — `http://localhost:3000`
2) **Backend (JSON Server)** — `http://localhost:4000`

### Start both (recommended)
```bash
npm run dev:all
```

### Start separately
```bash
# Backend
npm run server

# Frontend
npm run dev
```

### Production preview
```bash
# Build and run JSON Server + serve dist on port 3000
npm run start:prod
```

## Scripts

- `dev` — start Vite dev server
- `server` — start JSON Server (`db.json`, port 4000)
- `dev:all` — run both concurrently
- `build` — production build
- `preview` — preview build via Vite
- `serve:dist` — serve `dist` on port 3000
- `start:prod` — build + JSON Server + static server
- `lint` — run ESLint

## Features

- **Home**: all articles, filter by category
- **Category**: browse by category route
- **Details**: full article page
- **Favorites**: save/manage favorites (localStorage)
- **Admin**: CRUD via `/admin`

## Notes

- Ensure JSON Server is running on port `4000` before using the app.
- If ports are busy, update `vite.config.js` (frontend) or `package.json` (backend) and `API_BASE_URL` in `src/services/api.js`.

## License

Educational use.

## Author

Built for a full-stack class project demonstrating React + JSON Server CRUD.
