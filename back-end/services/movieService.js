const { fetchData } = require('./fetch/fetchRequest');
const { BASE_URL, GET_MOVIE_BY_ID } = require('../enums/endPoints');

const User = require('../models/User');

async function getFavoriteMovies(idUser) {
    const user = await User.findById(idUser);
    const allMovies = {};

    for (let i = 0; i < user.favouriteMovies.length; i++) {
        const currentMovieId = user.favouriteMovies[i].id;

        const movie = await fetchData(BASE_URL + GET_MOVIE_BY_ID(currentMovieId));
        const movieDataPlusExtraProps = Object.assign(movie, user.favouriteMovies[i]);

        allMovies[currentMovieId] = movieDataPlusExtraProps;
    }

    return await allMovies;
}

async function deleteMovieFromFavorites(userId, movieId) {

    const a = await User.findOne({ _id: { '$eq': userId } });
    
    a.favouriteMovies.forEach((x, index) => {

        if(x.id == movieId){
          a.favouriteMovies.splice(index, 1);
        }
    });

    return await a.save();
}

module.exports = {
    // createMovie,
    getFavoriteMovies,
    deleteMovieFromFavorites
}


