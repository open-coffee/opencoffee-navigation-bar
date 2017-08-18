import { html } from 'common-tags';

export default function navbar({
    user,
    username = '',
    apps = [],
    profileApp,
    logoutPath,
    navigationAppInformation,
}) {
    const styles = {
        active: 'active',
        navHamburger: 'coffeenet--nav-hamburger',
        personalisationContainer: 'coffeenet--personalisation-container',
        avatar: 'coffeenet--avatar',
        username: 'coffeenet--username',
        navContainer: 'coffeenet--nav-container',
        navSectionTitle: 'coffeenet--nav-section-title',
        navSectionList: 'coffeenet--nav-section-list',
        buttonLogout: 'coffeenet--button-logout'
    };

    const appListItems = apps.map(app => (
        `<li class="${isAppActive(app) ? styles.active : ''}">
           <a href="${app.url}" title="${app.name}">${app.name}</a>
         </li>`
    ));

    return html`
        <div class="coffeenet--header-container-information">
            <div id="coffeenet--nav-hamburger" class="${styles.navHamburger}">
                <span></span>
            </div>
            ${user === null ? '' : (html`
                <div class="${styles.personalisationContainer}">
                    ${profileApp === null ? (html`
                        <div id="coffeenet--avatar" class="${styles.avatar}"></div>
                        <h2 class="${styles.username}">
                            <span>
                                ${username}
                            </span>
                        </h2>
                    `) : (html`
                        <div id="coffeenet--avatar" class="${styles.avatar}">
                            <a href="${profileApp.url}"></a>
                        </div>
                        <h2 class="${styles.username}">
                            <a href="${profileApp.url}" title="${profileApp.name}">
                                ${username}
                            </a>
                        </h2>
                    `)}
                </div>
            `)}
            <nav class="${styles.navContainer}">
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
                ${user === null ? '' : (html`
                    <form action="${logoutPath}" method="post">
                        <button type="submit" class="${styles.buttonLogout}">
                            Logout
                        </button>
                    </form>
                `)}
            </nav>
        </div>
        ${navigationAppInformation === null ? '' : (html`
            <footer class="coffeenet--header-container-version">
                <img src="/img/logo.svg" title="${navigationAppInformation.artifactId}:${navigationAppInformation.version} 
                ${navigationAppInformation.parentArtifactId}:${navigationAppInformation.parentVersion}">
                </img>
            </footer>`)}
        `;
}

function isAppActive({ url = '' }) {
    return window.location.origin === url;
}
