$(function () {

    var username = '';
    $.ajax({url: "/coffeenet/user", async: false})
        .done(function (data) {
            username = data;
        });

    $('header#coffeenet-header').loadTemplate('/webjars/@project.artifactId@/@project.version@/navigation.html',
        {
            user: username
        },
        {
            async: false
        }
    );

    var $appsDropdown = $('#apps-dropdown');
    $.ajax("/coffeenet/apps")
        .done(function (data) {

            if (data.length === 0) {
                $appsDropdown.append($('<li><a>No other applications registered.</a></li>'));
            }

            data.forEach(function (app) {
                $appsDropdown.append($('<li><a href="' + app.instanceInfo.homePageUrl + '">' + app.instanceInfo.secureVipAddress + '</a></li>'));
            });
        })
        .fail(function () {
            console.error('Could not receive modules');
            $appsDropdown.append($('<li><a><span class="glyphicon glyphicon-warning-sign"></span> Could not receive CoffeeNet applications</a></li>'));
        });
});