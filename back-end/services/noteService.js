const User = require('../models/User');

const changeNote = async (userId, movieId, note) => {

   return await User.updateOne({_id: userId, 'favouriteMovies.id': movieId}, 
   {'favouriteMovies.$.notes': note});
}

const deleteNote = async (userId, movieId) => {
    return await User.updateOne({_id: userId, 'favouriteMovies.id': movieId}, 
    {'favouriteMovies.$.notes': ''});
}

module.exports = {
    changeNote,
    deleteNote
}