import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state for better UX
  const history = useHistory();

  const handleSaveBook = () => {
    setLoading(true); // Set loading to true when the request starts
    const data = {
      title,
      author,
      publishedYear,
    };

    axios
      .post('http://localhost:8000/books', data)
      .then(() => {
        setLoading(false); // Reset loading state
        history('/'); // Navigate to the home page after successful creation
      })
      .catch((error) => {
        setLoading(false); // Reset loading state
        console.error('Error creating book:', error);
        alert('Failed to create the book. Please try again.');
      });
  };

  return (
    <div>
      <h1>Create a New Book</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Published Year:</label>
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSaveBook} disabled={loading}>
          {loading ? 'Saving...' : 'Save Book'}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;