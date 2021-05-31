export const BASE_URL = 'http://localhost:7777/api';

export const GET_MOVIE_BY_SEARCH = (data) =>  `/search/${data}`;
export const GET_FAVORITE_MOVIES = '/favorites/';
export const GET_MOVIE_BY_ID = (id) => `/favorites/id/${id}`;

export const REGISTER_USER = '/auth/register';
export const LOGIN_USER = '/auth/login';
export const LOGOUT = '/auth/logout'; 