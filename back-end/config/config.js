
const config = {

    development: {
        PORT: 7777,
        DB_CONNECTION: 'mongodb://localhost/movie-library',
        SECRET: 'makeItGreatAgain',
        AUTH_COOKIE_JWT: 'x-auth-token',
        USER_CREDENTIALS: 'user-credentials',
        SALT_ROUNDS: 9,
    }
}

module.exports = config[process.env.NODE_ENV.trim()];