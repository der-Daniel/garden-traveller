'use strict';

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');

gulp.task('templateCache', function() {
    gulp.src('./js/**/*.html')
        .pipe(templateCache('templatecache.js', {
            standalone: true,
            module: 'app.templateCache'
        }))
        .pipe(gulp.dest('./js'));
});
