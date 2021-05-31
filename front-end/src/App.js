import { Fragment, useContext } from 'react';

import './App.css';

import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import SearchPage from './components/SearchPage/SearchPage';
import HomePage from './components/HomePage/HomePage';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import NotoficationMessage from './components/NotificationMessage/NotificationMessage';
import MovieCardDetails from './components/MovieCardDetails/MovieCardDetails';

import { Context } from './Store/Store';
import { TERMINATE_NOTIFICATION } from './actions/types';

function App() {

  const { auth, notification } = useContext(Context);

  const [user] = auth;
  const [notify, notifyDispatch] = notification;

  if (notify.active) {
    setTimeout(() => {
      notifyDispatch({ type: TERMINATE_NOTIFICATION })
    }, 1500);
  }

  return (
    <div className="App">

      <Navbar />

      {
        notify.active
          ? <NotoficationMessage type={notify.type} message={notify.message} />
          : ''
      }

      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path="/search/:param" component={SearchPage} />
        <Route path="/details/:id" component={MovieCardDetails} />
      </Switch>

    </div>
  );
}

export default App;
