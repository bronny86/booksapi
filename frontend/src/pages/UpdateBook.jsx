import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UpdateBook = () => {
    const { id } = useParams();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [error, setError] = useState(null);

    // Fetch the existing book details to pre-fill the form
    useEffect(() => {
        axios.get(`http://localhost:8000/books/${id}`)
            .then((response) => {
                const { title, author, publishedYear } = response.data;
                setTitle(title);
                setAuthor(author);
                setPublishedYear(publishedYear);
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to fetch book details.');
            });
    }, [id]);

    const handleUpdate = () => {
        const updatedBook = { title, author, publishedYear };

        axios.put(`http://localhost:8000/books/${id}`, updatedBook)
            .then(() => {
                alert('Book updated successfully!');
                history.push('/'); // Correctly navigate to the homepage
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to update the book. Please try again.');
            });
    };

    return (
        <div>
            <h1>Update Book</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    <label>Published Year:</label>
                    <input
                        type="number"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                    />
                </div>
                <button onClick={handleUpdate}>Save</button>
            </form>
        </div>
    );
};

export default UpdateBook;