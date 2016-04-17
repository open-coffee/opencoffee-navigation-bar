/**
 * Returns the information behind the given url as plain text.
 * If you want this information as json then you have to call
 *
 * getIt(<url>).then(JSON.parse).then((jsonData) => { <your code> });
 *
 * @param url to get information from
 * @returns {Promise}
 */
function getIt(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

export default getIt;