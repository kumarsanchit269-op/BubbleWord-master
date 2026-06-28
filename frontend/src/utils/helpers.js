/**
 * Get appreciation message based on accuracy
 */
export const getAppreciationMessage = (accuracy) => {
  if (accuracy >= 95) {
    return { text: '🌟 Excellent! You read almost perfectly!', emoji: '🌟' };
  }
  if (accuracy >= 85) {
    return { text: '👏 Great Job! Keep practicing.', emoji: '👏' };
  }
  if (accuracy >= 70) {
    return { text: '🙂 Nice Work! Practice the highlighted words.', emoji: '🙂' };
  }
  return { text: '💪 Don\'t give up! Practice every day.', emoji: '💪' };
};

/**
 * Get difficulty color
 */
export const getDifficultyColor = (difficulty) => {
  const colors = {
    Easy: 'from-green-400 to-green-600',
    Medium: 'from-yellow-400 to-yellow-600',
    Hard: 'from-red-400 to-red-600',
  };
  return colors[difficulty] || 'from-gray-400 to-gray-600';
};

/**
 * Get difficulty emoji
 */
export const getDifficultyEmoji = (difficulty) => {
  const emojis = {
    Easy: '🌱',
    Medium: '🌿',
    Hard: '🌳',
  };
  return emojis[difficulty] || '📚';
};

/**
 * Get reading progress percentage
 */
export const getProgressPercentage = (current, total) => {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
};

/**
 * Generate report title
 */
export const generateReportTitle = (accuracy) => {
  if (accuracy >= 95) return 'Perfect Reader! ⭐';
  if (accuracy >= 85) return 'Great Reader! 🎉';
  if (accuracy >= 70) return 'Good Reader! 👍';
  return 'Keep Practicing! 📖';
};

/**
 * Debounce function for event handlers
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function for event handlers
 */
export const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

/**
 * Sleep for specified milliseconds
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
