# AI Travel Champion — Design System Component Chart v1.0

**Header Information**
- **Title**: AI Travel Champion — Component Chart
- **Badge**: `◆ Design System`
- **Version / Theme**: `✓ v1.0 · Dark`
- **Typography**: Fraunces · Outfit · JetBrains Mono
- **Navbar Options**: Explore | My Trips | Saved | Search 🔍

---

## 1. Color Tokens

| Token Name | Hex / Value | Description |
| :--- | :--- | :--- |
| **Purple** | `#6C63FF` | Primary Brand Color |
| **Purple Light** | `#8B7CF8` | Secondary Brand / Hover Accent |
| **Grad Purple** | `linear-gradient(164deg, #6C63FF 0%, #8B7CF8 100%)` | Primary CTA Gradient |
| **Teal** | `#00C9A7` | Accent / Keep / Match Color |
| **Teal Dark** | `#00B894` | Darker Teal Accent |
| **Teal BG** | `#0F2D32` | Subtle Teal Container Background |
| **BG Base** | `#0D0D18` | App Base Background |
| **BG Card** | `#1C1D2E` | Container & Card Surface |
| **Border** | `#23243A` | Structural Border Lines |
| **Text Primary** | `#FFFFFF` | High-contrast Heading / Primary Text |
| **Text Muted** | `#6B6B90` | Subtitles, Captions & Labels |
| **Text Purple** | `#A78BFA` | Brand Text / Special Labels |

---

## 2. Typography

- **Fraunces SemiBold / Hero**: *Plan your perfect trip*
- **Fraunces Light Italic / Accent**: *with AI.*
- **Outfit SemiBold / Button, Label**: *Start planning →*
- **Outfit Medium / Body, Nav**: *Tell us where you want to go.*
- **Outfit Regular / Subtext**: *Based on your preferences, here's what I recommend.*
- **JetBrains Mono / Prices, Time**: `10:00 · ¥25,600 · $1,500`

---

## 3. Buttons

### Primary — Purple Gradient
- `[ Start planning → ]`
- `[ Generate recommendations ]`
- `[ Save Trip ]`

### Secondary — Dark Outline
- `[ Explore destinations ]`
- `[ Plan another trip ]`
- `[ Export ]`

### Teal — Keep Action
- `[ ✓ Keep ]`
- `[ ✓ Keep all picks ]`

### Danger Outline — Replace Action
- `[ ↺ Replace ]`
- `[ ↺ Update recommendations ]`

### Full Width
- `[ Start navigating ✦ ]`

### Disabled
- `[ Save Trip ]` (Disabled State)

---

## 4. Badges & Indicators

### AI Pill — Hero Badge
- `✨ AI-powered travel planning`
- `✨ AI-powered itinerary builder`

### AI Detected Badge — Inline Field Label
- `AI DETECTED`
- `AI SUGGESTED`

### Status Badge
- `✓ Ready to go`
- `Analyzing your trip`
- `Budget exceeded`

### Match Bar — AI Confidence
- **Tsukiji Outer Market**: `94%` `[====================]`
- **Shimokitazawa**: `85%` `[==================  ]`
- **Yanaka Ginza**: `72%` `[===============     ]`

---

## 5. Step Indicator

1. **State 1: Step 1 Active**
   - **(1)** Tell us about your trip *(Active)* -> **(2)** Recommendations -> **(3)** Review -> **(4)** Itinerary
2. **State 2: Step 2 Active**
   - **(✓)** Tell us about your trip *(Completed)* -> **(2)** Recommendations *(Active)* -> **(3)** Review -> **(4)** Itinerary
3. **State 3: Step 3 Active**
   - **(✓)** Tell us about your trip -> **(✓)** Recommendations -> **(3)** Review *(Active)* -> **(4)** Itinerary
4. **State 4: Step 4 Active**
   - **(✓)** Tell us about your trip -> **(✓)** Recommendations -> **(✓)** Review -> **(4)** Itinerary *(Active)*

---

## 6. Tabs & Chips

### Filter Tabs — Recommendations
- `[All Places]` *(Active)* | `[Restaurants]` | `[Hotels]` | `[Activities]`

### Day Tabs — Itinerary
- `[Day 1]` *(Active)* | `[Day 2]` | `[Day 3]`

### Feedback Chips — Quick Feedback (Multi-select)
- **Negative / Refine**: `[Too expensive]` | `[Too far away]` | `[Not interested]` | `[Too crowded]`
- **Positive / Preference**: `[More local experiences]` | `[More relaxing]` | `[More food]`

---

## 7. Quick Prompt Cards

- 🗼 **Plan a 5 day trip to Japan under $1,500.**
- 🏖️ **I want a relaxing beach vacation.**
- 🍜 **Plan a weekend trip for food and culture.**
- 🏕️ **Find me a family friendly adventure.**

---

## 8. Trip Detail Fields

| Field | Value | Tag / Action |
| :--- | :--- | :--- |
| 📍 **Location** | Tokyo, Japan | `AI DETECTED` \| *Edit* |
| 📅 **Dates** | October 12–17, 2026 | - |
| 💰 **Budget** | $1,500 | `AI DETECTED` \| *Edit* |
| ✦ **Travel Style** | Relaxed | `AI DETECTED` \| *Edit* |
| 🎯 **Interests** | Food · Design · Culture | `AI DETECTED` \| *Edit* |
| 👤 **Travelers** | Solo | `AI DETECTED` \| *Edit* |

---

## 9. Place Cards (Recommendations)

### Card 1: Tsukiji Outer Market
- **Category**: 🏛️ Food Market
- **Price**: `¥2,000–4,000`
- **Description**: Tokyo's legendary fish market turned foodie paradise
- **AI Match**: `94%` — *Matches your love for local food and authentic neighborhoods*
- **Meta**: ⏱ 2–3 hours \| 📍 3.2 km
- **Actions**: `[✓ Keep]` `[↺ Replace]` `[✏️]`

### Card 2: Shimokitazawa
- **Category**: 🏛️ Culture
- **Price**: `Free`
- **Description**: Tokyo's indie neighborhood of vintage shops and live music
- **AI Match**: `85%` — *Offbeat, creative, and loved by locals — aligns with your vibe*
- **Meta**: ⏱ 3 hours \| 📍 7.2 km
- **Actions**: `[✓ Keep]` `[↺ Replace]` `[✏️]`

### Card 3: 21_21 Design Sight
- **Category**: 🏛️ Design
- **Price**: `¥1,200`
- **Description**: Tadao Ando's iconic museum for design and architecture
- **AI Match**: `91%` — *Perfect for your design interests — rotating world-class exhibits*
- **Meta**: ⏱ 2 hours \| 📍 4.1 km
- **Actions**: `[✓ Keep]` `[↺ Replace]` `[✏️]`

---

## 10. Itinerary Items

### **Day 1: Arrival & Local Flavors**
*Daily Budget:* `¥25,600`

- **10:00** | 🏨 **Hotel check-in — Claska Hotel**  
  *Duration:* 30 min | *Price:* `¥18,000`
- **11:30** | 🐟 **Tsukiji Outer Market**  
  *Duration:* 2.5 hrs | *Price:* `¥3,000`
- **14:30** | 🌿 **Walk to Hamarikyu Gardens**  
  *Duration:* 1 hr | *Price:* `¥800`
- **16:00** | ☕ **Ginza browsing + coffee**  
  *Duration:* 2 hrs | *Price:* `¥300`

---

## 11. Elevation & Shadows

1. **Purple Glow (CTA)**: `box-shadow: 0 0 26px rgba(108, 99, 255, 0.5)`
2. **Card Shadow**: `box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5)`
3. **Logo Shadow**: `box-shadow: 0 6px 14px rgba(0, 0, 0, 0.6)`

---

## 12. Border Radius

- **Pill**: `9999px` (Badges, Chips, Main Pills)
- **Button / Card**: `16px` (Buttons, Main Containers, Cards)
- **Input / Badge**: `12px` (Inputs, Field Cards, Steps)
- **Tag**: `8px` (Small Inline Indicators / Tags)

---

*AI Travel Champion · Design System v1.0*
