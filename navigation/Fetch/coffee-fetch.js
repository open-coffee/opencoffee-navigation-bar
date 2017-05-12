/* eslint new-cap: ["warn", { "capIsNewExceptions": ["GET", "GET_JSON"] }] */

/**
 * Returns the information behind the given url as plain text.
 * If you want this information as json then you have to call
 *
 * GET (<url>).then (textData => { <your code> });
 * GET (<url>, { 'Accept': 'application/json' }).then (jsonData => { <your code> });
 *
 * @param url to get information from
 * @returns {Promise}
 */
export function GET (url, headers = {}) {
    const options = {
        headers,
        credentials: 'include',
        method: 'GET',
    };

    return fetch (url, options)
        .then (response => verify (response))
        .then (response => unzip (response));
}

/**
 * Returns the information behind the given url as parsed json object.
 *
 * GET_JSON (<url>).then (jsonData => { <your code> });
 *
 * @param url to get information from
 * @returns {Promise}
 */
export function GET_JSON (url) {
    return GET (url, {
        Accept: 'application/json',
    });
}

function unzip (response) {
    return isJsonContent (response) ? response.json () : response.text ();
}

function verify (response) {
    return isOk (response) ? response : Promise.reject (response);
}

function isOk ({ status }) {
    return status >= 200 && status < 300;
}

function isJsonContent ({ headers }) {
    return /application\/json/.test (headers.get ('Content-Type'));
}
