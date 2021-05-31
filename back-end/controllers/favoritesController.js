const { Router } = require('express');

const  { addToFavorites } = require('../services/userService');
const { getFavoriteMovies, deleteMovieFromFavorites, getMovieById } = require('../services/movieService');
const router = Router();

router.get('/:page', async (req, res) => {
    try {
        const userId = res.locals.token._id;
        const page = req.params.page;
     
        const movies = await getFavoriteMovies(userId, page);
        
        res.send(JSON.stringify(movies));

    } catch (error) {
        console.log(error);
        res.json({error: 'Something went wrong, please try again later!'});
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const userId = res.locals.token._id;
        const idMovie = req.params.id;
     
        const movie = await getMovieById(userId, idMovie);
        
        res.send(JSON.stringify(movie));

    } catch (error) {
        console.log(error);
        res.json({error: 'Something went wrong, please try again later!'});
    }
});

router.post('/:id', async (req, res) => {
    try {
        const userId = res.locals.token._id;
        const movieIdAPI = req.params.id;

        await addToFavorites(userId, movieIdAPI);

        res.json('You have successfully added the movie to your favorite playlist!')

    } catch (error) {
        console.log(error);
        res.json({error: 'You have already added this movie to your favorites one!'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = res.locals._id;
        const movieId = req.params.id;
        
        await deleteMovieFromFavorites(userId, movieId);
        res.json('Movie successfully removed from favourites collection!');

    } catch (error) {
        console.log(error);
        res.json({error: 'Something went wrong, please try again later!'});
    }
});

module.exports = router;