const {Router } = require('express');

const ratingService = require('../services/ratingService');

const router = Router();

// router.get('/', (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// });

router.post('/:id', async (req, res) => {
    try {
        const userId = res.locals._id;
        const movieId = req.params.id;
        const rating = req.body.rating;
        
         await ratingService.changeRating(userId, movieId, rating);
         res.json('Movie successfully updated!');

    } catch (error) {
        console.log(error);
        res.json({error: 'Something went wrong, please try again later!'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = res.locals._id;
        const movieId = req.params.id;
        await ratingService.deleteRating(userId, movieId);

        res.json('Rating sucessfully deleted!');

    } catch (error) {
        console.log(error);
        res.json({error: 'Something went wrong, please try again later!'});
    }
});

module.exports = router;