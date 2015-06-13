'use strict';

var gulp =    require('gulp');

gulp.task('bootstrap', function() {
    return gulp.src('node_modules/bootstrap/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});
