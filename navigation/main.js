/* eslint new-cap: ["error", { "capIsNewExceptions": ["GET", "GET_JSON"] }] */

import 'whatwg-fetch';
import { GET, GET_JSON } from './Fetch/coffee-fetch';
import navbar from './Navbar/Navbar';

const fetchCoffeeNetWeb = GET_JSON('/coffeenet/web')
    .then(coffeeNetWeb => coffeeNetWeb)
    .catch(() => {
        return Promise.resolve([]);
    });

GET('/css/coffeenet-navbar.css', { Accept: 'text/css' })
    .then(css => {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.querySelector('head').appendChild(style);
    });

Promise.all([
    fetchCoffeeNetWeb,
]).then(coffeeNetWebs => {
    const { coffeeNetWebUser, coffeeNetApps, profileApp, logoutPath } = coffeeNetWebs[0];

    const header = document.getElementById('coffeenet-header');
    const initiallyVisible = localStorage.getItem('coffee::nav::visible') === 'true';

    const styles = {
        visible: 'visible',
        headerContainer: 'coffeenet--header-container',
        body: 'coffeenet--body',
        html: 'coffeenet--html'
    };

    function handleHamburgerClick() {
        header.classList.toggle(styles.visible);
        localStorage.setItem('coffee::nav::visible', header.classList.contains(styles.visible));
    }

    if (initiallyVisible) {
        header.classList.add(styles.visible);
    }
    header.classList.add(styles.headerContainer);
    header.addEventListener('click', event => {
        if (event.target.id === 'coffeenet--nav-hamburger' || event.target.parentNode.id === 'coffeenet--nav-hamburger') {
            handleHamburgerClick();
        }
    });

    document.getElementsByTagName('body')[0].classList.add(styles.body);
    document.getElementsByTagName('html')[0].classList.add(styles.html);

    render({
        profileApp,
        logoutPath,
        apps: coffeeNetApps,
        user: coffeeNetWebUser,
    });
});

function render({
    apps = [],
    profileApp,
    user,
    logoutPath,
}) {
    const username = user ? user.username : '';
    const html = navbar({user, username, apps: apps || [], profileApp, logoutPath });
    document.getElementById('coffeenet-header').innerHTML = html;

    if(user){
        const avatarImg = document.createElement('img');
        avatarImg.src = user.avatar;
        document.getElementById('coffeenet--avatar').appendChild(avatarImg);
    }
}
