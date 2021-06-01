const { Router } = require('express');

const isAuth = require('./middlewares/isAuth');

const favoriteAPIController = require('./controllers/favoritesController');
const ratingController = require('./controllers/ratingController');
const authController = require('./controllers/authController');
const noteController = require('./controllers/noteController');
const searchController = require('./controllers/searchController');
const movieController = require('./controllers/movieController');

const router = Router();

router.use('/auth', authController);
router.use('/favorites', isAuth, favoriteAPIController);
router.use('/rating', isAuth, ratingController);
router.use('/notes', isAuth, noteController);
router.use('/search', searchController);
router.use('/movie', movieController);

module.exports = router;