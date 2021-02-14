// imports
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./utils/dbConnection');
const path = require('path');

// init express app
const app = express();

// connect database
connectDb();

// init middlewares
app.use(express.json({ extended: false }));
app.use(cors()); // allow cross-origin communication (back & front end)
if (app.get('env') !== 'production') {
  // log http responses in console if not in production
  const logger = require('morgan');
  app.use(logger('dev'));
}

// define routes
app.use('/auth', require('./routes/auth'));
app.use('/authors', require('./routes/authors'));
app.use('/books', require('./routes/books'));

//config for heroku deployment
if (process.env.NODE_ENV === 'production') {
  //Set static folder created in 'run build'
  app.use(express.static('client/build'));
  //for any path (that not the above), send the index.html file from directory name client to directory name build
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
