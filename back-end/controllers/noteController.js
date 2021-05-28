const {Router } = require('express');

const noteService = require('../services/noteService');

const router = Router();

// router.get('/' , (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// });

router.post('/:id' , async (req, res) => {
    try {
        const userId = res.locals._id;
        const movieId = req.params.id;
        const note = req.body.note;

        await noteService.changeNote(userId, movieId, note);
        res.json('Movie note successfully updated!');

    } catch (error) {
        console.log(error);
        res.json({error: 'Something went wrong, please try again later!'});
    }
});

router.delete('/:id' , async (req, res) => {
    try {
        const userId = res.locals._id;
        const movieId = req.params.id;

        await noteService.changeNote(userId, movieId);
        res.json('Movie note successfully removed!');

    } catch (error) {
        console.log(error);
        res.json({error: 'Something went wrong, please try again later!'});
    }
});

module.exports = router;