// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Speech Recognition
export const SPEECH_CONFIG = {
  language: 'en-US',
  continuous: true,
  interimResults: true,
  maxAlternatives: 1,
};

// Matching Threshold (0-100) — base value; short words use adaptive thresholds
export const MATCH_THRESHOLD = 75;

// Difficulty Levels
export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

// Reading States
export const READING_STATE = {
  IDLE: 'idle',
  LISTENING: 'listening',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  ERROR: 'error',
};

// Word Status
export const WORD_STATUS = {
  PENDING: 'pending',
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  CURRENT: 'current',
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// Message Types
export const MESSAGE_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};
