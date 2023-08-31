
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenght: 5,
        maxLengh: 50
    }
}));

// using route handler functions (req, res) => {}
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name })
    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
});

function ValidateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre), schema;
}

module.exports = router;