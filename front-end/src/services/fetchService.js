
export function fetchServiceGET (url, credentials, data) {

    return fetch(url, {
        method: 'GET',
        'x-auth-token': credentials,
    })
    .then(res => res.json());
}

export function fetchServicePOST (url, credentials, data) {

    return fetch(url, {
        method: 'POST',
        'x-auth-token': credentials,
        body: data
    })
    .then(res => res.json());
}

export function fetchServicePOSTnoCredentials (url, data) {

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json());
}

export function fetchServiceDELETE (url, credentials, data) {

    return fetch(url, {
        method: 'DELETE',
        'x-auth-token': credentials,
    })
    .then(res => res.json());
}