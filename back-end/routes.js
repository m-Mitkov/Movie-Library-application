const { Router } = require('express');

const favoriteAPIController = require('./controllers/favoritesController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/auth', authController);
// router.use('/search', )
router.use('/favorites', favoriteAPIController);

module.exports = router;