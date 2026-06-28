import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DIFFICULTY_LEVELS } from '../../utils/constants';
import { getDifficultyColor, getDifficultyEmoji } from '../../utils/helpers';
import { StoryCard } from './StoryCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { AlertBox } from '../common/AlertBox';
import { Button } from '../common/Button';

export const StorySelector = ({ stories, loading, error, onRetry, onSelectStory }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // Validate stories prop
  if (!Array.isArray(stories)) {
    console.error('StorySelector: stories prop is not an array', { stories, type: typeof stories });
  }

  const filteredStories = selectedDifficulty
    ? stories.filter(s => String(s.difficulty || '').trim().toLowerCase() === selectedDifficulty.toLowerCase())
    : stories;

  // Debug logging
  React.useEffect(() => {
    console.log('StorySelector Debug:', {
      totalStories: stories.length,
      selectedDifficulty,
      filteredStoriesCount: filteredStories.length,
      filteredStories: filteredStories.map(s => ({ id: s.id, title: s.title, difficulty: s.difficulty })),
      allStoriesDifficulties: stories.map(s => ({ id: s.id, title: s.title, difficulty: s.difficulty }))
    });
  }, [stories, selectedDifficulty]);

  return (
    <div className="w-full">
      {/* Difficulty Selector */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Difficulty Level</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DIFFICULTY_LEVELS.map((difficulty) => {
            const bgGradient = getDifficultyColor(difficulty);
            const emoji = getDifficultyEmoji(difficulty);
            const isSelected = selectedDifficulty === difficulty;

            return (
              <motion.button
                key={difficulty}
                onClick={() => setSelectedDifficulty(isSelected ? null : difficulty)}
                className={`p-6 rounded-bubble font-bold text-lg text-white transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-r ${bgGradient} shadow-bubble scale-105`
                    : `bg-gray-300 hover:shadow-card`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl">{emoji}</span> {difficulty}
              </motion.button>
            );
          })}
        </div>
        <button
          onClick={() => setSelectedDifficulty(null)}
          className="mt-4 text-bubble-primary font-semibold hover:underline"
        >
          Show All Stories
        </button>
      </div>

      {/* Stories Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {selectedDifficulty ? `${selectedDifficulty} Stories` : 'All Stories'}
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="py-8 space-y-4">
            <AlertBox type="error" title="Could not load stories" message={error} />
            {onRetry && (
              <div className="text-center">
                <Button variant="primary" onClick={onRetry}>
                  Try Again
                </Button>
              </div>
            )}
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {selectedDifficulty
                ? `No ${selectedDifficulty} stories found. Try another difficulty or show all stories.`
                : 'No stories found'}
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onSelect={onSelectStory}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
