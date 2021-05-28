const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/config');
const User = require('../models/User');

const register = async (data) => {
    const { username, password } = { ...data };
    const user = await User.findOne({ username: username.toLowerCase() });

    if (user) throw ('The provided username already exist!');

    if (password.length < 2 || password.length > 20)
        throw ({ error: 'The password must be between 2 and 20 characters long' });

    const userObj = { username, password };
    const newUser = new User(userObj);

    const userID = await newUser.save();

    return {
        username: username,
        _id: userID
    };
};

const login = async (data) => {
    const { username, password } = { ...data };

    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) throw ('Invalid username or password!');

    const correctPassword = bcrypt.compareSync(password.toString(), user.password);

    if (!correctPassword) throw ('Invalid Password!');

    const token = {
        _id: user._id,
        username: user.username,
    };

    const userCredentials = {
        _id: user._id,
        username: user.username,
    }

    return {
        token: jwt.sign(token, SECRET, { expiresIn: '24h' }),
        userCredentials: userCredentials
    }
}

module.exports = {
    register,
    login
}

