var gulp = require('gulp');
var less = require('gulp-less');

function styles() {
  gulp.src('./css/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'));
}

gulp.task('styles', styles);

