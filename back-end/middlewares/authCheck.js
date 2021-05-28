const jwt = require('jsonwebtoken');

const { JWT_TOKEN, SECRET } = require('../config/config');

module.exports = (req, res, next) => {
    
    const token = req.headers[JWT_TOKEN];

    token
    ?  res.locals.token = jwt.verify(token, SECRET)
    :  res.locals.token = null

    next();
}