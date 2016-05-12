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

    gulp.src("bower_components/jquery/dist/jquery.min.js")
        .pipe(gulp.dest("resources/assets/js/"));


});

elixir(function(mix) {
    mix.sass('*.scss', 'resources/assets/css');


    mix.styles([
        'bootstrap.min.css',
        'app.css'
    ], null, 'resources/assets/css');

    mix.scripts([
        'jquery.min.js',
        'bootstrap.min.js',
        'app.js',
    ], null, 'resources/assets/js')
        .scripts([
          /*  'bootstrap.min.js',
            'dataTables.bootstrap.min.js',*/
        ], 'public/js/admin.js');

    mix.version([
        'public/css/all.css',
        'public/js/all.js']);

});
