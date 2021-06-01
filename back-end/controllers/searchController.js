const { Router } = require('express');

const { getMovieByQuery } = require('../services/searchService');

const router = Router();

router.get('/:data', async (req, res) => {
    try {
        const searchParam = req.params.data;

        const movies = await getMovieByQuery(searchParam);
        res.json(movies);

    } catch (error) {
        console.log(error);
        res.json({ error: 'Data currently unavaliable!' });
    }
});

module.exports = router;