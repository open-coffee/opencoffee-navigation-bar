import { html } from 'common-tags';
import styles from './navbar.css';

export default function navbar({
    username = '',
    apps = [],
    favorites = [],
}) {
    const favoriteListItems = favorites.map(app => (
        `<li>
           <a href="${app.url}">${app.name}</a>
           <span><i class="${styles.favstar}" data-is-fav="true" data-app="${app.name}"></i></span>
         </li>`
    ));

    const appListItems = apps.map(app => (
        `<li>
           <a href="${app.url}">${app.name}</a>
           <span><i class="${styles.favstar}" data-app="${app.name}"></i></span>
         </li>`
    ));

    return html`
        <div id="coffee-nav-hamburger" class="${styles.hamburger}">
            <span></span>
        </div>
        <div class="${styles.personalisationContainer}">
            <div id="coffee-nav-user-avatar" class="${styles.avatar}"></div>
            <h2 class="${styles.username}">
                ${username}
            </h2>
        </div>
        <nav id="coffe-nav">
            ${favoriteListItems.length === 0 ? '' : (html`
                <h2 class="${styles.navSectionTitle}">Favoriten</h2>
                <ul class="${styles.navSectionList}">
                    ${favoriteListItems}    
                </ul>
            `)}
            ${appListItems.length === 0 ? '' : (html`
                <h2 class="${styles.navSectionTitle}">Anwendungen</h2>
                <ul class="${styles.navSectionList}">
                    ${appListItems}    
                </ul>
            `)}
            <h2 class="${styles.navSectionTitle}">Einstellungen</h2>
            <ul class="${styles.navSectionList}">
                <li>
                    <a href="https://profile.synyx.coffee">Profil</a>
                </li>
            </ul>
            <form action="/logout" method="post"> 
                <button type="submit" class="${styles.buttonLogout}"> 
                    Logout
                </button> 
            </form>
        </nav>`;
}
