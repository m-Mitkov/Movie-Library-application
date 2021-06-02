import { useState, useEffect, useContext } from 'react';

import { Pagination } from '@material-ui/lab';

import style from './HomePage.module.css';
import MovieCard from './MovieCard';
import { fetchServiceGET } from '../../services/fetchService';
import { BASE_URL, GET_FAVORITE_MOVIES } from '../../consts/endPointsAPI';
import Login from '../auth/Login/Login';
import { Context } from '../../Store/Store';
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../../actions/types';

const HomePage = () => {

    const { auth, notification } = useContext(Context);
    const [, notifyDispatch] = notification;
    const [user] = auth;

    const [page, setPage] = useState(1);
    const [movie, setMovie] = useState();

    const handlePageChange = (e, value) => {
        setPage(value);
    }

    useEffect(() => {
        fetchServiceGET(BASE_URL + GET_FAVORITE_MOVIES + `${page}`, user.token)
            .then(res => {

                if(res.error) throw new Error(res.error);

                setMovie(res);
            })
            .catch(err => {
                notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
            });

    }, [page, movie, user])
    
    if (user.username) {
        return (
            <div className={style.container}>
                <div className={style.welcomePart}>
                    <img
                        src="https://cdn.hipwallpaper.com/i/99/92/iwIYUQ.jpg"
                        className={style.welcomeImg}
                    />
                </div>

                <div className={style.moviesPreview}>
                    <h1>Your favourites</h1>

                    <div className={style.movieCardContainer}>
                        {
                            movie?.length > 0
                            ? movie.map(x => {
                               return <MovieCard key={x.id} movie={x} />
                            })
                            : <h1>There are no movies currently in your favourite list!</h1>
                        }
                    </div>

                        <Pagination count={5} 
                            page={1}
                            className={style.paging}
                            onChange={handlePageChange}
                        />
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={style.container}>

                <div className={style.authSide}>
                    <Login />
                </div>

                <div className={style.welcomePart}>
                    <img
                        src="https://cdn.hipwallpaper.com/i/99/92/iwIYUQ.jpg"
                        className={style.welcomeImg}
                    />
                </div>
            </div>
        );
    }
}

export default HomePage;