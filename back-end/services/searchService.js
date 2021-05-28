const fetchService = require('./fetch/fetchRequest');
const { BASE_URL, SHOW_SEARH_BY_QUERY } = require('../enums/endPoints');

const getMovieByQuery = async (param) => {

    return await fetchService.fetchData(BASE_URL + SHOW_SEARH_BY_QUERY(param), 'GET');
}   

module.exports = {
    getMovieByQuery
}