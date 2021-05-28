const express = require('express');

const { PORT } = require('./config/config');
const router = require('./routes');
const authCheck = require('./middlewares/authCheck');

const app = express();

require('./config/express')(app);
require('./config/mongoose')();

app.use('/api', authCheck, router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));