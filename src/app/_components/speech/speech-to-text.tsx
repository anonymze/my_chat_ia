// @ts-nocheck
/* eslint-disable */

"use client";

import { cn } from "@/lib/utils";
import { MicIcon, MicOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function SpeechToText({
  action,
  disabled,
  resetSignal,
}: {
  action: (transcript: string) => void;
  disabled?: boolean;
  resetSignal?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // Notify parent when transcript changes
  useEffect(() => {
    if (action) {
      action(transcript);
    }
  }, [transcript, action]);

  useEffect(() => {
    if (resetSignal) {
      resetTranscript();
      SpeechRecognition.stopListening();
    }
  }, [resetSignal, resetTranscript]);

  if (!mounted || !browserSupportsSpeechRecognition) return null;

  return (
    <>
      {!listening || !isMicrophoneAvailable ? (
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
