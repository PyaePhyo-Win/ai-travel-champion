"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Sparkles,
  Loader2,
  Mic,
  MicOff,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuickPromptCards } from "@/components/plan/QuickPromptCards";
import { TripDetailFields } from "@/components/plan/TripDetailFields";
import { usePlanStore } from "@/store/usePlanStore";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

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

  const { isListening, transcript, startListening, stopListening, isSupported } =
    useSpeechRecognition();

  React.useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript, setInputText]);

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
    } catch {
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
    <div className="min-h-[calc(100vh-120px)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="mb-8">
          <h1 className="font-fraunces text-[30px] leading-[36px] font-semibold text-white">
            Plan your trip
          </h1>
          <p className="mt-1.5 font-outfit text-sm leading-5 text-text-muted">
            Tell me what you&apos;re looking for, and I&apos;ll build a trip
            around your preferences.
          </p>
        </div>

        <div className="flex min-h-[635px] gap-8">
          {/* Left Panel - Textarea + Quick Prompts */}
          <div className="flex flex-1 flex-col gap-6 pr-8">
            <div>
              <h2 className="mb-1 font-outfit text-base font-semibold text-white">
                What are you planning?
              </h2>
              <p className="font-outfit text-sm text-text-muted">
                Describe your trip in your own words. Include as much or as
                little as you like.
              </p>
            </div>

            {/* Textarea with mic + attach icons */}
            <div className="relative rounded-3xl border border-purple/[0.12] bg-[#12131f]/85 shadow-[0_8px_32px_rgba(108,99,255,0.12),0_0_0_1px_rgba(108,99,255,0.08)] backdrop-blur-[40px]">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="I want to travel to Japan for 5 days in October. I love local food, design, and quiet places. My budget is around $1,500…"
                className="min-h-[232px] w-full resize-none rounded-3xl bg-transparent px-4 pb-16 pt-4 font-outfit text-sm leading-[22px] text-text-primary placeholder:text-[#3a3b55] focus:outline-none"
              />

              {/* Bottom bar: mic + attach + analyze */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    disabled={!isSupported}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary disabled:opacity-30"
                    title={isSupported ? "Voice input" : "Voice input not supported"}
                  >
                    {isListening ? (
                      <MicOff className="h-[18px] w-[18px] text-purple" />
                    ) : (
                      <Mic className="h-[18px] w-[18px]" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary"
                    title="Attach file"
                  >
                    <Paperclip className="h-[18px] w-[18px]" />
                  </button>
                </div>

                <Button
                  onClick={() => analyze(inputText)}
                  disabled={loading}
                  size="sm"
                  className="bg-grad-purple px-5 text-sm"
                >
                  {analyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {analyzing ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </div>

            {analyzing && (
              <div className="flex items-center justify-center gap-2 font-outfit text-sm text-text-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
                Extracting location, dates, budget, and interests...
              </div>
            )}

            {/* Quick Prompts */}
            <QuickPromptCards
              onSelect={(text) => {
                setInputText(text);
                analyze(text);
              }}
            />
          </div>

          {/* Divider */}
          <div className="w-px shrink-0 bg-border" />

          {/* Right Panel - Trip Details */}
          <div className="flex w-[640px] shrink-0 flex-col pl-8">
            <div className="mb-5">
              <h2 className="mb-1 font-outfit text-base font-semibold text-white">
                Trip details
              </h2>
              <p className="font-outfit text-sm text-text-muted">
                I&apos;ll automatically organize the details from your request.
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <TripDetailFields details={extractedDetails} />
            </div>

            <div className="mt-5">
              <Button
                onClick={goToRecommendations}
                className="w-full bg-grad-purple"
                size="lg"
              >
                Generate recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
