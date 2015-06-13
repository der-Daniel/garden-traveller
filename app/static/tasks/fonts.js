var gulp = require('gulp');

function fonts() {
  return gulp.src('./fonts/*').pipe(gulp.dest('dist/fonts'));
}

gulp.task('fonts', fonts);