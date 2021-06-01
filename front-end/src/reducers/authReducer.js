import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SUCCESS_ADD_MOVIE_FAVOURITES } from '../actions/types';

function authReducer(state, action) { // always return new state!!! create new reference, do not change old one
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            const { _id, username, favouriteMoviesIds } = { ...payload.userCredentials };
            const xAuthToken = payload.token;

            return {
                ...state,
                username: username,
                _id: _id,
                favouriteMovies: favouriteMoviesIds,
                'token': xAuthToken
            };

        case LOGOUT_SUCCESS:
            return state = {};

        case SUCCESS_ADD_MOVIE_FAVOURITES:
            const { favouriteMovies } = { ...payload.userCredentials };

            return {
                ...state,
                favouriteMovies: favouriteMovies,
            }

        default: return state;
    }
}

export {
    authReducer
};