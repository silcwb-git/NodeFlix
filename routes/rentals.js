const {Rental, validate} = require('../models/rental');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// using route handler functions (req, res) => {}
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('name');
    res.send(rentals);
});

router.get('/:id', async(req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found');
    res.send(rental);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let rental = new Genre({ name: req.body.name })
    rental = await rental.save();

    res.send(rental);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const rental = await Rental.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!rental) return res.status(404).send('The rental with the given ID was not found');
    res.send(rental);
});

router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id)
    if (!rental) return res.status(404).send('The genre with the given ID was not found');
    res.send(rental);
});

module.exports = router;