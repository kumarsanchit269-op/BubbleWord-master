import React from 'react';
import { ReadingProvider } from './context/ReadingContext';
import { Router } from './router';
import './styles/globals.css';

function App() {
  return (
    <ReadingProvider>
      <Router />
    </ReadingProvider>
  );
}

export default App;
