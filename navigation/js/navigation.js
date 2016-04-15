import Handlebars from 'handlebars';
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

        for (let app of apps) {
            appsToShow.push({name: app.name, url: app.url});
        }
    })
    .catch((err) => {
        console.info('CoffeeNet: Could not receive discovered applications', err);
        appsToShow.push({name: 'Could not receive CoffeeNet applications', url: ''});
    });

Promise.all([usernamePromise, appsPromise]).then(() => {
    getIt('/webjars/@project.artifactId@/@project.version@/template/navigation.html').then(html => {
        let template = Handlebars.compile(html);
        document.getElementById("coffeenet-header").innerHTML = template({
            username: username,
            apps: appsToShow
        });
    });
});