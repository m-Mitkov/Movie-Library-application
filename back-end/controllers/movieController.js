const {Router } = require('express');

const movieService = require('../services/movieService');

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
       const movie =  await movieService.getMovieByIdForGuest( movieId);
        res.json(movie);

    } catch (error) {
        console.log(error);
        res.json({error: 'Something went wrong, please try again later!'});
    }
});

module.exports = router;