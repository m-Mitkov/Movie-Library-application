const User = require('../models/User');

const changeRating = async (userId, movieId, rating) => {

   return await User.updateOne({_id: userId, 'favouriteMovies.id': movieId}, 
   {'favouriteMovies.$.rating': rating});
}

const deleteRating = async (userId, movieId) => {
    return await User.updateOne({_id: userId, 'favouriteMovies.id': movieId}, 
    {'favouriteMovies.$.rating': ''});
}

module.exports = {
    changeRating,
    deleteRating
}