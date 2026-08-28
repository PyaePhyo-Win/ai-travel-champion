"use client";

import * as React from "react";

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  isSupported: boolean;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const [isSupported, setIsSupported] = React.useState(false);
  const recognitionRef = React.useRef<unknown>(null);

  React.useEffect(() => {
    const supported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    setIsSupported(supported);
    if (!supported) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Ctor: any =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitSpeechRecognition;

    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: { results: { transcript: string }[][] }) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  const startListening = React.useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    setTranscript("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (recognitionRef.current as any).start();
    setIsListening(true);
  }, [isListening]);

  const stopListening = React.useCallback(() => {
    if (!recognitionRef.current || !isListening) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (recognitionRef.current as any).stop();
    setIsListening(false);
  }, [isListening]);

  return { isListening, transcript, startListening, stopListening, isSupported };
}
