import { useEffect, useState, useCallback } from 'react';
import { API_BASE_URL } from '../utils/constants';
import { tokenize } from '../utils/textUtils';
import axios from 'axios';

export const useStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all stories
  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log('useStories: Fetching stories from', `${API_BASE_URL}/stories/`);
    try {
      const response = await axios.get(`${API_BASE_URL}/stories/`);
      const rawStories = Array.isArray(response.data) ? response.data : [];
      console.log('useStories: Fetched', rawStories.length, 'stories', rawStories);

      if (rawStories.length === 0) {
        throw new Error('No stories available from the server. Make sure the backend is running.');
      }
      
      // Validate and clean data
      const storiesData = rawStories.map(story => {
        // Ensure difficulty is a trimmed string
        const cleanedStory = {
          ...story,
          difficulty: String(story.difficulty || '').trim(),
          words: tokenize(story.paragraph),
        };
        console.log(`Story ${cleanedStory.id}: difficulty="${cleanedStory.difficulty}"`);
        return cleanedStory;
      });
      
      setStories(storiesData);
      console.log('useStories: State updated with', storiesData.length, 'stories');
      return storiesData;
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Failed to fetch stories';
      console.error('useStories: Error fetching stories:', message);
      setError(
        message.includes('Network Error')
          ? 'Cannot reach the backend server. Start it with: python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload'
          : message
      );
      setStories([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single story
  const getStory = useCallback(async (storyId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/stories/${storyId}`);
      const story = {
        ...response.data,
        words: tokenize(response.data.paragraph),
      };
      return story;
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Failed to fetch story';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get stories by difficulty
  const getStoriesByDifficulty = useCallback((difficulty) => {
    return stories.filter(story => story.difficulty === difficulty);
  }, [stories]);

  // Initial fetch
  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return {
    stories,
    loading,
    error,
    fetchStories,
    getStory,
    getStoriesByDifficulty,
  };
};
