import { useState, useContext } from 'react';
import { useHistory } from 'react-router';

import Button from '@material-ui/core/Button';

import style from './SearchPage.module.css'
import MovieCardTemplate from '../MovieCardTemplate/MovieCardTemplate';
import { BASE_URL, GET_MOVIE_BY_SEARCH, MOVIE_FAVORITES } from '../../consts/endPointsAPI';
import { fetchServiceGETnoCredentials, fetchServicePOST, fetchServiceDELETE } from '../../services/fetchService';
import { Context } from '../../Store/Store';
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION,
     SUCCESS_ADD_MOVIE_FAVOURITES,  SUCCESS_REMOVE_MOVIE_FAVOURITES } from '../../actions/types';

const SearchPage = ({
    match
}) => {
    const searchParam = match.params.param;

    const history = useHistory();

    const { auth, notification } = useContext(Context);
    const [user, authDispatch] = auth;
    const [notify, notifyDispatch] = notification;
    const favouriteMoviesIds = user.favouriteMovies;

    const [urlParam, setUrlParam] = useState();
    const [searchResult, setSearchResult] = useState();

    if (searchParam !== urlParam) {
        setUrlParam(searchParam);
    }

    useState(() => {
        fetchServiceGETnoCredentials(BASE_URL + GET_MOVIE_BY_SEARCH(searchParam))
            .then(res => {
                if (res.error) throw new Error(res)
                setSearchResult(res);
            })
            .catch(err => {
                notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
            });
    }, [])

    const addToFavouritesHandler = (e) => {
        const idMovie = e.currentTarget.getAttribute('movieId');

        fetchServicePOST(BASE_URL + MOVIE_FAVORITES(idMovie), user.token)
            .then(res => {
                if (res.error) throw new Error(res)

                favouriteMoviesIds.push(idMovie);
              
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
                history.push(`/search/${idMovie}`);
            })
            .catch(err => {
                notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
            });

    }

    const removeFromFavouritesHandler = (e) => {
        const idMovie = e.currentTarget.getAttribute('movieId');
        fetchServiceDELETE(BASE_URL + MOVIE_FAVORITES(idMovie), user.token)
        .then(res => {
            if (res.error) throw new Error(res)

                authDispatch({
                    type: SUCCESS_REMOVE_MOVIE_FAVOURITES,
                    payload: { movieId: idMovie }
                });

                notifyDispatch({
                    type: SUCCESS_NOTIFICATION,
                    payload: { message: 'Movie successfully removed from your favorite list!' }
                });
            })
            .then(() => {
                history.push(`/search/${searchParam}`);
            })
            .catch(err => {
                notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
            });
    }

    const showMovieDetails = (e) => {
        const movieId = e.currentTarget.getAttribute('movieId');
        history.push(`/details/${movieId}`);
    }

    return (
        <div>
            {
                searchResult?.map(x => {
                    return (
                        <div className={style.wrapper}>
                            <MovieCardTemplate
                                movie={x.show}
                                userFavourites={favouriteMoviesIds}
                                key={x.show.id}
                                movieid={x.show.id}
                                onClick={showMovieDetails}
                            />

                            {
                                user.username
                                    ?
                                    favouriteMoviesIds?.includes(x.show.id.toString())
                                        ?
                                        <Button variant="outlined"
                                            color="primary"
                                            className={style.buttonRemoveFavorites}
                                            style={{ marginLeft: '5rem', float: 'left' }}
                                            movieid={x.show.id}
                                            onClick={removeFromFavouritesHandler}

                                        >
                                            Remove from Favourites 
                                             </Button>

                                        :
                                        <Button variant="outlined"
                                            color="primary"
                                            className={style.buttonRemoveFavorites}
                                            style={{ marginLeft: '5rem', float: 'left' }}
                                            onClick={addToFavouritesHandler}
                                            movieid={x.show.id}

                                        >
                                            Add to favorites
                                           </Button>

                                    : ''
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SearchPage;







