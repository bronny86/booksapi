import express from 'express'; // ES6 module syntax
import { PORT, mongoDBURL } from './config.js'; // ES6 module syntax
import mongoose from 'mongoose';
import cors from 'cors'; // ES6 module syntax
import booksRoute from './routes/booksRoute.js'; // ES6 module syntax

// create an instance of the express application
const app = express();

// middleware for parsing request body
app.use(express.json());

// allow all origins with default *
app.use(cors());

// OR - allow only 3000 port
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )

app.use('/books', booksRoute);

// mongoose is a Object Data Modeling library for MongoDB in Node.js, 
// connect() uses Promise based approach
mongoose.connect(mongoDBURL).then(() => {
    console.log('Connected to Database');
    // listen is a function of Express to start a server and listen to 
    // incoming connections with a callback function as second argument that gets 
    // executed when server starts
    app.listen(PORT, () => {
        console.log(`App is running on the port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});