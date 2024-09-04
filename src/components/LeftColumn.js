import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/search_icon.jpg'; // Ensure the path is correct
import Search from './Search'; // Import the new Search component

const LeftColumn = ({ onSelectVerse }) => {
  const [verses, setVerses] = useState({});
  const [selectedWord, setSelectedWord] = useState(null);
  const [BookNameLookup, setBookNameLookup] = useState({});
  const [showSearch, setShowSearch] = useState(false); // State to control search window

  useEffect(() => {
    // Fetch Bible verses
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/NT/Bible_BSB_NT_40.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Ensure the data structure is as expected
            const versesContent = data.content;
            if (versesContent && typeof versesContent === 'object') {
                setVerses(versesContent);
            } else {
                console.error('Fetched data is not in the expected format:', versesContent);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    // Fetch book names
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_lookup.json')
        .then(response => response.json())
        .then(data => setBookNameLookup(data.fullname.bsb.en))
        .catch(error => console.error('Error fetching book lookup:', error));

  }, []);

  const handleWordSelect = (wordDetails) => {
    setSelectedWord(wordDetails);
    onSelectVerse(wordDetails.book, wordDetails.chapter, wordDetails.verseNumber, wordDetails.strongID, wordDetails.word, wordDetails.monad);
  };

  const handleBookSelect = (bookNumber) => {
    fetch(`https://iambasspaul.github.io/tjc-erhema-demo/NT/Bible_BSB_NT_${bookNumber}.txt`)
      .then(response => response.json())
      .then(data => {
        const versesContent = data.content;
        if (versesContent && typeof versesContent === 'object') {
          setVerses(versesContent);
        } else {
          console.error('Fetched data is not in the expected format:', versesContent);
        }
      })
      .catch(error => console.error('Error fetching book verses:', error));
  };

  return (
    <div style={{ width: '100%', overflowY: 'scroll' }}>
      <div className="search-container">
      <img 
        src={searchIcon} 
        alt="Search" 
        className="search-icon" 
        onClick={() => setShowSearch(true)} 
      />
      </div>
      {showSearch && <Search onBookSelect={handleBookSelect} onClose={() => setShowSearch(false)} />}
      {Object.entries(verses).map(([book, chapters]) => (
        <div key={book}>
          <h2>Book {BookNameLookup[book] || book}</h2>
          {Object.entries(chapters).map(([chapter, verses]) => (
            <div key={chapter}>
              <h3>Chapter {chapter}</h3>
              {Object.entries(verses).map(([verseNumber, verseArray]) => (
                <p key={verseNumber}>
                  <strong>verse {verseNumber} </strong>
                  {verseArray.map((wordArray) => {
                    const [strongID, word, monad] = wordArray;
                    return (
                      <span
                        key={strongID}
                        onMouseDown={() => handleWordSelect({ book, chapter, verseNumber, strongID, word, monad })}
                        style={{ backgroundColor: selectedWord?.strongID === strongID ? 'yellow' : 'transparent' }}
                      >
                        {word}
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LeftColumn;