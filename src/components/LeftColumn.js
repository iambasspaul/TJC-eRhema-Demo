import React, { useEffect, useState } from 'react';
import searchIcon from './search_icon.jpg';

const LeftColumn = ({ onVerseSelect }) => {
  const [bookList, setBookList] = useState([]);
  const [maxChapters, setMaxChapters] = useState({});
  const [maxVerses, setMaxVerses] = useState({});
  const [showBookList, setShowBookList] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [verseContent, setVerseContent] = useState('');

  useEffect(() => {
    // Fetch book list
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_list.json')
      .then(response => response.json())
      .then(data => {
        const shortNames = Object.entries(data.lookup.en)
          .filter(([_, value]) => value >= 40 && value <= 66)
          .map(([key, _]) => key)
          .filter(name => name.length <= 3);
        setBookList([...new Set(shortNames)]);
      })
      .catch(error => console.error('Error fetching book list:', error));

    // Fetch max chapters and verses
    fetch('https://iambasspaul.github.io/tjc-erhema-demo/book_lookup.json')
      .then(response => response.json())
      .then(data => {
        setMaxChapters(data.max_bible_chapter);
        setMaxVerses(data.max_bible_verse);
      })
      .catch(error => console.error('Error fetching book lookup:', error));
  }, []);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setSelectedVerse(null);
    setVerseContent('');
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setSelectedVerse(null);
    setVerseContent('');
  };

  const handleVerseSelect = (verse) => {
    setSelectedVerse(verse);
    const bookNumber = bookList.indexOf(selectedBook) + 40; // Assuming Matthew is 40
    fetch(`https://iambasspaul.github.io/NT/Bible_BSB_NT_${bookNumber}.txt`)
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const verseContent = lines.find(line => line.startsWith(`${selectedChapter}:${verse}\t`));
        if (verseContent) {
          setVerseContent(verseContent.split('\t')[1]);
          onVerseSelect(selectedBook, selectedChapter, verse, null, verseContent.split('\t')[1], null);
        }
      })
      .catch(error => console.error('Error fetching verse content:', error));
  };

  return (
    <div className="left-column">
      <div className="black-bar" />
      <div className="search-container">
        <img 
          src={searchIcon} 
          alt="Search" 
          className="search-icon"
          onClick={() => setShowBookList(!showBookList)}
        />
      </div>
      {showBookList && (
        <div className="book-list">
          <h3>Select a Book</h3>
          {bookList.map(book => (
            <div key={book} onClick={() => handleBookSelect(book)} className="book-item">
              {book}
            </div>
          ))}
        </div>
      )}
      {selectedBook && (
        <div className="chapter-list">
          <h3>Select a Chapter</h3>
          {[...Array(maxChapters[selectedBook] || 0)].map((_, i) => (
            <span key={i + 1} onClick={() => handleChapterSelect(i + 1)} className="chapter-item">
              {i + 1}
            </span>
          ))}
        </div>
      )}
      {selectedChapter && (
        <div className="verse-list">
          <h3>Select a Verse</h3>
          {[...Array(maxVerses[selectedBook]?.[selectedChapter] || 0)].map((_, i) => (
            <span key={i + 1} onClick={() => handleVerseSelect(i + 1)} className="verse-item">
              {i + 1}
            </span>
          ))}
        </div>
      )}
      {verseContent && (
        <div className="verse-content">
          <h3>{`${selectedBook} ${selectedChapter}:${selectedVerse}`}</h3>
          <p>{verseContent}</p>
        </div>
      )}
    </div>
  );
};

export default LeftColumn;