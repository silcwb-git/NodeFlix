const {Movie, validate} = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// using route handler functions (req, res) => {}
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async(req, res) => {
    const movie = await Movies.findById(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found');
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let movie = new Movie({ name: req.body.name })
    movie = await movie.save();

    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!movie) return res.status(404).send('The movie with the given ID was not found');
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Genre.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(404).send('The movie with the given ID was not found');
    res.send(movie);
});

module.exports = router;