var gulp = require('gulp');
var elixir = require('laravel-elixir');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */


gulp.task("copyfiles", function() {
    gulp.src("bower_components/angular-messages/angular-messages.min.js")
        .pipe(gulp.dest("public/js/"));

});

elixir(function(mix) {
    mix.sass('app.scss', 'public/css');

    mix.styles([
        'bootstrap.min.css',
        'app.css'
    ], null, 'public/css');

    mix.scripts([
        'lib/angular.min.js',
        'lib/angular-route.min.js',
        'lib/angular-local-storage.min.js',
        'lib/angular-messages.min.js',
        'lib/ng-flow-standalone.min.js',
        'lib/jquery.min.js',
        'lib/bootstrap.min.js',
        'lib/autosize.min.js',
        'app.js',
    ], null, 'public/js');


    mix.version([
        'public/css/all.css',
        'public/js/all.js']);

});
