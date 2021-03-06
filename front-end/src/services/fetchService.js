
export function fetchServiceGET(url, credentials) {

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'token': credentials,
        },
    })
        .then(res => res.json());
}

export function fetchServiceGETnoCredentials(url) {

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then(res => res.json());
}

export function fetchServicePOST(url, credentials, data) {

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'token': credentials,
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json());
}

export function fetchServicePOSTnoCredentials(url, data) {

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json());
}

export function fetchServiceDELETE(url, credentials) {

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'token': credentials,
        }
    })
        .then(res => res.json());
}