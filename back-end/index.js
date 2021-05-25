const express = require('express');

const { PORT } = require('./config/config');
const router = require('./routes');

const app = express();

require('./config/express')(app);
require('./config/mongoose')();

app.use('/api', router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));