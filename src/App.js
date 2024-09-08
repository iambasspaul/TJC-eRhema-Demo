import React, { useState } from 'react';
import Header from './components/Header';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn';
import './App.css';

function App() {
  const [selectedWordDetails, setSelectedWordDetails] = useState(null);

  const handleWordSelect = (wordDetails) => {
    setSelectedWordDetails(wordDetails);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="columns-container">
        <div className="column left-column">
          <LeftColumn onWordSelect={handleWordSelect} />
        </div>
        <div className="column right-column">
          <RightColumn selectedWord={selectedWordDetails} />
        </div>
      </div>
    </div>
  );
}

export default App;