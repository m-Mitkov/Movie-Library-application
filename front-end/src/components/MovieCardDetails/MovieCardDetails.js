import { useEffect, useContext, useState } from 'react';

import Button from '@material-ui/core/Button';
import { Rating } from '@material-ui/lab'

import style from './MovieCardDetails.module.css';
import MovieCardTemplate from '../MovieCardTemplate/MovieCardTemplate';
import { fetchServiceGET, fetchServicePOST, fetchServiceDELETE, fetchServiceGETnoCredentials } from '../../services/fetchService';
import { Context } from '../../Store/Store';
import {
    BASE_URL, GET_MOVIE_BY_ID, RATE_MOVIE,
    CHANGE_NOTE, GET_MOVIE, GET_MOVIE_ID_GUEST, MOVIE_FAVORITES
} from '../../consts/endPointsAPI';
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION, SUCCESS_ADD_MOVIE_FAVOURITES } from '../../actions/types';

const MovieCardDetails = ({
    match,
    history
}) => {
    const idMovie = match.params.id;

    const { auth, notification } = useContext(Context);
    const [user, authDispatch] = auth;

    const [, notifyDispatch] = notification;
    const favouriteMoviesIds = new Set(user.favouriteMovies);


    const [movie, setMovie] = useState();

    useEffect(async () => {

        if (user.username) {
            fetchServiceGET(BASE_URL + GET_MOVIE_BY_ID(idMovie), user.token)
                .then(res => {
                    if (res.error) throw new Error(res.error)

                    setMovie(res);
                })
                .catch(err => {
                    notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
                });
        }

        else {
            fetchServiceGETnoCredentials(BASE_URL + GET_MOVIE_ID_GUEST(idMovie))
                .then(res => {
                    if (res.error) throw new Error(res.error)

                    setMovie(res);
                })
                .catch(err => {
                    notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
                });
        }
    }, []);

    const ratingHandler = (e) => {
        const rating = e.target.value;

        fetchServicePOST(BASE_URL + RATE_MOVIE(movie.id), user.token, { rating: rating })
            .then(res => {
                if (res.error) throw new Error(res)

                setMovie({ ...movie, rating: rating });
                notifyDispatch({ type: SUCCESS_NOTIFICATION, payload: { message: res } });

            })
            .catch(err => {
                notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
            });
    }

    const changeNoteHandler = (e) => {
        const noteValue = e.target.value;

        fetchServicePOST(BASE_URL + CHANGE_NOTE(movie.id), user.token, { note: noteValue })
            .then(res => {
                if (res.error) throw new Error(res)

                setMovie({ ...movie, notes: noteValue });
                notifyDispatch({ type: SUCCESS_NOTIFICATION, payload: { message: res } });
            })
            .catch(err => {
                notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
            });
    }

    const removeFromFavoritesHandler = (e) => {
        fetchServiceDELETE(BASE_URL + GET_MOVIE(movie.id), user.token)
            .then(res => {
                if (res.error) throw new Error(res)

                notifyDispatch({ type: SUCCESS_NOTIFICATION, payload: { message: res } });
            })
            .then(() => history.push('/'))
            .catch(err => {
                notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
            });
    }
    
    const addToFavouritesHandler = (e) => {

        fetchServicePOST(BASE_URL + MOVIE_FAVORITES(movie.id), user.token)
            .then(res => {
                if (res.error) throw new Error(res)

                favouriteMoviesIds.add(idMovie);

                authDispatch({
                    type: SUCCESS_ADD_MOVIE_FAVOURITES,
                    payload: { favouriteMovies: favouriteMoviesIds }
                });

                notifyDispatch({
                    type: SUCCESS_NOTIFICATION,
                    payload: { message: 'Movie successfully added to your favorite list!' }
                });
            })
            .then(() => {
                history.push(`/`);
            })
            .catch(err => {
                notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
            });

    }

    return (
        <>

            <MovieCardTemplate movie={movie} />
            {
                user.username && favouriteMoviesIds.has(movie?.id.toString())
                    ?
                    <section className={style.section}>

                        <div className={style.review}>

                            <h2 className={style.reviewHeader}>Your Review</h2>

                            <Rating name="rating"
                                value={movie?.rating || 0}
                                precision={0.5}
                                style={{ float: 'left' }}
                                onChange={(e) => ratingHandler(e)}
                            />
                        </div>

                        <div>
                            <Button variant="outlined"
                                color="primary"
                                className={style.buttonRemoveFavorites}
                                style={{ marginLeft: '5rem', float: 'left' }}
                                onClick={removeFromFavoritesHandler}
                            >
                                Remove from Favourites
                                </Button>
                        </div>
                        <br></br>
                        <br></br>

                        <p> <textarea
                            rows="10"
                            cols="70"
                            defaultValue={movie?.notes}
                            className={style.notes}
                            onBlur={changeNoteHandler}
                        /> </p>

                    </section>

                    :
                    user.username
                        ?
                        <div>
                            <Button variant="outlined"
                                color="primary"
                                className={style.buttonRemoveFavorites}
                                style={{ marginLeft: '5rem', float: 'left' }}
                                onClick={addToFavouritesHandler}
                            >
                                Add to Favourites
                        </Button>
                        </div>

                        : ''

            }
        </>
    );
}

export default MovieCardDetails;