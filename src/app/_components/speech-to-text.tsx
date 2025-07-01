"use client";

import { useRef, useState } from "react";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    console.log("LOG");
    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    console.log(SpeechRecognition);

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onerror = (event) => {
      alert("Error occurred in recognition: " + event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div>
      <button onClick={startListening}>🎤 Start Talking</button>
      <button onClick={stopListening}>🛑 Stop</button>
      <p>Recognized Text: {text}</p>
    </div>
  );
};

export default SpeechToText;
