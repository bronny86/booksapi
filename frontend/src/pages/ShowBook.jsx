import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const ShowBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/books/${id}`)
            .then((response) => {
                setBook(response.data);
            })
            .catch((error) => {
                console.error('Error fetching book details:', error);
            });
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishedYear}</p>
        </div>
    );
};

export default ShowBook;