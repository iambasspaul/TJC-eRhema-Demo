import React, { useState, useEffect } from 'react';

function SelectChapter({ book, onSelectChapter, onClose }) {
  const [maxChapters, setMaxChapters] = useState(0);

  useEffect(() => {
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_lookup.json')
      .then(response => response.json())
      .then(data => {
        const maxChapter = data.fullname.bsb.max_bible_chapter[book] || 0;
        setMaxChapters(maxChapter);
      })
      .catch(error => console.error('Error fetching book lookup:', error));
  }, [book]);

  return (
    <div className="chapter-selection">
      <h3>Select Chapter (Book {book})</h3>
      <div className="chapter-grid">
        {Array.from({ length: maxChapters }, (_, index) => (
          <button
            key={index}
            onClick={() => onSelectChapter(index + 1)}
            className="chapter-button"
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={onClose} className="close-button">Back to Books</button>
    </div>
  );
}

export default SelectChapter;