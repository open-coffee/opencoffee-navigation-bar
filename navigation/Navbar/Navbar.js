import { html } from 'common-tags';
import styles from './navbar.css';

export default function navbar({
    username,
    apps = [],
}) {
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
        <nav>
            <h2 class="${styles.navSectionTitle}">Anwendungen</h2>
            <ul class="${styles.navSectionList}">
                ${apps.length === 0
                    ? [
                        `<li><span class="${styles.emptyAppListTeaser}">keine Anwendungen verf&uuml;gbar</span></li>`,
                        `<li><span class="${styles.emptyAppListTeaser}">take a coffee break</span></li>`,
                      ]
                    : apps.map(app => `<li><a href="${app.url}">${app.name}</a></li>`)
                }    
            </ul>
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
