const Joi = require('joi');
const date = require('joi/lib/types/date');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minLengh: 5,
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
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        tyoe: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    };
    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
