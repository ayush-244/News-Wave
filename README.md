# NewsWave – Modern News Aggregator

A React + TypeScript news aggregator with full CRUD via JSON Server.

## Overview

NewsWave lets you:
- Browse articles across categories (Technology, Sports, Business, Entertainment, Science, Health)
- Search and filter articles
- Save favorites
- Create, update, delete articles (Admin)
- View detailed article pages

## Tech Stack

- React 18, TypeScript, Vite
- React Router, TanStack Query (React Query)
- JSON Server (REST API), Axios
- shadcn/ui, Tailwind CSS
- date-fns, Sonner (toasts)

## Quick Start

### Prerequisites
- Node.js v18+
- npm (or yarn)

### Install
```bash
npm install
```

### Run (Recommended)
Start frontend and backend together:
```bash
npm run dev:all
```

### Run (Separate)
In two terminals:
```bash
# JSON Server (API)
npm run server

# Vite Dev Server (Frontend)
npm run dev
```

### URLs
- Frontend: http://localhost:5173
- API: http://localhost:3001

## Authentication

NewsWave supports two authentication methods:

### Email/Password Login
- Simple email and password authentication
- Data persists in browser localStorage
- Minimum password length: 6 characters

### Google OAuth (Ready to integrate)
- One-click Google Sign-In button
- To enable production Google OAuth:
  1. Create a Google OAuth application at [Google Cloud Console](https://console.cloud.google.com/)
  2. Install: `npm install @react-oauth/google`
  3. Update `src/context/AuthContext.tsx` with your Google Client ID
  4. Wrap app with GoogleOAuthProvider

## Admin Access

Admin functionality is available after login with email `admin@newswave.com` and password `admin123`.

## Scripts

- `dev`: Start Vite dev server
- `server`: Start JSON Server on port 3001
- `dev:all`: Run both servers concurrently
- `build`: Build for production
- `build:dev`: Build in development mode
- `preview`: Preview production build
- `lint`: Run ESLint

## API Endpoints

- `GET /articles` – All articles
- `GET /articles/:id` – Article by ID
- `GET /articles?category=:slug` – Filter by category
- `POST /articles` – Create article
- `PATCH /articles/:id` – Update article
- `DELETE /articles/:id` – Delete article
- `GET /categories` – All categories

## Project Structure

```
.
├── db.json                 # JSON Server database
├── src/
│   ├── components/        # UI components (incl. shadcn/ui)
│   ├── hooks/             # React Query + app hooks
│   ├── pages/             # Routes (Home, Admin, etc.)
│   ├── services/          # API service layer (axios)
│   └── utils/             # Helpers & mock data
└── package.json
```

## Features

- **Home:** Browse with category filtering
- **Categories:** View by specific category
- **Article Details:** Full view + related articles
- **Favorites:** Save/manage locally
- **Search:** Title/description/category
- **Login:** Secure authentication system
- **Admin Panel:** CRUD via `/admin` (admin-only)
- **User Accounts:** Different access levels for admin and regular users

## CRUD

Admin panel (`/admin`):
1. Create – “Create Article”, fill and submit
2. Read – List across admin/home/details
3. Update – Edit from admin list
4. Delete – Confirm deletion from admin list

## Data Storage

- Articles: `db.json` → `articles`
- Categories: `db.json` → `categories`
- Favorites: Browser `localStorage`

## Troubleshooting

- Ensure JSON Server is running on port 3001
- If ports conflict, adjust `vite.config.ts` (frontend) or `package.json` script (backend); update API base in `src/services/api.ts` if needed
- Validate `db.json` is present and valid

Helpful tips:
- If ports conflict, free them via PowerShell: `Get-NetTCPConnection -LocalPort 3001 | Stop-Process -Id {OwningProcess} -Force`
- Verify API: `curl http://localhost:3001/articles`

## License

This project is for educational purposes.

## Author

Built to demonstrate a React app with JSON Server CRUD.




