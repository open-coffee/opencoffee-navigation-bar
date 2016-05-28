
import { GET, GET_JSON } from 'coffee-fetch';
import Navbar from './Navbar'


let fetchUsername = GET_JSON('/coffeenet/user')
    .then(user => user.username);

let fetchApps = GET_JSON('/coffeenet/apps')
    .then(data => {
        let apps = [].slice.call(data);

        if (apps.length === 0) {
            console.info('CoffeeNet: No application discovered');
            return [
                {name: 'No other applications registered', url: ''}
            ];
        }

        apps.sort(compareByName);
        return apps;
    })
    .catch((err) => {
        console.info('CoffeeNet: Could not receive discovered applications', err);
        return Promise.resolve([
            {name: 'Could not receive CoffeeNet applications', url: ''}
        ]);
    });

GET ('/webjars/@project.artifactId@/css/navigation.css', { Accept: 'text/css' })
    .then (function attachCSS (css) {
        const style = document.createElement ('style');
        style.innerHTML = css;
        document.querySelector ('head').appendChild (style);
    });


Promise.all([
    fetchUsername,
    fetchApps
]).then (values => {
    const [username, apps] = values;
    document.getElementById('coffeenet-header').innerHTML = Navbar ();
    document.getElementById('coffeenet-username').innerHTML = username;
    addApps(apps, 'coffeenet-apps');
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

    const appListItemsHtml = apps
        .map(app => `<li><a href="${app.url}">${app.name}</a></li>`)
        .join('');

    const coffeeNetApps = document.getElementById(selector);
    coffeeNetApps.innerHTML = appListItemsHtml;
}

function compareByName(a, b) {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
}
