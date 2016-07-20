import { html } from 'common-tags';
import styles from './navbar.css';

export default function navbar({
    username,
    apps = [],
}) {
    return html`
        <div class="${styles.personalisationContainer}">
            <div class="${styles.avatarCircleOuter}">
                <div class="${styles.avatarCircleInner}">
                    <div class="${styles.avatar}"></div>
                </div>
            </div>
            <h2 class="${styles.username}">
                ${username}
            </h2>
        </div>
        <nav class="${styles.navigationContainer}">
            <h2 class="${styles.navSectionTitle}">Anwendungen</h2>
            <ul class="${styles.navSectionList}">
                ${apps.map(app => `<li><a href="${app.url}">${app.name}</a></li>`)}
            </ul>
            <h2 class="${styles.navSectionTitle}">Einstellungen</h2>
            <ul class="${styles.navSectionList}">
                <li>
                    <a href="https://profile.synyx.coffee">Profil</a>
                </li>
                <li>
                    <form action="/logout" method="post"> 
                        <button type="submit" id="logout-link" class="${styles.buttonLogout}"> 
                            Logout
                        </button> 
                    </form>
                </li>
            </ul>
        </nav>`;
}
