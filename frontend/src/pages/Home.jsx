import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBook, FiAward, FiVolume2 } from 'react-icons/fi';
import { Layout } from '../components/layout';
import { Button } from '../components/common/Button';
import { useStories } from '../hooks/useStories';
import { StorySelector } from '../components/story/StorySelector';

export const Home = () => {
  const navigate = useNavigate();
  const { stories, loading, error, fetchStories } = useStories();

  const handleSelectStory = (story) => {
    navigate('/reading', { state: { story } });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section
        className="text-center mb-12 mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-block mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiVolume2 className="text-6xl text-bubble-primary" />
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-bubble-primary">BubbleWord</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-6">
          Make reading fun with continuous speech recognition! 📚🎙️
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
          {[
            { icon: FiBook, text: 'Engaging Stories' },
            { icon: FiVolume2, text: 'Speech Recognition' },
            { icon: FiAward, text: 'Instant Feedback' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-bubble shadow-card p-4 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <item.icon className="text-3xl text-bubble-primary mb-2" />
              <span className="font-semibold text-gray-700">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Story Selector */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StorySelector
          stories={stories}
          loading={loading}
          error={error}
          onRetry={fetchStories}
          onSelectStory={handleSelectStory}
        />
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="mt-16 bg-gradient-to-r from-bubble-primary/10 to-bubble-secondary/10 rounded-bubble p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: '1', title: 'Select', desc: 'Choose a story' },
            { num: '2', title: 'Read', desc: 'Click start and read aloud' },
            { num: '3', title: 'Match', desc: 'See instant feedback' },
            { num: '4', title: 'Learn', desc: 'View your report' },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="w-16 h-16 mx-auto bg-bubble-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-3">
                {step.num}
              </div>
              <h3 className="font-bold text-lg mb-1">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start?</h2>
        <p className="text-lg text-gray-600 mb-6">Pick a story above and begin your reading adventure!</p>
      </motion.section>
    </Layout>
  );
};
