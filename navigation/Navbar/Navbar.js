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
        buttonLogout: 'coffeenet--button-logout',
        buttonLogoutIcon: 'coffeenet--button-logout-icon'
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
                            <svg class="${styles.buttonLogoutIcon}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M19,3 C20.11,3 21,3.9 21,5 L21,8 L19,8 L19,5 L5,5 L5,19 L19,19 L19,16 L21,16 L21,19 C21,20.1 20.11,21 19,21 L5,21 C3.9,21 3,20.1 3,19 L3,5 C3,3.9 3.9,3 5,3 L19,3 Z M15.5,17 L20.5,12 L15.5,7 L14.09,8.41 L16.67,11 L7,11 L7,13 L16.67,13 L14.09,15.59 L15.5,17 Z"/>
                            </svg>
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
