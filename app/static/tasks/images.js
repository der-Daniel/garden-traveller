'use strict';

var gulp =    require('gulp');

gulp.task('images', function() {
    return gulp.src('img/*')
        .pipe(gulp.dest('dist/img'));
});