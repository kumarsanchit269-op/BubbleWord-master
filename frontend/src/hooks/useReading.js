import { useContext, useCallback, useRef } from 'react';
import { ReadingContext } from '../context/ReadingContext';
import {
  matchSequential,
  tokenize,
  extractPracticeWords,
  calculateWPM,
  calculateAccuracy,
} from '../utils/textUtils';
import { WORD_STATUS, API_BASE_URL } from '../utils/constants';

export const useReading = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error('useReading must be used within ReadingProvider');
  }

  const {
    state,
    setStory,
    startReading,
    pauseReading,
    setListening,
    setTranscript,
    setWordMatch,
    setCurrentWord,
    updateReadingTime,
    setRecognitionError,
    completeReading,
    setReport,
    reset,
  } = context;

  const storyWordsRef = useRef([]);
  const currentWordIndexRef = useRef(0);
  const committedSpokenCountRef = useRef(0);
  const lastFinalTextRef = useRef('');

  storyWordsRef.current = state.storyWords;

  const applyMatchResults = useCallback((results) => {
    results.forEach((match) => {
      setWordMatch(match.index, {
        status: match.correct ? WORD_STATUS.CORRECT : WORD_STATUS.INCORRECT,
        correct: match.correct,
        score: match.score,
      });
    });
  }, [setWordMatch]);

  /**
   * Process speech incrementally — only marks one story word at a time in order.
   */
  const processSpokenWords = useCallback(({ finalText = '', interimText = '' }) => {
    const storyWords = storyWordsRef.current;
    if (!storyWords.length) {
      return;
    }

    const displayTranscript = [finalText, interimText].filter(Boolean).join(' ').trim();
    if (displayTranscript) {
      setTranscript(displayTranscript, !interimText);
    }

    const finalWords = tokenize(finalText);
    const interimWords = tokenize(interimText);

    // If the recognizer revised earlier text, re-align from a safe point
    if (
      lastFinalTextRef.current &&
      finalText &&
      !finalText.startsWith(lastFinalTextRef.current) &&
      lastFinalTextRef.current.startsWith(finalText)
    ) {
      committedSpokenCountRef.current = finalWords.length;
    }

    // Commit matches from finalized speech tokens only
    if (finalWords.length > committedSpokenCountRef.current) {
      const { results, nextExpectedIndex, nextSpokenIndex } = matchSequential(
        storyWords,
        finalWords,
        currentWordIndexRef.current,
        committedSpokenCountRef.current
      );

      applyMatchResults(results);
      currentWordIndexRef.current = nextExpectedIndex;
      committedSpokenCountRef.current = nextSpokenIndex;
      setCurrentWord(nextExpectedIndex);
    }

    // Use the live interim tail to keep pace with fast reading
    if (interimWords.length > 0 && currentWordIndexRef.current < storyWords.length) {
      const lastInterim = interimWords[interimWords.length - 1];
      const { results, nextExpectedIndex } = matchSequential(
        storyWords,
        [lastInterim],
        currentWordIndexRef.current,
        0,
        { allowInterim: true, maxLookahead: 1 }
      );

      if (results.length > 0) {
        applyMatchResults(results);
        currentWordIndexRef.current = nextExpectedIndex;
        setCurrentWord(nextExpectedIndex);
      }
    }

    if (finalText) {
      lastFinalTextRef.current = finalText;
    }
  }, [applyMatchResults, setCurrentWord, setTranscript]);

  const initializeReading = useCallback((story) => {
    if (!story || !story.paragraph) return;
    const words = tokenize(story.paragraph);
    setStory(story, words);
    currentWordIndexRef.current = 0;
    committedSpokenCountRef.current = 0;
    lastFinalTextRef.current = '';
  }, [setStory]);

  const isReadingComplete = useCallback(() => {
    return currentWordIndexRef.current >= storyWordsRef.current.length;
  }, []);

  const endReading = useCallback(async () => {
    completeReading();

    const correctWords = state.wordMatches.filter(m => m.status === WORD_STATUS.CORRECT).length;
    const totalWords = state.storyWords.length;
    const accuracy = calculateAccuracy(correctWords, totalWords);
    const wpm = calculateWPM(correctWords, state.readingTime / 1000);
    const practiceWords = extractPracticeWords(
      state.wordMatches.map((m, i) => ({
        word: state.storyWords[i],
        correct: m.status === WORD_STATUS.CORRECT,
      }))
    );

    const reportData = {
      accuracy,
      total_words: totalWords,
      correct_words: correctWords,
      wrong_words: totalWords - correctWords,
      reading_speed: wpm,
      practice_words: practiceWords,
      appreciation: '',
    };

    try {
      const response = await fetch(`${API_BASE_URL}/report/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total_words: totalWords,
          correct_words: correctWords,
          reading_time: state.readingTime / 1000,
          practice_words: practiceWords,
        }),
      });

      if (response.ok) {
        setReport(await response.json());
      } else {
        setReport(reportData);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      setReport(reportData);
    }
  }, [state.wordMatches, state.storyWords, state.readingTime, completeReading, setReport]);

  const resetTranscriptTracking = useCallback(() => {
    currentWordIndexRef.current = 0;
    committedSpokenCountRef.current = 0;
    lastFinalTextRef.current = '';
  }, []);

  return {
    state,
    initializeReading,
    processSpokenWords,
    isReadingComplete,
    endReading,
    updateReadingTime,
    setListening,
    setTranscript,
    startReading,
    pauseReading,
    setRecognitionError,
    resetTranscriptTracking,
    reset,
  };
};
