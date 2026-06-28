import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiBarChart2 } from 'react-icons/fi';
import { getDifficultyColor, getDifficultyEmoji } from '../../utils/helpers';
import { Button } from '../common/Button';

export const StoryCard = ({ story, onSelect }) => {
  const difficultyColor = getDifficultyColor(story.difficulty);
  const difficultyEmoji = getDifficultyEmoji(story.difficulty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bubble-card overflow-hidden"
    >
      <div className={`h-2 bg-gradient-to-r ${difficultyColor}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{story.title}</h3>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${difficultyColor}`}>
              {difficultyEmoji} {story.difficulty}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FiClock className="text-bubble-primary" />
            <span>{story.estimated_time}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiBarChart2 className="text-bubble-secondary" />
            <span>{story.word_count} words</span>
          </div>
        </div>

        {/* Preview */}
        <p className="text-gray-700 mb-4 line-clamp-2 text-sm leading-relaxed">
          {story.paragraph}
        </p>

        {/* Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => onSelect(story)}
          className="w-full"
        >
          Start Reading <FiArrowRight className="text-lg" />
        </Button>
      </div>
    </motion.div>
  );
};
