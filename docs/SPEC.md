# AI Travel Champion — Design Spec & Figma References

**Version:** 1.0  
**Date:** 2026-08-27

---

## Figma File

- **File Name:** AI Travel Champion
- **File Key:** `KtgYZxp49rmB7Xk4jv2VgN`
- **URL:** https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion

### Screen Links (by Figma node-id)

| # | Screen | Node ID | Link |
|---|--------|---------|------|
| 1 | Home | 35:234 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-234 |
| 2 | Plan Your Trip | 35:352 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-352 |
| 3 | Filled Info → Analyze Plan | 35:542 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-542 |
| 4 | Analyzed Results | 35:733 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-733 |
| 5 | Generating | 35:1203 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-1203 |
| 6 | Recommendation Results | 35:1265 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-1265 |
| 6.1 | Recommendation Results > 3 Kepts | 35:1644 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-1644 |
| 6.2 | Recommendation Results > Kept All | 35:2817 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-2817 |
| 7 | Replace | 35:4021 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-4021 |
| 7.1 | Select Quick Feedback | 35:4105 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-4105 |
| 8 | Updating Recommendations | 35:4189 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-4189 |
| 9 | Updated Results | 35:2034 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-2034 |
| 10 | Review Recommendations | 35:2424 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-2424 |
| 11 | Itinerary Results | 35:3214 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-3214 |
| 11.1 | Itinerary Results > Day 2 | 35:3483 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-3483 |
| 11.2 | Itinerary Results > Day 3 | 35:3752 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-3752 |
| 12 | Saved Trip | 35:4202 | https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=35-4202 |

### Design System Canvas

- **Design System Chart:** https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=45-8467
- **Component Sets:**
  - Primary Button (76:221): Default, Hover
  - Keep Button (7:1292): Default, Hover, Kept, Disable
  - Select (7:2820): Default, Selected, Disable
  - Loading-Airplane (19:18168): 4 variants
  - Loading-Update (26:200): 4 variants

### Flow Chart Canvas

- **Flow Chart:** https://www.figma.com/design/KtgYZxp49rmB7Xk4jv2VgN/AI-Travel-Champion?node-id=1-3

---

## Design Tokens

### Color Tokens (from Figma variables)

| Token | Hex | Usage |
|-------|-----|-------|
| BG Base | `#0A0B14` | App background (Figma fill1) |
| BG Card | `#0D0D18` | Card surface (Figma fill3) |
| BG Nav | `rgba(18,19,31,0.85)` | Navbar/container (Figma: #12131f @ 85%) |
| Purple | `#6C63FF` | Primary brand |
| Purple Light | `#8B7CF8` | Secondary/hover |
| Grad Purple | `linear-gradient(164deg, #6C63FF 0%, #8B7CF8 100%)` | CTA gradient |
| Teal | `#00C9A7` | Accent / keep |
| Teal Dark | `#00B894` | Darker teal |
| Teal BG | `#0F2D32` | Subtle teal container |
| Border | `#23243A` | Structural borders |
| Text Primary | `#FFFFFF` | Headings |
| Text Muted | `#6B6B90` | Subtitles/captions |
| Text Purple | `#A78BFA` | Brand text |
| Stroke Purple | `#9747FF` | Component outlines (stroke1) |
| Stroke Purple Dim | `#8A38F5` | Loading outlines (stroke2) |

### Typography

| Role | Font | Weight | Example |
|------|------|--------|---------|
| Hero | Fraunces | SemiBold | *Plan your perfect trip* |
| Accent | Fraunces | Light Italic | *with AI.* |
| Button/Label | Outfit | SemiBold | *Start planning →* |
| Body/Nav | Outfit | Medium | *Tell us where you want to go.* |
| Subtext | Outfit | Regular | *Based on your preferences...* |
| Prices/Time | JetBrains Mono | — | `10:00 · ¥25,600 · $1,500` |

### Border Radius

- Pill: `9999px` (badges, chips, pills)
- Button/Card: `16px`
- Input/Badge: `12px`
- Tag: `8px`

### Elevation & Shadows

- Purple Glow (CTA): `0 0 26px rgba(108, 99, 255, 0.5)`
- Card Shadow: `0 10px 24px rgba(0, 0, 0, 0.5)`
- Logo Shadow: `0 6px 14px rgba(0, 0, 0, 0.6)`
- Nav Blur: `backdrop-filter: blur(40px)`

### Component Specs (from Figma)

| Component | Size | Radius | Stroke |
|-----------|------|--------|--------|
| Primary Button | 232 × 164 | 5px | #9747FF |
| Keep Button | 180.5 × 244 | 5px | #9747FF |
| Select | 54 × 120.5 | 5px | #9747FF |
| Loading-Airplane | 120 × 420 | 5px | #8A38F5 |
| Loading-Update | 120 × 420 | 5px | #8A38F5 |

### Navbar Spec (from Design System)

- Logo: "W" + "AI Travel Champion" (Fraunces 18px Medium)
- Nav: Explore | My Trips | Saved (Outfit 14px Medium, #6B6B90)
- Search: Icon "A" + Search input (Outfit 14px SemiBold)
- Footer: "AI Travel Champion · Design System v1.0" (Outfit 12px Regular, #6B6B90)

---

## Screen Content Reference

### Home (35:234)
- NavBar (logo, nav links, search)
- Hero: "Plan your perfect trip *with AI.*" (Fraunces)
- AI Pill: "✨ AI-powered travel planning"
- Quick Prompt Cards (4):
  - 🗼 Plan a 5 day trip to Japan under $1,500.
  - 🏖️ I want a relaxing beach vacation.
  - 🍜 Plan a weekend trip for food and culture.
  - 🏕️ Find me a family friendly adventure.
- CTA: "Start planning →"

### Plan Step 1 (35:352)
- StepIndicator: Step 1 Active
- Trip Detail Fields (6):
  - 📍 Location | Tokyo, Japan | AI DETECTED | Edit
  - 📅 Dates | October 12–17, 2026 | —
  - 💰 Budget | $1,500 | AI DETECTED | Edit
  - ✦ Travel Style | Relaxed | AI DETECTED | Edit
  - 🎯 Interests | Food · Design · Culture | AI DETECTED | Edit
  - 👤 Travelers | Solo | AI DETECTED | Edit
- Quick Prompt Cards
- Buttons: [Generate recommendations] (Primary), [Explore destinations] (Secondary)

### Plan Step 2 (35:1265)
- StepIndicator: Step 2 Active
- Filter Tabs: [All Places] | [Restaurants] | [Hotels] | [Activities]
- Recommendation Cards (grid):
  - Tsukiji Outer Market (94% match, ¥2,000–4,000)
  - Shimokitazawa (85% match, Free)
  - 21_21 Design Sight (91% match, ¥1,200)
  - + more
- PlaceMap (MapLibre + Stadia dark)
- Actions per card: [✓ Keep] [↺ Replace] [✏️]
- Feedback Chips:
  - Negative: Too expensive | Too far away | Not interested | Too crowded
  - Positive: More local experiences | More relaxing | More food
- Counter: "0 of 6 picks accepted"
- CTA: [Review & build itinerary →] (disabled until all kept)

### Plan Step 3 (35:2424)
- StepIndicator: Step 3 Active
- Review summary of trip details
- Editable trip details
- CTA: [Generate itinerary] / [Export]

### Plan Step 4 (35:3214)
- StepIndicator: Step 4 Active
- Day Tabs: [Day 1] | [Day 2] | [Day 3]
- Itinerary Items (per day):
  - Time | Place | Duration | Price
  - e.g. 10:00 | Hotel check-in — Claska Hotel | 30 min | ¥18,000
- PlaceMap with route
- CTA: [Start navigating ✦] (Full Width)

### Replace (35:4021)
- Modal on Step 2
- Focus: single card replacement
- Options: Replace with similar / different category

### Quick Feedback (35:4105)
- Modal on Step 2
- Multi-select chips (negative + positive)

### Saved Trip (35:4202)
- Trip detail view
- PlaceMap
- Saved places list
- Export / Share

---

## API Contracts

### POST /api/gemini/extract-details
Input: `{ text: string }`  
Output: `ExtractedDetails { location, dates, budget, currency, travelStyle, interests[], travelers, constraints[] }`

### POST /api/gemini/generate-recs
Input: `ExtractedDetails`  
Output: `Recommendation[] { id, name, category, priceRange, description, matchScore, matchReason, meta{ duration, distance }, lat, lng, status }`

### POST /api/gemini/adapt-recs
Input: `{ recommendations, feedback: { replacedId?, chips: {negative[], positive[]} } }`  
Output: `Recommendation[]` (updated)

### POST /api/gemini/build-itinerary
Input: `{ recommendations: kept[], tripDetails }`  
Output: `ItineraryDay[] { dayNumber, date, dailyBudget, items: { time, placeId, duration, price }[] }`

### POST /api/geocode
Input: `{ query: string }`  
Output: `{ lat, lng }` (Nominatim proxy)
