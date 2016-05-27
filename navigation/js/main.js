import { GET, GET_JSON } from './requester';

let username = '';
let appsToShow = [];

let usernamePromise = GET_JSON ('/coffeenet/user')
    .then(user => {
        username = user.username;
    });

let appsPromise = GET_JSON ('/coffeenet/apps')
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

GET('/webjars/@project.artifactId@/template/navigation.html')
    .then(html => {
        // add template to dom
        document.getElementById('coffeenet-header').innerHTML = html;

        usernamePromise.then(() => {
            // add username
            document.getElementById('coffeenet-username').innerHTML = username;
        });

        appsPromise.then(() => {
            // add apps
            addApps(appsToShow, 'coffeenet-apps');
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
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    if (nameA < nameB) {
        return -1;
    }
    else if (nameA > nameB) {
        return 1;
    }
    else {
        return 0;
    }
}
