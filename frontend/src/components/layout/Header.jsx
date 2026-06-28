import React from 'react';
import { Link } from 'react-router-dom';
import { FiVolume2, FiBook } from 'react-icons/fi';

export const Header = ({ showHome = true }) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-bubble-primary to-bubble-secondary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {showHome && (
            <Link
              to="/"
              className="flex items-center gap-2 text-white text-2xl font-bold hover:opacity-80 transition-opacity"
            >
              <FiVolume2 className="text-3xl animate-pulse" />
              <FiBook className="text-3xl" />
              <span>BubbleWord</span>
            </Link>
          )}
          <div className="flex items-center gap-2 text-white text-sm">
            <span>🎓 Reading Made Fun!</span>
          </div>
        </div>
      </div>
    </header>
  );
};
