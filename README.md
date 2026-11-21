# Daily Expense

Nuxt 3 expense tracker with Pinia stores and the Daily Expense Nest API.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`. Set `NUXT_API_BASE_URL` to the full Nest API URL (default `http://localhost:4800/api/v1`).
3. Start the backend in `/Users/yethura/Public/Backend/Nest/daily-expense-api` following its README, including PostgreSQL migrations and SMTP setup for password recovery.
4. Run `npm run dev -- --port 3001`. The local Nest backend is configured on port 4800.

Set the backend's `PASSWORD_RESET_REDIRECT_URL` to `http://localhost:3001/password-reset`. Avatar files are served through Nuxt using the backend origin configured above.

## API integration

Pinia stores use `state` and `actions`, with direct `await useFetch()` calls to same-origin `/api` endpoints in `server/api`, following the `old-version` branch pattern. The server forwards JSON, query parameters, multipart uploads, and backend errors, preserving the original `{ data: backendResponse }` proxy wrapper. Stores unwrap it when reading results. The backend URL stays private to the Nuxt server. No browser CORS setup or API key is required.

Stores retain their existing action names and `{ success, data, error }` results. Categories also populate their existing reactive lists. Numeric form values and dates are converted to the Nest DTO formats. Nest owns transaction writes, wallet balances, transfers, and budget accounting.

Login and signup save access and refresh tokens in HttpOnly, SameSite cookies. Expired access tokens are refreshed by the Nuxt server. Only display data is available to the frontend; route middleware verifies the session against Nest. Password changes invalidate the session and return the user to login. Reset links use the backend's recovery token from the URL fragment. The Nest API currently supports email/password authentication; the existing social login buttons remain hidden.

Use HTTPS in production and set `NUXT_SESSION_COOKIE_SECURE=true`. Keep the backend refresh-token lifetime aligned with the server's 30-day refresh cookie. Deploy the Nuxt server; static generation alone cannot serve the API routes.

## Validation

```bash
npm run build
npm run preview -- --port 3001
```

The `supabase/` migrations and `database/seed.js` are legacy resources. The running app uses Nest rather than direct Supabase requests.
