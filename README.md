# LinkForge

A beautiful link-in-bio MVP built with Next.js, Supabase, and Tailwind CSS.

## Features

- Beautiful editorial-style public profile pages
- User authentication (email/password)
- Link management (add, edit, delete)
- Profile customization (name, bio, avatar)
- Theme selection (5 preset themes)
- Click tracking
- Mobile-first responsive design

## Tech Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes, Supabase
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

### 1. Clone and Install

```bash
cd linkforge
npm install
```

### 2. Setup Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration in `supabase/migrations/001_initial_schema.sql`
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials

### 3. Run Development Server

```bash
npm run dev
```

### 4. Open in Browser

- [http://localhost:3000](http://localhost:3000)

## Project Structure

```
linkforge/
├── src/
│   ├── app/
│   │   ├── (public)/[username]/   # Public profile pages
│   │   ├── (auth)/                # Login/Signup pages
│   │   ├── dashboard/             # Dashboard pages
│   │   └── api/                   # API routes
│   ├── components/ui/             # Reusable components
│   ├── lib/                       # Utilities & Supabase client
│   └── types/                     # TypeScript types
├── tests/                         # Unit & E2E tests
└── supabase/migrations/           # Database schema
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage |

## License

MIT