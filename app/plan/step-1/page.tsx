"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Input";
import { QuickPromptCards } from "@/components/plan/QuickPromptCards";
import { TripDetailFields } from "@/components/plan/TripDetailFields";
import { usePlanStore } from "@/store/usePlanStore";

export default function Step1Page() {
  const router = useRouter();
  const {
    inputText,
    setInputText,
    setExtractedDetails,
    setStep,
    extractedDetails,
  } = usePlanStore();

  const [loading, setLoading] = React.useState(false);
  const [analyzing, setAnalyzing] = React.useState(false);

  const analyze = async (text: string) => {
    if (!text.trim()) {
      toast.error("Please describe your trip first.");
      return;
    }
    setLoading(true);
    setAnalyzing(true);
    try {
      const res = await fetch("/api/gemini/extract-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setExtractedDetails(data);
      setAnalyzing(false);
      toast.success("Trip details extracted!");
    } catch (e) {
      setAnalyzing(false);
      toast.error("Failed to analyze your request.");
    } finally {
      setLoading(false);
    }
  };

  const goToRecommendations = () => {
    if (!extractedDetails) {
      toast.error("Please analyze your request first.");
      return;
    }
    setStep(2);
    router.push("/plan/step-2");
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
          Step 1 · Tell us about your trip
        </Badge>
        <h1 className="mt-4 font-fraunces text-3xl font-semibold">
          Where do you want to go?
        </h1>
        <p className="mt-2 font-outfit text-text-muted">
          Describe your trip in your own words. Our AI will figure out the rest.
        </p>
      </div>

      <div className="rounded-card border border-border bg-bg-card p-6">
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. I want to visit Tokyo for 5 days in October with a $1500 budget. I love food, design, and culture, and I'm traveling solo."
          className="min-h-[140px] border-0 bg-transparent text-base focus-visible:ring-0"
        />
        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => analyze(inputText)}
            disabled={loading}
            className="gap-2"
          >
            {analyzing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {analyzing ? "Analyzing..." : "Analyze with AI"}
          </Button>
        </div>
      </div>

      {analyzing && (
        <div className="flex items-center justify-center gap-2 font-outfit text-sm text-text-muted">
          <Loader2 className="h-4 w-4 animate-spin" />
          Extracting location, dates, budget, and interests...
        </div>
      )}

      {extractedDetails && !analyzing && (
        <div className="animate-fade-in space-y-4">
          <h2 className="font-fraunces text-xl font-semibold">
            We detected these details
          </h2>
          <TripDetailFields details={extractedDetails} />
          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <Link href="/explore">
              <Button variant="secondary" size="lg">
                Explore destinations
              </Button>
            </Link>
            <Button onClick={goToRecommendations} size="lg">
              Generate recommendations →
            </Button>
          </div>
        </div>
      )}

      <QuickPromptCards onSelect={(text) => { setInputText(text); analyze(text); }} />
    </div>
  );
}
