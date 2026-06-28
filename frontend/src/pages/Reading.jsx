import React, { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { ReadingDisplay } from '../components/reading/ReadingDisplay';
import { AlertBox } from '../components/common/AlertBox';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useReading } from '../hooks/useReading';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { tokenize } from '../utils/textUtils';

export const Reading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const story = location.state?.story;
  const timerIntervalRef = useRef(null);

  const {
    state,
    initializeReading,
    processSpokenWords,
    isReadingComplete,
    endReading,
    updateReadingTime,
    startReading,
    pauseReading,
    setRecognitionError,
    resetTranscriptTracking,
  } = useReading();

  const {
    isSupported,
    isListening: isMicActive,
    start: startSpeechRecognition,
    stop: stopSpeechRecognition,
    abort: abortSpeechRecognition,
  } = useSpeechRecognition(
    (result) => {
      processSpokenWords({
        finalText: result.finalText || '',
        interimText: result.interimText || '',
      });
    },
    (error) => {
      setRecognitionError(error);
    }
  );

  useEffect(() => {
    if (!story) {
      navigate('/');
      return;
    }

    const words = tokenize(story.paragraph);
    initializeReading({ ...story, words });
  }, [story, navigate, initializeReading]);

  // Timer tied to session state (not mic flicker during speech restarts)
  useEffect(() => {
    if (!state.isListening || !state.startTime) {
      return undefined;
    }

    timerIntervalRef.current = setInterval(() => {
      updateReadingTime();
    }, 200);

    return () => clearInterval(timerIntervalRef.current);
  }, [state.isListening, state.startTime, updateReadingTime]);

  const handleComplete = useCallback(async () => {
    abortSpeechRecognition();
    await endReading();
    navigate('/report', { state: { report: state.report, story } });
  }, [abortSpeechRecognition, endReading, navigate, state.report, story]);

  useEffect(() => {
    if (isReadingComplete() && state.isListening) {
      stopSpeechRecognition();
      handleComplete();
    }
  }, [state.currentWordIndex, state.storyWords.length, state.isListening, isReadingComplete, stopSpeechRecognition, handleComplete]);

  const handleStartListening = () => {
    if (!isSupported) {
      setRecognitionError('Speech recognition is not supported in your browser');
      return;
    }

    setRecognitionError(null);
    resetTranscriptTracking();
    startReading();
    startSpeechRecognition();
  };

  const handleStopListening = () => {
    stopSpeechRecognition();
    pauseReading();
  };

  const handleReset = () => {
    abortSpeechRecognition();
    window.location.reload();
  };

  if (!story) {
    return (
      <Layout>
        <div className="text-center py-12">
          <LoadingSpinner text="Loading story..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        {state.recognitionError && (
          <div className="mb-6">
            <AlertBox
              type="warning"
              title="Speech Recognition Issue"
              message={state.recognitionError}
              onClose={() => setRecognitionError(null)}
            />
          </div>
        )}

        {!isSupported && (
          <div className="mb-6">
            <AlertBox
              type="warning"
              title="Browser Not Supported"
              message="Your browser doesn't support speech recognition. Please use Chrome, Firefox, Safari, or Edge."
            />
          </div>
        )}

        {state.isListening && (
          <div className="mb-6">
            <AlertBox
              type="info"
              title="Listening..."
              message="Read at your natural pace. Words turn green one at a time as you speak them correctly."
            />
          </div>
        )}

        <ReadingDisplay
          story={state.currentStory}
          currentWordIndex={state.currentWordIndex}
          wordMatches={state.wordMatches}
          isReadingActive={state.isListening}
          isMicActive={isMicActive}
          transcript={state.transcript}
          readingTime={state.readingTime}
          sessionStartTime={state.startTime}
          onStartListening={handleStartListening}
          onStopListening={handleStopListening}
          onReset={handleReset}
          onComplete={handleComplete}
        />
      </div>
    </Layout>
  );
};
