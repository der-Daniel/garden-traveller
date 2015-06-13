'use strict';

var gulp          = require('gulp');

gulp.task('watch', ['server'], function() {
    gulp.watch('index.html', ['home']);
    gulp.watch('js/**/*', ['browserify']);
    gulp.watch('styles/**/*',  ['less']);
    gulp.watch('images/**/*',  ['images']);
});
