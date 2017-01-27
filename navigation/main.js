/* eslint new-cap: ["error", { "capIsNewExceptions": ["GET", "GET_JSON"] }] */

import 'whatwg-fetch';
import { GET, GET_JSON } from 'coffee-fetch';
import navbar from './Navbar/Navbar';
import styles from './Navbar/navbar.css';

const fetchCoffeeNetWeb = GET_JSON('/coffeenet/web')
    .then(coffeeNetWeb => coffeeNetWeb)
    .catch((err) => {
        console.info('CoffeeNet: Could not receive CoffeeNetWeb information', err);
        return Promise.resolve([]);
    });

GET('/webjars/@project.artifactId@/css/navigation.css', { Accept: 'text/css' })
    .then(css => {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.querySelector('head').appendChild(style);
    });

Promise.all([
    fetchCoffeeNetWeb,
]).then(coffeeNetWebs => {
    const coffeeNetWeb = coffeeNetWebs[0];
    const user = coffeeNetWeb.coffeeNetWebUser;
    const apps = coffeeNetWeb.coffeeNetApps;
    const profileApp = coffeeNetWeb.profileApp;
    const logoutPath = coffeeNetWeb.logoutPath;

    const header = document.getElementById('coffeenet-header');
    const initiallyVisible = localStorage.getItem('coffee::nav::visible') === 'true';
    let myFavs = JSON.parse(localStorage.getItem('coffee::nav::favs') || '[]');
    let myApps = apps.filter(app => !myFavs.some(fav => fav.name === app.name));

    function handleHamburgerClick() {
        header.classList.toggle(styles.visible);
        localStorage.setItem('coffee::nav::visible', header.classList.contains(styles.visible));
    }

    function handleUnFavClick(event) {
        const unfavedApp = myFavs.find(fav => fav.name === event.target.dataset.app);
        myFavs = [...myFavs].filter(fav => fav.name !== event.target.dataset.app);
        myApps = [...myApps, unfavedApp].sort(compareByName);
        localStorage.setItem('coffee::nav::favs', JSON.stringify(myFavs));
        render({ apps: myApps, favorites: myFavs, profileApp, user, logoutPath });
    }

    function handleFavClick(event) {
        myFavs = [...myFavs, myApps.find(app => app.name === event.target.dataset.app)].sort(compareByName);
        myApps = [...myApps].filter(app => app.name !== event.target.dataset.app);
        localStorage.setItem('coffee::nav::favs', JSON.stringify(myFavs));
        render({ apps: myApps, favorites: myFavs, profileApp, user, logoutPath });
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

    render({ apps: myApps, favorites: myFavs, profileApp, user, logoutPath });
});

function compareByName(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
}

function render({
    apps = [],
    favorites = [],
    profileApp,
    user,
    logoutPath,
}) {
    const username = user.username;
    const html = navbar({ username, apps, favorites, profileApp, logoutPath });
    document.getElementById('coffeenet-header').innerHTML = html;

    const avatarImg = document.createElement('img');
    avatarImg.src = user.avatar;
    document.getElementById('coffee-nav-user-avatar').appendChild(avatarImg);
}
