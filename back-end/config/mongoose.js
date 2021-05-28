const mongoose = require('mongoose');

const { DB_CONNECTION } = require('./config');

module.exports = () => {

    mongoose.connect(DB_CONNECTION, {
        useNewUrlParser: true, useUnifiedTopology: true,
        useFindAndModify: false, useCreateIndex: true
    });

    const db = mongoose.connection;
    db.on('open', () => console.log('DB successfully conected!'));
}