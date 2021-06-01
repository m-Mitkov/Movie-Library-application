const { fetchData } = require('./fetch/fetchRequest');
const { BASE_URL, GET_MOVIE_BY_ID } = require('../enums/endPoints');

const User = require('../models/User');

async function getFavoriteMovies(idUser, page) {
    const movieXpage = 5;
    page--;
    const skipNmovies = page * movieXpage;

    const user = await User.findById(idUser);
    const allMovies = [];

    for (let i = skipNmovies; i < skipNmovies + movieXpage; i++) {
        const currentMovieId = user.favouriteMovies[i]?.id;

        if (!currentMovieId) {
            break;
        }

        const movie = await fetchData(BASE_URL + GET_MOVIE_BY_ID(currentMovieId));

        const movieDataPlusExtraProps = Object.assign(movie, user.favouriteMovies[i]);

        allMovies.push(movieDataPlusExtraProps)
    }

    return await allMovies;
}

async function deleteMovieFromFavorites(userId, movieId) {

    const a = await User.findOne({ _id: { '$eq': userId } });

    a.favouriteMovies.forEach((x, index) => {

        if (x.id == movieId) {
            a.favouriteMovies.splice(index, 1);
        }
    });

    return await a.save();
}

async function getMovieById(userId, id) {
    // const a =  await User.findOne({_id: userId, }, { 'favouriteMovies.id':  id })
    let user =  await User.findById(userId);

    // if(!user){
    //     return await fetchData(BASE_URL + GET_MOVIE_BY_ID(id))
    // }

    let movie = '';

    for (let i = 0; i < user.favouriteMovies.length; i++) {
        if(user.favouriteMovies[i].id == id){
            movie = user.favouriteMovies[i]
            break;
        }
    }

    const movieDataFromApi = await fetchData(BASE_URL + GET_MOVIE_BY_ID(id))

    return Object.assign(movieDataFromApi, movie);
}

async function getMovieByIdForGuest( id) {

    return await fetchData(BASE_URL + GET_MOVIE_BY_ID(id))
}

module.exports = {
    getMovieById,
    getFavoriteMovies,
    deleteMovieFromFavorites,
    getMovieByIdForGuest
}


