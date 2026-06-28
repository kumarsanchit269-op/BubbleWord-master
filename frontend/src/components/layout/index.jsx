import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {showHeader && <Header />}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
