import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getAppreciationMessage, generateReportTitle } from '../../utils/helpers';
import { Button } from '../common/Button';

export const ReportDisplay = ({ report, story }) => {
  if (!report) {
    return <div className="text-center py-8">No report available</div>;
  }

  const { accuracy, total_words, correct_words, wrong_words, reading_speed, practice_words, appreciation } = report;
  const appreciationData = getAppreciationMessage(accuracy);
  const reportTitle = generateReportTitle(accuracy);

  const stats = [
    { label: 'Accuracy', value: `${accuracy}%`, color: 'bg-blue-100', textColor: 'text-blue-600' },
    { label: 'Reading Speed', value: `${reading_speed} WPM`, color: 'bg-green-100', textColor: 'text-green-600' },
    { label: 'Correct Words', value: correct_words, color: 'bg-bubble-success/20', textColor: 'text-bubble-success' },
    { label: 'Total Words', value: total_words, color: 'bg-purple-100', textColor: 'text-purple-600' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          {reportTitle}
        </h1>
        <p className="text-2xl">{appreciationData.emoji}</p>
        <p className="text-xl text-gray-600 mt-3">{appreciationData.text}</p>
      </motion.div>

      {/* Story Title */}
      {story && (
        <div className="text-center mb-8">
          <p className="text-gray-600">Story:</p>
          <p className="text-2xl font-bold text-gray-900">{story.title}</p>
        </div>
      )}

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        layout
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`${stat.color} rounded-bubble p-6 text-center`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-gray-600 font-semibold text-sm mb-2">{stat.label}</p>
            <p className={`${stat.textColor} text-3xl font-bold`}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Practice Words */}
      {practice_words && practice_words.length > 0 && (
        <motion.div
          className="bg-white rounded-bubble shadow-card p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Words to Practice</h2>
          <div className="flex flex-wrap gap-3">
            {practice_words.map((word, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-bubble-light text-bubble-primary font-semibold rounded-bubble"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Appreciation Message */}
      <motion.div
        className="bg-gradient-to-r from-bubble-primary/10 to-bubble-secondary/10 rounded-bubble p-6 mb-8 border-2 border-bubble-primary/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="text-center text-lg text-gray-800">
          <span className="text-3xl mr-2">{appreciationData.emoji}</span>
          {appreciation || appreciationData.text}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/">
          <Button variant="outline" size="lg" icon={FiArrowLeft}>
            Back to Home
          </Button>
        </Link>
        
        <Button variant="secondary" size="lg" icon={FiShare2}>
          Share Results
        </Button>
      </div>

      {/* Performance Tips */}
      <motion.div
        className="mt-12 p-6 bg-blue-50 rounded-bubble border-l-4 border-bubble-accent"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-bold text-blue-900 mb-3">💡 Tips for Better Reading:</h3>
        <ul className="text-blue-800 space-y-2 text-sm md:text-base">
          <li>✓ Read slowly and clearly</li>
          <li>✓ Practice difficult words daily</li>
          <li>✓ Try harder stories next time</li>
          <li>✓ Have fun and enjoy reading!</li>
        </ul>
      </motion.div>
    </div>
  );
};
