
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import style from './Login.module.css';
import { BASE_URL, LOGIN_USER } from '../../../consts/endPointsAPI';
import { fetchServicePOSTnoCredentials } from '../../../services/fetchService';
import { Context } from '../../../Store/Store';
import { LOGIN_SUCCESS, SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../../../actions/types';

const Login = () => {

    const history = useHistory();

    const { auth, notification } = useContext(Context);
    const [user, authDispatch] = auth;
    const [, notifyDispatch] = notification;

    const handleSbmit = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value

        const submitData = {
            username: username,
            password: password
        };

        fetchServicePOSTnoCredentials(BASE_URL + LOGIN_USER, submitData)
        .then(res => {
            
            if (res.error) throw new Error(res.error);
                authDispatch({type: LOGIN_SUCCESS, payload: res});
                notifyDispatch({type: SUCCESS_NOTIFICATION, payload: {message: 'Successfull login!'}});
        })
        .then(() => history.push('/'))
        .catch(err => {
            notifyDispatch({type: ERROR_NOTIFICATION, payload: {message: err.message}});

        });
    }

    if(user.username){
        history.push('/');
    }

    return (
        <>
            <h1>Sign in</h1>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={style.paper}>
                    <Avatar className={style.avatar}>
                    </Avatar>

                    <form className={style.form} noValidate onSubmit={handleSbmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={style.submit}
                        >
                            Sign In
          </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );

}

export default Login;