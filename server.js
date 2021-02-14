// imports
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./utils/dbConnection');
const path = require('path');

// init express app
const app = express();

// connect database
if (process.env.NODE_ENV !== 'test') {
  connectDb();
} else {
  console.log(
    `
    Attention! ENV variable set to: ${process.env.NODE_ENV} \n
    ========================================== \n
    This means that the database connections and disconnections will be made through test files in root/test \n
    ==========================================
    `
  );
  // this would be a placeholder to connect to a different database when ENV_NODE = test, if needed
  // in this case I will use the same database and delete any created resources after testing
}

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

module.exports = app;
