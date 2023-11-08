const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLengh: 5,
        maxLengh: 50
    }
}));

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;