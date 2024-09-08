import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/search_icon.jpg'; // Ensure the path is correct
import Search from './Search'; // Import the new Search component

function LeftColumn({ onWordSelect }) { // Add onWordSelect prop
  const [verses, setVerses] = useState({});
  const [selectedWord, setSelectedWord] = useState(null);
  const [BookNameLookup, setBookNameLookup] = useState({});
  const [showSearch, setShowSearch] = useState(false); // State to control search window
  const [selectedBook, setSelectedBook] = useState('40'); // Set default to Matthew (40)
  const [selectedChapter, setSelectedChapter] = useState('1'); // Set default to Chapter 1
  const [bookName, setBookName] = useState('Matthew'); // Add this line

  useEffect(() => {
    // Fetch book names
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_lookup.json')
      .then(response => response.json())
      .then(data => setBookNameLookup(data.fullname.bsb.en))
      .catch(error => console.error('Error fetching book lookup:', error));
  }, []);

  useEffect(() => {
    if (selectedBook && selectedChapter) {
      fetch(`https://iambasspaul.github.io/tjc-erhema-demo/NT/Bible_BSB_NT_${selectedBook}.txt`)
        .then(response => response.json())
        .then(data => {
          const versesContent = data.content;
          if (versesContent && typeof versesContent === 'object') {
            setVerses({ [selectedBook]: { [selectedChapter]: versesContent[selectedBook][selectedChapter] } });
            setBookName(BookNameLookup[selectedBook] || `Book ${selectedBook}`);
          } else {
            console.error('Fetched data is not in the expected format:', versesContent);
          }
        })
        .catch(error => console.error('Error fetching book verses:', error));
    } else if (!selectedBook && !selectedChapter) {
      // Fetch default verses (Matthew 1) when no book is selected
      fetch('https://iambasspaul.github.io/tjc-erhema-demo/NT/Bible_BSB_NT_40.txt')
        .then(response => response.json())
        .then(data => {
          const versesContent = data.content;
          if (versesContent && typeof versesContent === 'object') {
            setVerses(versesContent);
            setBookName(BookNameLookup['40'] || 'Matthew');
          } else {
            console.error('Fetched data is not in the expected format:', versesContent);
          }
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    }
  }, [selectedBook, selectedChapter, BookNameLookup]);

  const handleWordSelect = (wordDetails) => {
    setSelectedWord(wordDetails);
    onWordSelect(wordDetails); // Pass the selected word details to the parent component
  };

  const handleSelectBook = (bookNumber, chapter) => {
    setSelectedBook(bookNumber);
    setSelectedChapter(chapter);
    setShowSearch(false); // Close the search after selection
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
      {showSearch && (
        <Search 
          onSelectBook={handleSelectBook} 
          onClose={() => setShowSearch(false)} 
        />
      )}
      {Object.entries(verses).map(([book, chapters]) => (
        <div key={book}>
          <h2>{bookName}</h2>
          {Object.entries(chapters).map(([chapter, verses]) => (
            <div key={chapter}>
              <h3>Chapter {chapter}</h3>
              {Object.entries(verses).map(([verseNumber, verseArray]) => (
                <p key={verseNumber}>
                  <strong>verse {verseNumber} </strong>
                  {verseArray.map((wordArray, index) => {
                    const [strongID, word, monad] = wordArray;
                    return (
                      <span
                        key={`${strongID}-${index}`}
                        onMouseDown={() => handleWordSelect({ book, chapter, verseNumber, strongID, word, monad })}
                        style={{ backgroundColor: selectedWord?.strongID === strongID ? 'yellow' : 'transparent' }}
                      >
                        {word}{' '}
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
}

export default LeftColumn;