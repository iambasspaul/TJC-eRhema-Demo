import React from 'react';

function RightColumn({ selectedWord }) {
  return (
    <div>
      <h2>Word Details</h2>
      {selectedWord ? (
        <div>
          <p>Book: {selectedWord.book}</p>
          <p>Chapter: {selectedWord.chapter}</p>
          <p>Verse: {selectedWord.verseNumber}</p>
          <p>Strong's ID: {selectedWord.strongID}</p>
          <p>Word: {selectedWord.word}</p>
          <p>Monad: {selectedWord.monad}</p>
        </div>
      ) : (
        <p>No word selected</p>
      )}
    </div>
  );
}

export default RightColumn;