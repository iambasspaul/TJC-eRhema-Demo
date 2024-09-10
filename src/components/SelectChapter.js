import React, { useState, useEffect } from 'react';
import SelectVerse from './SelectVerse';

function SelectChapter({ book, onSelectChapter, onClose }) {
  const [maxChapters, setMaxChapters] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_lookup.json')
      .then(response => response.json())
      .then(data => {
        const maxChapter = data.fullname.bsb.max_bible_chapter[book] || 0;
        setMaxChapters(maxChapter);
      })
      .catch(error => console.error('Error fetching book lookup:', error));
  }, [book]);

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <div className="chapter-selection">
      {!selectedChapter ? (
        <>
          <h3>Select Chapter (Book {book})</h3>
          <div className="chapter-grid">
            {Array.from({ length: maxChapters }, (_, index) => (
              <button
                key={index}
                onClick={() => handleChapterSelect(index + 1)}
                className="chapter-button"
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="close-button">Back to Books</button>
        </>
      ) : (
        <SelectVerse
          book={book}
          chapter={selectedChapter}
          onSelectVerse={(verse) => onSelectChapter(selectedChapter, verse)}
          onClose={() => setSelectedChapter(null)}
        />
      )}
    </div>
  );
}

export default SelectChapter;