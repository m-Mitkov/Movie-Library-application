
module.exports = (req, res, next) => {
    
    if(!!res.locals.token){
        res.locals._id = res.locals.token._id;
        return next();
    }

    res.json({error: 'You are not authenticated to perform this action!'});
}