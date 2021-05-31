import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import style from './MovieCard.module.css'

const MovieCard = (props) => {

    const history = useHistory();

    const getMovieDetails = (e) => {
       const movieID = e.target.getAttribute('movieId');
        history.push(`/details/${movieID}`)
    }

    return (
        <Card className={style.root} onClick={getMovieDetails}>
            <CardActionArea className={style.test}>
                <CardMedia
                    movieId={props.movie.id}
                    component="img"
                    alt={props.movie.name}
                    height="210"
                    width="150"
                    image={props.movie.image.original}
                    className={style.movieCard}
                />
            </CardActionArea>
        </Card>
    );
}

export default MovieCard;