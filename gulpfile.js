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
    gulp.src("bower_components/autosize/dist/autosize.min.js")
        .pipe(gulp.dest("public/js/"));
});

elixir(function(mix) {
    mix.sass('app.scss', 'public/css');


    mix.styles([
        'bootstrap.min.css',
        'app.css'
    ], null, 'public/css');

    mix.scripts([
        'angular.min.js',
        'angular-route.min.js',
        'angular-local-storage.min.js',
        'ng-flow-standalone.min.js',
        'jquery.min.js',
        'bootstrap.min.js',
        'autosize.min.js',
        'app.js',
    ], null, 'public/js')
        .scripts([
          /*  'bootstrap.min.js',
            'dataTables.bootstrap.min.js',*/
        ], 'public/js/admin.js');

    mix.version([
        'public/css/all.css',
        'public/js/all.js']);

});
