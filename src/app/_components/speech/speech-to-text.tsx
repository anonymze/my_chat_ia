// @ts-nocheck

"use client";

import { cn } from "@/lib/utils";
import { MicIcon, MicOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function SpeechToText({
  onTranscriptChange,
  disabled,
}: {
  onTranscriptChange: (transcript: string) => void;
  disabled?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Notify parent when transcript changes
  useEffect(() => {
    if (onTranscriptChange) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  if (!mounted || !browserSupportsSpeechRecognition) return null;

  return (
    <>
      {!listening ? (
        <MicOffIcon
          onClick={() => {
            if (disabled) return;
            SpeechRecognition.startListening({
              continuous: true,
              language: "fr-FR",
              // interimResults: true,
            });
          }}
          className={cn("h-8 w-8 p-1 py-1.5", disabled && "opacity-40")}
        />
      ) : (
        <MicIcon
          onClick={() => {
            if (disabled) return;
            SpeechRecognition.stopListening();
          }}
          className={cn("h-8 w-8 p-1 py-1.5", disabled && "opacity-40")}
        />
      )}
    </>
  );
}
