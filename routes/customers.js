
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenght: 5,
        maxLengh: 50
    },
    isGold: {
        tyoe: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minLenght: 5,
        maxLengh: 50
    }
}));

// using route handler functions (req, res) => {}
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found');
    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = ValidateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    customer = await customer.save();

    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = ValidateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found');
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) return res.status(404).send('The customer with the given ID was not found');
    res.send(customer);
});

function ValidateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.Boolean()
    };
    return Joi.validate(customer), schema;
}

module.exports = router;