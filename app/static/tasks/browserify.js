var fs = require("fs");
var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");
var gulpSequence = require('gulp-sequence');

function bundleScript() {
  browserify({
    entries: './js/main.js',
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  })
    .transform(babelify)
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
    })
    .pipe(fs.createWriteStream("./dist/main.js"));
}


gulp.task('browserify', function() {
  gulpSequence('styles', 'templateCache', function() {
    return bundleScript();
  });

});
