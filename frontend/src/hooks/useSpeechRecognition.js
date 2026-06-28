import { useEffect, useRef, useCallback, useState } from 'react';
import { SPEECH_CONFIG } from '../utils/constants';

const SPEECH_ERRORS = {
  'no-speech': 'No speech detected. Please try again.',
  'audio-capture': 'No microphone found. Ensure it is working.',
  'network': 'Speech service unavailable. Check your internet connection and try again.',
  'not-allowed': 'Microphone permission denied. Allow microphone access in your browser settings.',
};

const RESTART_DELAY_MS = 300;
const NETWORK_RETRY_DELAY_MS = 1500;
const MAX_NETWORK_RETRIES = 3;

export const useSpeechRecognition = (onResult, onError) => {
  const recognitionRef = useRef(null);
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);
  const isListeningRef = useRef(false);
  const fullTranscriptRef = useRef('');
  const restartTimeoutRef = useRef(null);
  const networkRetryCountRef = useRef(0);
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    onResultRef.current = onResult;
    onErrorRef.current = onError;
  }, [onResult, onError]);

  const clearRestartTimeout = useCallback(() => {
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
  }, []);

  const scheduleRestart = useCallback((delay = RESTART_DELAY_MS) => {
    clearRestartTimeout();
    restartTimeoutRef.current = setTimeout(() => {
      if (!isListeningRef.current || !recognitionRef.current) {
        return;
      }

      try {
        recognitionRef.current.start();
      } catch {
        // Already running or not ready yet
      }
    }, delay);
  }, [clearRestartTimeout]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = SPEECH_CONFIG.language;
    recognition.continuous = SPEECH_CONFIG.continuous;
    recognition.interimResults = SPEECH_CONFIG.interimResults;
    recognition.maxAlternatives = SPEECH_CONFIG.maxAlternatives;

    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          fullTranscriptRef.current += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      const finalText = fullTranscriptRef.current.trim();
      const interimText = interimTranscript.trim();

      if (!finalText && !interimText) {
        return;
      }

      networkRetryCountRef.current = 0;

      onResultRef.current?.({
        finalText,
        interimText,
        isFinal: interimText.length === 0,
      });
    };

    recognition.onerror = (event) => {
      if (event.error === 'aborted') {
        return;
      }

      if (event.error === 'no-speech' && isListeningRef.current) {
        scheduleRestart();
        return;
      }

      if (event.error === 'network' && isListeningRef.current) {
        if (networkRetryCountRef.current < MAX_NETWORK_RETRIES) {
          networkRetryCountRef.current += 1;
          scheduleRestart(NETWORK_RETRY_DELAY_MS);
          return;
        }
      }

      const message = SPEECH_ERRORS[event.error] || `Error: ${event.error}`;
      onErrorRef.current?.(message);
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        scheduleRestart();
        return;
      }

      setIsListening(false);
    };

    return () => {
      isListeningRef.current = false;
      clearRestartTimeout();
      try {
        recognition.abort();
      } catch {
        // Recognition may already be stopped
      }
    };
  }, [clearRestartTimeout, scheduleRestart]);

  const start = useCallback(() => {
    if (!recognitionRef.current || isListeningRef.current) {
      return;
    }

    fullTranscriptRef.current = '';
    networkRetryCountRef.current = 0;
    clearRestartTimeout();

    try {
      isListeningRef.current = true;
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      isListeningRef.current = true;
      setIsListening(true);
      scheduleRestart();
    }
  }, [clearRestartTimeout, scheduleRestart]);

  const stop = useCallback(() => {
    if (!recognitionRef.current) {
      return;
    }

    isListeningRef.current = false;
    clearRestartTimeout();

    try {
      recognitionRef.current.stop();
    } catch {
      // Recognition may already be stopped
    }
    setIsListening(false);
  }, [clearRestartTimeout]);

  const abort = useCallback(() => {
    if (!recognitionRef.current) {
      return;
    }

    isListeningRef.current = false;
    clearRestartTimeout();

    try {
      recognitionRef.current.abort();
    } catch {
      // Recognition may already be stopped
    }
    setIsListening(false);
  }, [clearRestartTimeout]);

  return {
    isSupported,
    isListening,
    start,
    stop,
    abort,
  };
};
