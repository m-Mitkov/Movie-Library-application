const User = require('../models/User');

const addToFavorites = async (userId, movieId) => {
    const user = await User.findById({ _id: userId });

    let isMovieInFavourites = false;

    for (let i = 0; i < user.favouriteMovies.length; i++) {

        Object.entries(user.favouriteMovies[i]).forEach(y => {

            if(y[0] === 'id' && y[1] == movieId ){
                isMovieInFavourites = true;
            }
        });
    }

    const movie = {
        id: movieId,
        rating: '',
        notes: ''
    }

    if (!isMovieInFavourites) {
        return await user.updateOne({ $push: { 'favouriteMovies': movie } });
    }
    else {
        throw ({ error: 'You have already added this movie to your favorite ones!' });
    }
}

module.exports = {
    addToFavorites,
}
