import { create } from "zustand";
import type {
  ExtractedDetails,
  Recommendation,
  ItineraryDay,
} from "@/types/trip";

interface PlanState {
  step: number;
  inputText: string;
  extractedDetails: ExtractedDetails | null;
  recommendations: Recommendation[];
  itinerary: ItineraryDay[];
  tripId: string | null;
  keptIds: string[];
  currentView: "initial" | "partial-kept" | "all-kept" | "adapted";
  modalMode: null | "replace" | "feedback";
  replacedId: string | null;
  feedbackChips: { negative: string[]; positive: string[] };

  setStep: (step: number) => void;
  setInputText: (text: string) => void;
  setExtractedDetails: (d: ExtractedDetails) => void;
  setRecommendations: (r: Recommendation[]) => void;
  setItinerary: (i: ItineraryDay[]) => void;
  setTripId: (id: string) => void;
  toggleKeep: (id: string) => void;
  updateNote: (id: string, note: string) => void;
  moveRecommendation: (id: string, dir: "up" | "down") => void;
  removeRecommendation: (id: string) => void;
  setReplacedId: (id: string | null) => void;
  setModalMode: (mode: null | "replace" | "feedback") => void;
  toggleChip: (group: "negative" | "positive", value: string) => void;
  resetFeedback: () => void;
  reset: () => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  step: 1,
  inputText: "",
  extractedDetails: null,
  recommendations: [],
  itinerary: [],
  tripId: null,
  keptIds: [],
  currentView: "initial",
  modalMode: null,
  replacedId: null,
  feedbackChips: { negative: [], positive: [] },

  setStep: (step) => set({ step }),
  setInputText: (inputText) => set({ inputText }),
  setExtractedDetails: (extractedDetails) => set({ extractedDetails }),
  setRecommendations: (recommendations) =>
    set({
      recommendations,
      currentView:
        recommendations.filter((r) => r.status === "kept").length > 0
          ? "partial-kept"
          : "initial",
    }),
  setItinerary: (itinerary) => set({ itinerary }),
  setTripId: (tripId) => set({ tripId }),
  toggleKeep: (id) =>
    set((state) => {
      const kept = state.recommendations.map((r) =>
        r.id === id
          ? { ...r, status: (r.status === "kept" ? "pending" : "kept") as "pending" | "kept" }
          : r
      );
      const keptIds = kept.filter((r) => r.status === "kept").map((r) => r.id);
      const allKept = kept.length > 0 && keptIds.length === kept.length;
      const someKept = keptIds.length > 0;
      return {
        recommendations: kept,
        keptIds,
        currentView: allKept
          ? "all-kept"
          : someKept
            ? "partial-kept"
            : "initial",
      };
    }),
  setReplacedId: (replacedId) => set({ replacedId }),
  updateNote: (id, note) =>
    set((state) => ({
      recommendations: state.recommendations.map((r) =>
        r.id === id ? { ...r, note } : r
      ),
    })),
  moveRecommendation: (id, dir) =>
    set((state) => {
      const list = [...state.recommendations];
      const idx = list.findIndex((r) => r.id === id);
      if (idx === -1) return {};
      const swap = dir === "up" ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= list.length) return {};
      [list[idx], list[swap]] = [list[swap], list[idx]];
      return { recommendations: list };
    }),
  removeRecommendation: (id) =>
    set((state) => {
      const remaining = state.recommendations.filter((r) => r.id !== id);
      const keptIds = remaining.filter((r) => r.status === "kept").map((r) => r.id);
      const allKept = remaining.length > 0 && keptIds.length === remaining.length;
      const someKept = keptIds.length > 0;
      return {
        recommendations: remaining,
        keptIds,
        currentView: allKept
          ? "all-kept"
          : someKept
            ? "partial-kept"
            : "initial",
      };
    }),
  setModalMode: (modalMode) => set({ modalMode }),
  toggleChip: (group, value) =>
    set((state) => {
      const current = state.feedbackChips[group];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return {
        feedbackChips: { ...state.feedbackChips, [group]: next },
      };
    }),
  resetFeedback: () =>
    set({ feedbackChips: { negative: [], positive: [] }, replacedId: null }),
  reset: () =>
    set({
      step: 1,
      inputText: "",
      extractedDetails: null,
      recommendations: [],
      itinerary: [],
      tripId: null,
      keptIds: [],
      currentView: "initial",
      modalMode: null,
      replacedId: null,
      feedbackChips: { negative: [], positive: [] },
    }),
}));
