'use strict';

var gulp          = require('gulp');

gulp.task('watch', function() {
    gulp.watch('index.html', ['home']);
    gulp.watch(['js/**/*.js', 'js/**/*.html'], ['browserify']);
    gulp.watch('styles/**/*.less',  ['styles']);
    gulp.watch('images/**/*',  ['images']);
});
