# Daily Expense — Nuxt 3 Personal Expense Tracker

Small Nuxt 3 app for tracking personal income, expenses, budgets and transfers.

Features
- Track income & expenses
- Budgets and categories
- Wallets and transfers
- Supabase authentication + database

Tech stack
- Nuxt 3
- Supabase (auth + Postgres)
- Tailwind CSS

Prerequisites
- Node.js 18+ (or active LTS)
- A Supabase project (for production or local DB)

Quick start
1. Install dependencies

```bash
npm install
```

2. Create a Supabase project and set the environment variables (see `lib/supabaseClient.js`)

Required env vars (example):
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` or `SUPABASE_SERVICE_KEY` (use service key for server-only tasks)

3. Run the dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
npm run preview
```

Database and seeding
- SQL migrations are in `supabase/migrations`.
- A simple seed script is available at `database/seed.js`.

Important files
- `lib/supabaseClient.js`: Supabase client setup
- `pages/`: application routes and pages
- `components/`: UI components used across the app

Deployment
- See Nuxt docs for deployment options: https://nuxt.com/docs/getting-started/deployment
- Ensure your Supabase env vars are configured in the hosting platform.

Contributing
- Open an issue or PR. Keep changes small and focused.

License
- This project is provided as-is.
