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
                apps.push({name: 'No other applications registered', url: ''});
                return;
            }

            data.forEach(app => {
                apps.push({name: app.name, url: app.url});
            });
        })
        .fail(() => {
            console.error('Could not receive modules');
            apps.push({name: 'Could not receive CoffeeNet applications', url: ''});
        });

    $.when(usernameDeferred, appsDeferred).then(() => {
        $.get('/webjars/@project.artifactId@/@project.version@/template/navigation.html', template => {
            var rendered = Mustache.render(template, {
                username: username,
                apps: apps
            });
            $('header#coffeenet-header').html(rendered);
        });
    });
});