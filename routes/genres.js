const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Science Fiction' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Romance' },
    { id: 4, name: 'Action' },
    { id: 5, name: 'Todo Drama'}
]

// using route handler functions (req, res) => {}
router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
});

router.post('/:id', (req, res) => {
    const { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);

});

router.put('/:id', (req, res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    const { error } = ValidateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    const index = genres.indexOf(genre);

    genres.splice(index, 1);
    res.send(genre);
});

function ValidateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre), schema;
}

module.exports = router;