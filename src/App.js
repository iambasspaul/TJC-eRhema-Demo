import React, { useState } from 'react';
import Header from './components/Header';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn';
import './App.css';

const App = () => {
  const [selectedWord, setSelectedWord] = useState(null);

  const handleSelectWord = (book, chapter, verseNumber, strongID, word, monad) => {
    setSelectedWord({ book, chapter, verseNumber, strongID, word, monad });
  };

  return (
    <div className="app-container">
      <Header />
      <div className="columns-container">
        <div className="column left-column">
          <LeftColumn onSelectVerse={handleSelectWord} />
        </div>
        <div className="column right-column">
          <RightColumn selectedWord={selectedWord} />
        </div>
      </div>
    </div>
  );
};

export default App;