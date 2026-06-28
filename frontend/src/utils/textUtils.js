import { MATCH_THRESHOLD } from './constants';

/**
 * Normalize text for comparison
 * - Lowercase
 * - Remove punctuation
 * - Trim whitespace
 */
export const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Split text into words
 */
export const tokenize = (text) => {
  return normalizeText(text).split(/\s+/).filter(word => word.length > 0);
};

/**
 * Simple Levenshtein distance implementation
 */
export const levenshteinDistance = (a, b) => {
  const m = a.length;
  const n = b.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
};

/**
 * Calculate similarity score (0-100) between two words
 */
export const calculateSimilarity = (word1, word2) => {
  const norm1 = normalizeText(word1);
  const norm2 = normalizeText(word2);

  if (norm1 === norm2) return 100;
  if (!norm1 || !norm2) return 0;

  const distance = levenshteinDistance(norm1, norm2);
  const maxLen = Math.max(norm1.length, norm2.length);
  const similarity = ((maxLen - distance) / maxLen) * 100;

  return Math.round(similarity);
};

/**
 * Adaptive match threshold — short/common words need tighter matching
 */
export const getAdaptiveThreshold = (word) => {
  const normalized = normalizeText(word);
  if (!normalized) return MATCH_THRESHOLD;
  if (normalized.length <= 2) return 92;
  if (normalized.length <= 4) return 82;
  return MATCH_THRESHOLD;
};

/**
 * Match spoken words against expected words (legacy — matches all occurrences)
 */
export const matchWords = (expectedWords, spokenWords) => {
  const results = [];
  const spoken = spokenWords.map(normalizeText);

  expectedWords.forEach((expected, index) => {
    const normalized = normalizeText(expected);
    let bestMatch = null;
    let bestScore = 0;

    for (let i = 0; i < spoken.length; i++) {
      const score = calculateSimilarity(normalized, spoken[i]);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = i;
      }
    }

    const isCorrect = bestScore >= getAdaptiveThreshold(expected);
    results.push({
      word: expected,
      index,
      correct: isCorrect,
      score: bestScore,
      matchedWord: bestMatch !== null ? spokenWords[bestMatch] : null,
    });
  });

  return results;
};

/**
 * Sequential matcher — only marks the current expected word, one at a time.
 * Returns how many spoken tokens were consumed and match results.
 */
export const matchSequential = (
  expectedWords,
  spokenWords,
  fromExpectedIndex = 0,
  fromSpokenIndex = 0,
  options = {}
) => {
  const { allowInterim = false, maxLookahead = 2 } = options;
  const results = [];
  let expectedIdx = fromExpectedIndex;
  let spokenIdx = fromSpokenIndex;

  while (spokenIdx < spokenWords.length && expectedIdx < expectedWords.length) {
    const spoken = spokenWords[spokenIdx];
    const expected = expectedWords[expectedIdx];
    const threshold = getAdaptiveThreshold(expected);
    const score = calculateSimilarity(expected, spoken);

    if (score >= threshold) {
      results.push({
        index: expectedIdx,
        correct: true,
        score,
        spokenWord: spoken,
      });
      expectedIdx += 1;
      spokenIdx += 1;
      continue;
    }

    // User may be slightly ahead — check if spoken word matches a near-future expected word
    let matchedAhead = false;
    for (let look = 1; look <= maxLookahead && expectedIdx + look < expectedWords.length; look++) {
      const aheadExpected = expectedWords[expectedIdx + look];
      const aheadScore = calculateSimilarity(aheadExpected, spoken);
      const aheadThreshold = getAdaptiveThreshold(aheadExpected);

      if (aheadScore >= aheadThreshold) {
        for (let skip = 0; skip < look; skip++) {
          results.push({
            index: expectedIdx + skip,
            correct: false,
            score: 0,
            spokenWord: spoken,
          });
        }
        results.push({
          index: expectedIdx + look,
          correct: true,
          score: aheadScore,
          spokenWord: spoken,
        });
        expectedIdx += look + 1;
        spokenIdx += 1;
        matchedAhead = true;
        break;
      }
    }

    if (matchedAhead) {
      continue;
    }

    // Close partial match on interim results — advance for fast readers
    if (allowInterim && score >= threshold - 8) {
      results.push({
        index: expectedIdx,
        correct: true,
        score,
        spokenWord: spoken,
        tentative: true,
      });
      expectedIdx += 1;
      spokenIdx += 1;
      continue;
    }

    // Unrecognized spoken token — skip it (filler/noise) without marking story words wrong
    spokenIdx += 1;
  }

  return {
    results,
    nextExpectedIndex: expectedIdx,
    nextSpokenIndex: spokenIdx,
  };
};

/**
 * Extract unique incorrect words
 */
export const extractPracticeWords = (matches) => {
  return matches
    .filter(m => !m.correct)
    .map(m => m.word.toLowerCase())
    .filter((word, index, arr) => arr.indexOf(word) === index);
};

/**
 * Format reading time
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate WPM (Words Per Minute)
 */
export const calculateWPM = (wordCount, seconds) => {
  if (seconds <= 0) return 0;
  const minutes = seconds / 60;
  return Math.round(wordCount / minutes);
};

/**
 * Calculate accuracy percentage
 */
export const calculateAccuracy = (correctWords, totalWords) => {
  if (totalWords === 0) return 0;
  return Math.round((correctWords / totalWords) * 100);
};
