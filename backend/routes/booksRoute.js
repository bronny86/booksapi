import React from 'react';
import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// get method of Express sets up HTTP GET for the path '/'
// the arrow function in the second argument is a request handler that takes req and res as 2 parameters. req has information on incoming http request and res sends response back to client
router.get('/', async(request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});

router.get('/:id', async(request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});

router.post('/', async(request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishedYear
        ) {
            return response.status(400).send({
                message: 'Send all fields'
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        response.status(500).send({message: error.message});
    }
});

router.put('/:id', async(request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishedYear
        ) {
            return response.status(400).send({
                message: 'Send all fields'
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        
        if(!result) {
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book updated successfully'});
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async(request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book deleted successfully'});
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});

export default router;