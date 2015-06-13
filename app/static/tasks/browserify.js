var fs = require("fs");
var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");
var watchify = require('watchify');
var gulpSequence = require('gulp-sequence');

function bundleScript() {
  var b = browserify({
    entries: './js/main.js',
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  watchify(b)
    .transform(babelify)
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
    })
    .pipe(fs.createWriteStream("./dist/main.js"));
}


gulp.task('browserify', gulpSequence(['styles', 'templateCache'], function() {
  return bundleScript();
}));
