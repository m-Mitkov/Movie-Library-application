import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import style from './Register.module.css'
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../../../actions/types';
import { Context } from '../../../Store/Store';
import { BASE_URL, REGISTER_USER } from '../../../consts/endPointsAPI';
import { fetchServicePOSTnoCredentials } from '../../../services/fetchService';


const Register = () => {

    const history = useHistory();

    const { auth, notification } = useContext(Context);
    const [, notifyDispatch] = notification;

    const submitData = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;
        const rePassword = e.target.rePassword.value;

        if (password !== rePassword) {
            notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: 'Password must match each other!' } });
        }
        else {
            fetchServicePOSTnoCredentials( BASE_URL + REGISTER_USER ,{username, password, rePassword})
                .then(res => {

                    if (res.error) throw new Error(res.error)

                    notifyDispatch({ type: SUCCESS_NOTIFICATION, payload: { message: 'Successfull registration!' } })
                    history.push('/');
                })
                .catch(err => {
                    notifyDispatch({ type: ERROR_NOTIFICATION, payload: { message: err.message } });
                });
        }
    }

    return (
        <>
            <h1>Sign up</h1>
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <div className={style.paper}>
                    <Avatar className={style.avatar}>
                    </Avatar>

                    <form className={style.form} noValidate onSubmit={submitData}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} s>
                                <TextField
                                    autoComplete="fname"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    // onBlur={handleChange}
                                    autoFocus
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    // onBlur={handleChange}
                                    autoComplete="current-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="rePassword"
                                    label="Repeat Password"
                                    type="password"
                                    id="rePassword"
                                    // onBlur={handleChange}
                                    autoComplete="rePassword"
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={style.submit}
                        >
                            Sign Up
      </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
          </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                {/* <Box mt={5}>
            </Box> */}
            </Container>
        </>
    );

}

export default Register;