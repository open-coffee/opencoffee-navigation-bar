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
        </nav>`;
}
