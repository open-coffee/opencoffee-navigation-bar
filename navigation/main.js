/* eslint new-cap: ["error", { "capIsNewExceptions": ["GET", "GET_JSON"] }] */

import 'whatwg-fetch';
import { GET, GET_JSON } from 'coffee-fetch';
import gravatarUrl from 'gravatar-url';
import navbar from './Navbar/Navbar';
import styles from './Navbar/navbar.css';


const fetchUsername = GET_JSON('/coffeenet/user')
    .then(user => user.username);

const fetchApps = GET_JSON('/coffeenet/apps')
    .then(apps => [...apps].sort(compareByName))
    .catch((err) => {
        console.info('CoffeeNet: Could not receive discovered applications', err);
        return Promise.resolve([]);
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
    const initiallyVisible = localStorage.getItem('coffee::nav::visible') === 'true';
    var myFavs = JSON.parse(localStorage.getItem('coffee::nav::favs') || '[]');
    var myApps = apps.filter(app => !myFavs.some(fav => fav.name === app.name));

    function handleHamburgerClick() {
        header.classList.toggle(styles.visible);
        localStorage.setItem('coffee::nav::visible', header.classList.contains(styles.visible));
    }

    function handleUnFavClick(event) {
        const unfavedApp = myFavs.find(fav => fav.name === event.target.dataset.app);
        myFavs = [...myFavs].filter(fav => fav.name !== event.target.dataset.app);
        myApps = [...myApps, unfavedApp].sort(compareByName);
        localStorage.setItem('coffee::nav::favs', JSON.stringify(myFavs));
        render({ username, apps: myApps, favorites: myFavs });
    }

    function handleFavClick(event) {
        myFavs = [...myFavs, myApps.find(app => app.name === event.target.dataset.app)].sort(compareByName);
        myApps = [...myApps].filter(app => app.name !== event.target.dataset.app);
        localStorage.setItem('coffee::nav::favs', JSON.stringify(myFavs));
        render({ username, apps: myApps, favorites: myFavs });
    }

    if (initiallyVisible) {
        header.classList.add(styles.visible);
    }
    header.classList.add(styles.headerContainer);
    header.addEventListener('click', event => {
        if (event.target.id === 'coffee-nav-hamburger' || event.target.parentNode.id === 'coffee-nav-hamburger') {
            handleHamburgerClick();
        }
        else if (event.target.dataset.app && event.target.dataset.isFav === 'true') {
            handleUnFavClick(event);
        }
        else if (event.target.dataset.app) {
            handleFavClick(event);
        }
    });

    render({ username, apps: myApps, favorites: myFavs });
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

function render({
    apps = [],
    favorites = [],
    username,
}) {
    const html = navbar({ username, apps, favorites });
    document.getElementById('coffeenet-header').innerHTML = html;

    const avatarImg = document.createElement('img');
    avatarImg.src = gravatarUrl(guessEmail(username), { size: 64 });
    avatarImg.onError = function avatarFetchError() {
        avatarImg.src = ''; // TODO copy anon_img in dist and set as src
    };
    document.getElementById('coffee-nav-user-avatar').appendChild(avatarImg);
}
