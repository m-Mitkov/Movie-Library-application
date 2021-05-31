const { Router } = require('express');

const { JWT_TOKEN, USER_CREDENTIALS } = require('../config/config');
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
        res.json({ error: error.message });
    }
});

router.get('/logout', (req, res) => {
    try {
        res.removeHeader(JWT_TOKEN);
        res.removeHeader(USER_CREDENTIALS);
        res.status(200).json('Successfully logged out!');

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'You cannot perform this action' });
    }
});


module.exports = router;