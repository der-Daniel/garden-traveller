var gulp = require('gulp');

function home() {
  return gulp.src('./index.html').pipe(gulp.dest('./dist'));
}

gulp.task('home', home);