var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('default', function() {
  gulpSequence('browserify', 'home', 'fonts', 'images', 'watch', function() {

  })
});
