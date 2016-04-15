import getIt from './requester';

let username = '';
let appsToShow = [];

let usernamePromise = getIt('/coffeenet/user')
    .then(JSON.parse)
    .then(user => {
        username = user.username;
    });

let appsPromise = getIt('/coffeenet/apps')
    .then(JSON.parse)
    .then(apps => {

        if (apps.length === 0) {
            console.info('CoffeeNet: No application discovered');
            appsToShow.push({name: 'No other applications registered', url: ''});
            return;
        }

        apps.sort(compareByName);
        appsToShow = apps;
    })
    .catch((err) => {
        console.info('CoffeeNet: Could not receive discovered applications', err);
        appsToShow.push({name: 'Could not receive CoffeeNet applications', url: ''});
    });

Promise.all([usernamePromise, appsPromise]).then(() => {
    getIt('/webjars/@project.artifactId@/@project.version@/template/navigation.html').then(html => {

        // add template to dom
        document.getElementById('coffeenet-header').innerHTML = html;

        // add apps
        addApps(appsToShow, 'coffeenet-apps');

        // add username
        document.getElementById('coffeenet-username').innerHTML = username;
    });
});

/**
 * Add the apps as
 *   <li>
 *       <a href='$url'>$name</a>
 *   </li>
 * under the given selector
 *
 * @param apps to display in navigation
 * @param selector where the applications should be displayed
 */
function addApps(apps, selector) {
    let coffeeNetAppsHtml = document.getElementById(selector);
    for (let app of apps) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', app.url);

        let aText = document.createTextNode(app.name);
        a.appendChild(aText);

        li.appendChild(a);
        coffeeNetAppsHtml.appendChild(li);
    }
}

function compareByName(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    else if (a.name > b.name) {
        return 1;
    }
    else {
        return 0;
    }
}