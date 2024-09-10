import React, { useState, useEffect } from 'react';

function SelectVerse({ book, chapter, onSelectVerse, onClose }) {
  const [maxVerses, setMaxVerses] = useState(0);
  const [bookName, setBookName] = useState('');

  useEffect(() => {
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_lookup.json')
      .then(response => response.json())
      .then(data => {
        const maxVerse = data.fullname.bsb.max_bible_verse[`${book}.${chapter}`] || 0;
        setMaxVerses(maxVerse);
        setBookName(data.fullname.bsb.en[book] || `Book ${book}`);
      })
      .catch(error => console.error('Error fetching book lookup:', error));
  }, [book, chapter]);

  return (
    <div className="verse-selection-overlay">
      <div className="verse-selection-popup">
        <h3>{bookName} - Chapter {chapter}</h3>
        <div className="verse-grid">
          {Array.from({ length: maxVerses }, (_, index) => (
            <button
              key={index}
              onClick={() => onSelectVerse(index + 1)}
              className="verse-button"
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="close-button">Back to Chapters</button>
      </div>
    </div>
  );
}

export default SelectVerse;