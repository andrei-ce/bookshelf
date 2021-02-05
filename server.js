const express = require('express');

// init express app
const app = express();

// connect database

// init middlewares
app.use(express.json({ extended: false }));

// define routes

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
