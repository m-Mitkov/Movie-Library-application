const { Router } = require('express');

const { JWT_TOKEN } = require('../config/config');
const { register, login } = require('../services/authService');

const router = Router();

router.post('/register', async (req, res) => {
    try {
        await register(req.body);
        res.json('User successfully registered!');
        
    } catch (error) {
        // FS error Logger
        console.log(error.message);
        res.json({ error: error })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { token, userCredentials } = await login(req.body);
        res.json({ [JWT_TOKEN]: token, userCredentials: userCredentials });
        
    } catch (error) {
        // FS error Logger
        console.log(error.message);
        res.json({ error: error })
    }
});


module.exports = router;