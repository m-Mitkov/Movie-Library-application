import { createContext, useReducer, useState } from 'react';

import { authReducer } from '../reducers/authReducer';
import { notificationReducer } from '../reducers/notificationReducer';

export const Context = createContext();

export const Store = (props) => {

    const [auth, authDispatch] = useReducer(authReducer, {
        username: '',
        _id: '',
        'x-auth-token': ''
    })

    const [notify, notifyDispatch] = useReducer(notificationReducer, {
        active: false,
        type: '',
        message: ''
    })
    
    return (
        <Context.Provider value={{
            auth: [auth, authDispatch],
            notification: [notify, notifyDispatch]
        }}>

            {props.children}

        </Context.Provider>
    );
}

   