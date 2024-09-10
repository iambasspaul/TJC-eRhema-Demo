import React, { useEffect, useState } from 'react';
import SelectChapter from './SelectChapter';

function Search({ onSelectBook, onClose }) {
  const [bookList, setBookList] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_list.json')
      .then(response => response.json())
      .then(data => setBookList(data.lookup.en))
      .catch(error => console.error('Error fetching book list:', error));
  }, []);

  const handleBookClick = (bookNumber) => {
    setSelectedBook(bookNumber);
  };

  return (
    <div className="search-overlay">
      <div className="search-popup">
        <button onClick={onClose} className="close-button">Close</button>
        {!selectedBook ? (
          <div className="book-grid">
            {Object.entries(bookList).map(([shortName, bookNumber]) => (
              <div 
                key={bookNumber} 
                className="book-item" 
                onClick={() => handleBookClick(bookNumber)}
              >
                {shortName}
              </div>
            ))}
          </div>
        ) : (
          <SelectChapter
            book={selectedBook}
            onSelectChapter={(chapter, verse) => {
              onSelectBook(selectedBook, chapter, verse);
              setSelectedBook(null);
              onClose();
            }}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Search;