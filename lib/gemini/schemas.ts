import { z } from "zod";

export const extractedDetailsSchema = z.object({
  location: z.string(),
  dates: z.string(),
  budget: z.number(),
  currency: z.string(),
  travelStyle: z.string(),
  interests: z.array(z.string()),
  travelers: z.string(),
  constraints: z.array(z.string()),
});

export const recommendationSchema = z.object({
  name: z.string(),
  category: z.string(),
  categoryIcon: z.string(),
  priceRange: z.string(),
  description: z.string(),
  matchScore: z.number(),
  matchReason: z.string(),
  duration: z.string(),
  distance: z.string(),
});

export const generateRecsSchema = z.object({
  recommendations: z.array(recommendationSchema),
});

export const itineraryItemSchema = z.object({
  time: z.string(),
  placeName: z.string(),
  duration: z.string(),
  price: z.string(),
});

export const itineraryDaySchema = z.object({
  dayNumber: z.number(),
  date: z.string(),
  dailyBudget: z.string(),
  items: z.array(itineraryItemSchema),
});

export const buildItinerarySchema = z.object({
  itinerary: z.array(itineraryDaySchema),
});

export const feedbackSchema = z.object({
  replacedId: z.string().nullable().optional(),
  chips: z.object({
    negative: z.array(z.string()),
    positive: z.array(z.string()),
  }),
});
