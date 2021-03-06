<!DOCTYPE html>
<html lang="en" ng-app="seelocal">
<head>
    <meta charset="utf-8">
    <base href="/"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Seelocal</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">

    <!-- Styles -->
    {{--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">--}}
    <link href="{{ elixir('css/all.css') }}" rel="stylesheet">

</head>
<body flow-prevent-drop ng-controller="AuthController">
    <header>
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="/">
                        <img src="images/logo.png" alt="logo"/>
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->

                        <li ng-if="logged"><a href="http://seelocal.co.uk/#getintouch" target="_blank">Contact Us</a></li>  |
                        <li ng-if="logged"><a href="/account">Your Account</a></li>
                        <li ng-if="logged"><a href="javascript:void(0)" ng-click="logout()">Logout</a></li>
                        <li ng-if="!logged"><a href="/login">Log In</a></li>|
                        <li ng-if="!logged"><a href="/register">Register</a></li>

                        {{--<li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ Auth::user()->first_name }} {{ Auth::user()->last_name }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>--}}

                    </ul>
                </div>
            </div>
        </nav>

    </header>
    <main class="container">
        <div class="row">
           {{-- @yield('content')--}}
            <ng-view></ng-view>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="row">
                <div class="pull-left copyright">&copy; <a href="http://seelocal.co.uk">SeeLocal</a></div>

                <ul class="nav navbar-nav navbar-right">
                    <li><a href="'/terms-conditions'">Terms & Conditions</a></li> |
                    <li><a href="'/privacy'">Privacy</a></li>
                </ul>
            </div>
        </div>
    </footer>


    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNcmr2nFb300a0yCZAW3eAQ2QwoCK0mC0&signed_in=true&libraries=places"></script>
    <script src="{{ elixir('js/all.js') }}"></script>
    <script type="text/javascript">
     /*   $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });*/
    </script>
</body>
</html>
