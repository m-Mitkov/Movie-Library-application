const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    favouriteMovies: [{
        type: Object,
    }]
    
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
    this.username = this.username.toLowerCase();
    
    next();
});

module.exports = mongoose.model('User', userSchema);
