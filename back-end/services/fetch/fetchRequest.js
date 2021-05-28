const fetch = require('node-fetch');

const fetchData = async (URL) => {
    
    return fetch(URL, {
        method: 'GET',
    })
    .then(res => res.json());
}

module.exports = {
    fetchData,
}