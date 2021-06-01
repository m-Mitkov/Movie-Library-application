import { useHistory } from 'react-router';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import style from './MovieCardTemplate.module.css';

const MovieCardTemplate = ({
    movie,
}) => {

    const history = useHistory();
    
    const showMovieDetails = (e) => {
        const movieId = e.currentTarget.getAttribute('movieId');
        history.push(`/details/${movieId}`);
    }

    return (
        <div className={style.dataWrapper}>
            <Card className={style.root} >
                <CardActionArea className={style.test}>
                    <CardMedia
                        component="img"
                        alt={movie?.title}
                        image={movie?.image?.original}
                        style={{ height: '15rem', width: '10rem' }}
                        movieId={movie?.id}
                        onClick={showMovieDetails}
                    />
                </CardActionArea>
            </Card>

            <h1 className={style.title}>{movie?.name}</h1>

            <div className={style.genres}>{movie?.genres?.join(' ')} | {movie?.averageRuntime} minutes</div>

            <br></br>
            <br></br>
            <br></br>
            <div><p className={style.summary} >{movie?.summary}</p></div>

            <span> <a href={movie?.officialSite} 
            target="_blank" 
            rel="noopener noreferrer"
            className={style.officialSite}>
                Official site</a> </span>
            <br></br>
        </div>
    );
}

export default MovieCardTemplate;