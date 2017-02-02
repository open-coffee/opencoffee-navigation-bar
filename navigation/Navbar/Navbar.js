import { html } from 'common-tags';
import styles from './navbar.css';

export default function navbar({
    username = '',
    apps = [],
    profileApp,
    logoutPath,
}) {
    const appListItems = apps.map(app => (
        `<li class="${isAppActive(app) ? styles.active : ''}">
           <a href="${app.url}" title="${app.name}">${app.name}</a>
         </li>`
    ));

    return html`
        <div id="coffee-nav-hamburger" class="${styles.hamburger}">
            <span></span>
        </div>
        <div class="${styles.personalisationContainer}">
            ${profileApp === null ? (html`
                <div id="coffee-nav-user-avatar" class="${styles.avatar}"></div>
                <h2 class="${styles.username}">
                    <span>
                        ${username}
                    </span>
                </h2>
            `) : (html`
                <div class="${styles.avatar}">
                    <a id="coffee-nav-user-avatar" href="${profileApp.url}"></a>
                </div>
                <h2 class="${styles.username}">
                    <a href="${profileApp.url}" title="${profileApp.name}">
                        ${username}
                    </a>
                </h2>
            `)}
        </div>
        <nav id="coffe-nav" class="${styles.coffeeNavContainer}">
            ${appListItems.length === 0 ? '' : (html`
                <h2 class="${styles.navSectionTitle}">Anwendungen</h2>
                <ul class="${styles.navSectionList}">
                    ${appListItems}    
                </ul>
            `)}
            ${profileApp === null ? '' : (html`
                <h2 class="${styles.navSectionTitle}">Einstellungen</h2>
                <ul class="${styles.navSectionList}">
                    <li>
                        <a href="${profileApp.url}">${profileApp.name}</a>
                    </li>
                </ul>
            `)}
            <form action="${logoutPath}" method="post">
                <button type="submit" class="${styles.buttonLogout}"> 
                    Logout
                </button> 
            </form>
        </nav>`;
}

function isAppActive({ url = '' }) {
    return window.location.origin === url;
}
