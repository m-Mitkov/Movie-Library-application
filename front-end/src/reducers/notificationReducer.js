import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION, TERMINATE_NOTIFICATION,
    SUCCESS_CREATE_ANNOUNCEMENT } from '../actions/types';
import { SUCCESS, ERROR } from '../consts/typeNotifications';

function notificationReducer(state, action) {
    const { type, payload } = { ...action };
    
    switch (type) {

        case SUCCESS_NOTIFICATION:
            return {
                ...state,
                active: !state.active,
                type: SUCCESS,
                message: payload.message
            };

        case ERROR_NOTIFICATION:
            return {
                ...state,
                active: !state.active,
                type: ERROR,
                message: payload.message
            };

        case TERMINATE_NOTIFICATION:
            return {
                ...state,
                active: false,
                type: '',
                message: ''
            }

            case SUCCESS_CREATE_ANNOUNCEMENT:
                return {
                    ...state,
                    active: !state.active,
                    type: SUCCESS,
                    message: 'Announcement successfully created!'
                }

        default: return state;
    }
}

export {
    notificationReducer
};