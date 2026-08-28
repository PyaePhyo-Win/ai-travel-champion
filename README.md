# AI Travel Champion

An AI-powered travel planning app. Describe a trip in free text, and the AI extracts details, generates personalized place recommendations, and builds a day-by-day itinerary — with a human-in-the-loop feedback loop (keep / replace / quick-feedback chips).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · **Prisma + Turso (libSQL)** · **Auth.js (NextAuth v5)** · Google Gemini · MapLibre GL + Stadia Maps.

---

## Quick start

```bash
# 1. Install dependencies (also generates the Prisma client via postinstall)
npm install

# 2. Configure environment
cp .env.local.example .env.local
#   - set DATABASE_URL (local file dev works out of the box, see below)
#   - set AUTH_SECRET  ->  openssl rand -base64 32
#   - set GEMINI_API_KEY

# 3. Create the database (local SQLite file is Turso-wire-compatible)
npx prisma db push
npm run db:seed
# If you hit a "no such table" error, use an absolute path instead:
#   DATABASE_URL="file:$(pwd)/dev.db" npx prisma db push
#   DATABASE_URL="file:$(pwd)/dev.db" npm run db:seed

# 4. Run
npm run dev
```

Open http://localhost:3000, sign up at `/signup`, then plan a trip.

---

## Database (Prisma + Turso)

The app uses **Prisma** as the ORM with the **libSQL driver adapter** (`@prisma/adapter-libsql`), so it runs against either a local SQLite file or a hosted **Turso** database with no code changes — only the `DATABASE_URL` differs.

### Local development (default)

`.env.local`:
```bash
DATABASE_URL="file:./dev.db"
```
```bash
npx prisma db push   # create tables (Prisma native SQLite engine)
npm run db:seed      # 8 destinations + 1 demo Tokyo trip
```
> Run these from the project root so Prisma and the app resolve the same file. If you see a `no such table` error, switch to an absolute path, e.g. `DATABASE_URL="file:/abs/path/dev.db"`.

### Hosted Turso (production)

Prisma migrations can't target libSQL directly, so emit SQL and apply it with the Turso CLI:

```bash
# install + login
curl -sSfL https://get.tur.so/install.sh | bash   # or: brew install tursodatabase/tap/turso
turso auth login

# create db + get credentials
turso db create ai-travel-champion
turso db show ai-travel-champion            # -> libsql://ai-travel-champion-<org>.turso.io
turso db tokens create ai-travel-champion   # -> <token>

# apply schema
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > schema.sql
turso db execute --db ai-travel-champion --file=./schema.sql

# set DATABASE_URL (token goes in the URL) and seed
DATABASE_URL="libsql://ai-travel-champion-<org>.turso.io?authToken=<token>" npm run db:seed
```

> Note: a bare `libsql://<db>.turso.io` (without the `-<org>` segment) returns HTTP 404. Always include the org.

### Schema

`prisma/schema.prisma` (`provider = "sqlite"`):
- `User` — email (unique), `passwordHash` (bcrypt), `name`, `preferences` (Json). Created on signup.
- `Account` / `Session` / `VerificationToken` — standard Auth.js Prisma-adapter models.
- `Trip` — user trips or demo trips (`isDemo = true`, `userId` nullable); JSON columns for `extractedDetails`, `constraints`, `recommendations`, `feedbackHistory`, `itinerary`.
- `Destination` — public reference table powering Explore (seeded).

There is **no Row Level Security** in libSQL. Ownership is enforced in application code: every data access in `lib/queries.ts` is scoped by `userId`, and the demo trip is publicly readable because it has `userId = null` and `isDemo = true`.

---

## Auth (Auth.js / NextAuth v5)

- Email/password **Credentials** provider, passwords hashed with `bcryptjs`.
- **JWT sessions** (`session.strategy = "jwt"`); the Prisma adapter stores users.
- Sign-up: `app/api/auth/signup` creates the user, then the client calls `signIn("credentials")`.
- Route protection: `middleware.ts` uses `next-auth/jwt` `getToken` (edge-safe) to guard `/plan`, `/my-trips`, `/saved`, `/trip`, `/explore` and to redirect `/login`, `/signup` when already authenticated.

Required env: `AUTH_SECRET` (32+ byte random) and `AUTH_URL`.

---

## Useful scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run db:push` | Push Prisma schema to the database (local file) |
| `npm run db:seed` | Seed destinations + demo trip |
| `npx prisma generate` | Regenerate the Prisma client (runs automatically on `postinstall`) |

---

## API routes

- `POST /api/auth/signup` — create account.
- `app/api/auth/[...nextauth]/route.ts` — Auth.js handlers.
- `GET/POST /api/trips` — list current user's trips / create trip.
- `GET/PATCH/DELETE /api/trips/[id]` — read / update / delete (ownership-scoped).
- `GET /api/destinations` — public list.
- `POST /api/gemini/*` — extract-details, generate-recs, adapt-recs, build-itinerary.
- `POST /api/geocode` — Nominatim proxy.

See `docs/PLAN.md` (architecture, screen map, phases) and `docs/SPEC.md` (design spec) for more.
