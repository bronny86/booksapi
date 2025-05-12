import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const DeleteBook = () => {
    const { id } = useParams();
    const history = useHistory();
    const [error, setError] = useState(null);

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/books/${id}`)
            .then(() => {
                alert('Book deleted successfully!');
                history('/'); // Redirect to the homepage or another page after deletion
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to delete the book. Please try again.');
            });
    };

    return (
        <div>
            <h1>Delete Book</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleDelete}>Delete Book</button>
        </div>
    );
};

export default DeleteBook;