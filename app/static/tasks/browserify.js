var fs = require("fs");
var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");

function bundleScript() {
  browserify({
    entries: './js/main.js',
    debug: true
  })
    .transform(babelify.configure({
      extensions: [".es6"]
    }))
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
    })
    .pipe(fs.createWriteStream("./dist/main.js"));
}


gulp.task('browserify', ['styles'], function() {
  return bundleScript();
});