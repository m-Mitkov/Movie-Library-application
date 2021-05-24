const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

    identifier: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
    },

    note: {
        type: String
    }
});

module.exports = mongoose.model('Movie', movieSchema);