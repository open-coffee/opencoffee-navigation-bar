/* eslint new-cap: ["error", { "capIsNewExceptions": ["GET", "GET_JSON"] }] */

import 'whatwg-fetch';
import { GET, GET_JSON } from 'coffee-fetch';
import gravatarUrl from 'gravatar-url';
import navbar from './Navbar/Navbar';
import styles from './Navbar/navbar.css';


const fetchUsername = GET_JSON('/coffeenet/user')
    .then(user => user.username);

const fetchApps = GET_JSON('/coffeenet/apps')
    .then(data => {
        const apps = [].slice.call(data);

        if (apps.length === 0) {
            console.info('CoffeeNet: No application discovered');
            return [
                { name: 'No other applications registered', url: '' },
            ];
        }

        apps.sort(compareByName);
        return apps;
    })
    .catch((err) => {
        console.info('CoffeeNet: Could not receive discovered applications', err);
        return Promise.resolve([
            { name: 'Could not receive CoffeeNet applications', url: '' },
        ]);
    });

GET('/webjars/@project.artifactId@/css/navigation.css', { Accept: 'text/css' })
    .then(css => {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.querySelector('head').appendChild(style);
    });


Promise.all([
    fetchUsername,
    fetchApps,
]).then(values => {
    const [username, apps] = values;
    const header = document.getElementById('coffeenet-header');
    header.classList.add(styles.headerContainer);
    header.innerHTML = navbar({ username, apps });
    document.getElementById('coffee-nav-hamburger').addEventListener('click', () => {
        header.classList.toggle(styles.visible);
    });

    const avatarImg = document.createElement('img');
    avatarImg.src = gravatarUrl(guessEmail(username), { size: 64 });
    avatarImg.onError = function avatarFetchError() {
        avatarImg.src = ''; // TODO copy anon_img in dist and set as src
    };
    document.getElementById('coffee-nav-user-avatar').appendChild(avatarImg);
});

function guessEmail(name) {
    const parts = name.split(/\s+/);
    const lastname = parts[parts.length - 1];
    const lastnameEscaped = withoutUmlauts(lastname);
    return `${lastnameEscaped}@synyx.de`;
}

function withoutUmlauts(string) {
    return string
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue');
}

function compareByName(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
}
