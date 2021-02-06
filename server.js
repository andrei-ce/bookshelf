// imports
const express = require('express');
const cors = require('cors');
const connectDb = require('./utils/dbConnection');

// init express app
const app = express();

// connect database
connectDb();

// init middlewares
app.use(express.json({ extended: false }));
app.use(cors()); // allow cross-origin communication (back & front end)

// define routes
app.use('/authors', require('./routes/authors'));
app.use('/books', require('./routes/books'));

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
