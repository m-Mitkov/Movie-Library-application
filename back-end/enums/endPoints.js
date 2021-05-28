module.exports = {
    BASE_URL: 'https://api.tvmaze.com',
    GET_MOVIE_BY_ID: (id) => `/shows/${id}`,
    SHOW_SEARH_BY_QUERY: (param) => `/search/shows?q=${param}`,
}

