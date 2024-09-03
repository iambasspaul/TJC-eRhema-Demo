//import React from 'react';
import React, { useState, useEffect } from 'react'; // Add useState and useEffect

const RightColumn = ({ selectedWord }) => {
  const [bookLookup, setBookLookup] = useState({});

  useEffect(() => {
      fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_lookup.json')
          .then(response => response.json())
          .then(data => setBookLookup(data.fullname.bsb.en))
          .catch(error => console.error('Error fetching book lookup:', error));
  }, []);

  return (
      <div className="sticky" style={{ width: '50%', padding: '20px' }}>
          {selectedWord ? (
              <div>
                  <h2>Details</h2>
                  <p><strong>Book:</strong> {bookLookup[selectedWord.book] || selectedWord.book}</p>
                  <p><strong>Chapter:</strong> {selectedWord.chapter}</p>
                  <p><strong>Verse:</strong> {selectedWord.verseNumber}</p>
                  <p><strong>Strong's Number:</strong> {selectedWord.strongID}</p>
                  <p><strong>Word:</strong> {selectedWord.word}</p>
                  <p><strong>Part of Speech:</strong> {selectedWord.monad}</p>
              </div>
          ) : (
              <p>Select a word to see details</p>
          )}
      </div>
  );
};



export default RightColumn;