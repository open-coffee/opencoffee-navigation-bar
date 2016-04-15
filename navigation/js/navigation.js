import Handlebars from 'handlebars';

$(function () {

    let username = '';
    let apps = [];

    let usernameDeferred = $.ajax('/coffeenet/user')
        .then(data => {
            username = data;
        });

    let appsDeferred = $.ajax('/coffeenet/apps')
        .then(data => {

            if (data.length === 0) {
                console.info('CoffeeNet: No application discovered');
                apps.push({name: 'No other applications registered', url: ''});
                return;
            }

            data.forEach(app => {
                apps.push({name: app.name, url: app.url});
            });
        })
        .fail(() => {
            console.info('CoffeeNet: Could not receive discovered applications');
            apps.push({name: 'Could not receive CoffeeNet applications', url: ''});
        });

    $.when(usernameDeferred, appsDeferred).then(() => {
        $.get('/webjars/@project.artifactId@/@project.version@/template/navigation.html', template => {
            var rendered = Handlebars.compile(template)({
                username: username,
                apps: apps
            });
            $('header#coffeenet-header').html(rendered);
        });
    });
});