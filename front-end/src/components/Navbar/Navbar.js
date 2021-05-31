import { useRef, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import style from './Navbar.module.css';
import { Button } from '@material-ui/core'
import { BASE_URL, LOGOUT } from '../../consts/endPointsAPI';
import { fetchServiceGET } from '../../services/fetchService';
import { Context } from '../../Store/Store';
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION, LOGOUT_SUCCESS } from '../../actions/types';

const Navbar = () => {

    const { auth, notification } = useContext(Context);
    const [user, authDispatch] = auth;
    const [notify, notifyDispatch] = notification;

    const history = useHistory();
    const inputRef = useRef();

    const onClickHandler = () => {
        const searchParam = inputRef.current.value;

        history.push({
            pathname: `/search/${searchParam}`,
            state: { searchData: searchParam }
        })
    }

    const handleLogout = () => {
        fetchServiceGET(BASE_URL + LOGOUT, '', '')
        .then( (res) => {

            authDispatch({type: LOGOUT_SUCCESS});
            notifyDispatch({type: SUCCESS_NOTIFICATION, payload: {message: res}})
            history.push('/');

        })
        .catch(err => {
            notifyDispatch({type: ERROR_NOTIFICATION, payload: {message: 'Please try again!'}})
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

                <input type="text" ref={inputRef}
                    className={style.inputData}
                    placeholder="Search by movie title..."
                />

                <Button variant="outlined"
                    color="primary"
                    onClick={onClickHandler}
                >
                    Search</Button>


            </form>
        </div>
    );

}

export default Navbar;