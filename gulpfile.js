var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

var sassTask = function() {
  return gulp.src('source/styles/**/*.scss') //Current file it looking at. 
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('distribute/css'))  //end file where it will distribute to. 
    .pipe(connect.reload());
};
var copyTask = function() {
  return gulp.src('source/**/*.html') // Looking at Files inside of source. see Blobbing: https://gulpjs.com/docs/en/getting-started/explaining-globs
    .pipe(gulp.dest('distribute'))
    .pipe(connect.reload());
};
var connectTask = function(done()) {
  connect.server({
    root: 'distribute',
    port: '3000',
    host: 'localhost',
    livereload: true,
  });
  done()
};
var watchTask = function(done) {
  gulp.watch('source/styles/**/*.scss', gulp.series('sass'));
  gulp.watch('source/**/*.html', gulp.series('copy'));
  done();
};
var prefix = function() {
  return gulp.src('source/styles/**/*.scss')
  .pipe(autoprefixer({
      browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
      cascade: false
  }))
  .pipe(gulp.dest('distribute'))
};

gulp.task('sass', sassTask);
gulp.task('copy', copyTask);
gulp.task('connect', connectTask);
gulp.task('watch', watchTask);
gulp.task('prefix', prefix);
gulp.task('default', gulp.series('sass', 'prefix', 'copy', 'watch', 'connect'));
