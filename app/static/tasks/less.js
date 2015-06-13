var gulp = require('gulp');
var less = require('gulp-less');

function styles() {
  return gulp.src('./styles/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'));
}

gulp.task('styles', styles);

