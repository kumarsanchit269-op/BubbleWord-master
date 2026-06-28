import React, { createContext, useReducer, useCallback } from 'react';
import { READING_STATE, WORD_STATUS } from '../utils/constants';

export const ReadingContext = createContext();

const initialState = {
  // Story data
  currentStory: null,
  storyWords: [],
  
  // Reading state
  readingState: READING_STATE.IDLE,
  currentWordIndex: 0,
  
  // Recognition
  isListening: false,
  transcript: '',
  isFinal: false,
  recognitionError: null,
  
  // Matching results
  wordMatches: [], // { word, index, correct, score, matchedWord }
  
  // Timing
  startTime: null,
  readingTime: 0,
  
  // Report data
  report: null,
};

export const readingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORY':
      return {
        ...state,
        currentStory: action.payload,
        storyWords: action.payload.words || [],
        wordMatches: new Array(action.payload.words?.length || 0).fill(null).map((_, i) => ({
          index: i,
          status: WORD_STATUS.PENDING,
        })),
      };

    case 'START_READING':
      return {
        ...state,
        readingState: READING_STATE.LISTENING,
        startTime: Date.now(),
        readingTime: 0,
        currentWordIndex: 0,
        transcript: '',
        recognitionError: null,
        isListening: true,
        wordMatches: new Array(state.storyWords.length).fill(null).map((_, i) => ({
          index: i,
          status: WORD_STATUS.PENDING,
        })),
      };

    case 'PAUSE_READING':
      return {
        ...state,
        readingState: READING_STATE.IDLE,
        isListening: false,
        readingTime: state.startTime ? Date.now() - state.startTime : state.readingTime,
        startTime: null,
      };

    case 'SET_LISTENING':
      return {
        ...state,
        isListening: action.payload,
      };

    case 'SET_TRANSCRIPT':
      return {
        ...state,
        transcript: action.payload.transcript,
        isFinal: action.payload.isFinal || false,
      };

    case 'SET_WORD_MATCH':
      const updatedMatches = [...state.wordMatches];
      updatedMatches[action.payload.index] = {
        ...updatedMatches[action.payload.index],
        ...action.payload,
      };
      return {
        ...state,
        wordMatches: updatedMatches,
      };

    case 'SET_CURRENT_WORD':
      return {
        ...state,
        currentWordIndex: action.payload,
      };

    case 'UPDATE_READING_TIME':
      return {
        ...state,
        readingTime: Date.now() - (state.startTime || Date.now()),
      };

    case 'SET_RECOGNITION_ERROR':
      return {
        ...state,
        recognitionError: action.payload,
      };

    case 'COMPLETE_READING':
      return {
        ...state,
        readingState: READING_STATE.COMPLETED,
        isListening: false,
      };

    case 'SET_REPORT':
      return {
        ...state,
        report: action.payload,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export const ReadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(readingReducer, initialState);

  // Action creators
  const setStory = useCallback((story, words) => {
    dispatch({
      type: 'SET_STORY',
      payload: {
        ...story,
        words,
      },
    });
  }, []);

  const startReading = useCallback(() => {
    dispatch({ type: 'START_READING' });
  }, []);

  const pauseReading = useCallback(() => {
    dispatch({ type: 'PAUSE_READING' });
  }, []);

  const setListening = useCallback((isListening) => {
    dispatch({ type: 'SET_LISTENING', payload: isListening });
  }, []);

  const setTranscript = useCallback((transcript, isFinal) => {
    dispatch({
      type: 'SET_TRANSCRIPT',
      payload: { transcript, isFinal },
    });
  }, []);

  const setWordMatch = useCallback((index, match) => {
    dispatch({
      type: 'SET_WORD_MATCH',
      payload: { index, ...match },
    });
  }, []);

  const setCurrentWord = useCallback((index) => {
    dispatch({ type: 'SET_CURRENT_WORD', payload: index });
  }, []);

  const updateReadingTime = useCallback(() => {
    dispatch({ type: 'UPDATE_READING_TIME' });
  }, []);

  const setRecognitionError = useCallback((error) => {
    dispatch({ type: 'SET_RECOGNITION_ERROR', payload: error });
  }, []);

  const completeReading = useCallback(() => {
    dispatch({ type: 'COMPLETE_READING' });
  }, []);

  const setReport = useCallback((report) => {
    dispatch({ type: 'SET_REPORT', payload: report });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = {
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
  };

  return (
    <ReadingContext.Provider value={value}>
      {children}
    </ReadingContext.Provider>
  );
};
