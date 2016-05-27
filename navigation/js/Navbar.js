
import styles from './navbar.css'


export default function Navbar () {
    return `<div class="${styles.header}">
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#coffeenet-navbar-collapse" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="https://synyx.coffee" title="CoffeeNet Frontpage"><i class="${styles.logo}">Synyx Logo</i></a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="coffeenet-navbar-collapse">
            <ul class="nav navbar-nav navbar-left">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">Applications <span class="caret"></span></a>
                    <ul id="coffeenet-apps" class="dropdown-menu">
                        <!-- render by javascript -->
                    </ul>
                </li>
            </ul>

            <form class="navbar-form navbar-right" action="/logout" method="post">
                <button class="btn btn-link" type="submit" id="logout-link">
                    <span class="glyphicon glyphicon-log-out"></span>
                    Logout
                </button>
            </form>
            <ul class="nav navbar-nav navbar-right">
                <li class="navbar-text hidden-xs">
                    <span id="coffeenet-username">
                        <!-- render by javascript -->
                    </span>
                </li>
            </ul>
        </div>
    </div>
</nav>
</div>`;
}
