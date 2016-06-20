
import 'whatwg-fetch'
import { GET, GET_JSON } from 'coffee-fetch';
import Navbar from './Navbar/Navbar';


let fetchUsername = GET_JSON('/coffeenet/user')
    .then(user => user.username);

let fetchApps = GET_JSON('/coffeenet/apps')
    .then(data => {
        let apps = [].slice.call(data);

        if (apps.length === 0) {
            console.info('CoffeeNet: No application discovered');
            return [
                { name: 'No other applications registered', url: '' },
            ];
        }

        apps.sort(compareByName);
        return apps;
    })
    .catch((err) => {
        console.info('CoffeeNet: Could not receive discovered applications', err);
        return Promise.resolve([
            { name: 'Could not receive CoffeeNet applications', url: '' },
        ]);
    });

GET('/webjars/@project.artifactId@/css/navigation.css', { Accept: 'text/css' })
    .then(function attachCSS(css) {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.querySelector('head').appendChild(style);
    });


Promise.all([
    fetchUsername,
    fetchApps,
]).then(values => {
    const [username, apps] = values;
    document.getElementById('coffeenet-header').innerHTML = Navbar({ username, apps });
});


function compareByName(a, b) {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
}
