# AI Travel Champion — Implementation Plan

**Version:** 1.0  
**Date:** 2026-08-27  
**Tech Stack:** Next.js 15 (App Router) · React 19 · Prisma + Turso (libSQL) · Auth.js (NextAuth v5) · Google Gemini · MapLibre GL + Stadia Maps

---

## 1. Overview

AI Travel Champion is an AI-powered travel planning app where users describe a trip in free text, the AI extracts details, generates personalized place recommendations, and builds a day-by-day itinerary. The flow has a human-in-the-loop feedback cycle: users can keep/replace recommendations and provide quick feedback chips, which loop back to AI adaptation.

---

## 2. Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 15 (App Router) | Server + client components |
| Styling | Tailwind CSS v4 | Design tokens from Figma |
| UI Primitives | Radix UI + Custom Design System | 18 components |
| Auth | Auth.js (NextAuth v5) + Prisma Adapter | Email/Password (Credentials), JWT sessions |
| Database | Turso (libSQL) via Prisma | `prisma` ORM + `@prisma/adapter-libsql` driver adapter |
| AI | Google Gemini SDK (`@google/generative-ai`) | Model: `gemini-2.0-flash-exp` (fallback `gemini-1.5-flash`) |
| Maps | MapLibre GL JS + `@vis.gl/react-maplibre` | Style: Stadia `alidade_smooth_dark` |
| Geocoding | Nominatim (OpenStreetMap) | Free, no key |
| Server State | TanStack Query | API data fetching |
| Client State | Zustand | Flow/step state |
| Toasts | Sonner | Notifications |
| Validation | Zod | Form + API schemas |
| Animations | Framer Motion | Transitions |

---

## 3. Project Structure

```
ai-travel-champion/
├── docs/                # PLAN.md, SPEC.md
├── prisma/             # schema.prisma + seed.ts
├── app/
│   ├── (auth)/          # login, signup
│   ├── (dashboard)/     # explore, my-trips, saved, trip/[id]
│   ├── plan/            # step-1, step-2, step-3, step-4
│   ├── api/             # gemini/*, trips/*, destinations, auth/*, geocode
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx         # Home
├── components/
│   ├── ui/             # 18 design system components
│   ├── layout/         # NavBar, Footer
│   ├── plan/           # QuickPromptCards, TripDetailFields, etc.
│   └── trip/
├── lib/
│   ├── db.ts           # Prisma client + libSQL adapter
│   ├── queries.ts      # server-side data layer (trips, destinations)
│   ├── gemini/         # client, prompts, schemas
│   ├── map/            # config, geocode
│   ├── design-tokens.ts
│   └── utils.ts
├── auth.ts             # NextAuth v5 config (Auth.js)
├── hooks/              # useTrip, useRecommendations, useMap
├── types/              # trip, recommendation, itinerary, map, gemini
├── providers/          # QueryProvider, SessionProvider
├── middleware.ts       # Route protection (Auth.js JWT token check)
├── tailwind.config.ts
├── package.json
└── .env.local.example
```

---

## 4. Screen → Route Mapping

| Figma Screen | Route | State / Variant |
|--------------|-------|-----------------|
| 1.Home | `/` | — |
| 2.Plan Your Trip | `/plan/step-1` | initial |
| 3.Filled Info → Analyze | `/plan/step-1` | filled |
| 4.Analyzed Results | `/plan/step-2` | initial (loading → results) |
| 5.Generating | `/plan/step-2` | loading |
| 6.Recommendation Results | `/plan/step-2` | initial |
| 6.1 3 Kepts | `/plan/step-2` | partial-kept |
| 6.2 Kept All | `/plan/step-2` | all-kept |
| 9.Updated Results | `/plan/step-2` | adapted |
| 7.Replace | `/plan/step-2` | replace-modal |
| 7.1 Quick Feedback | `/plan/step-2` | feedback-modal |
| 8.Updating | `/plan/step-2` | updating |
| 10.Review Recommendations | `/plan/step-3` | — |
| 11.Itinerary Results | `/plan/step-4` | day-1 |
| 11.1 Itinerary Day2 | `/plan/step-4` | day-2 |
| 11.2 Itinerary Day3 | `/plan/step-4` | day-3 |
| 12.Saved Trip | `/trip/[id]` | — |

---

## 5. Step 2 State Machine

```typescript
type Step2State = 'initial' | 'partial-kept' | 'all-kept' | 'adapted';
type ModalMode = null | 'replace' | 'feedback';

Transitions:
  initial --generate--> initial (with recs)
  initial --keep 1-5--> partial-kept
  partial-kept --keep all--> all-kept
  all-kept --continue--> step-3
  partial/all-kept --replace click--> replace-modal
  replace-modal --confirm--> adapted (POST feedback + adapt-recs)
  partial/all-kept --feedback click--> feedback-modal
  feedback-modal --submit--> adapted (POST feedback + adapt-recs)
  adapted --new recs--> initial (reset kept)
```

---

## 6. Gemini Prompts (Structured JSON)

- `extract-details`: Free text → structured details
- `generate-recs`: Structured → 10-15 place recommendations
- `adapt-recs`: Feedback → updated recommendations
- `build-itinerary`: Kept places → day-by-day schedule

All use `responseMimeType: "application/json"`.

---

## 7. Prisma Schema (Turso / libSQL)

Defined in `prisma/schema.prisma` (`provider = "sqlite"`, `driverAdapters` preview). There is no RLS in libSQL — ownership is enforced in application code (`lib/queries.ts` scopes every query by `userId`; the demo trip is reachable because it has `userId = null` and `isDemo = true`).

Models:
- `User` — `email` (unique), `passwordHash` (bcrypt), `name`, `preferences` (Json). Created on signup via `app/api/auth/signup`.
- `Account`, `Session`, `VerificationToken` — standard Auth.js Prisma adapter models (used for future OAuth / session storage).
- `Trip` — user trips **or** demo trips (`isDemo = true`, `userId` nullable). Stores `extractedDetails`, `constraints`, `recommendations`, `feedbackHistory`, `itinerary` as Json. `updatedAt` is managed by Prisma (`@updatedAt`).
- `Destination` — public reference table powering Explore (seeded).

Seed:
- `prisma/seed.ts` — 8 destinations + 1 demo Tokyo trip (`id = 11111111-1111-1111-1111-111111111111`). Run with `npm run db:seed` (uses the libSQL adapter, so it works against both local file and hosted Turso).

Applying the schema:
- **Local file dev:** `npx prisma db push` (uses Prisma's native SQLite engine).
- **Hosted Turso:** Prisma migrations can't target libSQL directly, so emit SQL and apply via the Turso CLI:
  ```bash
  npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > schema.sql
  turso db execute --db <db-name> --file=./schema.sql
  ```
  Then `DATABASE_URL="libsql://<db>-<org>.turso.io?authToken=<token>" npm run db:seed`.

---

## 8. Implementation Phases

| Phase | Deliverables |
|-------|--------------|
| 1. Foundation | Next.js + Tailwind + Design System (18 components) + Supabase client + Gemini client + MapLibre setup |
| 2. Auth + Home + Step 1 | Auth pages, middleware, Home, Step 1 (extract-details API) |
| 3. Step 2 (Core) | State machine, RecommendationCard, KeepButton, Replace/Feedback modals, PlaceMap, FilterTabs, adapt-recs API |
| 4. Step 3 + 4 | Review, build-itinerary API, DayTabs, ItineraryItem |
| 5. Dashboard + Trip Detail | My Trips, Saved, Explore, Trip detail + map, Edit |
| 6. Polish | Loading, skeletons, errors, a11y, responsive, deploy |

---

## 9. Environment Variables

```bash
# Turso (libSQL) — local file dev or hosted URL
DATABASE_URL=file:./dev.db
# Hosted: DATABASE_URL="libsql://<db-name>-<org>.turso.io?authToken=<token>"

# Auth.js (NextAuth v5)
AUTH_SECRET=            # generate: openssl rand -base64 32
AUTH_URL=http://localhost:3000

GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash-exp
NEXT_PUBLIC_MAP_STYLE=https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 10. Notes

- MapLibre + Stadia Maps is fully free (no token needed).
- Nominatim geocoding is free but rate-limited (1 req/sec).
- Demo trip (`is_demo = true`) is reachable via the "View demo trip" card on Explore after login; its Edit button is hidden because it has no owner.

---

## 11. Deployment (Netlify)

This app is a Next.js App Router project deployed to **Netlify** using the official Next.js plugin (handles SSR, API routes, and middleware).

**Files:**
- `netlify.toml` — build command (`npm run build`), publish dir (`.next`), Node 20, and the `@netlify/plugin-nextjs` plugin.
- Dev dependency: `@netlify/plugin-nextjs`.

**Steps:**
1. Push the repo to GitHub/GitLab and create a new Netlify site from the `ai-travel-champion` directory (set the **base directory** to the project folder if the repo root differs).
2. In **Site settings → Environment variables**, add every variable from Section 9 (`DATABASE_URL` pointing at your hosted Turso URL, `AUTH_SECRET`, `AUTH_URL` set to your production URL, `GEMINI_API_KEY`, `GEMINI_MODEL`, `NEXT_PUBLIC_MAP_STYLE`, `NEXT_PUBLIC_APP_URL`).
3. Apply the schema to your Turso database and seed it (see Section 7) using the hosted `DATABASE_URL`.
4. Trigger a deploy. The Next.js plugin auto-detects the config and serves middleware + API routes.

**Important:** `NEXT_PUBLIC_*` vars must be set in Netlify before build (they're inlined at build time). Server-only vars (`DATABASE_URL`, `AUTH_SECRET`, `GEMINI_API_KEY`) are read at runtime. The native libSQL modules are kept external via `serverExternalPackages` in `next.config.ts`.
