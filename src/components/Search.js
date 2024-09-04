import React, { useEffect, useState } from 'react';

const Search = ({ onBookSelect, onClose }) => {
  const [bookList, setBookList] = useState({});

  useEffect(() => {
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_list.json')
      .then(response => response.json())
      .then(data => setBookList(data.lookup.en))
      .catch(error => console.error('Error fetching book list:', error));
  }, []);

  return (
    <div className="search-popup">
      <button onClick={onClose}>Close</button>
      <div className="book-grid">
        {Object.entries(bookList).map(([shortName, bookNumber]) => (
          <div 
            key={bookNumber} 
            className="book-item" 
            onClick={() => {
              onBookSelect(bookNumber);
              onClose();
            }}
          >
            {shortName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;