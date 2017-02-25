/**
 * Module Dependencies
 */

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var pl = gulpLoadPlugins();
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

/**
 * Gulp Tasks
 */

gulp.task('less', function () {
    return gulp.src('./assets/less/*.less')
        .pipe(pl.less().on('error', function (error) {
            console.log(error);
        }))
        .pipe(gulp.dest('./public/css/'))
        .pipe(pl.notify('Css done'));
});

gulp.task('clean', function() {
    del([
        './public/*'
    ])
    console.log('Pikachu used thunderbolt, super efective');
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync({
        proxy: "localhost:3000",  // local node app address
        port: 5000,  // use *different* port than above
        notify: true
    });
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'app.js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
        ]
    })
        .on('start', function () {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function () {
            setTimeout(function () {
                reload({ stream: false });
            }, 1000);
        });
});




gulp.task('default', ['browser-sync'], function () {
    gulp.watch("assets/less/*.less", ['less'], reload);
    gulp.watch(['views/**/*.*','public/**/*.*'], reload);
});

