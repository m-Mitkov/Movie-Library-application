import { useRef, useContext } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';

import style from './Navbar.module.css';
import { Button } from '@material-ui/core'
import { BASE_URL, LOGOUT } from '../../consts/endPointsAPI';
import { fetchServiceGETnoCredentials } from '../../services/fetchService';
import { Context } from '../../Store/Store';
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION, LOGOUT_SUCCESS } from '../../actions/types';

const Navbar = () => {

    const { auth, notification } = useContext(Context);
    const [user, authDispatch] = auth;
    const [notify, notifyDispatch] = notification;

    const history = useHistory();
    const searchDataRef = useRef();

    const onSearchHandler = (e) => {
        e.preventDefault();
        
        const searchParam = searchDataRef.current.value;
        searchDataRef.current.value = '';

        history.push(`/search/${searchParam}`);
    }

    const handleLogout = () => {
        fetchServiceGETnoCredentials(BASE_URL + LOGOUT)
            .then((res) => {

                authDispatch({ type: LOGOUT_SUCCESS });
                notifyDispatch({ type: SUCCESS_NOTIFICATION, payload: { message: res } });
                history.push('/');

            })
            .catch(err => {
                notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: 'Please try again!' } })
            });
    }

    return (
        <div className={style.navbar}>
            <Link to='/'>
                <span className={style.title}>My Movie Collection</span>
            </Link>

            {
                user.username
                    ?
                    <div className={style.logout}>
                        <Button variant="outlined" color="primary"
                            onClick={handleLogout}>
                            Logout</Button>
                    </div>

                    : ''
            }

            <form className={style.inputForm}>

                <input type="text" ref={searchDataRef}
                    className={style.inputData}
                    placeholder="Search by movie title..."
                />

                <Button variant="outlined"
                    type="submit"
                    color="primary"
                    onClick={onSearchHandler}
                >
                    Search</Button>


            </form>
        </div>
    );

}

export default Navbar;