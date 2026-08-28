import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL || "file:./dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

const DEMO_TRIP_ID = "11111111-1111-1111-1111-111111111111";

const destinations = [
  { name: "Tokyo", country: "Japan", emoji: "🗼", tagline: "Neon nights & endless ramen", category: "Food · Culture", lat: 35.6762, lng: 139.6503 },
  { name: "Kyoto", country: "Japan", emoji: "⛩️", tagline: "Temples, gardens & geisha districts", category: "Culture · History", lat: 35.0116, lng: 135.7681 },
  { name: "Paris", country: "France", emoji: "🗼", tagline: "Art, pastry & riverside strolls", category: "Design · Art", lat: 48.8566, lng: 2.3522 },
  { name: "Bali", country: "Indonesia", emoji: "🏖️", tagline: "Rice terraces & barefoot luxury", category: "Relaxing · Beach", lat: -8.4095, lng: 115.1889 },
  { name: "Reykjavík", country: "Iceland", emoji: "🏔️", tagline: "Auroras, glaciers & geothermal baths", category: "Adventure · Nature", lat: 64.1466, lng: -21.9426 },
  { name: "Lisbon", country: "Portugal", emoji: "🌅", tagline: "Tiled hills & cheap great wine", category: "Food · Affordable", lat: 38.7223, lng: -9.1393 },
  { name: "Rome", country: "Italy", emoji: "🏛️", tagline: "Ruins, espresso & la dolce vita", category: "History · Food", lat: 41.9028, lng: 12.4964 },
  { name: "Barcelona", country: "Spain", emoji: "🏖️", tagline: "Gaudí, tapas & Mediterranean sun", category: "Design · Beach", lat: 41.3851, lng: 2.1734 },
];

const demoTrip = {
  id: DEMO_TRIP_ID,
  userId: null,
  isDemo: true,
  status: "completed",
  inputText: "Plan a 4-day food and culture trip to Tokyo for 2 adults, mid-range budget.",
  extractedDetails: {
    location: "Tokyo, Japan",
    dates: "Apr 10 – Apr 14, 2025",
    budget: 2000,
    currency: "USD",
    travelStyle: "Food & Culture",
    interests: ["Food", "Culture", "History", "Nightlife"],
    travelers: "2 adults",
    constraints: ["No extreme spice", "Walkable areas preferred"],
  },
  constraints: ["No extreme spice", "Walkable areas preferred"],
  recommendations: [
    { id: "rec-sensoji", name: "Senso-ji Temple", category: "Culture", categoryIcon: "⛩️", priceRange: "Free", status: "kept", description: "Tokyo's oldest temple with a bustling Nakamise shopping street leading to the main hall.", matchScore: 96, matchReason: "Top cultural landmark matching your Culture interest", duration: "1.5 hrs", distance: "Asakusa", lat: 35.7148, lng: 139.7967, sortOrder: 1 },
    { id: "rec-tsukiji", name: "Tsukiji Outer Market", category: "Food", categoryIcon: "🍣", priceRange: "$", status: "kept", description: "Sizzling street food, fresh sushi counters and a sensory overload of sights and smells.", matchScore: 94, matchReason: "Perfect for your Food focus and walkable layout", duration: "2 hrs", distance: "Tsukiji", lat: 35.6654, lng: 139.7708, sortOrder: 2 },
    { id: "rec-shibuya", name: "Shibuya Crossing", category: "Nightlife", categoryIcon: "🌃", priceRange: "Free", status: "kept", description: "The world's busiest pedestrian crossing, best experienced at night with neon glowing.", matchScore: 92, matchReason: "Iconic urban experience for your Nightlife interest", duration: "45 min", distance: "Shibuya", lat: 35.6595, lng: 139.7005, sortOrder: 3 },
    { id: "rec-teamlab", name: "teamLab Planets", category: "Art", categoryIcon: "🎨", priceRange: "$$", status: "kept", description: "Immersive digital art museum where you wade through water and rooms of floating lights.", matchScore: 90, matchReason: "Highly rated art experience within budget", duration: "2 hrs", distance: "Toyosu", lat: 35.6447, lng: 139.7900, sortOrder: 4 },
    { id: "rec-meiji", name: "Meiji Jingu", category: "Nature", categoryIcon: "🌳", priceRange: "Free", status: "kept", description: "A serene forested shrine surrounded by towering trees minutes from Harajuku.", matchScore: 88, matchReason: "Calm nature break matching your walkable preference", duration: "1 hr", distance: "Shibuya", lat: 35.6764, lng: 139.6993, sortOrder: 5 },
    { id: "rec-ramen", name: "Ramen Street (Tokyo Station)", category: "Food", categoryIcon: "🍜", priceRange: "$", status: "kept", description: "A corridor of famed ramen shops under Tokyo Station — perfect quick lunch stop.", matchScore: 91, matchReason: "Top Food pick, easy to reach between sights", duration: "1 hr", distance: "Marunouchi", lat: 35.6812, lng: 139.7671, sortOrder: 6 },
  ],
  feedbackHistory: [],
  itinerary: [
    { dayNumber: 1, date: "Apr 10, 2025", dailyBudget: "$120", items: [{ time: "09:00", placeId: "rec-sensoji", placeName: "Senso-ji Temple", duration: "1.5 hrs", price: "Free" }, { time: "12:30", placeId: "rec-tsukiji", placeName: "Tsukiji Outer Market", duration: "2 hrs", price: "$25" }] },
    { dayNumber: 2, date: "Apr 11, 2025", dailyBudget: "$140", items: [{ time: "10:00", placeId: "rec-meiji", placeName: "Meiji Jingu", duration: "1 hr", price: "Free" }, { time: "19:00", placeId: "rec-shibuya", placeName: "Shibuya Crossing", duration: "45 min", price: "Free" }] },
    { dayNumber: 3, date: "Apr 12, 2025", dailyBudget: "$110", items: [{ time: "11:00", placeId: "rec-teamlab", placeName: "teamLab Planets", duration: "2 hrs", price: "$30" }, { time: "13:00", placeId: "rec-ramen", placeName: "Ramen Street (Tokyo Station)", duration: "1 hr", price: "$15" }] },
  ],
  currentStep: 4,
};

async function main() {
  for (const d of destinations) {
    await prisma.destination.upsert({
      where: { name: d.name },
      update: d,
      create: d,
    });
  }

  await prisma.trip.upsert({
    where: { id: DEMO_TRIP_ID },
    update: {
      isDemo: demoTrip.isDemo,
      extractedDetails: demoTrip.extractedDetails,
      recommendations: demoTrip.recommendations,
      itinerary: demoTrip.itinerary,
    },
    create: demoTrip,
  });

  console.log("Seed complete ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
