const Joi = require('joi');
const mongoose = require('mongoose');

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

function ValidateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer), schema;
}

exports.Customer = Customer;
exports.validate = ValidateCustomer;
