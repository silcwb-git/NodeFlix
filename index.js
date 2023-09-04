const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/nodeflix')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err.message));

// Build a web server
const app = express();
app.use(express.json()); // middleware function that sets a req.body property

app.use('/api/genres', genres);
app.use('/api/customers', customers);

// Reading the port from an environment variable 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));