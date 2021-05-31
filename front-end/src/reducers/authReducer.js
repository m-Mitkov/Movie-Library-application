import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/types';

function authReducer(state, action) { // always return new state!!! create new reference, do not change old one
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            
            const {  _id, username } = { ...payload.userCredentials };
            const xAuthToken = payload.token;

            return {
                ...state, username: username, _id: _id,
                'token': xAuthToken
            };

            case LOGOUT_SUCCESS: 
            return state = {};

        default: return state;
    }
}

export {
    authReducer
};