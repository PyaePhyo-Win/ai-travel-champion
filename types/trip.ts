export interface ExtractedDetails {
  location: string;
  dates: string;
  budget: number;
  currency: string;
  travelStyle: string;
  interests: string[];
  travelers: string;
  constraints: string[];
}

export interface Recommendation {
  id: string;
  name: string;
  category: string;
  categoryIcon: string;
  priceRange: string;
  description: string;
  matchScore: number;
  matchReason: string;
  duration: string;
  distance: string;
  lat: number;
  lng: number;
  status: "pending" | "kept" | "replaced";
  sortOrder: number;
  note?: string;
}

export interface FeedbackPayload {
  replacedId?: string | null;
  chips: {
    negative: string[];
    positive: string[];
  };
}

export interface ItineraryItem {
  time: string;
  placeId: string;
  placeName: string;
  duration: string;
  price: string;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  dailyBudget: string;
  items: ItineraryItem[];
}

export interface TripDetails {
  id?: string;
  userId?: string | null;
  status: "planning" | "active" | "completed" | "archived";
  inputText: string;
  extractedDetails: ExtractedDetails | null;
  constraints: string[];
  recommendations: Recommendation[];
  feedbackHistory: FeedbackLog[];
  itinerary: ItineraryDay[];
  currentStep: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeedbackLog {
  type: "keep" | "replace" | "chip";
  placeId?: string;
  value?: string;
  createdAt: string;
}
