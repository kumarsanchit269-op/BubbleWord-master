import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMic, FiMicOff, FiRotateCcw } from 'react-icons/fi';
import { WORD_STATUS } from '../../utils/constants';
import { formatTime } from '../../utils/textUtils';
import { Button } from '../common/Button';

export const ReadingDisplay = ({
  story,
  currentWordIndex,
  wordMatches,
  isReadingActive,
  isMicActive,
  transcript,
  readingTime,
  sessionStartTime,
  onStartListening,
  onStopListening,
  onReset,
  onComplete,
}) => {
  const [displayTime, setDisplayTime] = useState('0:00');
  const transcriptRef = useRef(null);

  useEffect(() => {
    if (!isReadingActive || !sessionStartTime) {
      setDisplayTime(formatTime(readingTime / 1000));
      return undefined;
    }

    const tick = () => {
      setDisplayTime(formatTime((Date.now() - sessionStartTime) / 1000));
    };

    tick();
    const interval = setInterval(tick, 200);
    return () => clearInterval(interval);
  }, [isReadingActive, sessionStartTime, readingTime]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  if (!story) {
    return <div className="text-center py-8">No story loaded</div>;
  }

  const words = story.paragraph.split(/\s+/);
  const totalWords = words.length;
  const completedWords = Math.min(currentWordIndex, totalWords);
  const progressPercent = totalWords > 0 ? Math.round((completedWords / totalWords) * 100) : 0;
  const stats = {
    correct: wordMatches.filter(m => m?.status === WORD_STATUS.CORRECT).length,
    incorrect: wordMatches.filter(m => m?.status === WORD_STATUS.INCORRECT).length,
    total: totalWords,
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm md:text-base mb-4">
          <div className="flex items-center gap-2 bg-bubble-light px-4 py-2 rounded-full">
            <span className="font-semibold text-gray-700">Time:</span>
            <span className="text-bubble-primary font-bold">{displayTime}</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
            <span className="font-semibold text-gray-700">✓ Correct:</span>
            <span className="text-bubble-success font-bold">{stats.correct}</span>
          </div>
          <div className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
            <span className="font-semibold text-gray-700">✕ Wrong:</span>
            <span className="text-bubble-error font-bold">{stats.incorrect}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
            <span className="font-semibold text-gray-700">Progress:</span>
            <span className="text-blue-600 font-bold">{completedWords}/{stats.total}</span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-bubble-primary to-bubble-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">{progressPercent}% complete</p>
      </div>

      <motion.div
        className="bg-white rounded-bubble shadow-card p-8 mb-6 min-h-64"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-xl md:text-2xl leading-relaxed text-gray-800 text-justify">
          {words.map((word, index) => {
            const match = wordMatches[index];
            let wordClass = '';

            if (match?.status === WORD_STATUS.CORRECT) {
              wordClass = 'word-correct';
            } else if (match?.status === WORD_STATUS.INCORRECT) {
              wordClass = 'word-incorrect';
            }

            const isCurrent = index === currentWordIndex;

            return (
              <motion.span
                key={index}
                className={`${wordClass} ${isCurrent ? 'word-current' : ''}`}
                animate={isCurrent ? { scale: 1.08 } : { scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                {word}{' '}
              </motion.span>
            );
          })}
        </div>
      </motion.div>

      {(transcript || isReadingActive) && (
        <motion.div
          className="bg-blue-50 border-l-4 border-bubble-accent p-4 rounded mb-6"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600 font-semibold">You said:</p>
            {isMicActive && (
              <span className="text-xs text-bubble-primary font-semibold animate-pulse">● Live</span>
            )}
          </div>
          <div
            ref={transcriptRef}
            className="max-h-28 overflow-y-auto text-lg text-blue-900 leading-relaxed pr-2 scroll-smooth"
          >
            {transcript || (
              <span className="text-gray-400 italic">Start speaking — your words will appear here...</span>
            )}
          </div>
        </motion.div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        {!isReadingActive ? (
          <Button
            variant="success"
            size="lg"
            onClick={onStartListening}
            icon={FiMic}
          >
            Start Reading
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="lg"
            onClick={onStopListening}
            icon={FiMicOff}
          >
            Stop Reading
          </Button>
        )}

        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          icon={FiRotateCcw}
        >
          Reset
        </Button>

        {currentWordIndex >= stats.total && stats.total > 0 && (
          <Button
            variant="primary"
            size="lg"
            onClick={onComplete}
          >
            View Report
          </Button>
        )}
      </div>

      {currentWordIndex >= stats.total && stats.total > 0 && (
        <motion.div
          className="mt-6 p-4 bg-yellow-50 border-2 border-bubble-warning rounded-bubble text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-xl font-bold text-yellow-900">
            🎉 Great job! You've read all the words! Click "View Report" to see your results.
          </p>
        </motion.div>
      )}
    </div>
  );
};
