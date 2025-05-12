import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Fetch books from the backend
        axiosInstance.get('/books')
            .then((response) => {
                setBooks(response.data.data); // Adjust based on your API response structure
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                setError('Failed to fetch books. Please try again later.');
            });
    }, []);

    return (
        <div>
            <h1>Books List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            {books.length === 0 && !error && <p>No books available.</p>} {/* Handle empty list */}
            {books.map((book, index) => (
                <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Published Year:</strong> {book.publishedYear}</p>
                    <div>
                        <Link to={`/books/details/${book._id}`}>
                            <button>Details</button>
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                            <button>Edit</button>
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                            <button>Delete</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;